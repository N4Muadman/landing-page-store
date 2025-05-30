<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Service\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductController extends Controller
{
    /**
     * Constructor với dependency injection
     */
    public function __construct(protected ProductService $product_service)
    {
    }
    
    /**
     * Hiển thị danh sách sản phẩm với phân trang và lọc
     */
    public function index(Request $request)
    {
        try {
            $products = $this->product_service->getAll($request, ['images']) // Chỉ load images cho trang listing
                ->paginate($request->per_page ?? 10);
            
            return view('admin.product.index', compact('products'));
        } catch (\Exception $e) {
            Log::error('Lỗi khi lấy danh sách sản phẩm: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }

    /**
     * Hiển thị form tạo sản phẩm mới
     */
    public function create()
    {
        return view('admin.product.create');
    }

    /**
     * Lưu sản phẩm mới vào database
     */
    public function store(StoreProductRequest $request)
    {
        try {
            $data = $request->validated();

            dd($data);
            
            // Xử lý upload hình ảnh
            $images = $this->handleImageUploads($request);
            
            // Xử lý options nếu có
            $options = $this->processProductOptions($request);
            
            // Tạo sản phẩm mới
            $product = $this->product_service->createProduct($data, $images, $options);
            
            return redirect()->route('admin.products.index')
                ->with('success', 'Sản phẩm đã được tạo thành công.');
        } catch (\Exception $e) {
            Log::error('Lỗi khi tạo sản phẩm: ' . $e->getMessage());
            return redirect()->back()
                ->withInput()
                ->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }

    /**
     * Hiển thị chi tiết sản phẩm
     */
    public function show(Product $product)
    {
        try {
            // Load dữ liệu cần thiết cho trang chi tiết
            $product = $this->product_service->getProductById($product->id, ['images', 'options']);
            
            // Load comments với phân trang riêng để tối ưu
            $comments = $this->product_service->getProductComments($product, 5);
            
            return view('admin.product.show', compact('product', 'comments'));
        } catch (\Exception $e) {
            Log::error('Lỗi khi hiển thị sản phẩm: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }

    /**
     * Hiển thị form chỉnh sửa sản phẩm
     */
    public function edit(Product $product)
    {
        try {
            // Chỉ load các relationship cần thiết cho trang edit
            $product->load(['images', 'options']);
            
            return view('admin.product.edit', compact('product'));
        } catch (\Exception $e) {
            Log::error('Lỗi khi hiển thị form chỉnh sửa: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }

    /**
     * Cập nhật thông tin sản phẩm
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        try {
            $data = $request->validated();
            
            // Xử lý upload hình ảnh
            $images = $this->handleImageUploads($request);
            
            // Xử lý các hình ảnh đã tồn tại
            $images = array_merge($images, $this->processExistingImages($request));
            
            // Xử lý options nếu có
            $options = $this->processProductOptions($request);
            
            // Cập nhật sản phẩm
            $this->product_service->updateProduct($product, $data, $images, $options);
            
            return redirect()->route('admin.products.index')
                ->with('success', 'Sản phẩm đã được cập nhật thành công.');
        } catch (\Exception $e) {
            Log::error('Lỗi khi cập nhật sản phẩm: ' . $e->getMessage());
            return redirect()->back()
                ->withInput()
                ->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }

    /**
     * Xóa sản phẩm
     */
    public function destroy(Request $request, Product $product)
    {
        try {
            // Xóa các file hình ảnh nếu cần thiết
            if ($request->delete_images || $request->force_delete) {
                $this->deleteProductImages($product);
            }
            
            // Xóa sản phẩm (soft delete hoặc force delete)
            $this->product_service->deleteProduct(
                $product, 
                $request->has('force_delete') && $request->force_delete
            );
            
            return redirect()->route('admin.products.index')
                ->with('success', 'Sản phẩm đã được xóa thành công.');
        } catch (\Exception $e) {
            Log::error('Lỗi khi xóa sản phẩm: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }
    
    /**
     * Xóa nhiều sản phẩm cùng lúc
     */
    public function bulkDelete(Request $request)
    {
        try {
            $ids = $request->input('ids', []);
            
            if (empty($ids)) {
                return redirect()->route('admin.products.index')
                    ->with('error', 'Không có sản phẩm nào được chọn để xóa.');
            }
            
            // Xóa các file hình ảnh nếu cần thiết
            if ($request->delete_images || $request->force_delete) {
                $products = Product::whereIn('id', $ids)->get();
                foreach ($products as $product) {
                    $this->deleteProductImages($product);
                }
            }
            
            // Xóa sản phẩm (soft delete hoặc force delete)
            $count = $this->product_service->bulkDeleteProducts(
                $ids, 
                $request->has('force_delete') && $request->force_delete
            );
            
            return redirect()->route('admin.products.index')
                ->with('success', "Đã xóa thành công {$count} sản phẩm.");
        } catch (\Exception $e) {
            Log::error('Lỗi khi xóa nhiều sản phẩm: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Có lỗi xảy ra: ' . $e->getMessage());
        }
    }
    
    /**
     * Xử lý các hình ảnh đã tồn tại
     * 
     * @param Request $request
     * @return array
     */
    protected function processExistingImages($request) : array
    {
        $images = [];
        
        // Xử lý hình ảnh đã tồn tại
        if ($request->has('existing_images')) {
            foreach ($request->input('existing_images') as $imageId => $imageData) {
                // Nếu hình ảnh được đánh dấu để xóa, bỏ qua
                if (isset($imageData['delete']) && $imageData['delete']) {
                    // Xóa hình ảnh từ storage
                    $image = \App\Models\Image::find($imageId);
                    if ($image && $image->path) {
                        $this->deleteImageFile($image->path);
                    }
                    
                    // Xóa record từ database
                    if ($image) {
                        $image->delete();
                    }
                    continue;
                }
                
                $images[] = [
                    'id' => $imageId,
                    'alt' => $imageData['alt'] ?? null,
                    'is_main' => isset($imageData['is_main']) && $imageData['is_main'],
                ];
            }
        }
        
        return $images;
    }
    
    /**
     * Xử lý các tùy chọn sản phẩm
     * 
     * @param Request $request
     * @return array
     */
    protected function processProductOptions($request) : array
    {
        $options = [];
        
        if ($request->has('options')) {
            foreach ($request->input('options') as $key => $optionData) {
                // Bỏ qua các option không có tên
                if (empty($optionData['name'])) {
                    continue;
                }
                
                $option = [
                    'name' => $optionData['name'],
                    'values' => $optionData['values'] ?? [],
                    'price' => $optionData['price'] ?? null,
                    'stock' => $optionData['stock'] ?? null,
                ];
                
                // Nếu là option đã tồn tại, thêm ID
                if (isset($optionData['id'])) {
                    $option['id'] = $optionData['id'];
                }
                
                $options[] = $option;
            }
        }
        
        return $options;
    }
    
    /**
     * Xóa các file hình ảnh của sản phẩm
     * 
     * @param Product $product
     * @return void
     */
    protected function deleteProductImages(Product $product) : void
    {
        foreach ($product->images as $image) {
            $this->deleteImageFile($image->path);
        }
    }
    
    /**
     * Xóa một file hình ảnh từ storage
     * 
     * @param string|null $path
     * @return bool
     */
    protected function deleteImageFile(?string $path) : bool
    {
        if (!$path) {
            return false;
        }
        
        if (Storage::disk('public')->exists($path)) {
            return Storage::disk('public')->delete($path);
        }
        
        return false;
    }
    
    /**
     * API để lấy danh sách sản phẩm cho frontend
     */
    public function apiListProducts(Request $request)
    {
        try {
            $products = $this->product_service->getAll($request, ['images'])
                ->paginate($request->per_page ?? 12);
            
            return response()->json([
                'success' => true,
                'data' => $products,
            ]);
        } catch (\Exception $e) {
            Log::error('API error - Lấy danh sách sản phẩm: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Có lỗi xảy ra khi lấy dữ liệu sản phẩm',
            ], 500);
        }
    }
    
    /**
     * API để lấy chi tiết sản phẩm cho frontend
     */
    public function apiProductDetail($id)
    {
        try {
            $product = $this->product_service->getProductById($id, ['images', 'options']);
            
            // Lấy các sản phẩm tương tự
            $similarProducts = $this->product_service->getSimilarProducts($product);
            
            return response()->json([
                'success' => true,
                'data' => [
                    'product' => $product,
                    'similar_products' => $similarProducts,
                ],
            ]);
        } catch (\Exception $e) {
            Log::error('API error - Chi tiết sản phẩm: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sản phẩm hoặc có lỗi xảy ra',
            ], 404);
        }
    }
    
    /**
     * API để lấy comment của sản phẩm
     */
    public function apiProductComments($id, Request $request)
    {
        try {
            $product = Product::findOrFail($id);
            $comments = $this->product_service->getProductComments($product, $request->per_page ?? 5);
            
            return response()->json([
                'success' => true,
                'data' => $comments,
            ]);
        } catch (\Exception $e) {
            Log::error('API error - Comments sản phẩm: ' . $e->getMessage());
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy sản phẩm hoặc có lỗi xảy ra',
            ], 404);
        }
    }

    protected function handleImageUploads($request) : array
    {
        $images = [];
        
        // Xử lý upload hình ảnh mới
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $key => $image) {
                try {
                    // Upload file và lưu path
                    $path = $image->store('products', 'public');
                    
                    $images[] = [
                        'path' => $path,
                        'alt' => $request->input('image_alt.' . $key, $request->name),
                        'is_main' => $request->input('is_main_image') == $key,
                    ];
                } catch (\Exception $e) {
                    Log::error('Lỗi khi upload hình ảnh: ' . $e->getMessage());
                }
            }
        }
        
        return $images;
    }
}
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
    public function __construct(protected ProductService $product_service) {}

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

            $product = $this->product_service->createProduct($data);

            return response()->json(['message' => 'Thêm sản phẩm thành công'], 201);
        } catch (\Exception $e) {
            Log::error('Lỗi khi tạo sản phẩm: ' . $e->getMessage());
            return response()->json(['message' => 'Lỗi khi tạo sản phẩm'], 500);
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
            return response()->json(['message' => 'Sửa sản phẩm thành công'], 200);
            Log::info($data);

            $product = $this->product_service->updateProduct($product, $data);

            return response()->json(['message' => 'Sửa sản phẩm thành công'], 200);
        } catch (\Exception $e) {
            Log::error('Lỗi khi cập nhật sản phẩm: ' . $e->getMessage());
            return response()->json(['message' => 'Có lỗi xảy ra khi sửa sản phẩm ' .$e->getMessage()], 500);
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
}

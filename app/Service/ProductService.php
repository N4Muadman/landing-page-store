<?php
namespace App\Service;

use App\Models\Product;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;

class ProductService
{
    protected $defaultRelations = ['images'];
    
    
    public function getAll($request, array $relations = []) : Builder 
    {
        $relations = $relations ?? $this->defaultRelations;
        
        $productQuery = Product::with($relations);

        $this->applyFilters($productQuery, $request);
        
        $this->applySorting($productQuery, $request);

        return $productQuery;
    }

    protected function applyFilters(Builder $query, $request) : void
    {
        if ($request->name) {
            $query->where('name', 'like', '%'.$request->name.'%');
        }

        if ($request->title) {
            $query->where('title', 'like', '%'.$request->title.'%');
        }

        if ($request->description) {
            $query->where('description', 'like', '%'.$request->description.'%');
        }

        if ($request->price_from) {
            $query->where('price', '>=', $request->price_from);
        }

        if ($request->price_to) {
            $query->where('price', '<=', $request->price_to);
        }
        
        if ($request->min_star) {
            $query->where('star', '>=', $request->min_star);
        }
        
        if ($request->has('has_discount') && $request->has_discount) {
            $query->where('discount', '>', 0);
        }
        
    }

    protected function applySorting(Builder $query, $request) : void
    {
        if ($request->sort) {
            switch ($request->sort) {
                case 'price_asc':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price_desc':
                    $query->orderBy('price', 'desc');
                    break;
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                case 'oldest':
                    $query->orderBy('created_at', 'asc');
                    break;
                case 'best_selling':
                    $query->orderBy('sold', 'desc');
                    break;
                case 'name_asc':
                    $query->orderBy('name', 'asc');
                    break;
                case 'name_desc':
                    $query->orderBy('name', 'desc');
                    break;
                case 'most_reviewed':
                    $query->orderBy('count_reviews', 'desc');
                    break;
                case 'highest_rated':
                    $query->orderBy('star', 'desc');
                    break;
                default:
                    $query->orderBy('created_at', 'desc');
                    break;
            }
        } else {
            $query->orderBy('created_at', 'desc');
        }
    }

   
    public function getProductById($id, array $relations = ['images', 'options'])
    {
        return Product::with($relations)->findOrFail($id);
    }
    
    
    public function getProductComments(Product $product, int $perPage = 10)
    {
        return $product->comments()->with('user')->orderBy('created_at', 'desc')->paginate($perPage);
    }

    
    public function createProduct(array $data, array $images = [], array $options = [], array $comment = [], array $feedbacks = [])
    {
        try {
            DB::beginTransaction();
            
            if (!isset($data['slug']) || empty($data['slug'])) {
                $data['slug'] = Str::slug($data['name']);
                
                $count = 1;
                $originalSlug = $data['slug'];
                
                while (Product::where('slug', $data['slug'])->exists()) {
                    $data['slug'] = $originalSlug . '-' . $count++;
                }
            }

            $data['sold'] = $data['sold'] ?? 0;
            $data['count_reviews'] = $data['count_reviews'] ?? 0;
            $data['star'] = $data['star'] ?? 0;
            $data['discount'] = $data['discount'] ?? 0;
            
            $product = Product::create($data);
            
            $this->handleProductImages($product, $images);
            
            if (!empty($options)) {
                foreach ($options as $option) {
                    $product->options()->create($option);
                }
            }
            
            DB::commit();
            return $product;
            
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    public function updateProduct(Product $product, array $data, array $images = [], array $options = [])
    {
        try {
            DB::beginTransaction();
            
            if (isset($data['name']) && $data['name'] !== $product->name && (!isset($data['slug']) || empty($data['slug']))) {
                $data['slug'] = Str::slug($data['name']);
                
                $count = 1;
                $originalSlug = $data['slug'];
                
                while (Product::where('slug', $data['slug'])->where('id', '!=', $product->id)->exists()) {
                    $data['slug'] = $originalSlug . '-' . $count++;
                }
            }
            
            $product->update($data);
            
            if (!empty($images)) {
                $this->handleProductImages($product, $images);
            }
            
            if (!empty($options)) {
                if (isset($data['replace_options']) && $data['replace_options']) {
                    $product->options()->delete();
                }
                
                foreach ($options as $option) {
                    if (isset($option['id'])) {
                        $existingOption = $product->options()->find($option['id']);
                        if ($existingOption) {
                            $existingOption->update($option);
                        }
                    } else {
                        $product->options()->create($option);
                    }
                }
            }
            
            DB::commit();
            return $product;
            
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    protected function handleProductImages(Product $product, array $images) : void
    {
        $hasMainImage = false;
        foreach ($images as $image) {
            if (isset($image['is_main']) && $image['is_main']) {
                $hasMainImage = true;
                break;
            }
        }
        
        foreach ($images as $image) {
            if (isset($image['id'])) {
                $existingImage = $product->images()->find($image['id']);
                if ($existingImage) {
                    if ($hasMainImage && !isset($image['is_main'])) {
                        $image['is_main'] = false;
                    }
                    
                    $existingImage->update([
                        'path' => $image['path'] ?? $existingImage->path,
                        'alt' => $image['alt'] ?? $existingImage->alt,
                        'is_main' => $image['is_main'] ?? $existingImage->is_main,
                    ]);
                }
            } else {
                if (!$hasMainImage && count($product->images) === 0) {
                    $image['is_main'] = true;
                    $hasMainImage = true;
                } else if ($hasMainImage) {
                    $image['is_main'] = $image['is_main'] ?? false;
                }
                
                $product->images()->create([
                    'path' => $image['path'] ?? null,
                    'alt' => $image['alt'] ?? null,
                    'is_main' => $image['is_main'] ?? false,
                ]);
            }
        }
    }

    public function deleteProduct(Product $product, bool $force = false)
    {
        try {
            DB::beginTransaction();
            
            // Nếu xóa hoàn toàn, xóa các relationship trước
            if ($force) {
                // Chỉ xóa các relationship cần thiết để tránh lỗi foreign key
                $product->images()->delete();
                $product->comments()->delete();
                $product->options()->delete();
                $product->feedbacks()->delete();
                $product->contacts()->delete();
                
                // Xóa sản phẩm
                $product->delete();
            } else {
                // Sử dụng soft delete nếu model hỗ trợ
                // Lưu ý: Cần thêm SoftDeletes trait vào model Product nếu chưa có
                $product->delete();
            }
            
            DB::commit();
            return true;
            
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    
    /**
     * Xóa nhiều sản phẩm cùng lúc
     *
     * @param array $productIds
     * @param bool $force Xóa hoàn toàn hay chỉ xóa mềm
     * @return int Số lượng sản phẩm đã xóa
     */
    public function bulkDeleteProducts(array $productIds, bool $force = false) : int
    {
        if (empty($productIds)) {
            return 0;
        }
        
        try {
            DB::beginTransaction();
            
            $products = Product::whereIn('id', $productIds)->get();
            $count = 0;
            
            foreach ($products as $product) {
                $this->deleteProduct($product, $force);
                $count++;
            }
            
            DB::commit();
            return $count;
            
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    
    /**
     * Tìm kiếm sản phẩm tương tự (dựa trên các tiêu chí như danh mục, tags, giá...)
     *
     * @param Product $product
     * @param int $limit
     * @return Collection
     */
    public function getSimilarProducts(Product $product, int $limit = 4) : Collection
    {
        // Giả sử muốn sản phẩm tương tự dựa trên tên và mức giá tương đương
        return Product::with('images')
            ->where('id', '!=', $product->id)
            ->where(function($query) use ($product) {
                // Tìm sản phẩm có tên tương tự
                $query->where('name', 'like', '%' . explode(' ', $product->name)[0] . '%')
                    // Hoặc có giá tương tự (±20%)
                    ->orWhereBetween('price', [
                        $product->price * 0.8,
                        $product->price * 1.2
                    ]);
            })
            ->limit($limit)
            ->latest()
            ->get();
    }
}
<?php

namespace App\Service;

use App\Models\Comment;
use App\Models\CommentImage;
use App\Models\Feedback;
use App\Models\Image;
use App\Models\Product;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    protected $defaultRelations = ['images'];


    public function getAll($request, array $relations = []): Builder
    {
        $relations = $relations ?? $this->defaultRelations;

        $productQuery = Product::with($relations);

        $this->applyFilters($productQuery, $request);

        $this->applySorting($productQuery, $request);

        return $productQuery;
    }

    protected function applyFilters(Builder $query, $request): void
    {
        if ($request->name) {
            $query->where('name', 'like', '%' . $request->name . '%');
        }

        if ($request->title) {
            $query->where('title', 'like', '%' . $request->title . '%');
        }

        if ($request->description) {
            $query->where('description', 'like', '%' . $request->description . '%');
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

    protected function applySorting(Builder $query, $request): void
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


    public function getProductBySlug($slug, array $relations = ['images', 'options', 'comments'])
    {
        return Product::with($relations)->where('slug', $slug)->first();
    }


    public function getProductComments(Product $product, int $perPage = 10)
    {
        return $product->comments()->with('user')->orderBy('created_at', 'desc')->paginate($perPage);
    }


    public function createProduct(array $data)
    {
        try {
            DB::beginTransaction();

            $images = $this->handleImageUploads($data['images'] ?? []);

            $feedbacks = $this->handleImageUploads($data['feedbacks'] ?? [], 'feedbacks');

            $comments = $this->handleCommentImages($data['comments'] ?? []);

            $options = $data['options'] ?? [];

            $productData = array_diff_key($data, array_flip(['images', 'comments', 'options', 'feedbacks']));

            $count = 1;
            $originalSlug = $productData['slug'];

            while (Product::where('slug', $productData['slug'])->exists()) {
                $productData['slug'] = $originalSlug . '-' . $count++;
            }

            $productData['price'] = $this->format_number($productData['price']);
            $productData['discount'] = $this->format_number($productData['discount']);
            $productData['sold'] = $this->format_number($productData['sold']);
            $productData['count_reviews'] = $this->format_number($productData['count_reviews']);

            $product = Product::create($productData);

            $product->images()->createMany($images);
            $product->feedbacks()->createMany($feedbacks);
            $product->options()->createMany($options);

            foreach ($comments as $comment) {
                $commentImages = $comment['images'];
                unset($comment['images']);
                $newComment = $product->comments()->create($comment);

                $newComment->images()->createMany($commentImages);
            }

            DB::commit();
            return $product;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }
    public function updateProduct(Product $product, array $data)
    {
        try {
            DB::beginTransaction();

            // Xử lý xóa các item đã bị xóa
            $this->handleDeletedItems($data);

            $newImages = $this->handleImageUploads($data['images'] ?? []);

            $newFeedbacks = $this->handleImageUploads($data['feedbacks'] ?? [], 'feedbacks');

            $this->handleUpdateComments($product, $data['comments'] ?? []);

            $this->handleUpdateOptions($product, $data['options'] ?? []);

            $productData = array_diff_key($data, array_flip([
                'images',
                'comments',
                'options',
                'feedbacks',
                'deleted_images',
                'deleted_feedbacks',
                'deleted_comment_images'
            ]));

            if (isset($productData['title']) && $productData['title'] !== $product->title) {
                $count = 1;
                $originalSlug = $productData['slug'];

                while (Product::where('slug', $productData['slug'])
                    ->where('id', '!=', $product->id)
                    ->exists()
                ) {
                    $productData['slug'] = $originalSlug . '-' . $count++;
                }
            }

            $productData['price'] = $this->format_number($productData['price']);
            $productData['discount'] = $this->format_number($productData['discount']);
            $productData['sold'] = $this->format_number($productData['sold']);
            $productData['count_reviews'] = $this->format_number($productData['count_reviews']);

            $product->update($productData);

            if (!empty($newImages)) {
                $product->images()->createMany($newImages);
            }

            if (!empty($newFeedbacks)) {
                $product->feedbacks()->createMany($newFeedbacks);
            }

            DB::commit();
            return $product;
        } catch (\Exception $e) {
            DB::rollBack();
            throw $e;
        }
    }

    protected function handleDeletedItems(array $data)
    {
        if (!empty($data['deleted_images'])) {
            $deletedImages = json_decode($data['deleted_images'], true);
            if (is_array($deletedImages) && !empty($deletedImages)) {
                $imagesToDelete = Image::whereIn('id', $deletedImages)->get();
                foreach ($imagesToDelete as $image) {
                    Storage::disk('public')->delete($image->path);
                    $image->delete();
                }
            }
        }

        if (!empty($data['deleted_feedbacks'])) {
            $deletedFeedbacks = json_decode($data['deleted_feedbacks'], true);
            if (is_array($deletedFeedbacks) && !empty($deletedFeedbacks)) {
                $feedbacksToDelete = Feedback::whereIn('id', $deletedFeedbacks)->get();
                foreach ($feedbacksToDelete as $feedback) {
                    Storage::disk('public')->delete($feedback->path);
                    $feedback->delete();
                }
            }
        }

        if (!empty($data['deleted_comment_images'])) {
            $deletedCommentImages = json_decode($data['deleted_comment_images'], true);
            if (is_array($deletedCommentImages) && !empty($deletedCommentImages)) {
                $commentImagesToDelete = CommentImage::whereIn('id', $deletedCommentImages)->get();
                foreach ($commentImagesToDelete as $commentImage) {
                    Storage::disk('public')->delete($commentImage->path);
                    $commentImage->delete();
                }
            }
        }
    }

    protected function handleUpdateOptions(Product $product, array $options)
    {
        $product->options()->delete();

        if (!empty($options)) {
            $product->options()->createMany($options);
        }
    }

    protected function handleUpdateComments(Product $product, array $comments)
    {
        $existingCommentIds = $product->comments()->pluck('id')->toArray();
        $updatedCommentIds = [];

        foreach ($comments as $commentIndex => $commentData) {
            $processedComment = [
                'name' => $commentData['name'],
                'option' => $commentData['option'] ?? '',
                'content' => $commentData['content'],
            ];

            if (isset($commentData['avatar']) && $commentData['avatar']) {
                try {
                    $avatarFile = $commentData['avatar'];
                    $avatarPath = $avatarFile->store('comments/avatars', 'public');
                    $processedComment['avatar'] = $avatarPath;
                } catch (\Exception $e) {
                    Log::error("Lỗi khi upload avatar comment {$commentIndex}: " . $e->getMessage());
                }
            }

            if (isset($commentData['id']) && in_array($commentData['id'], $existingCommentIds)) {
                $comment = $product->comments()->find($commentData['id']);

                if (isset($processedComment['avatar']) && $comment->avatar) {
                    Storage::disk('public')->delete($comment->avatar);
                }

                $comment->update($processedComment);
                $updatedCommentIds[] = $commentData['id'];
            } else {
                $comment = $product->comments()->create($processedComment);
                $updatedCommentIds[] = $comment->id;
            }

            if (isset($commentData['images']) && !empty($commentData['images'])) {
                $commentImages = [];
                foreach ($commentData['images'] as $imageIndex => $image) {
                    try {
                        $imagePath = $image->store('comments/images', 'public');
                        $commentImages[] = [
                            'path' => $imagePath
                        ];
                    } catch (\Exception $e) {
                        Log::error("Lỗi khi upload ảnh comment {$commentIndex}-{$imageIndex}: " . $e->getMessage());
                    }
                }

                if (!empty($commentImages)) {
                    $comment->images()->createMany($commentImages);
                }
            }
        }

        $commentsToDelete = array_diff($existingCommentIds, $updatedCommentIds);
        if (!empty($commentsToDelete)) {
            $deletedComments = $product->comments()->whereIn('id', $commentsToDelete)->get();
            foreach ($deletedComments as $deletedComment) {
                if ($deletedComment->avatar) {
                    Storage::disk('public')->delete($deletedComment->avatar);
                }

                foreach ($deletedComment->images as $image) {
                    Storage::disk('public')->delete($image->path);
                }

                $deletedComment->delete();
            }
        }
    }

    public function handleImageUploads($data, $drive = 'products'): array
    {
        $images = [];

        foreach ($data as $image) {
            try {
                $path = $image->store($drive, 'public');

                $images[] = [
                    'path' => $path,
                ];
            } catch (\Exception $e) {
                Log::error('Lỗi khi upload hình ảnh: ' . $e->getMessage());
            }
        }

        return $images;
    }

    public function handleCommentImages($comments): array
    {
        $processedComments = [];

        foreach ($comments as $commentIndex => $commentData) {
            $processedComment = [
                'name' => $commentData['name'],
                'option' => $commentData['option'] ?? '',
                'content' => $commentData['content'],
                'avatar' => null,
                'images' => []
            ];

            if ($commentData['avatar']) {
                try {
                    $avatarFile = $commentData['avatar'];
                    $avatarPath = $avatarFile->store('comments/avatars', 'public');

                    $processedComment['avatar'] = $avatarPath;
                } catch (\Exception $e) {
                    Log::error("Lỗi khi upload avatar comment {$commentIndex}: " . $e->getMessage());
                }
            }

            if ($commentData['images']) {
                foreach ($commentData['images'] as $imageIndex => $image) {
                    try {
                        $imagePath = $image->store('comments/images', 'public');

                        $processedComment['images'][] = [
                            'path' => $imagePath
                        ];
                    } catch (\Exception $e) {
                        Log::error("Lỗi khi upload ảnh comment {$commentIndex}-{$imageIndex}: " . $e->getMessage());
                    }
                }
            }

            $processedComments[] = $processedComment;
        }

        return $processedComments;
    }

    protected function format_number($value)
    {
        return preg_replace('/\D+/', '', $value);
    }

    protected function handleProductImages(Product $product, array $images): void
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
    public function bulkDeleteProducts(array $productIds, bool $force = false): int
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
    public function getSimilarProducts(Product $product, int $limit = 4): Collection
    {
        // Giả sử muốn sản phẩm tương tự dựa trên tên và mức giá tương đương
        return Product::with('images')
            ->where('id', '!=', $product->id)
            ->where(function ($query) use ($product) {
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

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|max:255',
            'name' => 'required|max:255',
            'slug' => 'required|max:255',
            'layout' => 'required',
            'price' => 'required',
            'discount' => 'nullable',
            'sold' => 'required',

            'images' => 'required|array',
            'images.*' => 'file',

            'options' => 'nullable|array',
            'options.*.name' => 'required',
            'name_option' => 'required',

            'comments' => 'nullable|array',
            'comments.*.avatar' => 'required|file',
            'comments.*.name' => 'required',
            'comments.*.option' => 'required',
            'comments.*.content' => 'required',
            'comments.*.images' => 'required|array',
            'comments.*.images.*' => 'file',

            'feedbacks' => 'nullable|array',
            'feedbacks.*' => 'required|file',

            'description' => 'required',
            'pixel_fb' => 'nullable',
            'count_reviews' => 'required',
            'star' => 'required',
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Tiêu đề là bắt buộc.',
            'title.max' => 'Tiêu đề không được vượt quá 255 ký tự.',

            'name.required' => 'Tên là bắt buộc.',
            'name.max' => 'Tên không được vượt quá 255 ký tự.',

            'slug.required' => 'Slug là bắt buộc.',
            'slug.max' => 'Slug không được vượt quá 255 ký tự.',

            'layout.required' => 'Bố cục là bắt buộc.',
            'price.required' => 'Giá là bắt buộc.',
            'sold.required' => 'Số lượng đã bán là bắt buộc.',

            'images.required' => 'Vui lòng chọn ít nhất một hình ảnh.',
            'images.array' => 'Trường hình ảnh phải là một mảng.',
            'images.*.file' => 'Mỗi hình ảnh phải là một tệp hợp lệ.',

            'options.*.name.required' => 'Tên tùy chọn là bắt buộc cho mỗi tùy chọn.',

            'name_option.required' => 'Tên của nhóm tùy chọn là bắt buộc.',

            'comments.*.avatar.required' => 'Ảnh đại diện là bắt buộc cho mỗi bình luận.',
            'comments.*.avatar.file' => 'Ảnh đại diện phải là tệp hợp lệ.',
            'comments.*.name.required' => 'Tên người bình luận là bắt buộc.',
            'comments.*.option.required' => 'Tùy chọn trong bình luận là bắt buộc.',
            'comments.*.content.required' => 'Nội dung bình luận là bắt buộc.',
            'comments.*.images.required' => 'Vui lòng chọn hình ảnh cho mỗi bình luận.',
            'comments.*.images.array' => 'Hình ảnh trong bình luận phải là một mảng.',
            'comments.*.images.*.file' => 'Mỗi hình ảnh trong bình luận phải là tệp hợp lệ.',

            'feedbacks.*.required' => 'Mỗi phản hồi phải là một tệp hợp lệ.',

            'description.required' => 'Mô tả là bắt buộc.',
            'count_reviews.required' => 'Số lượt đánh giá là bắt buộc.',
            'star.required' => 'Số sao là bắt buộc.',
        ];
    }
}

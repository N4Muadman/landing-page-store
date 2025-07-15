<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateProductRequest extends FormRequest
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
            'title' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'slug' => 'required|string|max:255',
            'layout' => 'required|string',
            'price' => 'required|string',
            'discount' => 'required|string',
            'sold' => 'required|string',
            'count_reviews' => 'required|string',
            'star' => 'required|integer|min:1|max:5',
            'description' => 'nullable|string',
            'pixel_fb' => 'nullable|string',
            'name_option' => 'nullable|string',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'feedbacks.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'options.*.name' => 'required|string|max:255',
            'comments.*.id' => 'nullable|integer|exists:comments,id',
            'comments.*.name' => 'required|string|max:255',
            'comments.*.content' => 'required|string',
            'comments.*.option' => 'nullable|string|max:255',
            'comments.*.avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'comments.*.images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'deleted_images' => 'nullable|string',
            'deleted_feedbacks' => 'nullable|string',
            'deleted_comment_images' => 'nullable|string',
        ];
    }
}

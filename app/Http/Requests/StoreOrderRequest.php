<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreOrderRequest extends FormRequest
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
            'product_option_id' => [
                'required',
                'exists:product_options,id'
            ],
            'name' => [
                'required',
                'string',
                'max:255',
                'regex:/^[^\d]+$/u'
            ],
            'phone_number' => [
                'required',
                'string',
                'max:15',
                'regex:/^0[0-9]{9}$/',
            ],
            'address' => [
                'required',
                'string',
                'max:255',
                'not_regex:/[<>]/'
            ],
            'quantity' => [
                'required',
                'integer',
                'min:1',
                'max:1000',
            ]
        ];
    }

    public function messages()
    {
        return [
            'product_option_id.required' => 'Vui lòng chọn phiên bản sản phẩm.',
            'product_option_id.exists'   => 'Phiên bản sản phẩm không hợp lệ.',

            'name.required' => 'Vui lòng nhập họ tên.',
            'name.string'   => 'Tên phải là một chuỗi ký tự.',
            'name.max'      => 'Tên không được vượt quá 255 ký tự.',
            'name.regex'    => 'Tên không được chứa số.',

            'phone_number.required' => 'Vui lòng nhập số điện thoại.',
            'phone_number.string'   => 'Số điện thoại phải là chuỗi.',
            'phone_number.max'      => 'Số điện thoại không được vượt quá 15 ký tự.',
            'phone_number.regex'    => 'Số điện thoại không hợp lệ.',

            'address.required'   => 'Vui lòng nhập địa chỉ giao hàng.',
            'address.string'     => 'Địa chỉ phải là chuỗi ký tự.',
            'address.max'        => 'Địa chỉ không được vượt quá 255 ký tự.',
            'address.not_regex'  => 'Địa chỉ chứa ký tự không hợp lệ.',

            'quantity.required' => 'Vui lòng nhập số lượng.',
            'quantity.integer'  => 'Số lượng phải là một số nguyên.',
            'quantity.min'      => 'Số lượng phải lớn hơn 0.',
            'quantity.max'      => 'Số lượng không được vượt quá 1000.',
        ];
    }
}

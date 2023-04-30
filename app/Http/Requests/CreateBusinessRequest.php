<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateBusinessRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'business_name' => 'required',
            'street_address' => 'required',
            'city' => 'required',
            'country' => 'required',
            'email' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
            'captcha' => 'required|captcha'
        ];
    }
}

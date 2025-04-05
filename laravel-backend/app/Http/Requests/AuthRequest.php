<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthRequest extends FormRequest
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
            //
        ];
    }

    public function authenticate(array $credentials)
    {
        if (!Auth::attempt($credentials)) {
            throw ValidationException::withMessages([
                'username' => trans('auth.failed'),
                'password' => trans('auth.failed'),
            ]);
        }
    }

    public function tokenize()
    {
        $user = $this->user();

        $this->revokeToken();

        return $user->createToken('auth', match ($user->role) {
            'admin' => ['*'],
            default => ['user.regular'] // regular user permissions
        });
    }

    public function revokeToken()
    {
        $this->user()->currentAccessToken()?->delete();
    }
}
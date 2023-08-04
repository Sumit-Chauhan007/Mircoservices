<?php

namespace App\Http\Controllers;

use App\Jobs\PostJob;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;

class ApiController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register','userid']]);
    }
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|string|email|unique:users',
            'password' => 'required|string|confirmed|min:6|'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }
        $user = User::create(
            array_merge(
                $validator->validated(),
                ['password' => bcrypt($request->password)]
            )
        );
        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user
        ], 201);
    }
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:4|'
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        if (!$token = \JWTAuth::attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized access'], 401);
        }
       
        return $this->createNewToken($token);
    }
    public function userid(){
        $user = Auth::user();
        dd($user);
        return response()->json(['id'=>$user]);
    }
    public function logout()
    {
        auth('api')->logout();
        return response()->json([
            'message' => 'User Logout successfully',

        ]);
    }
 public function createNewToken($token)
    {
        PostJob::dispatch($token);
        return response()->json([
            'status' => '200',
            'message' => 'Login Successfull',
            'userName' => auth()->user()->name,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
        ],200);
    }
}

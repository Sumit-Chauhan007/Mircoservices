<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\File;
use App\Jobs\PostJob;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PostController extends Controller
{
    public function postImage(Request $request){
        $image = $request->file('image');
        $name = $request->input('name');
        $title = $request->input('title');
        if ($image) {
            $imagename = time().'.'.$image->getClientOriginalExtension();
            $image->move('../../micro/public/image',$imagename);
        }
        $abc = [
            'image' => $imagename, 
            'name' => $name,
            'title' => $title, 
        ];

      PostJob::dispatch($abc);
        return response()->json([
            'success'=>'right'
        ]);
    }
}

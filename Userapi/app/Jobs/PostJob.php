<?php

namespace App\Jobs;

use App\Models\Post;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class PostJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    private $data;
    /**
     * Create a new job instance.
     */
    public function __construct($data)
    {
        $this->data =$data;
        
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $post  = new Post();
        $post->name = $this->data['name'];
        $post->title = $this->data['title'];
        $post->description = $this->data['image'];
        $post->save();
    }
}

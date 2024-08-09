<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Page;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, Page $page)
    {
        $request->validate([
            'content' => 'required|string|max:5000',
            'name' => 'nullable|string|max:255',
        ]);
    
        $page->comments()->create([
            'content' => $request->input('content'),
            'name' => $request->input('name', 'Anonymous')
        ]);
    
        return redirect()->back();
    }

    public function destroy(Comment $comment)
    {
        if (auth()->check()) {
            $comment->delete();
            return redirect()->back()->with('message', 'Comment deleted successfully.');
        }
    
        return redirect()->back()->with('error', 'Unauthorized action.');
    }
}

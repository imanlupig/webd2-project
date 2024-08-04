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
            'name' => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        $page->comments()->create($request->only('name', 'content'));

        return redirect()->route('guest.pages.show', $page->id)->with('success', 'Comment added successfully!');
    }
}

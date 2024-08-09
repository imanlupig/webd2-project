<?php

namespace App\Http\Controllers;

use App\Models\Page;
use App\Models\Image;
use Illuminate\Http\Request;
use Inertia\Inertia;
use HTMLPurifier;
use HTMLPurifier_Config;

class PageController extends Controller
{
    public function index(Request $request)
    {
        $sortBy = $request->input('sort', 'created_at');
        $sortOrder = $request->input('order', 'desc');

        $pages = Page::orderBy($sortBy, $sortOrder)->get();

        return Inertia::render('Pages/Index', [
            'pages' => $pages,
            'currentSort' => $sortBy,
            'currentOrder' => $sortOrder
        ]);
    }

    public function create()
    {
        return Inertia::render('Pages/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $config = HTMLPurifier_Config::createDefault();
        $purifier = new HTMLPurifier($config);
        $cleanHtml = $purifier->purify($request->input('content'));

        $page = Page::create([
            'title' => htmlspecialchars($request->input('title'), ENT_QUOTES, 'UTF-8'),
            'content' => $cleanHtml,
        ]);

        if ($request->hasFile('image')) {
            $imageFile = $request->file('image');
            $filename = time() . '.' . $imageFile->getClientOriginalExtension();

            $imageFile->move(public_path('uploads/images'), $filename);

            Image::create([
                'filename' => htmlspecialchars($filename, ENT_QUOTES, 'UTF-8'),
                'page_id' => $page->id,
            ]);
        }

        return redirect()->route('pages.index')->with('success', 'Page created successfully.');
    }

    public function edit($id)
    {
        $page = Page::with('image')->findOrFail($id);
        return Inertia::render('Pages/Edit', ['page' => $page]);
    }

    public function show(Page $page)
    {
        $comments = $page->comments()->latest()->get();
        $image = $page->image ? $page->image->filename : null;

        return Inertia::render('Pages/Show', [
            'page' => $page,
            'comments' => $comments,
            'imageUrl' => $image
        ]);
    }

    public function update(Request $request, Page $page)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        $cleanHtml = (new HTMLPurifier(HTMLPurifier_Config::createDefault()))->purify($request->input('content'));

        $page->update([
            'title' => htmlspecialchars($request->input('title'), ENT_QUOTES, 'UTF-8'),
            'content' => $cleanHtml,
        ]);

        if ($request->hasFile('image')) {
            if ($page->image) {
                $oldFilePath = public_path('uploads/images/' . $page->image->filename);
                if (file_exists($oldFilePath)) {
                    unlink($oldFilePath);
                }
                $page->image->delete();
            }

            $imageFile = $request->file('image');
            $filename = time() . '.' . $imageFile->getClientOriginalExtension();
            $imageFile->move(public_path('uploads/images'), $filename);

            Image::create([
                'filename' => htmlspecialchars($filename, ENT_QUOTES, 'UTF-8'),
                'page_id' => $page->id,
            ]);
        }

        return redirect()->route('pages.index')->with('success', 'Page updated successfully.');
    }

    public function destroy(Page $page)
    {
        if ($page->image) {
            $filePath = public_path('uploads/images/' . $page->image->filename);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
            $page->image->delete();
        }

        $page->delete();

        return redirect()->route('pages.index')->with('success', 'Page deleted successfully.');
    }

    public function guestIndex()
    {
        $pages = Page::all();
        return Inertia::render('Guest/Pages/Index', ['pages' => $pages]);
    }

    public function guestShow(Page $page)
    {
        $comments = $page->comments()->orderBy('created_at', 'desc')->get();
        $image = $page->image ? $page->image->filename : null;

        return Inertia::render('Guest/Pages/Show', [
            'page' => $page,
            'comments' => $comments,
            'imageUrl' => $image
        ]);
    }

    public function storeComment(Request $request, Page $page)
    {
        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'content' => 'required|string',
        ]);

        $config = HTMLPurifier_Config::createDefault();
        $purifier = new HTMLPurifier($config);
        $cleanContent = $purifier->purify($validated['content']);

        $page->comments()->create([
            'name' => htmlspecialchars($validated['name'] ?? 'Anonymous', ENT_QUOTES, 'UTF-8'),
            'content' => $cleanContent,
        ]);

        return redirect()->route('guest.pages.show', $page);
    }

    public function deleteImage(Request $request, Page $page)
    {
        $image = Image::where('page_id', $page->id)->first();

        if ($image) {
            $filePath = public_path('uploads/images/' . $image->filename);
            if (file_exists($filePath)) {
                unlink($filePath);
            }

            $image->delete();
        }

        return redirect()->route('pages.edit', $page->id)->with('success', 'Image deleted successfully.');
    }
}

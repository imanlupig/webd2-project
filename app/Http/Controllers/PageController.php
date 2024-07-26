<?php
namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
        ]);

        Page::create($request->all());

        return redirect()->route('pages.index');
    }

    public function edit($id)
    {
        $page = Page::findOrFail($id);
        return Inertia::render('Pages/Edit', ['page' => $page]);
    }

    public function show(Page $page)
    {
        return Inertia::render('Pages/Show', ['page' => $page]);
    }
    
    public function update(Request $request, $id)
    {
        $page = Page::findOrFail($id);
    
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'required|string',
        ]);
    
        $page->update($request->all());
    
        return redirect()->route('pages.index');
    }

    public function destroy(Page $page)
    {
        $page->delete();

        return redirect()->route('pages.index')->with('success', 'Page deleted successfully.');
    }

}

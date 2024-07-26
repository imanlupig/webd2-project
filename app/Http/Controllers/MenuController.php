<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function create()
    {
        return Inertia::render('Menu/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
        ]);
        
        Menu::create($request->all());

        return redirect(route('menu.index'));
    }

    public function index()
    {
        $menuItems = Menu::all();
        return Inertia::render('Menu/Index', ['menuItems' => $menuItems]);
    }
}


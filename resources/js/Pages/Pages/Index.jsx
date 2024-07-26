import React, { useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const Index = () => {
    const { pages, currentSort, currentOrder } = usePage().props;

    const [sortBy, setSortBy] = useState(currentSort);
    const [order, setOrder] = useState(currentOrder);
    const handleSortChange = (newSortBy) => {
        const newOrder = (sortBy === newSortBy && order === 'asc') ? 'desc' : 'asc';
        setSortBy(newSortBy);
        setOrder(newOrder);
        window.location.href = `${route('pages.index')}?sort=${newSortBy}&order=${newOrder}`;
    };

    const { delete: destroy } = useForm();
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this page?")) {
            destroy(route('pages.destroy', id), {
                method: 'DELETE',
            });
        }
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Pages</h1>
            <Link href={route('pages.create')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4">Create New Page</Link>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <button onClick={() => handleSortChange('title')}>
                                    Title {sortBy === 'title' && (order === 'asc' ? '↑' : '↓')}
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <button onClick={() => handleSortChange('created_at')}>
                                    Created At {sortBy === 'created_at' && (order === 'asc' ? '↑' : '↓')}
                                </button>
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                <button onClick={() => handleSortChange('updated_at')}>
                                    Updated At {sortBy === 'updated_at' && (order === 'asc' ? '↑' : '↓')}
                                </button>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {pages.map(page => (
                            <tr key={page.id}>
                                <td className="px-6 py-4 whitespace-nowrap">{page.title}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(page.created_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(page.updated_at).toLocaleDateString()}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Link href={route('pages.show', page.id)} className="text-indigo-600 hover:text-indigo-900">View</Link>
                                    <Link href={route('pages.edit', page.id)} className="text-indigo-600 hover:text-indigo-900 ml-4">Edit</Link>
                                    <button onClick={() => handleDelete(page.id)} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </MainLayout>
        
    );
};

export default Index;

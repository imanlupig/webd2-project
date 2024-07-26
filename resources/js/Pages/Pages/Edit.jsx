import React, { useEffect } from 'react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const Edit = ({ page }) => {
    const { data, setData, put, errors } = useForm({
        title: page.title,
        content: page.content,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('pages.update', page.id));
    };

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-2xl font-bold mb-6">Edit Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        ></textarea>
                        {errors.content && <span className="text-red-500 text-sm">{errors.content}</span>}
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Update
                    </button>
                </form>
            </div>
        </MainLayout>
    );
};

export default Edit;

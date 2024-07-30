import React, { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles

const Edit = () => {
    const { page } = usePage().props;
    const { data, setData, put, processing, errors } = useForm({
        title: page.title || '',
        content: page.content || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('pages.update', page.id));
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Edit Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData('title', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                    />
                    {errors.title && <div className="text-red-600">{errors.title}</div>}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Content</label>
                    <Quill
                        value={data.content}
                        onChange={(value) => setData('content', value)}
                    />
                    {errors.content && <div className="text-red-600">{errors.content}</div>}
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </form>
        </div>
    );
};

export default Edit;

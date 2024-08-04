import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

const Show = ({ page, comments }) => {
    const { data, setData, post, reset, errors } = useForm({
        name: '',
        content: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('comments.store', page.id), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <GuestLayout>
            <div className="max-w-2xl mx-auto py-6 px-4">
            <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
            <div className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />

            <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Comments</h2>
                <ul className="space-y-4">
                    {comments.map(comment => (
                        <li key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                            <div className="flex items-center mb-2">
                                <strong className="text-lg">{comment.name || 'Anonymous'}</strong>
                                <span className="text-sm text-gray-500 ml-2">{new Date(comment.created_at).toLocaleDateString()}</span>
                            </div>
                            <p>{comment.content}</p>
                        </li>
                    ))}
                </ul>
            </section>

            <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">Leave a Comment</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.name && <p className="text-red-600 text-sm mt-2">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Comment</label>
                        <textarea
                            name="content"
                            id="content"
                            rows="4"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors.content && <p className="text-red-600 text-sm mt-2">{errors.content}</p>}
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Submit
                    </button>
                </form>
            </section>
        </div>
    </GuestLayout>
        
    );
};

export default Show;

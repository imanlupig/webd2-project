import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

const Index = () => {
    const { pages } = usePage().props;

    return (
        <GuestLayout>
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-2xl font-bold mb-6">Available Posts</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pages.map(page => (
                                <tr key={page.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{page.title}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(page.created_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{new Date(page.updated_at).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <Link href={route('guest.pages.show', page.id)} className="text-indigo-600 hover:text-indigo-900">View</Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </GuestLayout>
    );
};

export default Index;

import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';

const Show = ({ page }) => {
    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-2xl font-bold mb-6">{page.title}</h1>
                <p>{page.content}</p>
                <Link href={route('pages.index')} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mt-4">
                    Back to Posts
                </Link>
            </div>
        </MainLayout>
    );
};

export default Show;

import React from 'react';
import { usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { Link } from '@inertiajs/react';


const Show = () => {
    const { page } = usePage().props;

    return (
        <MainLayout>
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-2xl font-bold mb-6">{page.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
            </div>
        </MainLayout>
    );
};

export default Show;

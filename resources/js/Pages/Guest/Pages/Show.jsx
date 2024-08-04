import React from 'react';
import { usePage } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

const Show = () => {
    const { page } = usePage().props;

    return (
        <GuestLayout>
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-2xl font-bold mb-6">{page.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: page.content }}></div>
            </div>
        </GuestLayout>
    );
};

export default Show;

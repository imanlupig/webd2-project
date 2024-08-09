import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import AuthCommentSection from '@/Components/AuthCommentSection';

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
            <AuthCommentSection/>
            </div>
    </GuestLayout>
        
    );
};

export default Show;

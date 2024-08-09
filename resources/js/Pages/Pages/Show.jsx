import React from 'react';
import AuthCommentSection from '@/Components/AuthCommentSection';
import PageImage from '@/Components/PageImage';
import MainLayout from '@/Layouts/MainLayout';

const Show = ({ page, imageUrl }) => {

    return (
        <MainLayout>
            <div className="max-w-2xl mx-auto py-6 px-4">
                <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
                <div className="prose" dangerouslySetInnerHTML={{ __html: page.content }} />
                <PageImage imageUrl={imageUrl} />
                <AuthCommentSection />
            </div>
        </MainLayout>
    );
};

export default Show;

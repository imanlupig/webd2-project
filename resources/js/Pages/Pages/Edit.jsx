import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import MainLayout from '@/Layouts/MainLayout';

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

    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['clean']
        ],
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike'
    ];

    return (
        <MainLayout>
            <div className="container mt-5">
                <h1 className="text-3xl font-bold mb-6">Edit Page</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-brown-700">Title</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className="mt-1 block w-full border border-brown-300 rounded-md shadow-sm p-2"
                        />
                        {errors.title && <div className="text-red-600 mt-1">{errors.title}</div>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-brown-700">Content</label>
                        <Quill
                            value={data.content}
                            onChange={(value) => setData('content', value)}
                            modules={modules}
                            formats={formats}
                           className="quill-editor"
                        />
                        {errors.content && <div className="text-red-600 mt-1">{errors.content}</div>}
                    </div>
                    
                    <button
                        type="submit"
                        disabled={processing}
                        className="inline-flex items-center px-4 py-2 border border-light-brown text-sm font-medium rounded-md text-light-brown bg-white hover:bg-light-brown hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-brown"
                    >
                        Save
                    </button>
                </form>
            </div>
        </MainLayout>
    );
};

export default Edit;

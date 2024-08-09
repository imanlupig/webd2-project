import React from 'react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout'; 
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const Create = () => {
    const { data, setData, post, errors } = useForm({
        title: '',
        content: '',
        image: null,  // Add image to form data
    });

    const handleChange = (e) => {
        const { name, type, files } = e.target;
        if (type === 'file') {
            setData(name, files[0]);  // Update image in form data
        } else {
            setData(name, e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('content', data.content);
        if (data.image) {
            formData.append('image', data.image);
        }

        post(route('pages.store'), {
            forceFormData: true,
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    const modules = {
        toolbar: [
            [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
            [{size: []}],
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
            <div className="max-w-4xl mx-auto py-10">
                <h1 className="text-2xl font-bold mb-6">Create Page</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        />
                        {errors.title && <span className="text-red-500 text-sm">{errors.title}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <Quill
                            value={data.content}
                            onChange={(value) => setData('content', value)}
                            modules={modules}
                            formats={formats}
                        />
                        {errors.content && <span className="text-red-500 text-sm">{errors.content}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Image (optional)</label>
                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={handleChange}
                            className="mt-1 block w-full text-gray-500"
                        />
                        {errors.image && <span className="text-red-500 text-sm">{errors.image}</span>}
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Save
                    </button>
                </form>
            </div>
        </MainLayout>
    );
};

export default Create;

import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout'; 
import Quill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const Create = () => {
    const { data, setData, post, errors } = useForm({
        title: '',
        content: '',
        image: null, 
    });

    const [preview, setPreview] = useState(null);

    const handleChange = (e) => {
        const { name, type, files } = e.target;
        if (type === 'file') {
            setData(name, files[0]); 
            setPreview(URL.createObjectURL(files[0]));
        } else {
            setData(name, e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('pages.store'), {
            data: {
                ...data,
                _method: 'post',
            },
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    const modules = {
        toolbar: [
            [{ 'font': [] }],
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
            <div className="max-w-4xl mx-auto py-10 bg-light-brown p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold mb-6 text-dark-brown">Create Page</h1>
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-dark-brown">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={data.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-light-brown rounded-md shadow-sm focus:border-dark-brown focus:ring focus:ring-dark-brown focus:ring-opacity-50"
                        />
                        {errors.title && <span className="text-red-600 text-sm">{errors.title}</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-dark-brown">Content</label>
                        <Quill
                            value={data.content}
                            onChange={(value) => setData('content', value)}
                            modules={modules}
                            formats={formats}
                            className="quill-editor"
                        />
                        {errors.content && <span className="text-red-600 text-sm">{errors.content}</span>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-dark-brown">Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={handleChange}
                            className="mt-1 block w-full border border-light-brown rounded-md"
                        />
                        {preview && (
                            <img src={preview} alt="Preview" className="mt-2 max-w-xs border border-light-brown rounded-md" />
                        )}
                        {errors.image && <span className="text-red-600 text-sm">{errors.image}</span>}
                    </div>
                    <button
                        type="submit"
                        className="inline-flex items-center px-4 py-2 border border-light-brown text-sm font-medium rounded-md text-light-brown bg-white hover:bg-light-brown hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-brown"
                    >
                        Save
                    </button>
                </form>
            </div>
        </MainLayout>
    );
};

export default Create;

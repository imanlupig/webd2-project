import React from 'react';
import { Link, useForm } from '@inertiajs/react';

const Index = ({ comments }) => {
    const { delete: deleteComment, post } = useForm();

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            deleteComment(route('comments.destroy', id));
        }
    };

    const handleToggleVisibility = (id) => {
        post(route('comments.toggleVisibility', id));
    };

    return (
        <div className="max-w-4xl mx-auto py-10">
            <h1 className="text-2xl font-bold mb-6">Comments</h1>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {comments.map(comment => (
                        <tr key={comment.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{comment.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{comment.content}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button onClick={() => handleToggleVisibility(comment.id)} className="text-blue-600 hover:text-blue-900">
                                    {comment.is_visible ? 'Hide' : 'Show'}
                                </button>
                                <button onClick={() => handleDelete(comment.id)} className="text-red-600 hover:text-red-900 ml-4">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;

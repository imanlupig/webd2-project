import React from 'react';
import { usePage, useForm } from '@inertiajs/react';

const AuthCommentSection = ({ pageId }) => {
    const { comments } = usePage().props;
    const { delete: destroy } = useForm();

    const handleDelete = (commentId) => {
        if (confirm('Are you sure you want to delete this comment?')) {
            destroy(route('comments.destroy', commentId), {
                onSuccess: () => {
                    console.log('Comment deleted successfully');
                },
                onError: (error) => {
                    console.error('Failed to delete comment:', error);
                },
            });
        }
    };

    return (
        <div className="comment-section">
            <h3 className="text-xl font-semibold">Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="border-b py-2">
                        <p>{comment.content}</p>
                        <small>by {comment.name} on {new Date(comment.created_at).toLocaleString()}</small>

                        <button onClick={() => handleDelete(comment.id)} className="text-red-600 hover:text-red-900 ml-4">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AuthCommentSection;

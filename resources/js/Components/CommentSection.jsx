import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

const CommentSection = ({ pageId }) => {
    const { comments } = usePage().props;
    const { data, setData, post, errors } = useForm({
        page_id: pageId,
        content: '',
        name: '',
    });

    function handleSubmit(event){
        event.preventDefault();
        post(route('comments.store',  { page: pageId }));
    }

    return (
        <div className="comment-section">
            <h3 className="text-xl font-semibold">Comments</h3>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id} className="border-b py-2">
                        <p>{comment.content}</p>
                        <small>by {comment.name} on {new Date(comment.created_at).toLocaleString()}</small>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className="mt-4">
                <textarea
                    value={data.content}
                    onChange={(e) => setData('content', e.target.value)}
                    className="w-full border rounded p-2"
                    placeholder="Add your comment..."
                />
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    placeholder="Your Name (optional)"
                    className="w-full border rounded p-2 mt-2"
                />
                <button onClick={handleSubmit} className="bg-blue-500 text-white rounded px-4 py-2 mt-2">
                    Submit
                </button>
            </form>

            {errors.content && <p className="text-red-500">{errors.content}</p>}
            {errors.page_id && <p className="text-red-500">{errors.page_id}</p>}
        </div>
    );
};

export default CommentSection;

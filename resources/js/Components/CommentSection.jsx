import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';

const CommentSection = () => {
    const { page, comments } = usePage().props;
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!newComment.trim()) {
            alert('Comment cannot be empty');
            return;
        }

        fetch(`/pages/${page.id}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({ content: newComment, name }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(() => {
            // Reload comments or update state
            setNewComment('');
            setName('');
            // Optionally, you can fetch comments again or use a WebSocket
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">{page.title}</h1>
            <div className="content mb-4" dangerouslySetInnerHTML={{ __html: page.content }}></div>

            <h2 className="text-xl font-bold mb-4">Comments</h2>

            <form onSubmit={handleSubmit} className="mb-4">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Write your comment here..."
                ></textarea>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md mt-2"
                    placeholder="Your name (optional)"
                />
                <button type="submit" className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md">Submit</button>
            </form>

            <div>
                {comments.length === 0 ? (
                    <p>No comments yet.</p>
                ) : (
                    comments.map(comment => (
                        <div key={comment.id} className="border-t border-gray-200 pt-2">
                            <p><strong>{comment.name || 'Anonymous'}:</strong> {comment.content}</p>
                            <p className="text-gray-500 text-sm">{new Date(comment.created_at).toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CommentSection;

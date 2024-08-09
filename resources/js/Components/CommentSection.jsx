import React from 'react';
import { useForm, usePage } from '@inertiajs/react';

const CommentSection = ({ pageId }) => {
    const { comments } = usePage().props;
    const { data, setData, post, reset, errors } = useForm({
        page_id: pageId,
        content: '',
        name: '',
    });

    function handleSubmit(event) {
        event.preventDefault();
        post(route('comments.store', { page: pageId }), {
            onSuccess: () => {
                reset();
            },
        });
    }

    return (
        <div className="bg-light p-4 rounded shadow-sm">
            <h3 className="text-dark mb-4">Comments</h3>
            <ul className="list-unstyled">
                {comments.map((comment) => (
                    <li key={comment.id} className="border-bottom py-3">
                        <p>{comment.content}</p>
                        <small className="text-muted">
                            by {comment.name ? comment.name : 'Anonymous'} on {new Date(comment.created_at).toLocaleString()}
                        </small>
                    </li>
                ))}
            </ul>

            <form className="mt-4" onSubmit={handleSubmit}>
                <div className="form-group">
                    <textarea
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        className="form-control border-dark"
                        placeholder="Add a comment..."
                        rows="4"
                    />
                </div>
                <div className="form-group mt-2">
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        placeholder="Your Name (optional)"
                        className="form-control border-dark"
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-dark mt-2"
                >
                    Submit
                </button>
            </form>

            {errors.content && <div className="text-danger mt-2">{errors.content}</div>}
            {errors.page_id && <div className="text-danger mt-2">{errors.page_id}</div>}
        </div>
    );
};

export default CommentSection;

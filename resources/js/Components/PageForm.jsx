import { Inertia } from '@inertiajs/inertia';

const PageForm = ({ onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        Inertia.post('/pages', { title, content }, {
            onSuccess: () => {
                setTitle('');
                setContent('');
                onClose();
                onSave(); // Call the onSave callback if necessary
            },
            onError: (errors) => {
                console.error('Form submission errors:', errors);
            }
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Create Page</button>
        </form>
    );
};
export default PageForm;

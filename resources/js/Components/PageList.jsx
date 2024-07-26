import React, { useEffect, useState } from 'react';

const PageList = () => {
    const [pages, setPages] = useState([]);
    const [sortKey, setSortKey] = useState('title');

    useEffect(() => {
        fetch('/api/pages')
            .then(response => response.json())
            .then(data => setPages(data))
            .catch(error => console.error('Error fetching pages:', error));
    }, []);

    const sortPages = (key) => {
        setSortKey(key);
        setPages([...pages].sort((a, b) => a[key].localeCompare(b[key])));
    };

    const deletePage = (id) => {
        fetch(`/api/pages/${id}`, {
            method: 'DELETE',
        })
            .then(() => setPages(pages.filter(page => page.id !== id)))
            .catch(error => console.error('Error deleting page:', error));
    };

    return (
        <div>
            <h1>Pages</h1>
            <button onClick={() => sortPages('title')}>Sort by Title</button>
            <button onClick={() => sortPages('created_at')}>Sort by Created Date</button>
            <button onClick={() => sortPages('updated_at')}>Sort by Updated Date</button>
            <ul>
                {pages.map(page => (
                    <li key={page.id}>
                        {page.title}
                        <button onClick={() => deletePage(page.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PageList;

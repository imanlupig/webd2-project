import React, { useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const Index = () => {
    const { pages, currentSort, currentOrder } = usePage().props;

    const [sortBy, setSortBy] = useState(currentSort);
    const [order, setOrder] = useState(currentOrder);

    const handleSortChange = (newSortBy) => {
        const newOrder = (sortBy === newSortBy && order === 'asc') ? 'desc' : 'asc';
        setSortBy(newSortBy);
        setOrder(newOrder);
        window.location.href = `${route('pages.index')}?sort=${newSortBy}&order=${newOrder}`;
    };

    const { delete: destroy } = useForm();
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this page?")) {
            destroy(route('pages.destroy', id), {
                method: 'DELETE',
            });
        }
    };

    return (
        <MainLayout>
            <div className="container mt-5">
                <h1 className="mb-4">Pages</h1>
                <Link
                    href={route('pages.create')}
                    className="btn btn-primary mb-4"
                >
                    Create New Page
                </Link>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>
                                    <button onClick={() => handleSortChange('title')}>
                                        Title {sortBy === 'title' && (order === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th>
                                    <button onClick={() => handleSortChange('created_at')}>
                                        Created At {sortBy === 'created_at' && (order === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th>
                                    <button onClick={() => handleSortChange('updated_at')}>
                                        Updated At {sortBy === 'updated_at' && (order === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pages.map(page => (
                                <tr key={page.id}>
                                    <td>{page.title}</td>
                                    <td>{new Date(page.created_at).toLocaleDateString()}</td>
                                    <td>{new Date(page.updated_at).toLocaleDateString()}</td>
                                    <td>
                                        <Link
                                            href={route('pages.show', page.id)}
                                            className="btn btn-secondary btn-sm me-2"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route('pages.edit', page.id)}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(page.id)}
                                            className="btn btn-danger btn-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </MainLayout>
    );
};

export default Index;

import React, { useState } from 'react';
import { Link, usePage, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

const UserIndex = () => {
    const { users, currentSort, currentOrder } = usePage().props;

    const [sortBy, setSortBy] = useState(currentSort);
    const [order, setOrder] = useState(currentOrder);

    const handleSortChange = (newSortBy) => {
        const newOrder = (sortBy === newSortBy && order === 'asc') ? 'desc' : 'asc';
        setSortBy(newSortBy);
        setOrder(newOrder);
        window.location.href = `${route('users.index')}?sort=${newSortBy}&order=${newOrder}`;
    };

    const { delete: destroy } = useForm();
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this user?")) {
            destroy(route('users.destroy', id), {
                method: 'DELETE',
            });
        }
    };

    return (
        <MainLayout>
            <div className="container mt-5">
                <h1 className="mb-4">User Management</h1>
                <Link
                    href={route('users.create')}
                    className="btn btn-primary mb-4"
                >
                    Add New User
                </Link>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>
                                    <button onClick={() => handleSortChange('name')}>
                                        Name {sortBy === 'name' && (order === 'asc' ? '↑' : '↓')}
                                    </button>
                                </th>
                                <th>
                                    <button onClick={() => handleSortChange('email')}>
                                        Email {sortBy === 'email' && (order === 'asc' ? '↑' : '↓')}
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
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td>{new Date(user.updated_at).toLocaleDateString()}</td>
                                    <td>
                                        <Link
                                            href={route('users.edit', user.id)}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(user.id)}
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

export default UserIndex;

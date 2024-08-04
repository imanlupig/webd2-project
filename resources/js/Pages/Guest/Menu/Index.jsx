import React from 'react';


export default function Index({ menuItems }) {
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-6">Menu Items</h1>
            <ul className="mt-6">
                {menuItems.map(item => (
                    <li key={item.id} className="mb-4 p-4 bg-gray-100 rounded-lg">
                        <h2 className="text-xl font-bold">{item.name}</h2>
                        <p className="text-gray-700">{item.description}</p>
                        <p className="text-gray-900">${item.price}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

import React from 'react';
import { Link } from '@inertiajs/react';

const GuestLayout = ({ children }) => {
    return (
        <div>
            <nav className="bg-gray-800 p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-white text-lg font-bold"><Link href={route('guest.pages.index')}>Kape Guest</Link></div>
                    <div>
                        <Link href="/login" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Login</Link>
                        <Link href="/register" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Register</Link>
                        <Link href="/menu" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Menu</Link>
                    </div>
                </div>
            </nav>
            <div className="py-10">
                {children}
            </div>
        </div>
    );
};

export default GuestLayout;

import React from 'react';
import { Link } from '@inertiajs/react';

const GuestLayout = ({ children }) => {
    return (
        <div>
            <nav style={{ backgroundColor: '#FFFDD0' }} className="p-4 shadow-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/">
                        <img 
                            src='/storage/images/Logo.png'
                            alt="Logo" 
                            className="h-8 w-auto object-contain" 
                        />
                    </Link>
                    <div className="flex space-x-4">
                        <Link 
                            href="/login" 
                            className="text-brown-700 hover:bg-brown-200 hover:text-brown-900 px-3 py-2 rounded-md text-sm font-medium"
                            style={{ textDecoration: 'none', color: 'brown' }} 
                        >
                            Login
                        </Link>
                        <Link 
                            href="/register" 
                            className="text-brown-700 hover:bg-brown-200 hover:text-brown-900 px-3 py-2 rounded-md text-sm font-medium"
                            style={{ textDecoration: 'none', color: 'brown' }} 
                        >
                            Register
                        </Link>
                        <Link 
                            href="/menu" 
                            className="text-brown-700 hover:bg-brown-200 hover:text-brown-900 px-3 py-2 rounded-md text-sm font-medium"
                            style={{ textDecoration: 'none', color: 'brown' }} 
                        >
                            Menu
                        </Link>
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

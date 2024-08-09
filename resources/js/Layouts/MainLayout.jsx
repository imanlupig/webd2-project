import React from 'react';
import { Link } from '@inertiajs/react';

const MainLayout = ({ children }) => {
    return (
        <div>
            <header className="bg-light p-4 shadow-sm">
                <div className="container mx-auto">
                    <nav className="d-flex justify-content-between align-items-center">
                        <div>
                            <Link href="/">
                                <img 
                                    src='/storage/images/Logo.png'
                                    alt="Logo" 
                                    className="h-8 w-auto object-contain" 
                                />
                            </Link>
                        </div>
                        <div>
                            <Link href="/pages" className="text-dark mx-2">Posts</Link>
                            <Link href="/menu" className="text-dark mx-2">Menu</Link>
                            <Link href="/menu/create" className="text-dark mx-2">Create Item</Link>
                            <Link href="/users" className="text-dark mx-2">Users</Link>
                        </div>
                    </nav>
                </div>
            </header>
            <main>
                {children}
            </main>
            {/* <footer className="bg-light p-4 text-dark text-center mt-4">
                © 2024 MyApp
            </footer> */}
        </div>
    );
};

export default MainLayout;

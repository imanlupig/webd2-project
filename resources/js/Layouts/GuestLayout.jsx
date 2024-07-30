import React from 'react';

const GuestLayout = ({ children }) => {
    return (
        <div>
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-xl">Guest Header</h1>
                <nav>
                    <a href="/" className="mr-4">Home</a>
                    <a href="/login">Login</a>
                </nav>
            </header>
            <main className="p-4">
                {children}
            </main>
        </div>
    );
};

export default GuestLayout;

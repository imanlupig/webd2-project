import React from 'react';

const PageImage = ({ imageUrl }) => {
    if (!imageUrl) return null;

    const imagePath = `/uploads/images/${imageUrl}`;

    return (
        <div className="my-4">
            <img src={imagePath} alt="Page Image" className="w-full h-auto" />
        </div>
    );
};

export default PageImage;

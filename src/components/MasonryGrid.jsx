import React from 'react';
import './MasonryGrid.css';

const MasonryGrid = ({ children }) => {
    return (
        <div className="masonry-grid">
            {children}
        </div>
    );
};

export default MasonryGrid;

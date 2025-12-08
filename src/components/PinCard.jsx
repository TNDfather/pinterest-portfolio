import React from 'react';
import { MoreHorizontal, Share2 } from 'lucide-react';
import './PinCard.css';

const PinCard = ({ image, title, description, author, onClick }) => {
    return (
        <div className="pin-card" onClick={onClick}>
            <div className="pin-image-wrapper">
                <img src={image} alt={title} className="pin-image" />
                <div className="pin-overlay">
                    <button className="save-btn" onClick={(e) => e.stopPropagation()}>Save</button>
                    <div className="overlay-actions">
                        <button className="icon-btn-sm" onClick={(e) => e.stopPropagation()}><Share2 size={16} /></button>
                        <button className="icon-btn-sm" onClick={(e) => e.stopPropagation()}><MoreHorizontal size={16} /></button>
                    </div>
                </div>
            </div>
            <div className="pin-info">
                <h3 className="pin-title">{title}</h3>
                {description && <p className="pin-desc">{description}</p>}
                {author && (
                    <div className="pin-author">
                        <div className="author-avatar">{author[0]}</div>
                        <span className="author-name">{author}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PinCard;

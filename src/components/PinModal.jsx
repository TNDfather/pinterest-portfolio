import React, { useEffect } from 'react';
import { X, MoreHorizontal, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import './PinModal.css';

const PinModal = ({ pin, onClose, onNext, onPrev }) => {
    if (!pin) return null;

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <button className="nav-arrow-btn prev" onClick={(e) => { e.stopPropagation(); onPrev(); }}>
                <ChevronLeft size={48} />
            </button>
            <button className="nav-arrow-btn next" onClick={(e) => { e.stopPropagation(); onNext(); }}>
                <ChevronRight size={48} />
            </button>

            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn-mobile" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="modal-content">
                    <div className="modal-image-section">
                        <img src={pin.image} alt={pin.title} className="modal-image" referrerPolicy="no-referrer" />
                    </div>

                    <div className="modal-info-section">
                        <div className="modal-header">
                            <div className="modal-actions">
                                <button className="icon-btn"><MoreHorizontal size={20} /></button>
                                <button className="icon-btn"><Share2 size={20} /></button>
                            </div>
                            <button className="save-btn">Save</button>
                        </div>

                        <div className="modal-body">
                            <h1 className="modal-title">{pin.title}</h1>
                            <p className="modal-description">{pin.description}</p>

                            <div className="modal-author">
                                <div className="author-avatar-lg">{pin.author[0]}</div>
                                <div className="author-details">
                                    <span className="author-name-lg">{pin.author}</span>
                                    <span className="author-followers">Followers</span>
                                </div>
                                <button className="follow-btn">Follow</button>
                            </div>
                        </div>

                        <div className="modal-comments">
                            <h3>Comments</h3>
                            <p className="no-comments">No comments yet! Add one to start the conversation.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PinModal;

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './PdfModal.css';

const PdfModal = ({ pdfUrl, onClose }) => {
    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="pdf-modal-overlay" onClick={onClose}>
            <div className="pdf-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn-mobile" onClick={onClose}>
                    <X size={24} />
                </button>
                <div className="pdf-modal-content">
                    <iframe
                        src={pdfUrl}
                        title="Profile PDF"
                        width="100%"
                        height="100%"
                        style={{ border: 'none' }}
                        allow="autoplay"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default PdfModal;

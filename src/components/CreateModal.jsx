import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import './CreateModal.css';

const AUTHORS = ['ELAND', 'HOMEPLUS', 'MODERN HOUSE'];
const PARTS = ['AI', 'GRAPHIC', 'PACKAGE', 'PHOTOGRAPHY', 'VMD', 'COMMERCIAL FILM'];

const CreateModal = ({ onClose, onCreate }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        thumbnail: '',
        image: '',
        author: AUTHORS[0],
        part: PARTS[0]
    });

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onCreate(formData);
        onClose();
    };

    return (
        <div className="create-modal-overlay" onClick={onClose}>
            <div className="create-modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn-mobile" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="create-modal-header">
                    <h2>Create Pin</h2>
                </div>

                <form className="create-modal-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Add a title"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Add a detailed description"
                            rows={3}
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Thumbnail URL</label>
                            <input
                                type="url"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                placeholder="https://..."
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Image URL</label>
                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="https://..."
                                required
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Author</label>
                            <select name="author" value={formData.author} onChange={handleChange}>
                                {AUTHORS.map(author => (
                                    <option key={author} value={author}>{author}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Part</label>
                            <select name="part" value={formData.part} onChange={handleChange}>
                                {PARTS.map(part => (
                                    <option key={part} value={part}>{part}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
                        <button type="submit" className="submit-btn">Create</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateModal;

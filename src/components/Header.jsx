import React, { useState } from 'react';
import { Search, Bell, MessageSquare, User, ChevronDown } from 'lucide-react';
import './Header.css';

const COMPANIES = ['All', 'HOMEPLUS', 'ELAND', 'MODERN HOUSE', 'CF Production'];
const PARTS = ['All', 'AI', 'BRANDING', 'GRAPHIC', 'PACKAGE', 'PHOTOGRAPHY', 'VMD', 'COMMERCIAL FILM'];

const Header = ({ onFilter, onPartFilter, onProfileClick, onCreateClick }) => {
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);
    const [showPartDropdown, setShowPartDropdown] = useState(false);
    const [selectedCompany, setSelectedCompany] = useState('All');
    const [selectedPart, setSelectedPart] = useState('All');

    const handleCompanyClick = (company) => {
        setSelectedCompany(company);
        setShowCompanyDropdown(false);
        onFilter(company === 'All' ? null : company);
    };

    const handlePartClick = (part) => {
        setSelectedPart(part);
        setShowPartDropdown(false);
        onPartFilter(part === 'All' ? null : part);
    };

    return (
        <header className="header">
            <div className="header-logo">
                <div className="logo-icon">P</div>
            </div>
            <div className="header-nav">
                <button className="nav-btn active" onClick={onProfileClick}>Profile</button>

                {/* Company Dropdown */}
                <div className="nav-dropdown-container">
                    <button
                        className={`nav-btn ${showCompanyDropdown ? 'active' : ''}`}
                        onClick={() => {
                            setShowCompanyDropdown(!showCompanyDropdown);
                            setShowPartDropdown(false);
                        }}
                    >
                        Company <ChevronDown size={16} style={{ marginLeft: 4 }} />
                    </button>
                    {showCompanyDropdown && (
                        <div className="dropdown-menu">
                            {COMPANIES.map(company => (
                                <button
                                    key={company}
                                    className={`dropdown-item ${selectedCompany === company ? 'selected' : ''}`}
                                    onClick={() => handleCompanyClick(company)}
                                >
                                    {company}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Part Dropdown */}
                <div className="nav-dropdown-container">
                    <button
                        className={`nav-btn ${showPartDropdown ? 'active' : ''}`}
                        onClick={() => {
                            setShowPartDropdown(!showPartDropdown);
                            setShowCompanyDropdown(false);
                        }}
                    >
                        Part <ChevronDown size={16} style={{ marginLeft: 4 }} />
                    </button>
                    {showPartDropdown && (
                        <div className="dropdown-menu">
                            {PARTS.map(part => (
                                <button
                                    key={part}
                                    className={`dropdown-item ${selectedPart === part ? 'selected' : ''}`}
                                    onClick={() => handlePartClick(part)}
                                >
                                    {part}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <button className="nav-btn" onClick={onCreateClick}>Create</button>
            </div>
            <div className="header-search">
                <div className="search-wrapper">
                    <Search className="search-icon" size={20} />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
            <div className="header-actions">
                <button className="icon-btn"><Bell size={24} /></button>
                <button className="icon-btn"><MessageSquare size={24} /></button>
                <button className="icon-btn"><User size={24} /></button>
            </div>
        </header>
    );
};

export default Header;

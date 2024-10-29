import React from 'react';
import "./index.css";
import { useAuth } from '../../context/AuthContext';
const Navbar = () => {
    const { user } = useAuth();
    return (
        <nav className="navbar">
            <div className="container">
                <a href="/" className="navbar-brand">
                    <span className="logo-text">Genix Auctions</span>
                </a>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <a href="/auctions" className="nav-link">Auctions</a>
                    </li>
                    <li className="nav-item">
                        <a href="/biding-list" className="nav-link">Bidding</a>
                    </li>
                    {!user ? <>
                        <li className="nav-item">
                            <a href="/login" className="nav-link">Login</a>
                        </li>
                        <li className="nav-item">
                            <a href="/register" className="nav-link btn btn-primary">Get Started</a>
                        </li>
                    </> : <li className="nav-item">
                            <a href="/profile" className="nav-link btn-profile">{user.firstname}</a>
                        </li>
                    }

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
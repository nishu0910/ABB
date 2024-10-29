import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';

function RegisterSuccess() {
    const history = useHistory();
    const login = (e) => {
        e.preventDefault();
        history.push("/login");
    }
    return (
        <div className="register-success">
            <div className="header">
                <div className="title">Genix Auctions</div>
            </div>
            <div className="content">
                <h1>Uncover Deals, Unleash Excitement: <span className="highlight">Dive into Our Auctions Today!</span></h1>
                <div className="success">
                    SIGNED UP SUCCESSFULLY!
                </div>

                <button onClick={login} className="button">Login now</button>
            </div>
        </div>
    );
}

export default RegisterSuccess;
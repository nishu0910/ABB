import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {useHistory} from "react-router-dom";
import "./index.css";

const Register = () => {
    const { register } = useAuth();
    const history = useHistory();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [receiveOutbidEmails, setReceiveOutbidEmails] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        register(firstName, lastName, email, password).then(()=>{
            history.push("/register-success");
        })
    };

    return (
        <div className="register-container">

            <form onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <p>
                    New bidders, as soon as you have submitted your information you will
                    be eligible to bid in the auction.
                </p>
                <div className="form-group">
                    <label htmlFor="firstName">First Name:</label>
                    <input
                        type="text"
                        id="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name:</label>
                    <input
                        type="text"
                        id="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {/* <div className="form-group">
                    <input
                        type="checkbox"
                        id="receiveOutbidEmails"
                        checked={receiveOutbidEmails}
                        onChange={(e) => setReceiveOutbidEmails(e.target.checked)}
                    />
                    <label htmlFor="receiveOutbidEmails">
                        Receive outbid emails
                    </label>
                </div> */}
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
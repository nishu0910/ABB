import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import "./index.css";

const Login = () => {
    const { login } = useAuth();
    const history = useHistory();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password.length < 8) {
            setErrorMessage("Please enter a valid password");
            return;
        }
        setErrorMessage("");
        login(email, password).then(() => {
            history.push("/biding-list");
        }).catch(() => {
            history.push("/register");
        })
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>Login</h2>
                <p>
                    Welcome back. Enter your credentials to access your account
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                        <span
                            className="password-toggle"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <i className="fa fa-eye-slash"></i>
                            ) : (
                                <i className="fa fa-eye"></i>
                            )}
                        </span>
                    </div>
                    {errorMessage && <p className="error- message">{errorMessage}</p>}
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
import React, { useState } from 'react';
import { useUser } from './UserContext';


const LoginForm = ({ onLoginSuccess }) => {
    // State to store form values and errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');     
    const { login, errors , isLogging} = useUser();
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();     
        await login({ email, password });       
    };

    return (
        <div className="login-form">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                {/* Email field */}
                {errors?.message && <div className="error">{errors.message}</div>}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    {errors?.email && <div className="error">{errors.email[0]}</div>}
                </div>

                {/* Password field */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {errors?.password && <div className="error">{errors.password[0]}</div>}
                </div>
                <br/>
                {/* Submit button */}
                <div className="d-flex justify-content-between align-items-center">
                    <button type="submit" className="btn btn-primary" disabled={isLogging}>
                        {isLogging ? 'Logging in...' : 'Login'}
                    </button>                   
                </div>
            </form>
        </div>
    );
};

export default LoginForm;

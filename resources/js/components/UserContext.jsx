import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from "./axiosConfig";
// Create the context
const UserContext = createContext();

// Custom hook for easier consumption
export const useUser = () => useContext(UserContext);

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Store user info
    const [isLoading, setIsLoading] = useState(true); // Handle loading state
    const [isLogging, setIsLogging] = useState(false); // Handle loading state
    const [errors, setErrors] = useState({});
    // Mock API call for login
    const login = async (credentials) => {
        setIsLogging(true); 
        try {
            await axios.get(`${window.Laravel.appUrl}/sanctum/csrf-cookie`); // Retrieve CSRF token 
            // Send login request to the Laravel backend API
            const response = await axios.post(`${window.Laravel.appUrl}/api/login`, credentials);
            // Assuming response contains user data and token
            const { token , user } = response.data;            
            // Store token (in localStorage/sessionStorage, or state)
            localStorage.setItem('auth_token', token);
            setIsLogging(false);         
            setUser(user);    
            setErrors(null);
        } catch (error) {
            console.log(error.response.data.message);
            setUser(null);    
            setIsLogging(false);           
            // If validation errors are returned from backend
            if (error.response && error.response.data.message) {
                setErrors(error.response.data);
            } else {
                // Handle general error
                alert('Something went wrong!');
            }
        }
    };

    // Logout user
    const logout = async () => {
        setUser(null);
        await axios.post('/api/logout');
    };

    const updateUser = async (user) => {       
        setUser(user);       
    };

    // Check user from local storage on first load
    useEffect(() => {
       
    }, []);

    return (
        <UserContext.Provider value={{ user, login, logout, isLoading, updateUser , errors , isLogging}}>
            {children}
        </UserContext.Provider>
    );
};



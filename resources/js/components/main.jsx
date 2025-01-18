import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from './axiosConfig';
import TodoApp from "./todo";
import LoginRegister from "./authtab";
import { UserProvider , useUser } from './UserContext';

const App = () => {
    const { user, logout, updateUser } = useUser();
   
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('/api/user');
            updateUser(data);
        } catch {
           
        }
    };
   

    useEffect(() => {
        fetchUser();
    }, []);

    const handleLogout = async () => {
        logout();
    };

    return (
        <div>
            {user ? (
                <div>
                    <h2>Welcome, {user.name}</h2>
                    <button onClick={handleLogout}>Logout</button>
                    <TodoApp />
                </div>
            ) : (
                <LoginRegister />
            )}
        </div>
    );
};

export default App;
if (document.getElementById('app-root')) {
    const Index = ReactDOM.createRoot(document.getElementById("app-root"));

    Index.render(
        <UserProvider>            
            <App/>
        </UserProvider>
    )
}
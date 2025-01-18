import React, { useState } from 'react';
import RegisterForm from "./register";
import LoginForm from './login';

// Styles (Optional inline styles for simplicity)
const styles = {
    container: {
        
    },
    tabHeader: {
        display: 'flex',
        justifyContent: 'center',
        background: '#f4f4f4',
    },
    tabButton: {
        flex: 1,
        padding: '10px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        transition: '0.3s',
        color: '#333'
    },
    activeTab: {      
        fontWeight: 'bold',
        color: '#007bff',
    },
    tabContent: {
        padding: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '10px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    submitButton: {
        padding: '10px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

const LoginRegister = () => {
    const [activeTab, setActiveTab] = useState(null); // Default to 'login'
   
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div style={styles.container}>
            {/* Tab Headers */}
            <div style={styles.tabHeader}>
                <button
                    style={{
                        ...styles.tabButton,
                        ...(activeTab === 'login' || activeTab == null ? styles.activeTab : {}),
                    }}
                    onClick={() => handleTabChange('login')}
                >
                    Login
                </button>
                <button
                    style={{
                        ...styles.tabButton,
                        ...(activeTab === 'register' ? styles.activeTab : {}),
                    }}
                    onClick={() => handleTabChange('register')}
                >
                    Register
                </button>
            </div>

            {/* Tab Content */}
            <div style={styles.tabContent}>
                {(activeTab === 'login' || activeTab == null) && <LoginForm />}
                {activeTab === 'register' && <RegisterForm />}
            </div>
        </div>
    );
};



export default LoginRegister;

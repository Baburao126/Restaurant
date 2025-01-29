import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });
    const [user, setUser ] = useState(null); 

    const login = (userData) => {
        setIsLoggedIn(true);
        setUser (userData); 
        localStorage.setItem('isLoggedIn', 'true'); 
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser (null);
        localStorage.removeItem('isLoggedIn'); 
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
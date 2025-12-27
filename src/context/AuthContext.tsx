"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
    email: string;
    name: string;
    picture: string;
}

interface AuthContextType {
    user: User | null;
    login: (credential: string) => void;
    logout: () => void;
    error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Check for existing session
    useEffect(() => {
        const savedUser = localStorage.getItem('user_session');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (credential: string) => {
        try {
            const decoded: any = jwtDecode(credential);
            const email = decoded.email;

            if (email && email.endsWith('@bpk.ac.th')) {
                const userData = {
                    email: decoded.email,
                    name: decoded.name,
                    picture: decoded.picture,
                };
                setUser(userData);
                localStorage.setItem('user_session', JSON.stringify(userData));
                setError(null);
            } else {
                setError('Access denied. Please use your @bpk.ac.th email address.');
                console.error('Login failed: domain mismatch');
            }
        } catch (err) {
            setError('Login failed. Invalid token.');
            console.error('Login failed:', err);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user_session');
        setError(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

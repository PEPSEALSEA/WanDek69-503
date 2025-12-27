"use client";

import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const CLIENT_ID = "787988651964-gf258mnif89bu6g0jao2mpdsm72j96da.apps.googleusercontent.com";

declare global {
    interface Window {
        google: any;
    }
}

export default function LoginButton() {
    const { login } = useAuth();

    useEffect(() => {
        /* global google */
        if (typeof window !== 'undefined' && window.google) {
            window.google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: (response: any) => {
                    login(response.credential);
                },
            });

            window.google.accounts.id.renderButton(
                document.getElementById("googleSignInDiv"),
                { theme: "outline", size: "large", type: "standard" }
            );
        }
    }, [login]);

    return <div id="googleSignInDiv"></div>;
}

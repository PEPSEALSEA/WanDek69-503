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
    const [isInAppBrowser, setIsInAppBrowser] = React.useState(false);

    useEffect(() => {
        // Check for in-app browsers that usually block Google OAuth
        const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
        const isLine = /Line\//i.test(ua);
        const isFacebook = /FBAN|FBAV/i.test(ua);
        const isInstagram = /Instagram/i.test(ua);

        if (isLine) {
            if (window.location.search.indexOf("openExternalBrowser=1") === -1) {
                const url = new URL(window.location.href);
                url.searchParams.set("openExternalBrowser", "1");
                window.location.href = url.toString();
                return;
            }
            setIsInAppBrowser(true);
            return;
        }

        if (isFacebook || isInstagram) {
            setIsInAppBrowser(true);
            return;
        }

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

    if (isInAppBrowser) {
        return (
            <div style={{
                padding: '16px',
                background: 'rgba(255, 165, 0, 0.1)',
                border: '1px solid rgba(255, 165, 0, 0.3)',
                borderRadius: '12px',
                textAlign: 'center',
                maxWidth: '300px'
            }}>
                <p style={{ color: '#ffb700', marginBottom: '8px', fontWeight: 'bold' }}>
                    ไม่สามารถเข้าสู่ระบบในแอพนี้ได้
                </p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '12px' }}>
                    Google ปิดกั้นการเข้าสู่ระบบผ่าน In-app browser เพื่อความปลอดภัย
                </p>
                <div style={{
                    background: 'rgba(255,255,255,0.05)',
                    padding: '8px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    color: 'var(--text-primary)'
                }}>
                    กรุณากดที่มุมขวาบน (⋮ หรือ ...) <br />
                    เลือก <strong>"Open in External Browser"</strong> <br />
                    (เปิดในเบราว์เซอร์เริ่มต้น)
                </div>
            </div>
        );
    }

    return <div id="googleSignInDiv"></div>;
}

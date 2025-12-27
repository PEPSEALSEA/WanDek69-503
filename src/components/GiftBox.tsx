"use client";

import React, { useState } from 'react';

interface GiftBoxProps {
    text: string;
}

export default function GiftBox({ text }: GiftBoxProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>

            {!isOpen && (
                <div style={{ marginBottom: '20px', color: 'var(--text-secondary)', fontSize: '1.2rem' }}>
                    Tap to open your gift!
                </div>
            )}

            <div
                className={`gift-container ${isOpen ? 'opened' : ''}`}
                onClick={() => setIsOpen(true)}
            >
                <div className="gift-box">
                    <div className="gift-lid">
                        <div className="gift-bow"></div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="revealed-text" style={{ position: 'absolute', zIndex: 0, textAlign: 'center' }}>
                    <h1 className="text-gradient" style={{ fontSize: '5rem', marginBottom: '20px' }}>
                        {text}
                    </h1>
                    <div style={{ fontSize: '1.5rem', color: 'var(--text-secondary)' }}>
                        Merry Christmas & Happy New Year!
                    </div>
                </div>
            )}

        </div>
    );
}

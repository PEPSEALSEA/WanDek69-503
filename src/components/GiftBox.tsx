"use client";

import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface GiftBoxProps {
    text: string;
}

export default function GiftBox({ text }: GiftBoxProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isShaking, setIsShaking] = useState(false);

    const handleOpen = () => {
        if (isOpen || isShaking) return;

        // 1. Start intense shaking
        setIsShaking(true);

        // 2. Wait for shake to complete (e.g. 1.2s)
        setTimeout(() => {
            setIsShaking(false);
            setIsOpen(true);

            // 3. Trigger Confetti
            fireConfetti();
        }, 1200);
    };

    const fireConfetti = () => {
        const duration = 3000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    };


    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>

            {!isOpen && !isShaking && (
                <div className="animate-bounce" style={{ marginBottom: '60px', color: 'var(--text-secondary)', fontSize: '1.2rem', fontWeight: 600 }}>
                    แตะเพื่อเปิดของขวัญ!
                </div>
            )}

            {isShaking && (
                <div style={{ marginBottom: '60px', color: 'var(--accent-primary)', fontSize: '1.2rem', fontWeight: 700 }}>
                    กำลังเปิด...
                </div>
            )}

            <div
                className={`gift-container ${isOpen ? 'opened' : ''} ${isShaking ? 'animate-opening-shake' : ''}`}
                onClick={handleOpen}
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
                        โชคดี!
                    </div>
                </div>
            )}

        </div>
    );
}

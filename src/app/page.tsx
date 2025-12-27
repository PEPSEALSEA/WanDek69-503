"use client";

import { useAuth } from "@/context/AuthContext";
import LoginButton from "@/components/LoginButton";

export default function Home() {
  const { user, error, logout } = useAuth();

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative background blobs */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)', zIndex: -1, top: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.4
      }} />

      <div className="container" style={{ textAlign: 'center', padding: '120px 20px 60px' }}>

        {!user ? (
          <>
            <span className="animate-fade-in" style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.875rem', marginBottom: '24px', color: 'var(--accent-primary)' }}>
              Authentication Required
            </span>

            <h1 className="text-gradient animate-fade-in delay-100" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Welcome to <br /> WanDek69-503
            </h1>

            <p className="animate-fade-in delay-200" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 48px' }}>
              Please sign in with your school email (@bpk.ac.th) to access the platform.
            </p>

            <div className="animate-fade-in delay-300" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <LoginButton />
              {error && (
                <div style={{ color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  {error}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <span className="animate-fade-in" style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.875rem', marginBottom: '24px', color: '#22c55e' }}>
              ● Online
            </span>

            <div className="animate-fade-in delay-100" style={{ marginBottom: '40px' }}>
              <img
                src={user.picture}
                alt={user.name}
                style={{ width: '100px', height: '100px', borderRadius: '50%', border: '4px solid var(--accent-primary)', marginBottom: '20px' }}
              />
              <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome back, {user.name}!</h1>
              <p style={{ color: 'var(--text-secondary)' }}>{user.email}</p>
            </div>

            <div className="animate-fade-in delay-200" style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button onClick={logout} className="glass-panel" style={{ padding: '12px 24px', borderRadius: '12px', cursor: 'pointer', color: 'var(--text-primary)', fontWeight: 600 }}>
                Sign Out
              </button>
            </div>

            <div className="animate-fade-in delay-300" style={{ marginTop: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%', maxWidth: '1000px', marginInline: 'auto', textAlign: 'left' }}>
              <FeatureCard
                title="Student Dashboard"
                desc="Access your courses, assignments, and grades in one place."
              />
              <FeatureCard
                title="Resources"
                desc="Browse the library of digital resources available to BPK students."
              />
              <FeatureCard
                title="Announcements"
                desc="Stay up to date with the latest news from the department."
              />
            </div>
          </>
        )}

      </div>
    </main>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="glass-panel" style={{ padding: '40px', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</p>
    </div>
  )
}

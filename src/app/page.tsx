export default function Home() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative background blobs */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px', background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)', zIndex: -1, top: '-20%', left: '50%', transform: 'translateX(-50%)', opacity: 0.4
      }} />

      <div className="container" style={{ textAlign: 'center', padding: '120px 20px 60px' }}>
        <span className="animate-fade-in" style={{ display: 'inline-block', padding: '6px 16px', borderRadius: '100px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.875rem', marginBottom: '24px', color: 'var(--accent-primary)' }}>
          v1.0.0
        </span>

        <h1 className="text-gradient animate-fade-in delay-100" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Create Something <br /> Extraordinary
        </h1>

        <p className="animate-fade-in delay-200" style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 48px' }}>
          Your Next.js project is ready. <br />
          Deployed on GitHub Pages with a premium, responsive design system.
        </p>

        <div className="animate-fade-in delay-300" style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn-primary">Get Started</button>
          <a href="https://github.com/pepsealsea/WanDek69-503" target="_blank" rel="noopener noreferrer" className="glass-panel" style={{ padding: '12px 24px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', fontWeight: 600, textDecoration: 'none' }}>
            View on GitHub
          </a>
        </div>

        <div className="animate-fade-in delay-300" style={{ marginTop: '120px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%', maxWidth: '1000px', marginInline: 'auto' }}>
          <FeatureCard
            title="Instant Setup"
            desc="Pre-configured with TypeScript, ESLint, and optimized static export settings."
          />
          <FeatureCard
            title="Premium Design"
            desc="Glassmorphism, beautiful gradients, and fluid animations built-in with Vanilla CSS."
          />
          <FeatureCard
            title="Deployment Ready"
            desc="Configured for GitHub Pages out of the box with custom base path support."
          />
        </div>

      </div>
    </main>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="glass-panel" style={{ padding: '40px', textAlign: 'left', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '1.5rem' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{desc}</p>
    </div>
  )
}

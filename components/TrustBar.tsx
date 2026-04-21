export default function TrustBar() {
  const stats = [
    { icon: '🏆', value: '3+ Years', label: 'In Trade' },
    { icon: '👥', value: '100+',     label: 'Happy Clients' },
    { icon: '🚚', value: 'Pan-India', label: 'Delivery' },
    { icon: '✅', value: 'GST',       label: 'Verified' },
    { icon: '📍', value: 'Surat',    label: 'Gujarat, India' },
    { icon: '🌍', value: 'Global',   label: 'Exports' },
  ];

  return (
    <section
      style={{
        backgroundColor: 'var(--maroon)',
        padding: '28px 0',
        borderBottom: '1px solid rgba(255,204,69,0.15)',
        borderTop: '1px solid rgba(255,204,69,0.15)',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: '8px',
        }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 20px',
              borderRight: i < stats.length - 1 ? '1px solid rgba(255,204,69,0.2)' : 'none',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{s.icon}</span>
            <div>
              <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '0.95rem' }}>{s.value}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '4px' }}>{s.label}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

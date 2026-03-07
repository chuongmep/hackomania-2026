
export default function StatCards(){

  const stats=[
    {
      label: "Active Alerts",
      value: 3,
      color: "#ef4444",
      bgGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.05) 100%)",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>,
      trend: "+2"
    },
    {
      label: "High Risk Seniors",
      value: 5,
      color: "#f59e0b",
      bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>,
      trend: "+1"
    },
    {
      label: "Calls Today",
      value: 12,
      color: "#3b82f6",
      bgGradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.05) 100%)",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>,
      trend: "+4"
    },
    {
      label: "Responders Available",
      value: 4,
      color: "#10b981",
      bgGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
      </svg>,
      trend: "100%"
    }
  ]

  return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px"}}>

      {stats.map((s,i)=>(
        <div key={i} style={{
          background: s.bgGradient,
          padding: "12px",
          borderRadius: "10px",
          border: `1px solid ${s.color}40`,
          backdropFilter: "blur(10px)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease"
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = `0 8px 16px ${s.color}30`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        >
          {/* Background Icon */}
          <div style={{
            position: 'absolute',
            right: '-10px',
            top: '-10px',
            width: '80px',
            height: '80px',
            opacity: '0.1',
            color: s.color
          }}>
            {s.icon}
          </div>
          
          <div style={{position: 'relative', zIndex: 1}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px'}}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: `${s.color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: s.color
              }}>
                <div style={{width: '18px', height: '18px'}}>
                  {s.icon}
                </div>
              </div>
              <span style={{
                fontSize: '10px',
                fontWeight: '700',
                color: s.color,
                background: `${s.color}20`,
                padding: '3px 6px',
                borderRadius: '4px'
              }}>
                {s.trend}
              </span>
            </div>
            
            <h2 style={{
              margin: '0 0 4px 0',
              fontSize: '28px',
              fontWeight: '700',
              color: s.color,
              lineHeight: '1'
            }}>
              {s.value}
            </h2>
            
            <p style={{
              margin: 0,
              fontSize: '11px',
              color: '#94a3b8',
              fontWeight: '500',
              letterSpacing: '0.3px'
            }}>
              {s.label}
            </p>
          </div>
        </div>
      ))}

    </div>
  )
}


export default function StatCards({ alerts = [] }){

  // Calculate statistics from alerts
  const activeAlerts = alerts.length;
  const highRiskCount = alerts.filter(alert => alert.risk === 'High').length;
  const mediumRiskCount = alerts.filter(alert => alert.risk === 'Medium').length;
  
  const stats=[
    {
      label: "Active Alerts",
      value: activeAlerts,
      color: "#ef4444",
      bgGradient: "linear-gradient(135deg, rgba(239, 68, 68, 0.15) 0%, rgba(220, 38, 38, 0.05) 100%)",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>,
      trend: activeAlerts > 0 ? `LIVE` : "0"
    },
    {
      label: "High Risk",
      value: highRiskCount,
      color: "#f59e0b",
      bgGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(217, 119, 6, 0.05) 100%)",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87" />
        <path d="M16 3.13a4 4 0 010 7.75" />
      </svg>,
      trend: highRiskCount > 0 ? "!" : "0"
    },
    {
      label: "Medium Risk",
      value: mediumRiskCount,
      color: "#3b82f6",
      bgGradient: "linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.05) 100%)",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
      </svg>,
      trend: mediumRiskCount > 0 ? "!" : "0"
    },
    {
      label: "System Status",
      value: "OK",
      color: "#10b981",
      bgGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.05) 100%)",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
      </svg>,
      trend: "100%"
    }
  ]

  return(
    <div style={{
      background: "rgba(30, 41, 59, 0.6)",
      borderRadius: "10px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(71, 85, 105, 0.5)",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }}>
    <div className="stat-cards" style={{
      display:"grid",
      gridTemplateColumns:"repeat(2, 1fr)",
      gap:"6px",
      flex: "1",
      gridAutoRows: "1fr"
    }}>
      <style>{`
        @media (max-width: 1200px) {
          .stat-cards {
            grid-template-columns: 1fr !important;
          }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>

      {stats.map((s,i)=>(
        <div key={i} style={{
          background: s.bgGradient,
          padding: "8px 10px",
          borderRadius: "8px",
          border: `1.5px solid ${s.color}50`,
          backdropFilter: "blur(10px)",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: `0 2px 8px ${s.color}15`
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.boxShadow = `0 4px 12px ${s.color}35`;
          e.currentTarget.style.borderColor = `${s.color}80`;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = `0 2px 8px ${s.color}15`;
          e.currentTarget.style.borderColor = `${s.color}50`;
        }}
        >
          {/* Background Icon */}
          <div style={{
            position: 'absolute',
            right: '-8px',
            top: '-8px',
            width: '50px',
            height: '50px',
            opacity: '0.05',
            color: s.color,
            transform: 'rotate(-15deg)'
          }}>
            {s.icon}
          </div>
          
          {/* Accent Line */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${s.color}00 0%, ${s.color} 50%, ${s.color}00 100%)`,
            opacity: 0.5
          }} />
          
          <div style={{position: 'relative', zIndex: 1}}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px'}}>
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '5px',
                background: `${s.color}25`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: s.color,
                boxShadow: `0 1px 3px ${s.color}20`,
                border: `1px solid ${s.color}30`
              }}>
                <div style={{width: '14px', height: '14px'}}>
                  {s.icon}
                </div>
              </div>
              <span style={{
                fontSize: '8px',
                fontWeight: '700',
                color: s.color,
                background: `${s.color}25`,
                padding: '2px 5px',
                borderRadius: '3px',
                border: `1px solid ${s.color}30`,
                letterSpacing: '0.2px'
              }}>
                {s.trend}
              </span>
            </div>
            
            <h2 style={{
              margin: '0 0 2px 0',
              fontSize: '20px',
              fontWeight: '700',
              color: s.color,
              lineHeight: '1',
              textShadow: `0 1px 4px ${s.color}30`
            }}>
              {s.value}
            </h2>
            
            <p style={{
              margin: 0,
              fontSize: '10px',
              color: '#94a3b8',
              fontWeight: '600',
              letterSpacing: '0.1px',
              lineHeight: '1.1'
            }}>
              {s.label}
            </p>
          </div>
        </div>
      ))}
    </div>
    </div>
  )
}

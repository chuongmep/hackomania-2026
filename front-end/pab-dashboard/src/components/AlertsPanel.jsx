
// User Profile Avatar SVG Component
function UserAvatar({ name, color }) {
  const initial = name.charAt(0).toUpperCase();
  
  return (
    <svg width="50" height="50" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
      {/* Background Circle */}
      <circle cx="25" cy="25" r="25" fill={color} />
      
      {/* User Icon */}
      <g transform="translate(25, 25)">
        {/* Head */}
        <circle cx="0" cy="-5" r="8" fill="white" opacity="0.9" />
        {/* Body */}
        <path d="M -12 15 Q -12 5 -8 2 Q 0 0 8 2 Q 12 5 12 15 Z" fill="white" opacity="0.9" />
      </g>
      
      {/* Initial Badge */}
      <circle cx="40" cy="40" r="10" fill="#fff" />
      <text x="40" y="45" fontSize="12" fontWeight="bold" fill={color} textAnchor="middle">
        {initial}
      </text>
    </svg>
  );
}

// Status Badge Component
function StatusBadge({ risk }) {
  const colors = {
    High: { bg: '#ef4444', text: '#fff', pulse: true },
    Medium: { bg: '#f59e0b', text: '#fff', pulse: false },
    Low: { bg: '#10b981', text: '#fff', pulse: false }
  };
  
  const style = colors[risk] || colors.Low;
  
  return (
    <span style={{
      background: style.bg,
      color: style.text,
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block',
      animation: style.pulse ? 'pulse 2s infinite' : 'none'
    }}>
      {risk} Risk
    </span>
  );
}

export default function AlertsPanel(){

  const alerts=[
    {
      id: 1,
      name: "Mr Tan Ah Kow",
      age: 78,
      location: "Blk 123, Ang Mo Kio Ave 3, #05-45",
      status: "Fall Detected",
      risk: "High",
      time: "2 mins ago",
      color: "#3b82f6"
    },
    {
      id: 2,
      name: "Madam Lee Siew Hong",
      age: 82,
      location: "Blk 456, Bedok North St 2, #12-88",
      status: "No Response",
      risk: "Medium",
      time: "5 mins ago",
      color: "#8b5cf6"
    },
    {
      id: 3,
      name: "Mr Kumar Ramasamy",
      age: 75,
      location: "Blk 789, Tampines Ave 5, #08-22",
      status: "Medical Alert",
      risk: "High",
      time: "1 min ago",
      color: "#ec4899"
    }
  ]

  return(
    <div style={{
      background: "#1e293b",
      padding: "15px",
      borderRadius: "10px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        .alert-card {
          transition: all 0.3s ease;
        }
        .alert-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
      `}</style>
      
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
        <h3 style={{margin: 0, fontSize: '18px'}}>🚨 Live Alerts</h3>
        <span style={{
          background: '#ef4444',
          color: '#fff',
          padding: '4px 10px',
          borderRadius: '20px',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {alerts.length} Active
        </span>
      </div>

      <div style={{flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: '5px'}}>
        {alerts.map((alert)=>(
          <div 
            key={alert.id} 
            className="alert-card"
            style={{
              background:"#334155",
              padding:"12px",
              borderRadius:"8px",
              marginTop:"10px",
              border: alert.risk === 'High' ? '2px solid #ef4444' : '1px solid #475569'
            }}
          >
            <div style={{display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
              {/* User Avatar */}
              <div style={{flexShrink: 0}}>
                <UserAvatar name={alert.name} color={alert.color} />
              </div>
              
              {/* Alert Details */}
              <div style={{flex: 1, minWidth: 0}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '6px'}}>
                  <div>
                    <h4 style={{margin: '0 0 3px 0', fontSize: '15px'}}>{alert.name}</h4>
                    <p style={{margin: 0, fontSize: '12px', color: '#94a3b8'}}>
                      Age: {alert.age} • {alert.time}
                    </p>
                  </div>
                  <StatusBadge risk={alert.risk} />
                </div>
                
                <div style={{
                  background: '#1e293b',
                  padding: '8px',
                  borderRadius: '6px',
                  marginTop: '8px'
                }}>
                  <p style={{margin: '0 0 4px 0', fontSize: '13px', fontWeight: '600', color: '#f1f5f9'}}>
                    ⚠️ {alert.status}
                  </p>
                  <p style={{margin: 0, fontSize: '12px', color: '#cbd5e1', lineHeight: '1.3'}}>
                    📍 {alert.location}
                  </p>
                </div>
                
                {/* Action Buttons */}
                <div style={{display: 'flex', gap: '6px', marginTop: '8px'}}>
                  <button style={{
                    flex: 1,
                    background: '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    📞 Call
                  </button>
                  <button style={{
                    flex: 1,
                    background: '#10b981',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}>
                    🚑 Dispatch
                  </button>
                  <button style={{
                    background: '#64748b',
                    color: '#fff',
                    border: 'none',
                    padding: '6px 10px',
                    borderRadius: '5px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}>
                    ℹ️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}

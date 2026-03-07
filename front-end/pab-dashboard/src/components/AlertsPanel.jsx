
import { useState } from 'react';

// Professional User Avatar Component
function UserAvatar({ name, color, risk }) {
  const initial = name.charAt(0).toUpperCase();
  const riskColor = risk === 'High' ? '#ef4444' : risk === 'Medium' ? '#f59e0b' : '#10b981';
  
  return (
    <div style={{ position: 'relative' }}>
      <svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={`grad-${name}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: color, stopOpacity: 0.7 }} />
          </linearGradient>
        </defs>
        {/* Background Circle */}
        <circle cx="24" cy="24" r="24" fill={`url(#grad-${name})`} />
        
        {/* User Icon */}
        <g transform="translate(24, 24)">
          <circle cx="0" cy="-4" r="7" fill="white" opacity="0.95" />
          <path d="M -10 14 Q -10 6 -7 3 Q 0 1 7 3 Q 10 6 10 14 Z" fill="white" opacity="0.95" />
        </g>
      </svg>
      {/* Risk Indicator Badge */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        right: '0',
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        background: riskColor,
        border: '2px solid #1e293b',
        boxShadow: '0 0 8px rgba(0,0,0,0.5)'
      }} />
    </div>
  );
}

// Professional Status Badge
function StatusBadge({ risk }) {
  const configs = {
    High: { 
      bg: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', 
      text: '#fff', 
      pulse: true,
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    },
    Medium: { 
      bg: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)', 
      text: '#fff', 
      pulse: false,
      icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
    },
    Low: { 
      bg: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
      text: '#fff', 
      pulse: false,
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
    }
  };
  
  const config = configs[risk] || configs.Low;
  
  return (
    <span style={{
      background: config.bg,
      color: config.text,
      padding: '5px 12px',
      borderRadius: '6px',
      fontSize: '11px',
      fontWeight: '700',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '4px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      animation: config.pulse ? 'pulse 2s infinite' : 'none'
    }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d={config.icon} />
      </svg>
      {risk}
    </span>
  );
}

export default function AlertsPanel({ selectedAlert, onSelectAlert }){
  const [resolvedAlerts, setResolvedAlerts] = useState([]);
  const [attendedAlerts, setAttendedAlerts] = useState([]);

  const handleDispatchToggle = (alertId) => {
    if (resolvedAlerts.includes(alertId)) {
      setResolvedAlerts(resolvedAlerts.filter(id => id !== alertId));
    } else {
      setResolvedAlerts([...resolvedAlerts, alertId]);
    }
  };

  const handleAttendToggle = (alertId) => {
    if (attendedAlerts.includes(alertId)) {
      setAttendedAlerts(attendedAlerts.filter(id => id !== alertId));
    } else {
      setAttendedAlerts([...attendedAlerts, alertId]);
    }
  };

  const alerts=[
    {
      id: 1,
      name: "Mr Tan Ah Kow",
      age: 78,
      location: "Blk 123, Ang Mo Kio Ave 3, #05-45",
      status: "Fall Detected",
      risk: "High",
      time: "2 mins ago",
      color: "#3b82f6",
      coordinates: [1.369115, 103.845436],
      transcript: "Hello? Help! I've fallen in the bathroom and I can't get up. My hip hurts badly. Please send help quickly. I'm alone at home and I think I might have broken something. The pain is getting worse... I pressed my emergency button but I don't know if anyone heard me."
    },
    {
      id: 2,
      name: "Madam Lee Siew Hong",
      age: 82,
      location: "Blk 456, Bedok North St 2, #12-88",
      status: "No Response",
      risk: "Medium",
      time: "5 mins ago",
      color: "#8b5cf6",
      coordinates: [1.324, 103.93],
      transcript: "[No verbal response detected] *Sound of objects falling* *Heavy breathing* *Faint moaning* [System note: Motion sensor triggered in bedroom. No response to automated voice prompts. Last known position: near bedroom door.]"
    },
    {
      id: 3,
      name: "Mr Kumar Ramasamy",
      age: 75,
      location: "Blk 789, Tampines Ave 5, #08-22",
      status: "Medical Alert",
      risk: "High",
      time: "1 min ago",
      color: "#ec4899",
      coordinates: [1.35, 103.94],
      transcript: "I'm not feeling well... chest pain... difficulty breathing. I took my heart medication but it's not helping. Please call my daughter at 9123-4567. The pain is on my left side and going down my arm. I'm sitting down now but I feel very dizzy and nauseous."
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
          cursor: pointer;
        }
        .alert-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .alert-card.selected {
          border: 2px solid #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
        }
      `}</style>
      
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px'}}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2">
            <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
          <h3 style={{margin: 0, fontSize: '17px', fontWeight: '600', letterSpacing: '-0.3px'}}>Live Alerts</h3>
        </div>
        <span style={{
          background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
          color: '#fff',
          padding: '4px 12px',
          borderRadius: '12px',
          fontSize: '11px',
          fontWeight: '700',
          boxShadow: '0 2px 4px rgba(239, 68, 68, 0.3)',
          letterSpacing: '0.5px'
        }}>
          {alerts.length} ACTIVE
        </span>
      </div>

      <div style={{flex: 1, overflowY: 'auto', overflowX: 'hidden', paddingRight: '5px'}}>
        {alerts.map((alert)=>(
          <div 
            key={alert.id} 
            className={`alert-card ${selectedAlert?.id === alert.id ? 'selected' : ''}`}
            onClick={() => onSelectAlert(alert)}
            style={{
              background: selectedAlert?.id === alert.id 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0.1) 100%)'
                : 'rgba(51, 65, 85, 0.6)',
              padding:"14px",
              borderRadius:"10px",
              marginTop:"10px",
              border: selectedAlert?.id === alert.id
                ? '2px solid #3b82f6'
                : alert.risk === 'High' 
                  ? '2px solid rgba(239, 68, 68, 0.5)' 
                  : '1px solid rgba(71, 85, 105, 0.5)',
              backdropFilter: 'blur(10px)',
              boxShadow: selectedAlert?.id === alert.id
                ? '0 0 20px rgba(59, 130, 246, 0.3)'
                : alert.risk === 'High'
                  ? '0 4px 12px rgba(239, 68, 68, 0.2)'
                  : 'none'
            }}
          >
            <div style={{display: 'flex', gap: '12px', alignItems: 'flex-start'}}>
              {/* User Avatar */}
              <div style={{flexShrink: 0}}>
                <UserAvatar name={alert.name} color={alert.color} risk={alert.risk} />
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
                  background: 'rgba(15, 23, 42, 0.6)',
                  padding: '10px',
                  borderRadius: '8px',
                  marginTop: '8px',
                  border: '1px solid rgba(71, 85, 105, 0.3)'
                }}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px'}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5">
                      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      <line x1="12" y1="9" x2="12" y2="13" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                    <p style={{margin: 0, fontSize: '13px', fontWeight: '600', color: '#f1f5f9'}}>
                      {alert.status}
                    </p>
                  </div>
                  <div style={{display: 'flex', alignItems: 'start', gap: '6px'}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" style={{marginTop: '2px', flexShrink: 0}}>
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <p style={{margin: 0, fontSize: '11px', color: '#cbd5e1', lineHeight: '1.4'}}>
                      {alert.location}
                    </p>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div style={{display: 'flex', gap: '6px', marginTop: '10px'}}>
                  <button 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    flex: 1,
                    background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                    color: '#fff',
                    border: 'none',
                    padding: '7px 12px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                    Call
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAttendToggle(alert.id);
                    }}
                    style={{
                      flex: 1,
                      background: attendedAlerts.includes(alert.id) 
                        ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' 
                        : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                      color: '#fff',
                      border: 'none',
                      padding: '7px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      boxShadow: attendedAlerts.includes(alert.id)
                        ? '0 2px 4px rgba(249, 115, 22, 0.4)'
                        : '0 2px 4px rgba(245, 158, 11, 0.3)',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {attendedAlerts.includes(alert.id) ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <path d="M20 8v6M23 11h-6" />
                        </svg>
                        Attending
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                          <circle cx="8.5" cy="7" r="4" />
                          <line x1="20" y1="8" x2="20" y2="14" />
                          <line x1="23" y1="11" x2="17" y2="11" />
                        </svg>
                        Attend
                      </>
                    )}
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDispatchToggle(alert.id);
                    }}
                    style={{
                      flex: 1,
                      background: resolvedAlerts.includes(alert.id) 
                        ? 'linear-gradient(135deg, #64748b 0%, #475569 100%)' 
                        : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                      color: '#fff',
                      border: 'none',
                      padding: '7px 12px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      boxShadow: resolvedAlerts.includes(alert.id)
                        ? '0 2px 4px rgba(100, 116, 139, 0.3)'
                        : '0 2px 4px rgba(16, 185, 129, 0.3)',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {resolvedAlerts.includes(alert.id) ? (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Resolved
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z" />
                        </svg>
                        Resolve
                      </>
                    )}
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

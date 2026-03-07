
export default function SummaryPanel({ selectedAlert }){

  if (!selectedAlert) {
    return(
      <div style={{
        background: "rgba(30, 41, 59, 0.4)",
        padding: "24px",
        borderRadius: "10px",
        textAlign: "center",
        border: "2px dashed rgba(71, 85, 105, 0.5)",
        backdropFilter: "blur(10px)"
      }}>
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="1.5" style={{margin: '0 auto 12px'}}>
          <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
        <h3 style={{margin: '0 0 6px 0', fontSize: '15px', color: '#cbd5e1', fontWeight: '600'}}>No Alert Selected</h3>
        <p style={{margin: 0, fontSize: '12px', color: '#64748b', fontWeight: '400'}}>Click on an alert to view audio transcript</p>
      </div>
    )
  }

  const riskColors = {
    High: '#ef4444',
    Medium: '#f59e0b',
    Low: '#10b981'
  };

  return(
    <div style={{
      background: "rgba(30, 41, 59, 0.6)",
      padding: "14px",
      borderRadius: "10px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(71, 85, 105, 0.5)"
    }}>

      <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', paddingBottom: '10px', borderBottom: '1px solid rgba(71, 85, 105, 0.3)'}}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5">
          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
          <path d="M19 10v2a7 7 0 01-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
        <h3 style={{margin: 0, fontSize: '16px', fontWeight: '600', letterSpacing: '-0.3px', flex: 1}}>Audio Transcript</h3>
        <span style={{
          background: `linear-gradient(135deg, ${riskColors[selectedAlert.risk]} 0%, ${riskColors[selectedAlert.risk]}dd 100%)`,
          color: '#fff',
          padding: '4px 10px',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '0.5px',
          boxShadow: `0 2px 4px ${riskColors[selectedAlert.risk]}40`
        }}>
          {selectedAlert.risk.toUpperCase()}
        </span>
      </div>

      {/* User Info */}
      <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', fontSize: '12px', marginBottom: '10px'}}>
        <div style={{
          background: 'rgba(51, 65, 85, 0.5)',
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid rgba(71, 85, 105, 0.3)'
        }}>
          <div style={{color: '#94a3b8', marginBottom: '4px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px'}}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Name
          </div>
          <div style={{fontWeight: '600', fontSize: '12px', color: '#e2e8f0'}}>{selectedAlert.name}</div>
        </div>
        <div style={{
          background: 'rgba(51, 65, 85, 0.5)',
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid rgba(71, 85, 105, 0.3)'
        }}>
          <div style={{color: '#94a3b8', marginBottom: '4px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px'}}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Address
          </div>
          <div style={{fontWeight: '600', fontSize: '12px', color: '#e2e8f0'}}>{selectedAlert.location.split(',')[0]}</div>
        </div>
      </div>

      {/* Full Address */}
      <div style={{
        marginBottom: '10px',
        background: 'rgba(51, 65, 85, 0.5)',
        padding: '8px',
        borderRadius: '6px',
        fontSize: '12px',
        border: '1px solid rgba(71, 85, 105, 0.3)'
      }}>
        <div style={{color: '#94a3b8', marginBottom: '4px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px'}}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Full Address
        </div>
        <div style={{fontWeight: '600', lineHeight: '1.4', color: '#e2e8f0', fontSize: '12px'}}>{selectedAlert.location}</div>
      </div>

      {/* Transcript */}
      <div style={{
        background: 'rgba(15, 23, 42, 0.8)',
        padding: '12px',
        borderRadius: '8px',
        fontSize: '13px',
        border: '1px solid rgba(71, 85, 105, 0.5)',
        maxHeight: '140px',
        overflowY: 'auto',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px',
          paddingBottom: '8px',
          borderBottom: '1px solid rgba(71, 85, 105, 0.3)'
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: '#ef4444',
            animation: 'pulse 2s infinite'
          }} />
          <span style={{fontWeight: '600', color: '#cbd5e1', fontSize: '12px', letterSpacing: '0.3px'}}>
            {selectedAlert.time.toUpperCase()} • RECORDING
          </span>
        </div>
        <p style={{
          margin: 0,
          lineHeight: '1.7',
          color: '#e2e8f0',
          fontSize: '13px',
          fontStyle: selectedAlert.transcript.includes('[No verbal response') ? 'italic' : 'normal'
        }}>
          {selectedAlert.transcript}
        </p>
      </div>

    </div>
  )
}

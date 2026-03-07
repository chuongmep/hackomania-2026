
import { useState } from "react"
import AlertsPanel from "../components/AlertsPanel"
import MapPanel from "../components/MapPanel"
import SummaryPanel from "../components/SummaryPanel"
import ContactList from "../components/ContactList"
import StatCards from "../components/StatCards"
import Login from "../components/Login"

// Professional Logo Icon
function LogoIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
      <path d="M16 8C12.686 8 10 10.686 10 14C10 18 16 24 16 24C16 24 22 18 22 14C22 10.686 19.314 8 16 8Z" fill="white"/>
      <circle cx="16" cy="14" r="3" fill="#3b82f6"/>
      <defs>
        <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32">
          <stop offset="0%" stopColor="#3b82f6"/>
          <stop offset="100%" stopColor="#1d4ed8"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

// Status Indicator
function StatusIndicator({ online = true }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <div style={{
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: online ? '#10b981' : '#ef4444',
        boxShadow: online ? '0 0 8px #10b981' : '0 0 8px #ef4444',
        animation: 'pulse 2s infinite'
      }} />
      <span style={{ fontSize: '13px', fontWeight: '500', color: '#e2e8f0' }}>
        {online ? 'System Online' : 'System Offline'}
      </span>
    </div>
  );
}

export default function Dashboard() {
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  return (
    <div style={{
      background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
      height: "100vh",
      color: "white",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
      
      {/* Header */}
      <div style={{
        padding: "16px 24px",
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(59, 130, 246, 0.2)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.3)"
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <LogoIcon />
          <div>
            <h1 style={{ margin: 0, fontSize: "20px", fontWeight: '600', letterSpacing: '-0.5px' }}>
              PAB Emergency Response
            </h1>
            <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', fontWeight: '400' }}>
              Real-time Monitoring System
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <StatusIndicator online={true} />
          <div style={{
            padding: '8px 12px',
            background: 'rgba(51, 65, 85, 0.5)',
            borderRadius: '8px',
            border: '1px solid rgba(71, 85, 105, 0.5)'
          }}>
            <span style={{ fontSize: "12px", color: "#cbd5e1", fontWeight: '500' }}>
              {new Date().toLocaleString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </span>
          </div>
          
          {/* Admin Login/User Info */}
          {isLoggedIn ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '8px 12px',
              background: 'rgba(59, 130, 246, 0.15)',
              borderRadius: '8px',
              border: '1px solid rgba(59, 130, 246, 0.3)'
            }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '600'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '13px', fontWeight: '600', color: '#e2e8f0' }}>
                  Admin
                </span>
              </div>
              <button
                onClick={handleLogout}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: '8px'
                }}
                title="Logout"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(59, 130, 246, 0.3)',
                transition: 'all 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Login
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: "grid",
        gridTemplateColumns: "380px 1fr",
        gap: "15px",
        padding: "15px",
        overflow: "hidden",
        minHeight: 0
      }}>
        {/* Left Column - Alerts */}
        <div style={{ display: "flex", flexDirection: "column", minHeight: 0 }}>
          <AlertsPanel 
            selectedAlert={selectedAlert}
            onSelectAlert={setSelectedAlert}
          />
        </div>

        {/* Right Column - Map, Stats, Summary */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          minHeight: 0,
          overflow: "hidden"
        }}>
          {/* Map Section - Takes more space */}
          <div style={{ flex: "1 1 auto", minHeight: "300px", maxHeight: "50%", overflow: "hidden" }}>
            <MapPanel selectedAlert={selectedAlert} />
          </div>

          {/* Stats Section - Compact */}
          <div style={{ flex: "0 0 auto" }}>
            <StatCards />
          </div>

          {/* Summary & Contact Section - Two Columns with controlled height */}
          <div style={{ 
            flex: "1 1 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            minHeight: 0,
            maxHeight: "280px",
            overflow: "hidden"
          }}>
            <SummaryPanel selectedAlert={selectedAlert} />
            <ContactList selectedAlert={selectedAlert} />
          </div>
        </div>
      </div>

      {/* Login Component */}
      <Login
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  )
}

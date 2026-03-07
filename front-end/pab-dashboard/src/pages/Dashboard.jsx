
import { useState, useEffect } from "react"
import axios from "axios"
import AlertsPanel from "../components/AlertsPanel"
import MapPanel from "../components/MapPanel"
import SummaryPanel from "../components/SummaryPanel"
import ContactList from "../components/ContactList"
import StatCards from "../components/StatCards"
import Login from "../components/Login"

// Professional Logo Icon
function LogoIcon() {
  return (
    <img 
      src="/icon.avif" 
      alt="PAB Emergency Response" 
      width="32" 
      height="32"
      style={{ 
        borderRadius: '8px',
        objectFit: 'cover'
      }}
    />
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
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch alerts from API
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('/api/db/voice_infos');
        
        if (response.data.status === 'ok' && response.data.data) {
          // Transform API data to match component structure
          console.log('Raw API Response:', response.data.data); // Debug log
          const transformedAlerts = response.data.data
            .filter(item => item.device_info !== null && item.device_info !== undefined)
            .map((item, index) => ({
              id: item.Id,
              name: item.device_info?.UserName || 'Unknown User',
              device_id: item.DeviceId,
              age: item.device_info?.Age || 0,
              location: item.device_info?.Address || 'Location Unknown',
              status: item.Priority === "High" ? "Critical Alert" : item.Priority === "Medium" ? "Medical Alert" : "Low Priority",
              risk: item.Priority,
              time: item.time_ago || 'Unknown',
              coordinates: [
                item.device_info?.CoordN || 1.3521, 
                item.device_info?.CoordE || 103.8198
              ],
              transcript: item.Transcript || 'No transcript available',
              contact: item.device_info?.Contact || null,
              email: item.device_info?.Email || null,
              risks: item.device_info?.Risks || 'Unknown',
              riskScore: item.RiskScore || 0,
              language: item.Language || 'en',
              resolved: item.Resolved || false,
              dateTimeStamp: item.DateTimeStamp || new Date().toISOString(),
              deviceName: item.device_info?.DeviceName || item.DeviceId,
              triageReasoning: item.TriageReasoning || ''
            }));
          
          setAlerts(transformedAlerts);
        }
      } catch (error) {
        console.error('Error fetching alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchAlerts();
      // Refresh data every 5 seconds
      const interval = setInterval(fetchAlerts, 5000);
      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  // Update selected alert when alerts refresh
  useEffect(() => {
    if (selectedAlert && alerts.length > 0) {
      const updatedAlert = alerts.find(alert => alert.id === selectedAlert.id);
      if (updatedAlert) {
        setSelectedAlert(updatedAlert);
      }
    }
  }, [alerts]);

  const handleLogin = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
  };

  // Show login screen if not logged in
  if (!isLoggedIn) {
    return (
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Login
          isOpen={true}
          onClose={() => {}} // Prevent closing when login is required
          onLogin={handleLogin}
        />
      </div>
    );
  }

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
        
        /* Responsive Layout */
        @media (max-width: 1400px) {
          .dashboard-main-content {
            grid-template-columns: 320px 1fr !important;
          }
        }
        @media (max-width: 1200px) {
          .dashboard-main-content {
            grid-template-columns: 1fr !important;
          }
          .map-stats-row {
            grid-template-columns: 1fr !important;
          }
          .summary-contact-section {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .dashboard-header {
            flex-wrap: wrap !important;
            gap: 10px !important;
          }
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
          
          {/* Admin User Info */}
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
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-main-content" style={{
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
            alerts={alerts}
            loading={loading}
          />
        </div>

        {/* Right Column - Map, Stats, Summary */}
        <div className="dashboard-right-column" style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          minHeight: 0,
          overflow: "hidden"
        }}>
          {/* Map & Stats Row - Side by side */}
          <div className="map-stats-row" style={{ 
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            flex: "0 0 auto",
            minHeight: "280px"
          }}>
            {/* Map Section - Left half */}
            <div className="map-section" style={{ 
              height: "100%",
              overflow: "hidden" 
            }}>
              <MapPanel selectedAlert={selectedAlert} alerts={alerts} />
            </div>

            {/* Stats Section - Right half */}
            <div className="stats-section" style={{ 
              height: "100%",
              overflow: "hidden"
            }}>
              <StatCards alerts={alerts} />
            </div>
          </div>

          {/* Summary & Contact Section - Two Columns with controlled height */}
          <div className="summary-contact-section" style={{ 
            flex: "1 1 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
            minHeight: "280px",
            maxHeight: "450px",
            overflow: "hidden"
          }}>
            <SummaryPanel selectedAlert={selectedAlert} />
            <ContactList selectedAlert={selectedAlert} />
          </div>
        </div>
      </div>
    </div>
  )
}

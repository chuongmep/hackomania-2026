
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import { useEffect } from "react"
import L from "leaflet"

// Component to update map view when alert is selected
function MapController({ selectedAlert }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedAlert && selectedAlert.coordinates) {
      map.setView(selectedAlert.coordinates, 16, {
        animate: true,
        duration: 1.5
      });
    }
  }, [selectedAlert, map]);
  
  return null;
}

// Custom marker icons
const createCustomIcon = (color, isSelected, risk) => {
  const size = isSelected ? 40 : 30;
  const pulseClass = risk === 'High' ? 'pulse-marker' : '';
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="${pulseClass}" style="
        width: ${size}px;
        height: ${size}px;
        background: ${isSelected ? color : color + '80'};
        border: 3px solid ${isSelected ? '#fff' : color};
        border-radius: 50%;
        box-shadow: ${isSelected ? '0 0 20px ' + color + ', 0 4px 12px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.3)'};
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.3s ease;
      ">
        <div style="
          width: ${size * 0.4}px;
          height: ${size * 0.4}px;
          background: white;
          border-radius: 50%;
          opacity: 0.9;
        "></div>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

export default function MapPanel({ selectedAlert, alerts = [] }){
  
  // Get risk-based color for markers
  const getRiskColor = (risk) => {
    const colors = {
      'High': '#ef4444',
      'Medium': '#f59e0b',
      'Low': '#10b981'
    };
    return colors[risk] || '#3b82f6';
  };

  // Transform alerts to include color based on risk
  const alertsWithColors = alerts.map(alert => ({
    ...alert,
    color: getRiskColor(alert.risk)
  }));

  return(
    <div style={{
      background: "rgba(30, 41, 59, 0.6)",
      borderRadius: "10px",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(71, 85, 105, 0.5)"
    }}>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(71, 85, 105, 0.3)'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <h3 style={{margin: 0, fontSize: '17px', fontWeight: '600', letterSpacing: '-0.3px', flex: 1}}>
          Live Location Tracking
        </h3>
        <span style={{
          fontSize: '11px',
          color: '#94a3b8',
          background: 'rgba(51, 65, 85, 0.5)',
          padding: '4px 8px',
          borderRadius: '6px',
          fontWeight: '500'
        }}>
          Singapore
        </span>
      </div>

      <div style={{
        flex: 1,
        borderRadius: '8px',
        overflow: 'hidden',
        border: '1px solid rgba(71, 85, 105, 0.3)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
      }}>
        <style>{`
          .custom-marker {
            background: transparent !important;
            border: none !important;
          }
          @keyframes pulse-marker {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.15); opacity: 0.8; }
          }
          .pulse-marker {
            animation: pulse-marker 2s infinite;
          }
          .leaflet-popup-content-wrapper {
            background: rgba(15, 23, 42, 0.95);
            color: white;
            border-radius: 8px;
            padding: 0;
            backdrop-filter: blur(10px);
          }
          .leaflet-popup-content {
            margin: 12px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          }
          .leaflet-popup-tip {
            background: rgba(15, 23, 42, 0.95);
          }
        `}</style>
        
        <MapContainer
          center={selectedAlert ? selectedAlert.coordinates : [1.3521, 103.8198]}
          zoom={selectedAlert ? 16 : 12}
          style={{height:"100%",width:"100%"}}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          
          <MapController selectedAlert={selectedAlert} />
          
          {alertsWithColors.map((alert) => {
            const isSelected = selectedAlert?.id === alert.id;
            return (
              <Marker 
                key={alert.id}
                position={alert.coordinates}
                icon={createCustomIcon(alert.color, isSelected, alert.risk)}
              >
                <Popup>
                  <div style={{ minWidth: '180px' }}>
                    <div style={{
                      fontWeight: '600',
                      fontSize: '14px',
                      marginBottom: '8px',
                      color: alert.color
                    }}>
                      {alert.name}
                    </div>
                    <div style={{
                      display: 'inline-block',
                      background: alert.risk === 'High' ? '#ef4444' : '#f59e0b',
                      color: 'white',
                      padding: '3px 8px',
                      borderRadius: '4px',
                      fontSize: '10px',
                      fontWeight: '700'
                    }}>
                      {alert.risk.toUpperCase()} RISK
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

    </div>
  )
}

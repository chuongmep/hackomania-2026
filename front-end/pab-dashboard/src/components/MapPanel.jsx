
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

export default function MapPanel(){

  return(
    <div style={{
      background: "rgba(30, 41, 59, 0.6)",
      padding: "14px",
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
        <MapContainer
          center={[1.3521,103.8198]}
          zoom={11}
          style={{height:"100%",width:"100%"}}
        >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        <Marker position={[1.324,103.93]}>
          <Popup>Mr Tan - Fall Detected</Popup>
        </Marker>

        <Marker position={[1.35,103.94]}>
          <Popup>Madam Lee - No Response</Popup>
        </Marker>

        </MapContainer>
      </div>

    </div>
  )
}

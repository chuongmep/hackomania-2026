
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"

export default function MapPanel(){

  return(
    <div style={{
      background: "#1e293b",
      padding: "12px",
      borderRadius: "10px",
      height: "100%",
      display: "flex",
      flexDirection: "column"
    }}>

      <h3 style={{margin: '0 0 10px 0', fontSize: '18px'}}>📍 Senior Location Map</h3>

      <MapContainer
        center={[1.3521,103.8198]}
        zoom={11}
        style={{height:"100%",width:"100%",flex:1,borderRadius:"8px"}}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

        <Marker position={[1.324,103.93]}>
          <Popup>Mr Tan - Fall Detected</Popup>
        </Marker>

        <Marker position={[1.35,103.94]}>
          <Popup>Madam Lee - No Response</Popup>
        </Marker>

      </MapContainer>

    </div>
  )
}


import AlertsPanel from "../components/AlertsPanel"
import MapPanel from "../components/MapPanel"
import SummaryPanel from "../components/SummaryPanel"
import StatCards from "../components/StatCards"

export default function Dashboard() {
  return (
    <div style={{background:"#0f172a",minHeight:"100vh",color:"white",padding:"20px",fontFamily:"Arial"}}>

      <h1 style={{marginBottom:"20px"}}>PAB Monitoring Dashboard</h1>

      <div style={{display:"grid",gridTemplateColumns:"1fr 3fr",gap:"15px"}}>
        <AlertsPanel />
        <MapPanel />
      </div>

      <div style={{marginTop:"15px"}}>
        <StatCards />
      </div>

      <div style={{marginTop:"15px",maxWidth:"400px"}}>
        <SummaryPanel />
      </div>

    </div>
  )
}

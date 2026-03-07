
import AlertsPanel from "../components/AlertsPanel"
import MapPanel from "../components/MapPanel"
import SummaryPanel from "../components/SummaryPanel"
import StatCards from "../components/StatCards"

export default function Dashboard() {
  return (
    <div style={{
      background: "#0f172a",
      height: "100vh",
      color: "white",
      fontFamily: "Arial",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden"
    }}>
      {/* Header */}
      <div style={{
        padding: "15px 20px",
        borderBottom: "2px solid #1e293b",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h1 style={{ margin: 0, fontSize: "24px" }}>🏥 PAB Monitoring Dashboard</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <span style={{
            background: "#10b981",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "600"
          }}>
            🟢 System Online
          </span>
          <span style={{ fontSize: "14px", color: "#94a3b8" }}>
            {new Date().toLocaleString()}
          </span>
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
          <AlertsPanel />
        </div>

        {/* Right Column - Map, Stats, Summary */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          minHeight: 0,
          overflow: "hidden"
        }}>
          {/* Map Section */}
          <div style={{ flex: "1 1 60%", minHeight: 0 }}>
            <MapPanel />
          </div>

          {/* Stats Section */}
          <div style={{ flex: "0 0 auto" }}>
            <StatCards />
          </div>

          {/* Summary Section */}
          <div style={{ flex: "0 0 auto" }}>
            <SummaryPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

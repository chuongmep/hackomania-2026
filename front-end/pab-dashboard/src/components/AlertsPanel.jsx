
export default function AlertsPanel(){

  const alerts=[
    {name:"Mr Tan",status:"Fall Detected",risk:"High"},
    {name:"Madam Lee",status:"No Response",risk:"Medium"}
  ]

  return(
    <div style={{background:"#1e293b",padding:"15px",borderRadius:"10px"}}>
      <h3>Live Alerts</h3>

      {alerts.map((a,i)=>(
        <div key={i} style={{background:"#334155",padding:"10px",borderRadius:"8px",marginTop:"10px"}}>
          <strong>{a.name}</strong>
          <p>{a.status}</p>
          <p>Risk: {a.risk}</p>
        </div>
      ))}

    </div>
  )
}

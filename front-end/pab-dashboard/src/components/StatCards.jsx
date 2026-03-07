
export default function StatCards(){

  const stats=[
    {label:"Active Alerts",value:3,icon:"🚨",color:"#ef4444"},
    {label:"High Risk Seniors",value:5,icon:"⚠️",color:"#f59e0b"},
    {label:"Calls Today",value:12,icon:"📞",color:"#3b82f6"},
    {label:"Responders Available",value:4,icon:"🚑",color:"#10b981"}
  ]

  return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px"}}>

      {stats.map((s,i)=>(
        <div key={i} style={{
          background:"#1e293b",
          padding:"10px",
          borderRadius:"8px",
          textAlign:"center",
          border: `2px solid ${s.color}30`
        }}>
          <div style={{fontSize: '20px', marginBottom: '2px'}}>{s.icon}</div>
          <p style={{margin: '0 0 2px 0', fontSize: '11px', color: '#94a3b8'}}>{s.label}</p>
          <h2 style={{margin: 0, fontSize: '24px', color: s.color}}>{s.value}</h2>
        </div>
      ))}

    </div>
  )
}


export default function StatCards(){

  const stats=[
    {label:"Active Alerts",value:3},
    {label:"High Risk Seniors",value:5},
    {label:"Calls Today",value:12},
    {label:"Responders Available",value:4}
  ]

  return(
    <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"10px"}}>

      {stats.map((s,i)=>(
        <div key={i} style={{background:"#1e293b",padding:"15px",borderRadius:"10px",textAlign:"center"}}>
          <p>{s.label}</p>
          <h2>{s.value}</h2>
        </div>
      ))}

    </div>
  )
}

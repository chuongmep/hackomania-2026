
export default function SummaryPanel(){

  return(
    <div style={{background:"#1e293b",padding:"15px",borderRadius:"10px"}}>

      <h3>AI Situation Summary</h3>

      <p><b>Senior:</b> Mr Tan</p>
      <p><b>Location:</b> Bedok Blk 214</p>
      <p><b>Alert:</b> Fall Detected</p>

      <p style={{marginTop:"10px"}}><b>Assessment:</b></p>
      <ul>
        <li>High risk of injury</li>
        <li>No movement detected</li>
        <li>Immediate response recommended</li>
      </ul>

      <div style={{marginTop:"10px"}}>
        <button style={{width:"100%",marginBottom:"5px"}}>Call Senior</button>
        <button style={{width:"100%",marginBottom:"5px"}}>Notify Family</button>
        <button style={{width:"100%"}}>Dispatch Ambulance</button>
      </div>

    </div>
  )
}

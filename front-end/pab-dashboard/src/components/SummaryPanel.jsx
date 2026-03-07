
export default function SummaryPanel(){

  return(
    <div style={{background:"#1e293b",padding:"12px",borderRadius:"8px"}}>

      <h3 style={{margin: '0 0 8px 0', fontSize: '16px'}}>🤖 AI Situation Summary</h3>

      <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '12px'}}>
        <div style={{background: '#334155', padding: '8px', borderRadius: '6px'}}>
          <div style={{color: '#94a3b8', marginBottom: '2px'}}>Senior</div>
          <div style={{fontWeight: '600'}}>Mr Kumar</div>
        </div>
        <div style={{background: '#334155', padding: '8px', borderRadius: '6px'}}>
          <div style={{color: '#94a3b8', marginBottom: '2px'}}>Location</div>
          <div style={{fontWeight: '600'}}>Tampines Ave 5</div>
        </div>
        <div style={{background: '#334155', padding: '8px', borderRadius: '6px'}}>
          <div style={{color: '#94a3b8', marginBottom: '2px'}}>Alert</div>
          <div style={{fontWeight: '600', color: '#ef4444'}}>Medical Alert</div>
        </div>
      </div>

      <div style={{marginTop: '8px', background: '#334155', padding: '8px', borderRadius: '6px', fontSize: '12px'}}>
        <div style={{fontWeight: '600', marginBottom: '4px', color: '#f59e0b'}}>⚠️ Assessment:</div>
        <ul style={{margin: 0, paddingLeft: '20px', lineHeight: '1.6'}}>
          <li>High risk - immediate response needed</li>
          <li>No movement detected for 2 minutes</li>
          <li>Vitals monitoring alert triggered</li>
        </ul>
      </div>

    </div>
  )
}

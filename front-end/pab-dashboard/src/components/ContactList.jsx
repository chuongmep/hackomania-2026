export default function ContactList({ selectedAlert, personalContacts = [] }) {
  
  const emergencyContacts = [
    {
      name: "Emergency Ops Center",
      role: "Primary Response",
      phone: "+65 6123 4567",
      icon: "center",
      priority: "high"
    },
    {
      name: "Ambulance Dispatch",
      role: "Medical Emergency",
      phone: "+65 995",
      icon: "ambulance",
      priority: "high"
    },
    {
      name: "Police Emergency",
      role: "Security Support",
      phone: "+65 999",
      icon: "police",
      priority: "medium"
    }
  ];

  const familyContacts = selectedAlert ? 
    personalContacts.map(contact => ({
      name: contact.name,
      relation: contact.relation,
      phone: contact.phone ? `+65 ${contact.phone}` : "N/A",
      address: contact.address,
      icon: "family",
      priority: "medium"
    }))
  : [];

  const getIcon = (type) => {
    const icons = {
      center: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>,
      ambulance: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M9 11l3-3m0 0l3 3m-3-3v8" />
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>,
      police: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>,
      family: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>,
      doctor: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    };
    return icons[type] || icons.family;
  };

  const ContactCard = ({ contact }) => (
    <div style={{
      background: 'rgba(51, 65, 85, 0.5)',
      padding: '6px',
      borderRadius: '6px',
      border: '1px solid rgba(71, 85, 105, 0.3)',
      transition: 'all 0.2s',
      cursor: 'pointer'
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.background = 'rgba(59, 130, 246, 0.15)';
      e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.5)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.background = 'rgba(51, 65, 85, 0.5)';
      e.currentTarget.style.borderColor = 'rgba(71, 85, 105, 0.3)';
    }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <div style={{
          width: '28px',
          height: '28px',
          borderRadius: '5px',
          background: contact.priority === 'high' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: contact.priority === 'high' ? '#ef4444' : '#3b82f6',
          flexShrink: 0
        }}>
          <div style={{ width: '14px', height: '14px' }}>
            {getIcon(contact.icon)}
          </div>
        </div>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: '600',
            fontSize: '12px',
            color: '#e2e8f0',
            marginBottom: '1px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {contact.name}
          </div>
          <div style={{
            fontSize: '11px',
            color: '#94a3b8',
            marginBottom: '2px'
          }}>
            {contact.role || contact.relation}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '3px',
            fontSize: '11px',
            color: '#cbd5e1',
            fontWeight: '500'
          }}>
            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            {contact.phone}
          </div>
        </div>
        
        <button style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#fff',
          border: 'none',
          padding: '5px 8px',
          borderRadius: '5px',
          fontSize: '11px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 2px 4px rgba(16, 185, 129, 0.3)',
          transition: 'all 0.2s',
          flexShrink: 0
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        onClick={(e) => {
          e.stopPropagation();
          alert(`Calling ${contact.name} at ${contact.phone}...`);
        }}
        >
          Call
        </button>
      </div>
    </div>
  );

  return (
    <div style={{
      background: "rgba(30, 41, 59, 0.6)",
      padding: "14px",
      borderRadius: "10px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(71, 85, 105, 0.5)",
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '12px',
        paddingBottom: '10px',
        borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
        flexShrink: 0
      }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
        <h3 style={{ margin: 0, fontSize: '13px', fontWeight: '600', letterSpacing: '-0.3px', flex: 1 }}>
          Emergency Contacts
        </h3>
        <span style={{
          background: '#10b98120',
          color: '#10b981',
          padding: '3px 8px',
          borderRadius: '6px',
          fontSize: '11px',
          fontWeight: '700',
          letterSpacing: '0.5px'
        }}>
          READY
        </span>
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        overflowX: 'hidden',
        paddingRight: '4px',
        minHeight: 0
      }}>
        <style>{`
          .contact-list > div::-webkit-scrollbar {
            width: 6px;
          }
          .contact-list > div::-webkit-scrollbar-track {
            background: rgba(15, 23, 42, 0.5);
            border-radius: 3px;
          }
          .contact-list > div::-webkit-scrollbar-thumb {
            background: rgba(148, 163, 184, 0.5);
            border-radius: 3px;
          }
          .contact-list > div::-webkit-scrollbar-thumb:hover {
            background: rgba(148, 163, 184, 0.7);
          }
        `}</style>
        {/* Emergency Response */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: '700',
            color: '#94a3b8',
            letterSpacing: '1px',
            marginBottom: '5px',
            textTransform: 'uppercase'
          }}>
            Hotline
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {emergencyContacts.map((contact, i) => (
              <ContactCard key={i} contact={contact} />
            ))}
          </div>
        </div>

        {/* Family Contacts */}
        {selectedAlert && (
          <div>
            <div style={{
              fontSize: '11px',
              fontWeight: '700',
              color: '#94a3b8',
              letterSpacing: '1px',
              marginBottom: '5px',
              textTransform: 'uppercase'
            }}>
              Family & Personal
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {familyContacts.map((contact, i) => (
                <ContactCard key={i} contact={contact} />
              ))}
            </div>
          </div>
        )}

        {!selectedAlert && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            color: '#64748b',
            fontSize: '12px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 8px', opacity: 0.5 }}>
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Select an alert to view family contacts
          </div>
        )}
      </div>

    
    </div>
  );
}

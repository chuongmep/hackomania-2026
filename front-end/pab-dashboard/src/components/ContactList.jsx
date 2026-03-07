export default function ContactList({ selectedAlert }) {
  
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

  const familyContacts = selectedAlert ? [
    {
      name: selectedAlert.id === 1 ? "Tan Wei Ming" : selectedAlert.id === 2 ? "Lee Hui Ling" : "Kumar Sanjay",
      relation: "Son",
      phone: selectedAlert.id === 1 ? "+65 9123 4567" : selectedAlert.id === 2 ? "+65 9234 5678" : "+65 9345 6789",
      icon: "family",
      priority: "high"
    },
    {
      name: selectedAlert.id === 1 ? "Tan Mei Ling" : selectedAlert.id === 2 ? "Lee Chen Wei" : "Kumar Priya",
      relation: "Daughter",
      phone: selectedAlert.id === 1 ? "+65 9234 5678" : selectedAlert.id === 2 ? "+65 9345 6789" : "+65 9456 7890",
      icon: "family",
      priority: "medium"
    },
    {
      name: "Family Doctor",
      relation: "Dr. Wong",
      phone: "+65 6234 5678",
      icon: "doctor",
      priority: "medium"
    }
  ] : [];

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
      padding: '10px',
      borderRadius: '8px',
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '36px',
          height: '36px',
          borderRadius: '8px',
          background: contact.priority === 'high' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(59, 130, 246, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: contact.priority === 'high' ? '#ef4444' : '#3b82f6',
          flexShrink: 0
        }}>
          <div style={{ width: '18px', height: '18px' }}>
            {getIcon(contact.icon)}
          </div>
        </div>
        
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontWeight: '600',
            fontSize: '12px',
            color: '#e2e8f0',
            marginBottom: '2px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}>
            {contact.name}
          </div>
          <div style={{
            fontSize: '10px',
            color: '#94a3b8',
            marginBottom: '4px'
          }}>
            {contact.role || contact.relation}
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '11px',
            color: '#cbd5e1',
            fontWeight: '500'
          }}>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            {contact.phone}
          </div>
        </div>
        
        <button style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: '#fff',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '6px',
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
        <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '600', letterSpacing: '-0.3px', flex: 1 }}>
          Emergency Contacts
        </h3>
        <span style={{
          background: '#10b98120',
          color: '#10b981',
          padding: '3px 8px',
          borderRadius: '6px',
          fontSize: '10px',
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
        {/* Emergency Response */}
        <div style={{ marginBottom: '12px' }}>
          <div style={{
            fontSize: '10px',
            fontWeight: '700',
            color: '#94a3b8',
            letterSpacing: '1px',
            marginBottom: '8px',
            textTransform: 'uppercase'
          }}>
            Emergency Response
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {emergencyContacts.map((contact, i) => (
              <ContactCard key={i} contact={contact} />
            ))}
          </div>
        </div>

        {/* Family Contacts */}
        {selectedAlert && (
          <div>
            <div style={{
              fontSize: '10px',
              fontWeight: '700',
              color: '#94a3b8',
              letterSpacing: '1px',
              marginBottom: '8px',
              textTransform: 'uppercase'
            }}>
              Family & Personal
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
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
            fontSize: '11px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" style={{ margin: '0 auto 8px', opacity: 0.5 }}>
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Select an alert to view family contacts
          </div>
        )}
      </div>

      {/* Quick Dial All Button */}
      {selectedAlert && (
        <div style={{ 
          marginTop: '10px', 
          paddingTop: '10px', 
          borderTop: '1px solid rgba(71, 85, 105, 0.3)',
          flexShrink: 0
        }}>
          <button style={{
            width: '100%',
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            color: '#fff',
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(239, 68, 68, 0.3)',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 12px rgba(239, 68, 68, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 6px rgba(239, 68, 68, 0.3)';
          }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
            </svg>
            EMERGENCY BROADCAST CALL
          </button>
        </div>
      )}
    </div>
  );
}

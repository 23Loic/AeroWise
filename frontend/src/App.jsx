import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// ==================== COMPOSANTS ====================

const Header = ({ onToggleFilters }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon">🦉</div>
          <div className="logo-text">
            <h1>AeroWize</h1>
            <span>Biodiversity & Incident System</span>
          </div>
        </div>
      </div>

      <div className="header-center">
        <div className="date-range-picker">
          <input type="date" defaultValue="2024-01-15" />
          <span className="separator">to</span>
          <input type="date" defaultValue="2024-02-05" />
        </div>

        <div className="filter-badge" onClick={onToggleFilters}>
          <span>Filters</span>
          <span className="badge">4</span>
        </div>
      </div>

      <div className="header-right">
        <div className="status-indicator">
          <div className="pulse-dot"></div>
          <span>System: <strong>Online</strong></span>
        </div>

        <div className="agents-count">
          <span>👥 Agents Active: <strong>5</strong></span>
        </div>

        <button className="icon-button">
          <span>🔔</span>
          <span className="notification-badge">3</span>
        </button>

        <button className="icon-button">⚙️</button>

        <div className="user-avatar">JD</div>
      </div>
    </header>
  );
};

const FilterSidebar = ({ isOpen, onClose, filters, onFilterChange }) => {
  return (
    <div className={`filter-sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2>Filters & Controls</h2>
        <button className="close-btn" onClick={onClose}>✕</button>
      </div>

      <div className="sidebar-content">
        {/* Type d'événement */}
        <div className="filter-section">
          <h3>Event Type</h3>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.incidents}
              onChange={(e) => onFilterChange('incidents', e.target.checked)}
            />
            <span className="checkbox-text">
              <span className="dot incident-dot"></span>
              Bird Strikes
            </span>
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.observations}
              onChange={(e) => onFilterChange('observations', e.target.checked)}
            />
            <span className="checkbox-text">
              <span className="dot observation-dot"></span>
              Wildlife Sightings
            </span>
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.signals}
              onChange={(e) => onFilterChange('signals', e.target.checked)}
            />
            <span className="checkbox-text">
              <span className="dot signal-dot"></span>
              Field Reports
            </span>
          </label>
        </div>

        {/* Espèce */}
        <div className="filter-section">
          <h3>Species</h3>
          <select 
            value={filters.species}
            onChange={(e) => onFilterChange('species', e.target.value)}
          >
            <option value="all">All Species</option>
            <option value="goose">Canada Goose</option>
            <option value="buzzard">Common Buzzard</option>
            <option value="gull">Seagull</option>
            <option value="heron">Grey Heron</option>
          </select>
        </div>

        {/* Criticité */}
        <div className="filter-section">
          <h3>Risk Level</h3>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.critical}
              onChange={(e) => onFilterChange('critical', e.target.checked)}
            />
            <span className="checkbox-text">Critical</span>
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.high}
              onChange={(e) => onFilterChange('high', e.target.checked)}
            />
            <span className="checkbox-text">High</span>
          </label>
          <label className="checkbox-label">
            <input 
              type="checkbox" 
              checked={filters.medium}
              onChange={(e) => onFilterChange('medium', e.target.checked)}
            />
            <span className="checkbox-text">Medium</span>
          </label>
        </div>

        {/* Stats */}
        <div className="stats-widget">
          <h3>Statistics</h3>
          <div className="stat-item">
            <span>Incidents this month</span>
            <strong>47</strong>
          </div>
          <div className="stat-item">
            <span>Observations</span>
            <strong>124</strong>
          </div>
          <div className="stat-item">
            <span>High-risk zones</span>
            <strong>5</strong>
          </div>
        </div>

        <button className="reset-btn" onClick={() => onFilterChange('reset')}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

const MapView = ({ incidents, selectedIncident, onSelectIncident }) => {
  const [viewMode, setViewMode] = useState('markers'); // markers | heatmap

  return (
    <div className="map-view">
      {/* Map Controls */}
      <div className="map-controls">
        <div className="control-panel">
          <div className="panel-title">Layer Selection</div>
          <button className="layer-btn">🛰️ Satellite</button>
          <button className="layer-btn active">🗺️ Topographic</button>
        </div>

        <div className="control-panel">
          <div className="panel-title">Legend</div>
          <div className="legend-item">
            <span className="legend-dot incident-dot"></span>
            <span>Incidents</span>
            <span className="count">47</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot observation-dot"></span>
            <span>Observations</span>
            <span className="count">124</span>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <button 
          className={viewMode === 'markers' ? 'active' : ''}
          onClick={() => setViewMode('markers')}
        >
          📍 Markers
        </button>
        <button 
          className={viewMode === 'heatmap' ? 'active' : ''}
          onClick={() => setViewMode('heatmap')}
        >
          🔥 Heatmap
        </button>
      </div>

      {/* Map placeholder (Leaflet serait intégré ici) */}
      <div className="map-canvas">
        <div className="map-grid"></div>
        
        {/* Simulated markers */}
        {incidents.map(incident => (
          <div
            key={incident.id}
            className={`map-marker ${incident.type} ${selectedIncident?.id === incident.id ? 'selected' : ''}`}
            style={{ top: incident.position.top, left: incident.position.left }}
            onClick={() => onSelectIncident(incident)}
          >
            <div className="marker-pulse"></div>
            <div className="marker-circle">{incident.icon}</div>
            <div className="marker-label">{incident.id}</div>
          </div>
        ))}

        {/* Runway simulation */}
        <div className="runway">
          <span className="runway-label">Runway 27L - Sector A3</span>
        </div>
      </div>

      {/* Map Info */}
      <div className="map-info">
        Map View: Topographic | Last update: 2 min ago
      </div>
    </div>
  );
};

const DetailPanel = ({ incident, onClose }) => {
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'assistant',
      text: 'Hello! I can help analyze this incident. What would you like to know?',
      time: '14:35'
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      type: 'user',
      text: inputValue,
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, newMessage]);
    setInputValue('');

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [...prev, {
        type: 'assistant',
        text: 'Based on the analysis of similar incidents and current weather conditions, this represents a high-risk scenario. I recommend immediate inspection of the affected area.',
        time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1000);
  };

  if (!incident) {
    return (
      <div className="detail-panel empty">
        <div className="empty-state">
          <div className="empty-icon">🗺️</div>
          <h3>No Incident Selected</h3>
          <p>Click on a marker on the map to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-panel">
      {/* Header */}
      <div className="panel-header">
        <div className="header-top">
          <div>
            <div className="panel-title">CONTEXT DETAILS</div>
            <h2>{incident.title}</h2>
          </div>
          <div className="header-actions">
            <button className="icon-btn">📤</button>
            <button className="icon-btn">🖨️</button>
            <button className="icon-btn" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="risk-badge">{incident.risk}</div>

        <div className="species-section">
          <div className="species-image">{incident.speciesIcon}</div>
          <div className="species-info">
            <span className="label">SPECIES DETECTED</span>
            <h3>{incident.species}</h3>
            <div className="alert">⚠️ {incident.alertType}</div>
          </div>
        </div>

        <div className="meta-grid">
          <div className="meta-item">
            <span className="label">Time</span>
            <span className="value">{incident.time}</span>
          </div>
          <div className="meta-item">
            <span className="label">Location</span>
            <span className="value">{incident.location}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="panel-content">
        {/* Weather */}
        <div className="info-block">
          <h3>Weather Conditions</h3>
          <div className="weather-grid">
            <div className="weather-item">
              <div className="icon">☀️</div>
              <div className="value">Clear</div>
              <div className="label">Conditions</div>
            </div>
            <div className="weather-item">
              <div className="icon">💨</div>
              <div className="value">12 kt NW</div>
              <div className="label">Wind</div>
            </div>
            <div className="weather-item">
              <div className="icon">🌡️</div>
              <div className="value">18°C</div>
              <div className="label">Temp</div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="info-block">
          <h3>Incident Summary</h3>
          <div className="summary-text">
            {incident.summary}
          </div>
        </div>

        {/* Additional Details */}
        <div className="info-block">
          <h3>Additional Details</h3>
          <div className="details-grid">
            <div className="detail-item">
              <span className="label">Incident ID</span>
              <span className="value">{incident.id}</span>
            </div>
            <div className="detail-item">
              <span className="label">Flight Phase</span>
              <span className="value">{incident.flightPhase}</span>
            </div>
            <div className="detail-item">
              <span className="label">Altitude</span>
              <span className="value">{incident.altitude}</span>
            </div>
            <div className="detail-item">
              <span className="label">Damage Level</span>
              <span className="value">{incident.damageLevel}</span>
            </div>
            <div className="detail-item">
              <span className="label">Reporting Agent</span>
              <span className="value">{incident.agent}</span>
            </div>
            <div className="detail-item">
              <span className="label">Status</span>
              <span className="value status">{incident.status}</span>
            </div>
          </div>
        </div>

        {/* Similar Incidents */}
        <div className="info-block">
          <h3>Similar Incidents (Last 30 Days)</h3>
          <div className="similar-incidents">
            {incident.similarIncidents.map((similar, idx) => (
              <div key={idx} className="similar-card">
                <div className="similar-title">{similar.id} - {similar.species}</div>
                <div className="similar-meta">{similar.date} • {similar.location} • {similar.distance}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chatbot */}
      <div className="chatbot-section">
        <div className="chatbot-header">
          <div className="chatbot-title">
            <div className="ai-icon">🤖</div>
            <span>AI Analyst</span>
          </div>
          <div className="chatbot-status">Powered by AeroWize Intelligence</div>
        </div>

        <div className="chat-messages">
          {chatMessages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.type}`}>
              <div className="message-text">{msg.text}</div>
              <div className="message-time">{msg.time}</div>
            </div>
          ))}
        </div>

        <div className="chat-input-area">
          <input
            type="text"
            placeholder="Ask about this incident..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <button className="send-btn" onClick={handleSendMessage}>➤</button>
        </div>
      </div>
    </div>
  );
};

// ==================== COMPOSANT PRINCIPAL ====================

const AeroWizeApp = () => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filters, setFilters] = useState({
    incidents: true,
    observations: true,
    signals: true,
    species: 'all',
    critical: true,
    high: true,
    medium: true
  });

  // Données simulées
  const incidents = [
    {
      id: 'INC-2345',
      type: 'incident',
      icon: '⚠️',
      position: { top: '35%', left: '45%' },
      title: 'Bird Strike Incident',
      species: 'Canada Goose',
      speciesIcon: '🦆',
      risk: 'High Risk',
      alertType: 'Bird Strike Incident',
      time: '14:32 UTC',
      location: 'Runway 27L - Sector A3',
      summary: 'Bird strike incident involving a Canada Goose detected at Runway 27L, Sector A3. The incident occurred during approach phase at 14:32 UTC. Visual confirmation by ground personnel. Aircraft inspection required before next departure.',
      flightPhase: 'Approach',
      altitude: '150 ft AGL',
      damageLevel: 'Minor',
      agent: 'M. Dupont',
      status: 'Under Review',
      similarIncidents: [
        { id: 'INC-2301', species: 'Canada Goose', date: '12/01/2024', location: 'Runway 08R', distance: '500m' },
        { id: 'INC-2318', species: 'Waterfowl', date: '18/01/2024', location: 'Runway 27L', distance: '750m' },
        { id: 'INC-2332', species: 'Large Bird', date: '28/01/2024', location: 'North Zone', distance: '1.2km' }
      ]
    },
    {
      id: 'OBS-8821',
      type: 'observation',
      icon: '🦆',
      position: { top: '55%', left: '65%' },
      title: 'Wildlife Observation',
      species: 'Grey Heron',
      speciesIcon: '🦅',
      risk: 'Medium Risk',
      alertType: 'Wildlife Sighting',
      time: '12:15 UTC',
      location: 'North Zone - Wetland Area',
      summary: 'Grey Heron observed near wetland area adjacent to north taxiway. Bird appeared to be fishing. No immediate threat to operations.',
      flightPhase: 'N/A',
      altitude: 'Ground Level',
      damageLevel: 'None',
      agent: 'S. Martin',
      status: 'Monitoring',
      similarIncidents: []
    },
    {
      id: 'SIG-1023',
      type: 'signal',
      icon: '📍',
      position: { top: '42%', left: '70%' },
      title: 'Field Report',
      species: 'Unknown',
      speciesIcon: '❓',
      risk: 'Low Risk',
      alertType: 'Field Report',
      time: '10:45 UTC',
      location: 'East Perimeter',
      summary: 'Nest detected near perimeter fence. Requires inspection to identify species and assess risk.',
      flightPhase: 'N/A',
      altitude: 'N/A',
      damageLevel: 'None',
      agent: 'L. Bernard',
      status: 'Pending',
      similarIncidents: []
    }
  ];

  const handleFilterChange = (key, value) => {
    if (key === 'reset') {
      setFilters({
        incidents: true,
        observations: true,
        signals: true,
        species: 'all',
        critical: true,
        high: true,
        medium: true
      });
    } else {
      setFilters(prev => ({ ...prev, [key]: value }));
    }
  };

  return (
    <div className="aerowize-app">
      <Header onToggleFilters={() => setFiltersOpen(!filtersOpen)} />
      
      <FilterSidebar 
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      <div className="main-layout">
        <MapView 
          incidents={incidents}
          selectedIncident={selectedIncident}
          onSelectIncident={setSelectedIncident}
        />

        <DetailPanel 
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      </div>
    </div>
  );
};

export default AeroWizeApp;
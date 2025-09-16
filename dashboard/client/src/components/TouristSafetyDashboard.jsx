import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const API_BASE = 'http://localhost:4000';

export default function TouristSafetyDashboard(){
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(()=>{
    fetch(`${API_BASE}/api/tourists`).then(r=>r.json()).then(setTourists).catch(console.error);
    fetch(`${API_BASE}/api/alerts`).then(r=>r.json()).then(setAlerts).catch(console.error);
  },[]);

  return (
    <div style={{fontFamily:'sans-serif', padding:12}}>
      <header style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
        <h1>Tourist Safety — Control Panel</h1>
        <div>Alerts: {alerts.length}</div>
      </header>

      <div style={{display:'grid',gridTemplateColumns:'1fr 2fr 1fr',gap:12}}>
        <div style={{background:'#fff', padding:12, borderRadius:8}}>
          <h3>Metrics</h3>
          <p>Active tourists: {tourists.length}</p>
          <p>Active alerts: {alerts.length}</p>
        </div>

        <div style={{background:'#fff', padding:0, borderRadius:8}}>
          <MapContainer center={[27.1,94.4]} zoom={9} style={{height:400}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {tourists.map(t => (
              <CircleMarker key={t.id} center={[t.lat, t.lng]} radius={6}>
                <Popup>
                  <div><strong>{t.name}</strong><div>Score: {t.score}</div></div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        <aside style={{background:'#fff', padding:12, borderRadius:8}}>
          <h3>Recent Alerts</h3>
          <ul>
            {alerts.map(a => <li key={a.id}>{a.message} — {new Date(a.time).toLocaleTimeString()}</li>)}
          </ul>
        </aside>
      </div>
    </div>
  );
}

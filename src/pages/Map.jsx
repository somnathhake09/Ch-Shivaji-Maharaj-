import React, { useState, useRef, useEffect } from "react";
import { useLang, SectionHeader, FORTS_MAP_DATA } from "../components/shared";

function FortMap() {
  const lang = useLang();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef([]);

  const filters = [
    { key:"all",     mr:"सर्व",       en:"All" },
    { key:"capital", mr:"राजधानी",    en:"Capital" },
    { key:"battle",  mr:"युद्धभूमी",  en:"Battle" },
    { key:"birth",   mr:"जन्मभूमी",  en:"Birthplace" },
    { key:"sea",     mr:"सागरी",      en:"Sea Fort" },
  ];

  const legend = [
    { color:"#d85a30", mr:"राजधानी",   en:"Capital" },
    { color:"#185fa5", mr:"युद्धभूमी", en:"Battle" },
    { color:"#3b6d11", mr:"जन्मभूमी", en:"Birthplace" },
    { color:"#534ab7", mr:"सागरी",     en:"Sea Fort" },
  ];

  const visible = FORTS_MAP_DATA.filter(f => filter === "all" || f.type === filter);
  const selFort = FORTS_MAP_DATA.find(f => f.id === selected);

  useEffect(() => {
    if (document.getElementById('leaflet-css')) return;
    const link = document.createElement('link');
    link.id = 'leaflet-css';
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => initMap();
    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    if (!mapRef.current || leafletMap.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, {
      center: [18.5, 74.5],
      zoom: 7,
      zoomControl: true,
      attributionControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    leafletMap.current = map;
    addMarkers(map, FORTS_MAP_DATA);
  };

  const addMarkers = (map, forts) => {
    const L = window.L;
    if (!L) return;

    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    forts.forEach(fort => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:16px;height:16px;border-radius:50%;
          background:${fort.color};
          border:2.5px solid rgba(255,255,255,0.85);
          box-shadow:0 0 10px ${fort.color},0 0 20px ${fort.color}44;
          cursor:pointer;transition:all .2s;
        "></div>`,
        iconSize: [16,16],
        iconAnchor: [8,8],
      });

      const marker = L.marker([fort.lat, fort.lng], { icon })
        .addTo(map)
        .on('click', () => setSelected(prev => prev === fort.id ? null : fort.id));

      marker.bindTooltip(`
        <div style="font-family:serif;font-size:13px;color:#e8b830;font-weight:600;background:#0d0500;border:1px solid rgba(200,145,12,.4);border-radius:8px;padding:6px 12px;">
          🏰 ${fort.name}
        </div>
      `, {
        permanent: false,
        direction: 'top',
        offset: [0, -10],
        opacity: 1,
        className: 'shivaji-tooltip'
      });

      markersRef.current.push(marker);
    });
  };

  useEffect(() => {
    if (!leafletMap.current || !window.L) return;
    addMarkers(leafletMap.current, visible);
  }, [filter]);

  useEffect(() => {
    if (!leafletMap.current || !selFort) return;
    leafletMap.current.flyTo([selFort.lat, selFort.lng], 10, { duration: 1.2 });
  }, [selected]);

  return (
    <section className="section map-sec" id="map">
      <div className="wrap">
        <SectionHeader
          chipMr="नकाशा" chipEn="Map"
          titleMr="किल्ल्यांचा नकाशा" titleEn="Map of Forts"
          desc="महाराजांनी जिंकलेल्या व बांधलेल्या प्रमुख किल्ल्यांचा इंटरएक्टिव नकाशा"
          descEn="Interactive map of the key forts captured and built by Maharaj" />

        <div className="map-filters">
          {filters.map(f => (
            <button key={f.key}
              className={`mf-btn${filter === f.key ? " on" : ""}`}
              onClick={() => { setFilter(f.key); setSelected(null); }}>
              {lang === "mr" ? f.mr : f.en}
            </button>
          ))}
        </div>

        <div className="map-container">
          <div>
            <div className="map-svg-wrap" style={{borderRadius:16,overflow:"hidden",position:"relative"}}>
              <div ref={mapRef} style={{height:460,width:"100%"}} />
              <div style={{
                position:"absolute",top:12,left:12,zIndex:1000,
                background:"rgba(5,2,0,.88)",border:"1px solid rgba(200,145,12,.35)",
                borderRadius:10,padding:"6px 14px",
                fontFamily:"var(--fd)",fontSize:".82rem",color:"var(--gold2)"
              }}>
                🏰 {visible.length} {lang==="mr"?"किल्ले":"Forts"}
              </div>
            </div>
            <div className="map-legend">
              {legend.map(l => (
                <div className="leg-it" key={l.color}>
                  <div className="leg-dot" style={{background:l.color}}/>
                  <span>{lang==="mr"?l.mr:l.en}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="map-panel">
            <div className={`map-detail${selFort?" has-fort":""}`}>
              {!selFort ? (
                <div className="md-empty">
                  🗺<br/>
                  {lang==="mr"
                    ?"नकाशावरील किल्ल्यावर click करा — संपूर्ण माहिती मिळेल"
                    :"Click on a fort marker on the map to see details"}
                </div>
              ) : (
                <>
                  <div className="md-name">{lang==="mr"?selFort.name:selFort.nameEn}</div>
                  <div className="md-loc">📍 {selFort.dist}</div>
                  <div className="md-row"><span className="md-key">⛰ {lang==="mr"?"उंची":"Elevation"}</span><span className="md-val">{selFort.elev}</span></div>
                  <div className="md-row"><span className="md-key">📅 {lang==="mr"?"वर्ष":"Year"}</span><span className="md-val">{selFort.year}</span></div>
                  <div className="md-row"><span className="md-key">⭐ {lang==="mr"?"प्रसिद्ध":"Famous for"}</span><span className="md-val">{lang==="mr"?selFort.event:selFort.eventEn}</span></div>
                  <div className="md-desc">{lang==="mr"?selFort.desc:selFort.descEn}</div>
                  <div className="md-tags">
                    {(lang==="mr"?selFort.tags:selFort.tagsEn).map(t=>(
                      <span className="md-tag" key={t}>{t}</span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              <div className="map-count">{visible.length} {lang==="mr"?"किल्ले":"Forts"}</div>
              <div className="map-list">
                {visible.map(f => (
                  <div key={f.id}
                    className={`ml-item${selected===f.id?" sel":""}`}
                    onClick={() => setSelected(selected===f.id ? null : f.id)}>
                    <div className="ml-dot" style={{background:f.color}}/>
                    <div>
                      <div className="ml-name">{lang==="mr"?f.name:f.nameEn}</div>
                      <div className="ml-event">{lang==="mr"?f.event:f.eventEn} · {f.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .shivaji-tooltip { background:transparent!important; border:none!important; box-shadow:none!important; }
        .shivaji-tooltip::before { display:none!important; }
        .leaflet-container { background:#0d0500!important; }
        .leaflet-control-attribution { background:rgba(5,2,0,.7)!important; color:#967030!important; font-size:10px!important; }
        .leaflet-control-attribution a { color:var(--saf)!important; }
      `}</style>
    </section>
  );
}

export default FortMap;

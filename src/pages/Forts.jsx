import React from "react";
import { useLang, SectionHeader, FORTS_DATA, navigate } from "../components/shared";

function Forts() {
  const lang = useLang();
  return (
    <section className="section forts-sec" id="forts">
      <div className="wrap">
        <SectionHeader chipMr="किल्ले" chipEn="Forts"
          titleMr="गडांचे साम्राज्य" titleEn="Empire of Forts"
          desc="महाराजांनी ३५० हून अधिक किल्ले जिंकले, बांधले आणि सुरक्षित केले."
          descEn="Maharaj captured, built and secured over 350 forts — the backbone of Swarajya." />
        <div className="forts-grid">
          {FORTS_DATA.map(f => (
            <div className="fort-card" key={f.nameMr}
              onMouseMove={e => { const r=e.currentTarget.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5; e.currentTarget.style.transform=`translateY(-9px) rotateX(${-y*5}deg) rotateY(${x*5}deg)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform=""; }}>
              <div className="fc-img">
                <img src={f.img} alt={f.nameMr} onError={e=>e.target.closest(".fc-img").style.background="#1a0800"} />
                <div className="fc-overlay"/>
                <span className="fc-badge">{lang==="mr"?f.badgeMr:f.badgeEn}</span>
                <span className="fc-elev">{f.elev}</span>
              </div>
              <div className="fc-body">
                <h3>{lang==="mr"?f.nameMr:f.nameEn}</h3>
                <p className="fc-subtitle">{lang==="mr"?f.subtitleMr:f.subtitleEn}</p>
                <p>{lang==="mr"?f.descMr:f.descEn}</p>
                <div className="fc-pills">
                  {(lang==="mr"?f.pillsMr:f.pillsEn).map(p=><span className="fc-pill" key={p}>{p}</span>)}
                </div>
                <button className="fc-more" onClick={() => navigate("/map")}>
                  {lang==="mr" ? "नकाशावर पाहा →" : "View on Map →"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Forts;

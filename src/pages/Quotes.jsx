import React, { useState, useEffect } from "react";
import { useLang, SectionHeader, QUOTES_DATA } from "../components/shared";

function Quotes() {
  const lang = useLang();
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % QUOTES_DATA.length), 5500);
    return () => clearInterval(t);
  }, []);
  const q = QUOTES_DATA[cur];
  return (
    <section className="section quotes-sec" id="quotes">
      <div className="wrap">
        <SectionHeader chipMr="सुविचार" chipEn="Quotes"
          titleMr="अमर वाणी" titleEn="Immortal Words" />
        <div className="quotes-slider" style={{ maxWidth:700, margin:"0 auto" }}>
          <div className="q-slide">
            <span className="q-mark">❝</span>
            <blockquote>{lang==="mr"?q.mr:q.en}</blockquote>
            <cite>— {lang==="mr"?"छत्रपती शिवाजी महाराज":"Chhatrapati Shivaji Maharaj"}</cite>
          </div>
          <div className="q-controls">
            <button className="q-btn" onClick={() => setCur(c => (c-1+QUOTES_DATA.length)%QUOTES_DATA.length)}>‹</button>
            <div className="q-dots">
              {QUOTES_DATA.map((_,i) => <div key={i} className={`qdot${i===cur?" on":""}`} onClick={() => setCur(i)} />)}
            </div>
            <button className="q-btn" onClick={() => setCur(c => (c+1)%QUOTES_DATA.length)}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Quotes;

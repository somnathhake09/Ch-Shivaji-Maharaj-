import React, { useState, useEffect } from "react";
import { useLang, SectionHeader, GALLERY_DATA } from "../components/shared";

function Gallery() {
  const lang = useLang();
  const [lb, setLb] = useState(null);
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") setLb(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { document.body.style.overflow = lb ? "hidden" : ""; }, [lb]);
  return (
    <section className="section gallery-sec" id="gallery">
      <div className="wrap">
        <SectionHeader chipMr="दालन" chipEn="Gallery"
          titleMr="चित्र दालन" titleEn="Photo Gallery" />
        <div className="gal-mosaic">
          {GALLERY_DATA.map((g, i) => (
            <div key={i} className={`gal-item${g.tall?" gal-tall":""}${g.wide?" gal-wide":""}`}
              onClick={() => setLb(g)}>
              <img src={g.img} alt={g.capMr} loading="lazy" />
              <div className="gal-ov">
                <span>⊕</span>
                <p>{lang==="mr"?g.labelMr:g.labelEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lb && (
        <div className="lightbox" onClick={() => setLb(null)}>
          <div className="lb-inner" onClick={e => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setLb(null)}>✕</button>
            <img src={lb.img} alt={lb.capMr} />
            <p className="lb-cap">{lang==="mr"?lb.capMr:lb.capEn}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Gallery;

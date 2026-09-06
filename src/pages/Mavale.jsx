import React from "react";
import { useLang, SectionHeader, MAVALE_DATA } from "../components/shared";

function Mavale() {
  const lang = useLang();
  return (
    <section className="section mavale-sec" id="mavale">
      <div className="wrap">
        <SectionHeader chipMr="मावळे" chipEn="Warriors"
          titleMr="शिवरायांचे शूर मावळे" titleEn="The Brave Warriors of Shivaji"
          desc="महाराजांचे खरे बळ त्यांचे निष्ठावंत मावळे होते."
          descEn="Maharaj's true strength was his loyal warriors. Without them, Swarajya was not possible." />
        <div className="mavale-grid">
          {MAVALE_DATA.map(m => (
            <div className="mavale-card" key={m.nameMr}>
              <span className="mc-icon">{m.icon}</span>
              <h3>{lang==="mr"?m.nameMr:m.nameEn}</h3>
              <span className="mc-title">{lang==="mr"?m.titleMr:m.titleEn}</span>
              <p>{lang==="mr"?m.descMr:m.descEn}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Mavale;

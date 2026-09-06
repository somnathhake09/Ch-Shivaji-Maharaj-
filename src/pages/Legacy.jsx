import React from "react";
import { useLang, SectionHeader, LEGACY_DATA } from "../components/shared";

function Legacy() {
  const lang = useLang();
  return (
    <section className="section legacy-sec" id="legacy">
      <div className="wrap">
        <SectionHeader chipMr="वारसा" chipEn="Legacy"
          titleMr="अजरामर वारसा" titleEn="An Immortal Legacy"
          desc="महाराज देहाने गेले, पण त्यांनी मागे ठेवलेला वारसा आजही भारताला प्रेरणा देतो."
          descEn="Maharaj passed away, but the legacy he left behind continues to inspire India — and always will." />
        <div className="legacy-grid">
          {LEGACY_DATA.map(l => (
            <div className="legacy-item" key={l.nameMr}>
              <span className="li-icon">{l.icon}</span>
              <div className="li-body">
                <h3>{lang==="mr"?l.nameMr:l.nameEn}</h3>
                <p>{lang==="mr"?l.descMr:l.descEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Legacy;

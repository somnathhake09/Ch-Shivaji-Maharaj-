import React from "react";
import { useLang, SectionHeader, BATTLES_DATA } from "../components/shared";

function Battles() {
  const lang = useLang();
  return (
    <section className="section battles-sec" id="battles">
      <div className="wrap">
        <SectionHeader chipMr="युद्धे" chipEn="Battles"
          titleMr="रणभूमीवरील पराक्रम" titleEn="Valor on the Battlefield" />
        <div className="battles-grid">
          {BATTLES_DATA.map(b => (
            <div className="battle-card" key={b.nameMr}>
              <div className="bc-yr">{b.year}</div>
              <div className="bc-icon">{b.icon}</div>
              <h3>{lang==="mr"?b.nameMr:b.nameEn}</h3>
              <div className="bc-vs">
                <span>{lang==="mr"?"मराठे":"Marathas"}</span>
                <strong>{lang==="mr" ? "विरुद्ध" : "VS"}</strong>
                <span>{lang==="mr"?b.vsMr:b.vsEn}</span>
              </div>
              <p>{lang==="mr"?b.descMr:b.descEn}</p>
              <div className={`bc-result${b.win?" win":""}`}>{lang==="mr"?b.resultMr:b.resultEn}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Battles;

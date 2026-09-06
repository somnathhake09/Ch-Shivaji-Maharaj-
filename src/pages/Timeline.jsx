import React from "react";
import { useLang, SectionHeader, TIMELINE_DATA } from "../components/shared";

function Timeline() {
  const lang = useLang();
  return (
    <section className="section timeline-sec" id="timeline">
      <div className="wrap">
        <SectionHeader chipMr="कालक्रम" chipEn="Timeline"
          titleMr="जीवनाचा सुवर्णपट" titleEn="The Golden Chronicle" />
        <div className="tl-wrap">
          <div className="tl-line"/>
          {TIMELINE_DATA.map((item, i) => (
            <div key={item.year} className={`tl-item ${i%2===0?"tl-left":"tl-right"}`}>
              <div className={`tl-card${item.crown?" crown":""}`}>
                <div className="tl-year">{item.year}</div>
                <h3>{lang==="mr"?item.mr:item.en}</h3>
                <p>{lang==="mr"?item.descMr:item.descEn}</p>
              </div>
              <div className={`tl-node${item.crown?" crown":""}`}>{item.icon}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Timeline;

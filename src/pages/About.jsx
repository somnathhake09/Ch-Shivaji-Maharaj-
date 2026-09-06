import React from "react";
import { useLang, SectionHeader, INFO_TABLE } from "../components/shared";

function About() {
  const lang = useLang();
  const tags = [
    { mr:"शूर योद्धा", en:"Warrior King", saf:true },
    { mr:"न्यायी राजा", en:"Just Ruler" },
    { mr:"नौदल निर्माता", en:"Naval Pioneer" },
    { mr:"रयतेचा राजा", en:"People's King", saf:true },
    { mr:"धर्मनिरपेक्ष", en:"Secular" },
    { mr:"दूरदर्शी नेते", en:"Visionary Leader" },
  ];
  return (
    <section className="section about-sec" id="about">
      <div className="wrap">
        <SectionHeader chipMr="परिचय" chipEn="About"
          titleMr="महाराजांचा जीवनपरिचय" titleEn="Life of the Great King"
          desc="इतिहासाच्या सोनेरी पानांवर कोरलेले नाव — करोडो मराठ्यांचा अभिमान"
          descEn="A name etched in golden pages of history — the pride of millions of Marathas" />
        <div className="about-grid">
          <div>
            <div className="portrait-box">
              <img src="/images/maharaj.jpg" alt="Chhatrapati Shivaji Maharaj"
                onError={e => e.target.closest(".portrait-box").style.background="#1a0800"} />
            </div>
            <div className="portrait-label">
              {lang === "mr" ? "छत्रपती शिवाजी महाराज" : "Chhatrapati Shivaji Maharaj"}
            </div>
            <div className="info-table">
              {INFO_TABLE.map(row => (
                <div className="info-row" key={row.keyMr}>
                  <span className="ir-key">{lang === "mr" ? row.keyMr : row.keyEn}</span>
                  <span className="ir-val">{lang === "mr" ? row.valMr : row.valEn}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="about-tags">
              {tags.map(t => <span key={t.mr} className={`tag${t.saf ? " saf" : ""}`}>{lang === "mr" ? t.mr : t.en}</span>)}
            </div>
            {[
              { h:lang==="mr"?"🌱 बालपण आणि शिक्षण":"🌱 Childhood & Education", p:lang==="mr"?"छत्रपती शिवाजी महाराजांचा जन्म १९ फेब्रुवारी १६३० रोजी शिवनेरी किल्ल्यावर झाला. आईचं नाव राजमाता जिजाबाई — त्यांनीच शिवाजींना रामायण, महाभारत आणि शूर वीरांच्या कथा सांगून मनात स्वराज्याची ज्योत लावली.":"Chhatrapati Shivaji Maharaj was born on 19 February 1630 at Shivneri Fort. His mother Rajmata Jijabai narrated stories from the Ramayana, igniting the flame of Swarajya in his heart." },
              { h:lang==="mr"?"⚔ स्वराज्याची स्थापना":"⚔ Founding of Swarajya", p:lang==="mr"?"वयाच्या अवघ्या सोळाव्या वर्षी तोरणा किल्ला जिंकून महाराजांनी स्वराज्याचे पहिले पाऊल टाकले. मुघल, आदिलशाही आणि पोर्तुगीज — या तीन महाशक्तींशी एकाच वेळी लढत त्यांनी स्वतंत्र मराठा साम्राज्य उभारले.":"At just sixteen, he captured Torna Fort — the first step towards Swarajya. Simultaneously fighting the Mughals, Adilshahi and Portuguese, he built an independent Maratha Empire." },
              { h:lang==="mr"?"🏛 प्रशासन आणि न्यायव्यवस्था":"🏛 Administration & Justice", p:lang==="mr"?"महाराजांनी अष्टप्रधान मंडळाची स्थापना करून एक सुव्यवस्थित प्रशासन उभारले. सर्व धर्मांचा आदर, महिलांचा सन्मान आणि शेतकऱ्यांचे कल्याण हे त्यांच्या राज्यकारभाराचे मूलतत्त्व होते.":"Maharaj established the Ashtapradhan council for systematic governance. Respecting all religions, honouring women and caring for farmers were the pillars of his rule." },
            ].map(s => (
              <div className="story-block" key={s.h}>
                <h3>{s.h}</h3>
                <p>{s.p}</p>
              </div>
            ))}
            <div className="story-quote">
              <span className="sq-mark">"</span>
              <span className="sq-text">{lang==="mr"?"शत्रूच्या बलापेक्षा आपल्या बुद्धिचातुर्यावर विश्वास ठेवा.":"Trust your intelligence and strategy more than the enemy's brute strength."}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

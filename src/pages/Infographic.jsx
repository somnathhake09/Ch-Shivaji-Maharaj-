import React, { useRef, useState, useEffect } from "react";
import { useLang, SectionHeader } from "../components/shared";

function Infographic() {
  const lang = useLang();
  const sectionRef = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); obs.disconnect(); }
    }, { threshold: 0.2 });
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const BIG_NUMBERS = [
    { icon:"🏰", value:"350+", labelMr:"किल्ले जिंकले", labelEn:"Forts Captured" },
    { icon:"⚔", value:"30+",  labelMr:"युद्धे जिंकली", labelEn:"Battles Won" },
    { icon:"👑", value:"१",   labelMr:"स्वराज्य स्थापना", labelEn:"Kingdom Founded" },
    { icon:"🚢", value:"500+",labelMr:"युद्धनौका", labelEn:"Warships" },
    { icon:"📜", value:"25",  labelMr:"वर्षे राज्य", labelEn:"Years of Rule" },
    { icon:"🌊", value:"720", labelMr:"किमी किनारपट्टी", labelEn:"km Coastline" },
    { icon:"🗺", value:"4.1L",labelMr:"चौ.किमी साम्राज्य", labelEn:"sq.km Empire" },
    { icon:"⚡", value:"17",  labelMr:"वयात पहिला किल्ला", labelEn:"Age at First Fort" },
  ];

  const TIMELINE_EVENTS = [
    { year:"१६३०", pct:5,  mr:"जन्म — शिवनेरी किल्ला",            en:"Birth — Shivneri Fort",              color:"#3b6d11" },
    { year:"१६४७", pct:22, mr:"तोरणा जिंकला — स्वराज्याची सुरुवात", en:"Torna captured — Swarajya begins",    color:"#185fa5" },
    { year:"१६५९", pct:38, mr:"अफझलखान वध — मराठी शक्ती सिद्ध",   en:"Afzal Khan slain — Maratha power proven",color:"#c94a00" },
    { year:"१६६४", pct:55, mr:"सुरत लूट — मुघलांना थेट आव्हान",   en:"Surat raid — Direct challenge to Mughals",color:"#185fa5" },
    { year:"१६७४", pct:80, mr:"राज्याभिषेक — छत्रपती पदवी",        en:"Coronation — Title of Chhatrapati",   color:"#d85a30" },
    { year:"१६८०", pct:100,mr:"महानिर्वाण — अजरामर वारसा",         en:"Mahaparinirvana — Immortal legacy",   color:"#967030" },
  ];

  const COMPARE_BARS = [
    { nameMr:"गनिमी काव्य (रणनीती)",  nameEn:"Guerrilla Warfare (Strategy)", pct:98, color:"#d85a30" },
    { nameMr:"किल्ले व्यवस्थापन",      nameEn:"Fort Management",              pct:95, color:"#185fa5" },
    { nameMr:"नौदल शक्ती",            nameEn:"Naval Power",                  pct:88, color:"#534ab7" },
    { nameMr:"प्रशासन व कायदा",        nameEn:"Administration & Law",         pct:92, color:"#3b6d11" },
    { nameMr:"सर्वधर्मसमभाव",          nameEn:"Religious Tolerance",          pct:100,color:"#c8910c" },
    { nameMr:"रयतेची काळजी",           nameEn:"People's Welfare",             pct:97, color:"#d85a30" },
  ];

  const ACHIEVEMENTS = [
    { icon:"⚓", titleMr:"भारताचे पहिले नौदल",        titleEn:"India's First Navy",           descMr:"समुद्रावर मराठ्यांचे पूर्ण वर्चस्व. पोर्तुगीज, ब्रिटिश आणि डच यांना आव्हान.", descEn:"Complete Maratha dominance at sea. Challenged Portuguese, British and Dutch." },
    { icon:"⚖", titleMr:"अष्टप्रधान मंडळ",           titleEn:"Ashtapradhan Council",         descMr:"आधुनिक मंत्रिमंडळाचे मूळ. प्रत्येक मंत्र्याला स्पष्ट जबाबदारी.", descEn:"Origin of modern cabinet system. Clear responsibilities for each minister." },
    { icon:"📜", titleMr:"राज्यव्यवहारकोश",           titleEn:"Rajyavyavaharkosh",             descMr:"फारसीऐवजी मराठी भाषेत राज्यकारभार. भाषेला राजाश्रय.", descEn:"Administration in Marathi instead of Persian. Royal patronage to language." },
    { icon:"🛡", titleMr:"गनिमी काव्य",               titleEn:"Guerrilla Warfare",             descMr:"आजही जगातील Military Schools मध्ये शिकवली जाणारी रणनीती.", descEn:"Military strategy still taught in war schools worldwide today." },
    { icon:"🌾", titleMr:"शेतकऱ्यांचे संरक्षण",       titleEn:"Farmer Protection",             descMr:"युद्धात शेतीला हानी न करण्याचा कठोर नियम. रयतेची काळजी.", descEn:"Strict rule against harming agriculture in war. True care for the people." },
    { icon:"🕌", titleMr:"सर्वधर्मसमभाव",             titleEn:"Secular Rule",                  descMr:"मशिदींचे रक्षण, कुराणाचा आदर. मुस्लिम सरदारांना उच्च पदे.", descEn:"Protected mosques, respected Quran. Muslim commanders held high positions." },
  ];

  return (
    <section className="section info-sec" id="infographic" ref={sectionRef}>
      <div className="wrap">
        <SectionHeader
          chipMr="आकडे" chipEn="Stats"
          titleMr="मराठा साम्राज्याची शक्ती" titleEn="Power of the Maratha Empire"
          desc="महाराजांच्या कर्तृत्वाचे आकड्यांमध्ये दर्शन"
          descEn="A glimpse of Maharaj's achievements in numbers" />

        <div className="ig-numbers">
          {BIG_NUMBERS.map((n, i) => (
            <div className="ig-num-card reveal" key={n.value} style={{"--i": i}}>
              <span className="ig-icon">{n.icon}</span>
              <span className="ig-value">{n.value}</span>
              <span className="ig-label">{lang === "mr" ? n.labelMr : n.labelEn}</span>
            </div>
          ))}
        </div>

        <div style={{marginBottom:"1rem"}}>
          <h3 style={{fontFamily:"var(--fd)",fontSize:"1.2rem",color:"var(--saf3)",marginBottom:"1.2rem",fontWeight:400}}>
            {lang === "mr" ? "🏆 महाराजांचे अजरामर योगदान" : "🏆 Immortal Contributions of Maharaj"}
          </h3>
          <div className="ig-achieve">
            {ACHIEVEMENTS.map((a, i) => (
              <div className="ig-ach-card reveal" key={a.titleMr} style={{"--i": i}}>
                <span className="ig-ach-icon">{a.icon}</span>
                <div className="ig-ach-body">
                  <h4>{lang === "mr" ? a.titleMr : a.titleEn}</h4>
                  <p>{lang === "mr" ? a.descMr : a.descEn}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"2rem",marginBottom:"3rem"}}>
          <div className="ig-timeline">
            <div className="ig-tl-title">
              {lang === "mr" ? "📅 जीवनाचा कालपट" : "📅 Life Timeline"}
            </div>
            <div className="ig-tl-bar">
              <div className="ig-tl-fill" style={{width: animated ? "100%" : "0%"}}/>
            </div>
            <div className="ig-tl-events">
              {TIMELINE_EVENTS.map(e => (
                <div className="ig-event" key={e.year}>
                  <span className="ig-event-yr">{e.year}</span>
                  <div className="ig-event-dot" style={{background: e.color, color: e.color}}/>
                  <span className="ig-event-text">{lang === "mr" ? e.mr : e.en}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="ig-compare">
            <div className="ig-cmp-title">
              {lang === "mr" ? "📊 महाराजांचे कौशल्य (सांकेतिक मूल्यांकन)" : "📊 Maharaj's Skills (illustrative rating)"}
            </div>
            {COMPARE_BARS.map(b => (
              <div className="ig-bar-row" key={b.nameMr}>
                <div className="ig-bar-label">
                  <span className="ig-bar-name">{lang === "mr" ? b.nameMr : b.nameEn}</span>
                  <span className="ig-bar-val">{b.pct}%</span>
                </div>
                <div className="ig-bar-track">
                  <div className="ig-bar-fill"
                    style={{
                      width: animated ? b.pct + "%" : "0%",
                      background: `linear-gradient(90deg, ${b.color}, var(--gold2))`,
                      transitionDelay: "0.2s"
                    }}/>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ig-quote">
          <p className="ig-q-text">
            {lang === "mr"
              ? "एका माणसाने — एका स्वप्नाने — एका निश्चयाने — संपूर्ण इतिहास बदलला. छत्रपती शिवाजी महाराज म्हणजे केवळ एक राजा नव्हे — ते एक युगपुरुष होते."
              : "One man — one dream — one resolve — changed the entire course of history. Chhatrapati Shivaji Maharaj was not merely a king — he was an epoch-maker."}
          </p>
          <p className="ig-q-cite">🚩 {lang === "mr" ? "जय शिवाजी! जय भवानी!" : "Jai Shivaji! Jai Bhavani!"}</p>
        </div>
      </div>
    </section>
  );
}

export default Infographic;

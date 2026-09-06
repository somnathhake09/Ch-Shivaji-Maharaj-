import React from "react";
import { useLang, SectionHeader } from "../components/shared";

const CATEGORIES = [
  {
    icon: "📚",
    titleMr: "प्रमाणित ऐतिहासिक ग्रंथ",
    titleEn: "Established Academic Works",
    itemsMr: [
      "जदुनाथ सरकार — \"Shivaji and His Times\" (सर्वाधिक उद्धृत शैक्षणिक ग्रंथांपैकी एक, प्रथम प्रकाशन १९१९)",
      "सेतू माधवराव पगडी — शिवचरित्रावरील संशोधनात्मक लेखन",
      "गजानन भास्कर मेहेंदळे — \"शिवाजी: हिज लाइफ अँड टाइम्स\"",
    ],
    itemsEn: [
      "Jadunath Sarkar — \"Shivaji and His Times\" (one of the most widely cited academic works, first published 1919)",
      "Setu Madhavrao Pagadi — research writings on Shivaji's biography",
      "Gajanan Bhaskar Mehendale — \"Shivaji: His Life and Times\"",
    ]
  },
  {
    icon: "🏛",
    titleMr: "पुरातत्त्व व वारसा संस्था",
    titleEn: "Archaeology & Heritage Bodies",
    itemsMr: [
      "भारतीय पुरातत्त्व सर्वेक्षण (Archaeological Survey of India)",
      "महाराष्ट्र राज्य पुरातत्त्व व वस्तुसंग्रहालये संचालनालय",
      "किल्ल्यांवरील शासकीय माहिती फलक व गॅझेटियर नोंदी",
    ],
    itemsEn: [
      "Archaeological Survey of India (ASI)",
      "Directorate of Archaeology & Museums, Government of Maharashtra",
      "Official on-site information boards and district gazetteer records",
    ]
  },
  {
    icon: "🖼",
    titleMr: "संग्रहालये व अभिलेखागार",
    titleEn: "Museums & Archives",
    itemsMr: [
      "छत्रपती शिवाजी महाराज वस्तुसंग्रहालय (पूर्वीचे प्रिन्स ऑफ वेल्स संग्रहालय), मुंबई",
      "रायगड व शिवनेरी येथील किल्ला-संग्रहालये",
      "स्थानिक ऐतिहासिक संस्थांचे दस्तऐवजीकरण प्रकल्प",
    ],
    itemsEn: [
      "Chhatrapati Shivaji Maharaj Vastu Sangrahalaya (formerly Prince of Wales Museum), Mumbai",
      "Fort museums at Raigad and Shivneri",
      "Documentation projects run by local historical institutions",
    ]
  },
];

function Sources() {
  const lang = useLang();
  return (
    <section className="section sources-sec" id="sources">
      <div className="wrap">
        <SectionHeader
          chipMr="स्रोत" chipEn="Sources"
          titleMr="स्रोत व संदर्भ" titleEn="Sources & References"
          desc="या संकेतस्थळावरील माहिती विश्वासार्ह आणि पडताळणीयोग्य ठेवण्याची आमची बांधिलकी"
          descEn="Our commitment to keeping the information on this site reliable and verifiable" />

        <div className="story-block" style={{maxWidth:820, margin:"0 auto 2.5rem"}}>
          <p style={{lineHeight:1.8}}>
            {lang==="mr"
              ? "छत्रपती शिवाजी महाराजांबद्दलची माहिती जबाबदारीने मांडणे हे या संकेतस्थळाचे मुख्य उद्दिष्ट आहे. जिथे तारखा, ठिकाणे आणि घटना सर्वमान्य ऐतिहासिक अभिलेखांवर आधारित आहेत, तिथे त्या तशाच मांडल्या आहेत. जिथे एखादी गोष्ट लोकपरंपरा, दंतकथा किंवा अद्याप निर्णायकरीत्या सिद्ध न झालेली आहे, ती तशी स्पष्टपणे नमूद केली आहे — निश्चित सत्य म्हणून नाही."
              : "Presenting information about Chhatrapati Shivaji Maharaj responsibly is this website's core commitment. Where dates, places and events are supported by well-established historical records, they are presented as such. Where something is oral tradition, legend, or not yet conclusively documented, it is clearly marked that way — not presented as settled fact."}
          </p>
        </div>

        <div className="mavale-grid">
          {CATEGORIES.map(c => (
            <div className="mavale-card" key={c.titleMr}>
              <span className="mc-icon">{c.icon}</span>
              <h3>{lang==="mr"?c.titleMr:c.titleEn}</h3>
              <ul style={{textAlign:"left", marginTop:".6rem", paddingLeft:"1.1rem", lineHeight:1.7, fontSize:".92rem", color:"var(--cream2)"}}>
                {(lang==="mr"?c.itemsMr:c.itemsEn).map((it,i) => <li key={i} style={{marginBottom:".4rem"}}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <div className="story-block" style={{maxWidth:820, margin:"2.5rem auto 0", textAlign:"center"}}>
          <p style={{lineHeight:1.8, color:"var(--mute)", fontSize:".9rem"}}>
            {lang==="mr"
              ? "टीप: वरील यादी सूचक स्वरूपाची आहे, संपूर्ण उद्धरण-सूची नाही. एखाद्या विशिष्ट वस्तुस्थितीच्या अचूक स्रोतासंबंधी शंका असल्यास, कृपया वरील संस्था/ग्रंथांचा स्वतंत्रपणे संदर्भ घ्यावा. या संकेतस्थळावर चुकीची माहिती आढळल्यास ती सुधारण्यासाठी आम्ही कटिबद्ध आहोत."
              : "Note: the list above is illustrative of the categories of reputable sources, not an exhaustive citation list. If you have doubts about the precise source for a specific fact, please consult the institutions/works above independently. We are committed to correcting any inaccuracy found on this site."}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sources;

import React from "react";
import { useLang, SectionHeader } from "../components/shared";

const LETTERS_DATA = [
  {
    id: "letter1",
    year: "१६४५",
    yearEn: "1645",
    toMr: "दादोजी कोंडदेव यांना",
    toEn: "To Dadoji Konddev",
    fromMr: "शिवाजी महाराज",
    fromEn: "Shivaji Maharaj",
    titleMr: "स्वराज्याच्या संकल्पाचे पहिले बीज",
    titleEn: "The First Seed of Swarajya's Resolve",
    contentMr: "गुरुजी, मी या डोंगर-दऱ्यांमध्ये फिरताना एक गोष्ट मनात रुजली आहे — या भूमीत राहणाऱ्या माझ्या लोकांना एक स्वतंत्र राज्य असावे. जे राज्य त्यांचेच असेल, परक्यांचे नाही. मी हे स्वप्न पूर्ण करण्याची शपथ घेतली आहे. आपल्या आशीर्वादाने मी हे साध्य करीन.",
    contentEn: "Guruji, as I roam these mountains and valleys, one thought has taken root — the people of this land deserve a kingdom of their own, not ruled by foreigners. I have taken an oath to fulfill this dream. With your blessings, I shall achieve it.",
    tagMr: "स्वराज्य संकल्प",
    tagEn: "Swarajya Vow",
    color: "#3b6d11",
    note: "Historical accounts suggest young Shivaji took an oath of Swarajya at Raireshwar temple around 1645."
  },
  {
    id: "letter2",
    year: "१६५९",
    yearEn: "1659",
    toMr: "मावळ्यांना",
    toEn: "To his Mavale Warriors",
    fromMr: "छत्रपती शिवाजी महाराज",
    fromEn: "Chhatrapati Shivaji Maharaj",
    titleMr: "अफझलखानाच्या भेटीपूर्वी",
    titleEn: "Before the Meeting with Afzal Khan",
    contentMr: "माझ्या मावळ्यांनो, उद्या मी अफझलखानाला भेटायला जातो. मला माहीत आहे तो कपटी आहे. परंतु भवानी माते माझ्या पाठीशी आहे. तुम्ही सज्ज राहा. जर काही झाले, तर स्वराज्याचा झेंडा कधीही खाली पडू देऊ नका. स्वराज्य हे माझ्यापुरते नाही — ते तुमचे आहे, या मातीचे आहे.",
    contentEn: "My Mavale, tomorrow I go to meet Afzal Khan. I know he is treacherous. But Goddess Bhavani stands behind me. Stay ready. If anything happens, never let the flag of Swarajya fall. Swarajya is not just mine — it is yours, it belongs to this soil.",
    tagMr: "शौर्य संदेश",
    tagEn: "Message of Courage",
    color: "#d85a30",
    note: "Before the historic meeting at Pratapgad on 10 November 1659, Maharaj reportedly sent word to his troops."
  },
  {
    id: "letter3",
    year: "१६६६",
    yearEn: "1666",
    toMr: "आईसाहेब जिजाबाईंना",
    toEn: "To Mother Jijabai",
    fromMr: "शिवाजी महाराज, आग्र्याहून",
    fromEn: "Shivaji Maharaj, from Agra",
    titleMr: "आग्र्याच्या कैदेतून",
    titleEn: "From Captivity in Agra",
    contentMr: "आईसाहेब, औरंगजेबाने मला येथे कैद केले आहे. परंतु आपल्या आशीर्वादाने मी परत येईन — हे मी वचन देतो. या जुलमी बादशहाची कैद माझ्या स्वराज्याच्या स्वप्नाला रोखू शकत नाही. मी लवकरच परत येऊन आपल्या पाया पडेन. स्वराज्याचे काम थांबणार नाही.",
    contentEn: "Aaisaheb, Aurangzeb has imprisoned me here. But with your blessings, I will return — this I promise. The captivity of this cruel emperor cannot stop my dream of Swarajya. I will soon return and touch your feet. The work of Swarajya will not stop.",
    tagMr: "आईला पत्र",
    tagEn: "Letter to Mother",
    color: "#534ab7",
    note: "Maharaj was held at Agra in 1666 after Aurangzeb's court. He made the daring escape hidden in baskets."
  },
  {
    id: "letter4",
    year: "१६७४",
    yearEn: "1674",
    toMr: "रयतेला — राज्याभिषेकानंतर",
    toEn: "To the People — After Coronation",
    fromMr: "छत्रपती शिवाजी महाराज",
    fromEn: "Chhatrapati Shivaji Maharaj",
    titleMr: "रयतेचा राजा — राज्याभिषेकानंतरचा संदेश",
    titleEn: "The People's King — Message after Coronation",
    contentMr: "माझ्या प्रिय रयतेनो, आज मी छत्रपती झालो — परंतु हे राज्य माझे नाही, हे तुमचे आहे. शेतकऱ्याच्या घामाने, सैनिकाच्या रक्ताने आणि मातेच्या आशीर्वादाने हे स्वराज्य उभे आहे. कोणत्याही धर्माच्या माणसाला इथे न्याय मिळेल. स्त्रियांचा सन्मान हे आमचे कर्तव्य आहे. हे स्वराज्य चिरंजीव असो!",
    contentEn: "My dear people, today I became Chhatrapati — but this kingdom is not mine, it is yours. Built by the farmer's sweat, the soldier's blood, and a mother's blessings. Every person of every faith will receive justice here. Respecting women is our duty. Long live this Swarajya!",
    tagMr: "रयतेचा राजा",
    tagEn: "People's King",
    color: "#c8910c",
    note: "After the grand coronation at Raigad on 6 June 1674, Maharaj sent proclamations to all his people."
  },
];

function Letters() {
  const lang = useLang();
  return (
    <section className="section letters-sec" id="letters">
      <div className="wrap">
        <SectionHeader
          chipMr="पत्रे" chipEn="Letters"
          titleMr="महाराजांची ऐतिहासिक पत्रे" titleEn="Historical Letters of Maharaj"
          desc="इतिहासाच्या पानांतून — महाराजांचे भावपूर्ण संदेश"
          descEn="From the pages of history — Maharaj's heartfelt messages" />
        <p style={{textAlign:"center", maxWidth:720, margin:"-1rem auto 2rem", fontSize:".85rem", color:"var(--mute)", lineHeight:1.6}}>
          {lang==="mr"
            ? "टीप: खालील मजकूर हा त्या-त्या ऐतिहासिक प्रसंगांच्या दस्तऐवजीकरण झालेल्या संदर्भांवर आधारित, वाचनीयतेसाठी तयार केलेला पुनर्रचित मजकूर आहे — शब्दशः जतन झालेली मूळ हस्तलिखिते नव्हेत. प्रत्येक नोंदीखालील टीप ऐतिहासिक संदर्भ स्पष्ट करते."
            : "Note: the text below is a readable reconstruction based on well-documented historical events — not verbatim surviving manuscripts. The note under each entry gives the historical context."}
        </p>
        <div className="letters-grid">
          {LETTERS_DATA.map(l => (
            <div className="letter-card reveal" key={l.id}>
              <div className="letter-header">
                <div className="lh-year">{lang==="mr" ? l.year : l.yearEn}</div>
                <div className="lh-title">{lang==="mr" ? l.titleMr : l.titleEn}</div>
                <div className="lh-meta">
                  {lang==="mr" ? "कडून: " : "From: "}{lang==="mr" ? l.fromMr : l.fromEn} →{" "}
                  {lang==="mr" ? l.toMr : l.toEn}
                </div>
              </div>
              <div className="letter-body">
                <span className="letter-tag" style={{background:l.color}}>
                  {lang==="mr" ? l.tagMr : l.tagEn}
                </span>
                <div className="letter-content">
                  "{lang==="mr" ? l.contentMr : l.contentEn}"
                </div>
                <div className="letter-note">📚 {l.note}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Letters;

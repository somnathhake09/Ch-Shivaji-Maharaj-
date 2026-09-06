import React from "react";
import { useLang, SectionHeader } from "../components/shared";

function Childhood() {
  const lang = useLang();
  const cards = [
    { img:"/images/jijamata.jpg", labelMr:"राजमाता", labelEn:"Rajmata", nameMr:"राजमाता जिजाबाई", nameEn:"Rajmata Jijabai", subtMr:"स्वराज्याची जननी", subtEn:"Mother of Swarajya", descMr:"जिजाबाईंनी शिवाजींना रामायण, महाभारत आणि वीरांच्या कथा सांगून त्यांच्यात देशभक्ती आणि न्यायाची भावना जागृत केली.", descEn:"Jijabai narrated stories of brave warriors, awakening patriotism and justice in Shivaji. She was his true inspiration." },
    { img:"/images/Shivneri_Fort.jpg", labelMr:"जन्मभूमी", labelEn:"Birthplace", nameMr:"शिवनेरी किल्ला", nameEn:"Shivneri Fort", subtMr:"बालपणाची भूमी", subtEn:"Land of Childhood", descMr:"शिवनेरी किल्ला म्हणजे शिवाजी महाराजांची जन्मभूमी. पर्वत, जंगल आणि किल्ल्यांच्या सान्निध्यात वाढलेल्या शिवाजींमध्ये धाडस स्वाभाविकपणे आले.", descEn:"Shivneri Fort is Maharaj's birthplace. Growing up among mountains and forts, bravery came naturally to young Shivaji." },
    { img:"/images/dadoji.jpg", labelMr:"गुरू", labelEn:"Teacher", nameMr:"दादोजी कोंडदेव", nameEn:"Dadoji Konddev", subtMr:"पहिले गुरू", subtEn:"First Teacher", descMr:"दादोजी कोंडदेव यांनी महाराजांना तलवारबाजी, घोडेस्वारी, युद्धशास्त्र आणि राज्यकारभार यांचे शिक्षण दिले.", descEn:"Dadoji Konddev trained Maharaj in swordsmanship, horsemanship, military science and administration." },
  ];
  return (
    <section className="section childhood-sec" id="childhood">
      <div className="wrap">
        <SectionHeader chipMr="बालपण" chipEn="Childhood"
          titleMr="शिवबाचे बालपण" titleEn="Childhood of Shivba" />
        <p className="childhood-intro">{lang==="mr"?"शिवाजी महाराजांचे बालपण शिवनेरी किल्ल्यावर सुरू झाले. आईच्या रामायण-महाभारतातील गोष्टींनी आणि गुरू दादोजी कोंडदेव यांच्या शिक्षणाने त्यांच्या व्यक्तिमत्त्वाला आकार मिळाला.":"Shivaji Maharaj's childhood began at Shivneri Fort. His mother's stories and Dadoji Konddev's teachings shaped his extraordinary personality."}</p>
        <div className="childhood-cards">
          {cards.map(c => (
            <div className="cc-card" key={c.nameMr}>
              <div className="cc-img-wrap">
                <img src={c.img} alt={c.nameMr} onError={e => e.target.closest(".cc-img-wrap").style.background="#1a0800"} />
                <div className="cc-img-fade"/>
                <span className="cc-img-label">{lang==="mr"?c.labelMr:c.labelEn}</span>
              </div>
              <div className="cc-body">
                <h3>{lang==="mr"?c.nameMr:c.nameEn}</h3>
                <span className="cc-subtitle">{lang==="mr"?c.subtMr:c.subtEn}</span>
                <p>{lang==="mr"?c.descMr:c.descEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Childhood;

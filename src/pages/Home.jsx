import React from "react";
import { Hero, AchievementsCounter, useLang, SectionHeader } from "../components/shared";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
      <AchievementsCounter />
    </>
  );
}

function IntroSection() {
  const lang = useLang();
  return (
    <section className="section">
      <div className="wrap">
        <SectionHeader
          chipMr="ओळख" chipEn="Introduction"
          titleMr="शिवरायांची ओळख" titleEn="An Introduction to Shivraya" />
        <div className="story-block" style={{maxWidth:760, margin:"0 auto", textAlign:"center"}}>
          <p>
            {lang === "mr"
              ? "छत्रपती शिवाजी महाराजांचा जन्म १९ फेब्रुवारी १६३० रोजी शिवनेरी किल्ल्यावर झाला. आईचं नाव राजमाता जिजाबाई — त्यांनीच शिवाजींना रामायण, महाभारत आणि शूर वीरांच्या कथा सांगून मनात स्वराज्याची ज्योत लावली."
              : "Chhatrapati Shivaji Maharaj was born on 19 February 1630 at Shivneri Fort. His mother Rajmata Jijabai narrated stories from the Ramayana, igniting the flame of Swarajya in his heart."}
          </p>
        </div>
      </div>
    </section>
  );
}
import React, { useState } from "react";
import { useLang, SectionHeader, SocialShare } from "../components/shared";

const QUIZ_DATA = [
  {
    qMr:"छत्रपती शिवाजी महाराजांचा जन्म कोणत्या किल्ल्यावर झाला?",
    qEn:"On which fort was Chhatrapati Shivaji Maharaj born?",
    opts:[{mr:"रायगड",en:"Raigad"},{mr:"शिवनेरी",en:"Shivneri"},{mr:"सिंहगड",en:"Sinhagad"},{mr:"प्रतापगड",en:"Pratapgad"}],
    ans:1,
    expMr:"शिवाजी महाराजांचा जन्म १९ फेब्रुवारी १६३० रोजी शिवनेरी किल्ल्यावर झाला. त्यांचे नाव शिवाईदेवीच्या नावावरून 'शिवाजी' ठेवले गेले.",
    expEn:"Shivaji Maharaj was born on 19 February 1630 at Shivneri Fort. He was named 'Shivaji' after the goddess Shivai."
  },
  {
    qMr:"महाराजांनी कोणत्या वयात तोरणा किल्ला जिंकला?",
    qEn:"At what age did Maharaj capture Torna Fort?",
    opts:[{mr:"१५ वर्षे",en:"15 years"},{mr:"१७ वर्षे",en:"17 years"},{mr:"२० वर्षे",en:"20 years"},{mr:"१२ वर्षे",en:"12 years"}],
    ans:1,
    expMr:"वयाच्या अवघ्या १७ व्या वर्षी महाराजांनी तोरणा किल्ला जिंकला. हे स्वराज्याचे पहिले पाऊल होते!",
    expEn:"At just 17, Maharaj captured Torna Fort — the very first step of Swarajya!"
  },
  {
    qMr:"अफझलखानाचा वध महाराजांनी कोणत्या किल्ल्याजवळ केला?",
    qEn:"Near which fort did Maharaj kill Afzal Khan?",
    opts:[{mr:"सिंहगड",en:"Sinhagad"},{mr:"रायगड",en:"Raigad"},{mr:"प्रतापगड",en:"Pratapgad"},{mr:"पन्हाळगड",en:"Panhala"}],
    ans:2,
    expMr:"१० नोव्हेंबर १६५९ रोजी प्रतापगडाजवळ महाराजांनी वाघनखाने अफझलखानाचा वध केला. हा स्वराज्यासाठी टर्निंग पॉइंट होता!",
    expEn:"On 10 Nov 1659, Maharaj killed Afzal Khan near Pratapgad with tiger claws. This was a turning point for Swarajya!"
  },
  {
    qMr:"महाराजांचा राज्याभिषेक कोणत्या किल्ल्यावर झाला?",
    qEn:"On which fort was Maharaj's coronation held?",
    opts:[{mr:"राजगड",en:"Rajgad"},{mr:"शिवनेरी",en:"Shivneri"},{mr:"सिंहगड",en:"Sinhagad"},{mr:"रायगड",en:"Raigad"}],
    ans:3,
    expMr:"६ जून १६७४ रोजी रायगडावर छत्रपती म्हणून भव्य राज्याभिषेक झाला. काशीचे गागाभट्ट यांनी विधी केले.",
    expEn:"On 6 June 1674, the grand coronation as Chhatrapati took place at Raigad. Gagabhatt of Kashi performed the rituals."
  },
  {
    qMr:"'गड आला पण सिंह गेला!' हे उद्गार महाराजांनी कोणाच्या बलिदानानंतर काढले?",
    qEn:"'The fort is won, but the lion is gone!' — Maharaj said this after whose sacrifice?",
    opts:[{mr:"बाजीप्रभू देशपांडे",en:"Bajiprabhu Deshpande"},{mr:"तानाजी मालुसरे",en:"Tanaji Malusare"},{mr:"नेताजी पालकर",en:"Netaji Palkar"},{mr:"कान्होजी आंग्रे",en:"Kanhoji Angre"}],
    ans:1,
    expMr:"तानाजी मालुसरे यांनी सिंहगड जिंकताना वीरगती प्राप्त केली. महाराजांनी दुःखाने म्हटले — 'गड आला पण सिंह गेला!'",
    expEn:"Tanaji Malusare attained martyrdom while capturing Sinhagad. Maharaj sorrowfully said — 'The fort is won, but the lion is gone!'"
  },
  {
    qMr:"महाराजांनी कोणत्या किल्ल्यावरून औरंगजेबाच्या नजरकैदेतून सुटका केली?",
    qEn:"From which city did Maharaj escape Aurangzeb's captivity?",
    opts:[{mr:"दिल्ली",en:"Delhi"},{mr:"आग्रा",en:"Agra"},{mr:"लाहोर",en:"Lahore"},{mr:"सुरत",en:"Surat"}],
    ans:1,
    expMr:"१६६६ मध्ये महाराजांनी आग्र्याहून फळांच्या टोपल्यांमधून अजोड बुद्धिचातुर्याने सुटका केली. हे भारतीय इतिहासातील सर्वात धाडसी पलायन आहे!",
    expEn:"In 1666, Maharaj escaped from Agra hidden in fruit baskets. This is the most daring escape in Indian history!"
  },
  {
    qMr:"महाराजांनी स्थापन केलेल्या प्रशासन मंडळाचे नाव काय होते?",
    qEn:"What was the name of the administrative council established by Maharaj?",
    opts:[{mr:"पंचप्रधान",en:"Panchapradhan"},{mr:"दशप्रधान",en:"Dashapradhan"},{mr:"अष्टप्रधान",en:"Ashtapradhan"},{mr:"सप्तप्रधान",en:"Saptapradhan"}],
    ans:2,
    expMr:"महाराजांनी अष्टप्रधान मंडळाची स्थापना केली — ८ मंत्र्यांचे आधुनिक मंत्रिमंडळ. हे आधुनिक प्रशासनाचे मूळ आहे!",
    expEn:"Maharaj established the Ashtapradhan council — a modern cabinet of 8 ministers. This is the origin of modern governance!"
  },
  {
    qMr:"महाराजांचे आई-वडील कोण होते?",
    qEn:"Who were Maharaj's parents?",
    opts:[{mr:"शाहाजी आणि जिजाबाई",en:"Shahaji and Jijabai"},{mr:"मालोजी आणि दीपाबाई",en:"Maloji and Dipabai"},{mr:"विठोजी आणि उमाबाई",en:"Vithoji and Umabai"},{mr:"संभाजी आणि सईबाई",en:"Sambhaji and Saibai"}],
    ans:0,
    expMr:"शाहाजी महाराज (वडील) आणि राजमाता जिजाबाई (आई) — जिजाबाईंनीच शिवाजींना स्वराज्याची स्वप्ने दाखवली.",
    expEn:"Shahaji Maharaj (father) and Rajmata Jijabai (mother) — Jijabai showed Shivaji the dreams of Swarajya."
  },
  {
    qMr:"महाराजांनी समुद्रात कोणता प्रसिद्ध किल्ला बांधला?",
    qEn:"Which famous fort did Maharaj build in the sea?",
    opts:[{mr:"विजयदुर्ग",en:"Vijaydurg"},{mr:"सिंधुदुर्ग",en:"Sindhudurg"},{mr:"पद्मदुर्ग",en:"Padmdurg"},{mr:"जयगड",en:"Jaygad"}],
    ans:1,
    expMr:"सिंधुदुर्ग हा महाराजांनी १६६४ मध्ये समुद्रात बांधलेला अभेद्य किल्ला. सुवर्णाचा पाया आणि समुद्राचे संरक्षण!",
    expEn:"Sindhudurg, built in 1664 by Maharaj in the sea — an impregnable fort with a foundation of gold!"
  },
  {
    qMr:"महाराजांचा महानिर्वाण कोणत्या तारखेला झाला?",
    qEn:"On which date did Maharaj's Mahaparinirvana take place?",
    opts:[{mr:"३ एप्रिल १६८०",en:"3 April 1680"},{mr:"१९ फेब्रुवारी १६८०",en:"19 Feb 1680"},{mr:"६ जून १६८०",en:"6 June 1680"},{mr:"१५ ऑगस्ट १६८०",en:"15 August 1680"}],
    ans:0,
    expMr:"३ एप्रिल १६८० रोजी रायगडावर महाराजांचे महानिर्वाण झाले. ते गेले पण त्यांचा आत्मा प्रत्येक मराठ्याच्या हृदयात जगतो!",
    expEn:"Maharaj's Mahaparinirvana took place on 3 April 1680 at Raigad. He left, but his spirit lives in every Maratha's heart!"
  },
];

function Quiz() {
  const lang = useLang();
  const [cur, setCur]       = useState(0);
  const [score, setScore]   = useState(0);
  const [chosen, setChosen] = useState(null);
  const [finished, setFinished] = useState(false);

  const q = QUIZ_DATA[cur];

  const choose = (idx) => {
    if (chosen !== null) return;
    setChosen(idx);
    if (idx === q.ans) setScore(s => s + 1);
  };

  const next = () => {
    if (cur + 1 >= QUIZ_DATA.length) {
      setFinished(true);
    } else {
      setCur(c => c + 1);
      setChosen(null);
    }
  };

  const restart = () => {
    setCur(0); setScore(0); setChosen(null); setFinished(false);
  };

  const getMsg = () => {
    const pct = score / QUIZ_DATA.length;
    if (lang === "mr") {
      if (pct === 1)    return "अप्रतिम! तुम्ही खरे शिवभक्त आहात! 🚩";
      if (pct >= 0.8)   return "खूप छान! महाराजांचे इतिहास तुम्हाला चांगले माहीत आहे! 🔥";
      if (pct >= 0.6)   return "चांगले! अजून थोडे वाचा आणि परत प्रयत्न करा! 💪";
      return "काळजी नको! वेबसाइट वाचा आणि परत प्रयत्न करा! 📖";
    } else {
      if (pct === 1)    return "Outstanding! You are a true Shiva devotee! 🚩";
      if (pct >= 0.8)   return "Excellent! You know Maharaj's history well! 🔥";
      if (pct >= 0.6)   return "Good! Read a bit more and try again! 💪";
      return "Don't worry! Read the website and try again! 📖";
    }
  };

  return (
    <section className="section quiz-sec" id="quiz">
      <div className="wrap">
        <SectionHeader
          chipMr="प्रश्नमंजुषा" chipEn="Quiz"
          titleMr="महाराजांबद्दल किती माहीत आहे?" titleEn="How well do you know Maharaj?"
          desc="१० प्रश्न — महाराजांच्या इतिहासावर आधारित"
          descEn="10 questions based on Maharaj's history" />

        <div className="quiz-wrap">
          <div className="quiz-box">
            {!finished ? (
              <>
                <div className="quiz-progress">
                  <span className="qp-text">{lang==="mr"?"प्रश्न":"Q"} {cur+1}/{QUIZ_DATA.length}</span>
                  <div className="qp-bar">
                    <div className="qp-fill" style={{width:`${((cur+1)/QUIZ_DATA.length)*100}%`}}/>
                  </div>
                  <span className="qp-text">{lang==="mr"?"गुण":"Score"}: {score}</span>
                </div>

                <p className="quiz-q">{lang==="mr" ? q.qMr : q.qEn}</p>

                <div className="quiz-opts">
                  {q.opts.map((opt, i) => {
                    let cls = "quiz-opt";
                    if (chosen !== null) {
                      if (i === q.ans) cls += " correct";
                      else if (i === chosen) cls += " wrong";
                    }
                    return (
                      <button key={i} className={cls}
                        onClick={() => choose(i)} disabled={chosen !== null}>
                        <span style={{marginRight:"8px",opacity:.6}}>{["अ","ब","क","ड"][i]})</span>
                        {lang==="mr" ? opt.mr : opt.en}
                      </button>
                    );
                  })}
                </div>

                {chosen !== null && (
                  <>
                    <div className={`quiz-feedback${chosen===q.ans?" correct":" wrong"}`}>
                      {chosen===q.ans
                        ? (lang==="mr"?"✅ बरोबर! ":"✅ Correct! ")
                        : (lang==="mr"?"❌ चुकीचे. ":"❌ Wrong. ")}
                      {lang==="mr" ? q.expMr : q.expEn}
                    </div>
                    <button className="quiz-next" onClick={next}>
                      {cur+1 >= QUIZ_DATA.length
                        ? (lang==="mr"?"🏆 निकाल पहा":"🏆 See Results")
                        : (lang==="mr"?"पुढील प्रश्न →":"Next Question →")}
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="quiz-result">
                <div className="qr-score">{score}</div>
                <div className="qr-total">{lang==="mr"?"पैकी":"out of"} {QUIZ_DATA.length}</div>
                <div className="qr-msg">{getMsg()}</div>
                <SocialShare />
                <button className="quiz-restart" onClick={restart}>
                  🔄 {lang==="mr"?"परत खेळा":"Play Again"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Quiz;

import { useState, useEffect, useRef, createContext, useContext } from "react";


// ── LANG CONTEXT ──────────────────────────────────────────────────
const LangContext = createContext("mr");
const useLang = () => useContext(LangContext);
const t = (mr, en, lang) => lang === "mr" ? mr : en;

// ── DATA ──────────────────────────────────────────────────────────
const NAV_LINKS = [
  { href: "about",     mr: "परिचय",    en: "About" },
  { href: "childhood", mr: "बालपण",    en: "Childhood" },
  { href: "timeline",  mr: "कालक्रम",  en: "Timeline" },
  { href: "forts",     mr: "किल्ले",   en: "Forts" },
  { href: "battles",   mr: "युद्धे",   en: "Battles" },
  { href: "mavale",    mr: "मावळे",    en: "Warriors" },
  { href: "legacy",    mr: "वारसा",    en: "Legacy" },
  { href: "gallery",   mr: "दालन",     en: "Gallery" },
  { href: "map",       mr: "नकाशा",    en: "Map" },
  { href: "infographic", mr: "आकडे",   en: "Stats" },
  { href: "quiz",        mr: "प्रश्नमंजुषा", en: "Quiz" },
  { href: "letters",     mr: "पत्रे",        en: "Letters" },
];

const TIMELINE_DATA = [
  { year:"१६३०", icon:"🌟", mr:"जन्म – शिवनेरी किल्ला", en:"Birth – Shivneri Fort", descMr:"१९ फेब्रुवारी रोजी शिवनेरी किल्ल्यावर जन्म. शिवाईदेवीच्या नावावरून 'शिवाजी' नाव ठेवले.", descEn:"Born on 19 February at Shivneri Fort. Named 'Shivaji' after goddess Shivai.", crown:false },
  { year:"१६४७", icon:"⚔", mr:"तोरणा किल्ला विजय", en:"Conquest of Torna Fort", descMr:"वयाच्या अवघ्या १७ व्या वर्षी तोरणा किल्ला जिंकला. स्वराज्याचे पहिले पाऊल, पहिला विजय.", descEn:"Captured Torna Fort at just 17 — the very first step and victory towards Swarajya.", crown:false },
  { year:"१६५९", icon:"🗡", mr:"अफझलखानाचा वध", en:"Killing of Afzal Khan", descMr:"प्रतापगडाजवळ वाघनखाने अफझलखानाचा वध केला. आदिलशाहीला प्रचंड धक्का बसला.", descEn:"Killed Afzal Khan with tiger claws near Pratapgad. A massive blow to Adilshahi.", crown:false },
  { year:"१६६०", icon:"🌙", mr:"पन्हाळगडावरून सुटका", en:"Escape from Panhala", descMr:"सिद्दी जोहरच्या वेढ्यातून रात्रीच्या अंधारात यशस्वी सुटका. बाजीप्रभू देशपांडे यांचे अजरामर बलिदान.", descEn:"Successful escape from Siddhi Johar's siege at night. Bajiprabhu Deshpande's immortal sacrifice.", crown:false },
  { year:"१६६४", icon:"🏹", mr:"सुरत लूट", en:"Sack of Surat", descMr:"मुघलांचे श्रीमंत बंदर शहर लुटले. स्वराज्यासाठी प्रचंड खजिना मिळवला.", descEn:"Raided the Mughals' richest port. Secured enormous wealth for Swarajya.", crown:false },
  { year:"१६६६", icon:"🧺", mr:"आग्र्याहून सुटका", en:"Escape from Agra", descMr:"औरंगजेबाच्या नजरकैदेतून फळांच्या टोपल्यांमधून अजोड बुद्धिचातुर्याने सुटका.", descEn:"Escaped Aurangzeb's captivity hidden in fruit baskets — the most daring escape in Indian history.", crown:false },
  { year:"१६७०", icon:"🦁", mr:"सिंहगड विजय", en:"Conquest of Sinhagad", descMr:"तानाजी मालुसरे यांनी रात्री सिंहगड जिंकला. 'गड आला पण सिंह गेला!'", descEn:"Tanaji Malusare captured Sinhagad at night. 'The fort is won, but the lion is gone!'", crown:false },
  { year:"१६७४", icon:"👑", mr:"राज्याभिषेक — रायगड 👑", en:"Coronation — Raigad 👑", descMr:"६ जून १६७४ — रायगडावर छत्रपती म्हणून भव्य राज्याभिषेक. मराठा साम्राज्याची अधिकृत स्थापना.", descEn:"6 June 1674 — Grand coronation as Chhatrapati at Raigad. Official establishment of the Maratha Empire.", crown:true },
  { year:"१६८०", icon:"🕊", mr:"महानिर्वाण — रायगड", en:"Mahaparinirvana — Raigad", descMr:"३ एप्रिल १६८० रोजी रायगडावर महानिर्वाण. आत्मा प्रत्येक मराठ्याच्या हृदयात जगतो.", descEn:"3 April 1680. He left, but his spirit lives forever in every Maratha's heart.", crown:false },
];

const FORTS_DATA = [
  { img:"images/raigadfort.jpg", badgeMr:"राजधानी", badgeEn:"Capital", elev:"⛰ ८२० मीटर", nameMr:"🏰 रायगड किल्ला", nameEn:"🏰 Raigad Fort", subtitleMr:"मराठा साम्राज्याची राजधानी · रायगड जिल्हा", subtitleEn:"Capital of Maratha Empire · Raigad District", descMr:"रायगड म्हणजे महाराजांचं स्वप्न साकार झालेलं ठिकाण. येथेच ६ जून १६७४ रोजी राज्याभिषेक झाला. महाराजांचे समाधीस्थळ आजही येथे आहे.", descEn:"Raigad is where Maharaj's dream came alive. The grand coronation of 1674 happened here. His memorial samadhi stands here to this day.", pillsMr:["राज्याभिषेक","समाधी","राजधानी"], pillsEn:["Coronation","Memorial","Capital"] },
  { img:"images/sihgadfort.jpg", badgeMr:"तानाजींचा गड", badgeEn:"Tanaji's Fort", elev:"⛰ १२९२ मीटर", nameMr:"🦁 सिंहगड किल्ला", nameEn:"🦁 Sinhagad Fort", subtitleMr:"तानाजींचं बलिदान · पुणे जिल्हा", subtitleEn:"Tanaji's Sacrifice · Pune District", descMr:"तानाजी मालुसरे यांनी रात्री घोरपडीच्या सहाय्याने हा किल्ला जिंकला आणि वीरगती प्राप्त केली. 'गड आला पण सिंह गेला!'", descEn:"Tanaji Malusare scaled this fort at night and attained martyrdom. 'The fort is won, but the lion is gone!'", pillsMr:["तानाजी बलिदान","शौर्य"], pillsEn:["Tanaji's Sacrifice","Bravery"] },
  { img:"images/pratapfort.jpg", badgeMr:"अफझलखान वध", badgeEn:"Historic Battle", elev:"⛰ १०८० मीटर", nameMr:"⚔ प्रतापगड किल्ला", nameEn:"⚔ Pratapgad Fort", subtitleMr:"अफझलखान वधाची पुण्यभूमी · सातारा जिल्हा", subtitleEn:"Sacred ground of Afzal Khan's defeat · Satara", descMr:"१० नोव्हेंबर १६५९ रोजी येथे महाराजांनी वाघनखाने अफझलखानाचा वध केला. भवानी मातेचे मंदिर या किल्ल्यावर आहे.", descEn:"On 10 November 1659, Maharaj killed Afzal Khan here. The temple of Goddess Bhavani stands on this fort.", pillsMr:["अफझलखान वध","भवानी मंदिर"], pillsEn:["Afzal Khan","Bhavani Temple"] },
  { img:"images/Shivneri_Fort.jpg", badgeMr:"जन्मभूमी", badgeEn:"Birthplace", elev:"⛰ १०६५ मीटर", nameMr:"🌟 शिवनेरी किल्ला", nameEn:"🌟 Shivneri Fort", subtitleMr:"महाराजांची जन्मभूमी · जुन्नर, पुणे जिल्हा", subtitleEn:"Maharaj's birthplace · Junnar, Pune District", descMr:"१९ फेब्रुवारी १६३० रोजी या किल्ल्यावर शिवाजी महाराजांचा जन्म झाला. हा किल्ला म्हणजे स्वराज्याची पहाट आहे.", descEn:"Shivaji Maharaj was born at this fort on 19 February 1630. This fort is the very dawn of Swarajya.", pillsMr:["जन्मस्थान","शिवाई देवी"], pillsEn:["Birthplace","Shivai Devi"] },
];

const BATTLES_DATA = [
  { year:"१६५९", icon:"🗡", nameMr:"प्रतापगड युद्ध", nameEn:"Battle of Pratapgad", vsMr:"आदिलशाही", vsEn:"Adilshahi", descMr:"अफझलखानाचा वध — स्वराज्यासाठी सर्वात मोठा विजय.", descEn:"Killing of Afzal Khan — the greatest victory for Swarajya.", resultMr:"✅ मराठ्यांचा विजय", resultEn:"✅ Maratha Victory", win:true },
  { year:"१६६०", icon:"🌙", nameMr:"पन्हाळगड वेढा", nameEn:"Siege of Panhala", vsMr:"सिद्दी जोहर", vsEn:"Siddhi Johar", descMr:"चार महिन्यांच्या वेढ्यातून रात्री यशस्वी सुटका.", descEn:"Successful escape from a four-month siege at night.", resultMr:"🌙 धाडसी सुटका", resultEn:"🌙 Daring Escape", win:false },
  { year:"१६७०", icon:"🦁", nameMr:"सिंहगड विजय", nameEn:"Battle of Sinhagad", vsMr:"मुघल", vsEn:"Mughals", descMr:"रात्री घोरपडीने चढून तानाजींनी किल्ला जिंकला — वीरमरण!", descEn:"Tanaji scaled the fort at night — heroic death but glorious victory!", resultMr:"✅ मराठ्यांचा विजय", resultEn:"✅ Maratha Victory", win:true },
  { year:"१६६४", icon:"🏹", nameMr:"सुरत मोहीम", nameEn:"Surat Campaign", vsMr:"मुघल", vsEn:"Mughals", descMr:"मुघलांचे सर्वात श्रीमंत बंदर लुटून स्वराज्यासाठी संपत्ती मिळवली.", descEn:"Raided the Mughals' richest port and secured enormous wealth.", resultMr:"✅ मराठ्यांचा विजय", resultEn:"✅ Maratha Victory", win:true },
  { year:"१६५९–७०", icon:"⚓", nameMr:"सागरी युद्धे", nameEn:"Naval Battles", vsMr:"पोर्तुगीज / सिद्दी", vsEn:"Portuguese / Siddhi", descMr:"भारताचे पहिले संघटित नौदल उभारून समुद्रावर वर्चस्व.", descEn:"Established India's first organised navy and dominated the seas.", resultMr:"✅ नौदल विजय", resultEn:"✅ Naval Victory", win:true },
  { year:"१६५९–७९", icon:"🔥", nameMr:"गनिमी काव्य", nameEn:"Ganimi Kava", vsMr:"सर्व शत्रू", vsEn:"All Enemies", descMr:"गनिमी काव्याचा वापर करून मोठ्या सैन्यांना पराभूत केले. ही रणनीती आजही शिकवली जाते.", descEn:"Used guerrilla warfare to defeat armies far larger than his own. This strategy is still taught worldwide.", resultMr:"✅ रणनीती विजय", resultEn:"✅ Strategic Mastery", win:true },
];

const MAVALE_DATA = [
  { icon:"🗡", nameMr:"तानाजी मालुसरे", nameEn:"Tanaji Malusare", titleMr:"सिंहगडाचा सिंह", titleEn:"Lion of Sinhagad", descMr:"सिंहगड जिंकताना वीरगती प्राप्त केली. 'गड आला पण सिंह गेला!' हे शब्द अजरामर आहेत.", descEn:"Attained martyrdom capturing Sinhagad. 'The fort is won, but the lion is gone!' — immortal words." },
  { icon:"🏇", nameMr:"बाजीप्रभू देशपांडे", nameEn:"Bajiprabhu Deshpande", titleMr:"घोडखिंडीचा वीर", titleEn:"Hero of Ghodkhind", descMr:"घोडखिंडीत एकट्याने शत्रूशी लढत वीरमरण पावले. महाराज सुरक्षित पोहोचेपर्यंत लढत राहिले.", descEn:"Fought alone at Ghodkhind until Maharaj reached safety, dying a hero's death." },
  { icon:"🔱", nameMr:"राजमाता जिजाबाई", nameEn:"Rajmata Jijabai", titleMr:"स्वराज्याची जननी", titleEn:"Mother of Swarajya", descMr:"महाराजांच्या मनात स्वराज्याची ज्योत लावणाऱ्या आई. त्यांच्याशिवाय छत्रपती घडलेच नसते.", descEn:"The mother who lit the flame of Swarajya in Maharaj's heart. Without her, Chhatrapati would not have existed." },
  { icon:"⚓", nameMr:"कान्होजी आंग्रे", nameEn:"Kanhoji Angre", titleMr:"मराठा नौदलाचा सेनापती", titleEn:"Admiral of Maratha Navy", descMr:"पोर्तुगीज, ब्रिटिश आणि डच यांच्या आरमाराला धडका दिल्या. समुद्रावर मराठ्यांचे राज्य स्थापित केले.", descEn:"Challenged Portuguese, British and Dutch fleets. Established Maratha dominance over the seas." },
  { icon:"📜", nameMr:"दादोजी कोंडदेव", nameEn:"Dadoji Konddev", titleMr:"महाराजांचे पहिले गुरू", titleEn:"First Teacher of Maharaj", descMr:"महाराजांना तलवारबाजी, घोडेस्वारी, युद्धशास्त्र आणि प्रशासन शिकवले.", descEn:"Taught Maharaj swordsmanship, horsemanship, military science and administration." },
  { icon:"🌙", nameMr:"नेताजी पालकर", nameEn:"Netaji Palkar", titleMr:"घोडदळाचा सर्वोच्च सेनापती", titleEn:"Supreme Commander of Cavalry", descMr:"महाराजांच्या घोडदळाचे नेतृत्व करीत अनेक लढाया जिंकल्या.", descEn:"Led Maharaj's cavalry to many victories. His speed and aggression were terrifying for enemies." },
];

const LEGACY_DATA = [
  { icon:"⚓", nameMr:"भारतीय नौदलाचे जनक", nameEn:"Father of Indian Navy", descMr:"महाराजांनी भारताचे पहिले संघटित नौदल उभारले. नौदल दिवस त्यांच्याच स्मृतीत साजरा होतो.", descEn:"Maharaj established India's first organised naval force. Navy Day is celebrated in his memory." },
  { icon:"⚖", nameMr:"आधुनिक प्रशासनाचे प्रणेते", nameEn:"Pioneer of Modern Governance", descMr:"अष्टप्रधान मंडळ, स्वतंत्र न्यायव्यवस्था, भ्रष्टाचाराला शून्य सहनशीलता.", descEn:"Ashtapradhan council, independent judiciary, zero tolerance for corruption." },
  { icon:"🛕", nameMr:"धर्मनिरपेक्षतेचा खरा आदर्श", nameEn:"True Model of Secularism", descMr:"मशिदींचे रक्षण, कुराणाचा आदर, मुस्लिम सरदारांना प्रमुख पदे.", descEn:"Protected mosques, respected the Quran, gave key posts to Muslim commanders." },
  { icon:"📜", nameMr:"मराठी भाषेचा उत्कर्ष", nameEn:"Upliftment of Marathi Language", descMr:"फारसीऐवजी मराठी आणि संस्कृत शब्दांचा वापर करणारा 'राज्यव्यवहारकोश' तयार केला.", descEn:"Created the 'Rajyavyavaharkosh' using Marathi and Sanskrit instead of Persian." },
  { icon:"🌾", nameMr:"रयतेचे राज्य", nameEn:"The People's Kingdom", descMr:"शेतकऱ्यांना जमीन, न्याय्य कर, महिलांचा सन्मान — 'रयत म्हणजेच राज्य'.", descEn:"Land for farmers, fair taxes, respect for women — 'The people are the kingdom'." },
  { icon:"🔥", nameMr:"स्वातंत्र्य आंदोलनाचे स्फूर्तिस्थान", nameEn:"Inspiration for Freedom Movement", descMr:"बाळ गंगाधर टिळक, स्वामी विवेकानंद, नेताजी सुभाषचंद्र बोस — सर्वांनी प्रेरणा घेतली.", descEn:"Tilak, Vivekananda, Netaji Bose — all drew inspiration from Maharaj." },
];

const GALLERY_DATA = [
  { img:"images/maharaj2.jpg", capMr:"छत्रपती शिवाजी महाराज — ऐतिहासिक चित्र", capEn:"Chhatrapati Shivaji Maharaj — Historical Portrait", labelMr:"ऐतिहासिक चित्र", labelEn:"Historical Portrait", tall:true },
  { img:"images/raigad2.jpg", capMr:"रायगड किल्ला — मराठा साम्राज्याची राजधानी", capEn:"Raigad Fort — Capital of the Maratha Empire", labelMr:"रायगड किल्ला", labelEn:"Raigad Fort" },
  { img:"images/sinhgad2.jpg", capMr:"सिंहगड किल्ला — तानाजींचा गड", capEn:"Sinhagad Fort — Tanaji's Fort", labelMr:"सिंहगड किल्ला", labelEn:"Sinhagad Fort" },
  { img:"images/rajgad2.jpg", capMr:"राजगड — महाराजांची पहिली राजधानी", capEn:"Rajgad Fort — Maharaj's first capital", labelMr:"राजगड किल्ला", labelEn:"Rajgad Fort", wide:true },
  { img:"images/jijamata.jpg", capMr:"राजमाता जिजाबाई — स्वराज्याची जननी", capEn:"Rajmata Jijabai — Mother of Swarajya", labelMr:"राजमाता जिजाबाई", labelEn:"Rajmata Jijabai" },
  { img:"images/Shivneri_Fort.jpg", capMr:"शिवनेरी किल्ला — महाराजांची जन्मभूमी", capEn:"Shivneri Fort — Maharaj's birthplace", labelMr:"शिवनेरी किल्ला", labelEn:"Shivneri Fort" },
  { img:"images/torana.jpg", capMr:"स्वराज्याचा पहिला किल्ला, वयाच्या १७ व्या वर्षी जिंकला", capEn:"Torna Fort — The First Fort of Swarajya", labelMr:"तोरणा किल्ला", labelEn:"Torna Fort" },
];

const QUOTES_DATA = [
  { mr:"स्वराज्य माझा जन्मसिद्ध हक्क आहे आणि तो मी मिळवणारच!", en:"Swarajya is my birthright and I shall have it!" },
  { mr:"शत्रू कितीही बलवान असो, धैर्य आणि चातुर्य हेच खरे शस्त्र आहे.", en:"No matter how powerful the enemy, courage and strategy are the true weapons." },
  { mr:"रयतेचे रक्षण हे राजाचे सर्वोच्च कर्तव्य आहे.", en:"Protecting the people is the king's highest duty." },
  { mr:"गड आला पण सिंह गेला!", en:"The fort is won, but the lion is gone!" },
  { mr:"आईच्या शिकवणुकीतूनच माझ्यात स्वराज्याची ज्योत पेटली.", en:"From my mother's teachings the flame of Swarajya was lit within me." },
];


const FORTS_MAP_DATA = [
  { id:"raigad",    lat:18.2335, lng:73.4403, name:"रायगड किल्ला",     nameEn:"Raigad Fort",      type:"capital", color:"#d85a30", elev:"820 मीटर",      dist:"रायगड जिल्हा",        year:"१६७४",    event:"राज्याभिषेक",          eventEn:"Coronation",           desc:"मराठा साम्राज्याची राजधानी. ६ जून १६७४ रोजी येथे राज्याभिषेक झाला. महाराजांची समाधी येथेच आहे.",   descEn:"Capital of the Maratha Empire. The grand coronation took place on 6 June 1674. Maharaj's memorial samadhi stands here.", tags:["राजधानी","राज्याभिषेक","समाधी"], tagsEn:["Capital","Coronation","Memorial"] },
  { id:"sinhagad",  lat:18.3667, lng:73.7542, name:"सिंहगड किल्ला",    nameEn:"Sinhagad Fort",    type:"battle",  color:"#185fa5", elev:"1292 मीटर",     dist:"पुणे जिल्हा",         year:"१६७०",    event:"तानाजी बलिदान",        eventEn:"Tanaji's Sacrifice",   desc:"तानाजी मालुसरे यांनी रात्री घोरपडीने हा किल्ला जिंकला. 'गड आला पण सिंह गेला!'",                 descEn:"Tanaji Malusare scaled this fort at night. 'The fort is won, but the lion is gone!'",                                  tags:["युद्धभूमी","बलिदान","पुणे"],   tagsEn:["Battle","Sacrifice","Pune"] },
  { id:"pratapgad", lat:17.9342, lng:73.5779, name:"प्रतापगड किल्ला",  nameEn:"Pratapgad Fort",   type:"battle",  color:"#185fa5", elev:"1080 मीटर",     dist:"सातारा जिल्हा",       year:"१६५९",    event:"अफझलखान वध",           eventEn:"Killing of Afzal Khan",desc:"१० नोव्हेंबर १६५९ — येथे महाराजांनी वाघनखाने अफझलखानाचा वध केला. भवानी मातेचे मंदिर येथे आहे.", descEn:"On 10 Nov 1659, Maharaj killed Afzal Khan here. Goddess Bhavani's temple stands on this fort.",                        tags:["युद्धभूमी","अफझलखान","भवानी"], tagsEn:["Battle","Afzal Khan","Bhavani"] },
  { id:"shivneri",  lat:19.2117, lng:73.8597, name:"शिवनेरी किल्ला",   nameEn:"Shivneri Fort",    type:"birth",   color:"#3b6d11", elev:"1065 मीटर",     dist:"जुन्नर, पुणे",        year:"१६३०",    event:"महाराजांचा जन्म",      eventEn:"Maharaj's Birth",      desc:"१९ फेब्रुवारी १६३० — छत्रपती शिवाजी महाराजांची जन्मभूमी. शिवाईदेवीच्या आशीर्वादाने जन्मलेले.", descEn:"19 Feb 1630 — Birthplace of Chhatrapati Shivaji Maharaj. Born with the blessings of goddess Shivai.",                  tags:["जन्मभूमी","शिवाई देवी","जुन्नर"],tagsEn:["Birthplace","Shivai Devi","Junnar"] },
  { id:"torna",     lat:18.2769, lng:73.6228, name:"तोरणा किल्ला",     nameEn:"Torna Fort",       type:"battle",  color:"#185fa5", elev:"1403 मीटर",     dist:"पुणे जिल्हा",         year:"१६४७",    event:"पहिला किल्ला",         eventEn:"First Fort of Swarajya",desc:"वयाच्या १७ व्या वर्षी महाराजांनी तोरणा जिंकला. स्वराज्याचे पहिले पाऊल! महाराष्ट्रातील सर्वात उंच.",descEn:"At 17, Maharaj captured Torna — the very first step of Swarajya! The tallest fort in Maharashtra.",                    tags:["पहिला किल्ला","स्वराज्य","उंच"],tagsEn:["First Fort","Swarajya","Tallest"] },
  { id:"rajgad",    lat:18.2458, lng:73.6831, name:"राजगड किल्ला",     nameEn:"Rajgad Fort",      type:"capital", color:"#d85a30", elev:"1376 मीटर",     dist:"पुणे जिल्हा",         year:"१६४७-७४", event:"पहिली राजधानी",        eventEn:"First Capital",        desc:"महाराजांची पहिली राजधानी. तब्बल २५ वर्षे स्वराज्याचे केंद्र. येथूनच अनेक मोहिमा आखल्या गेल्या.", descEn:"Maharaj's first capital. The center of Swarajya for 25 years. Many campaigns were planned from here.",                 tags:["पहिली राजधानी","२५ वर्षे","पुणे"],tagsEn:["First Capital","25 Years","Pune"] },
  { id:"panhala",   lat:16.8122, lng:74.1095, name:"पन्हाळगड किल्ला",  nameEn:"Panhala Fort",     type:"battle",  color:"#185fa5", elev:"851 मीटर",      dist:"कोल्हापूर जिल्हा",   year:"१६६०",    event:"धाडसी सुटका",          eventEn:"Daring Escape",        desc:"सिद्दी जोहरच्या वेढ्यातून रात्री यशस्वी सुटका. बाजीप्रभू देशपांडे यांचे घोडखिंडीत बलिदान.",    descEn:"Successful escape from Siddhi Johar's siege at night. Bajiprabhu Deshpande's immortal sacrifice.",                    tags:["सुटका","बाजीप्रभू","कोल्हापूर"],tagsEn:["Escape","Bajiprabhu","Kolhapur"] },
  { id:"vijaydurg", lat:16.5608, lng:73.3355, name:"विजयदुर्ग किल्ला", nameEn:"Vijaydurg Fort",   type:"sea",     color:"#534ab7", elev:"समुद्र पातळी",  dist:"सिंधुदुर्ग जिल्हा", year:"१६५३",    event:"मराठा नौदल",           eventEn:"Maratha Navy Base",    desc:"मराठा नौदलाचा सर्वात मजबूत किल्ला. कान्होजी आंग्रे यांचे केंद्र. समुद्रावर मराठ्यांचे वर्चस्व.",descEn:"The strongest fort of the Maratha navy. Base of Kanhoji Angre. Maratha dominance over the seas.",                    tags:["नौदल","सागरी","कान्होजी"],      tagsEn:["Navy","Sea","Kanhoji"] },
  { id:"sindhudurg",lat:16.0472, lng:73.4998, name:"सिंधुदुर्ग किल्ला",nameEn:"Sindhudurg Fort",  type:"sea",     color:"#534ab7", elev:"समुद्रात",      dist:"मालवण, सिंधुदुर्ग", year:"१६६४",    event:"समुद्री किल्ला",       eventEn:"Sea Fort",             desc:"महाराजांनी समुद्रात बांधलेला अभेद्य किल्ला. सुवर्णाचा पाया, समुद्राचे संरक्षण. नौदलाचे प्रतीक.",descEn:"An impregnable fort built in the sea by Maharaj. Foundation of gold, protected by the ocean.",                       tags:["समुद्री","अभेद्य","मालवण"],     tagsEn:["Sea","Impregnable","Malvan"] },
  { id:"purandar",  lat:18.2714, lng:73.9819, name:"पुरंदर किल्ला",    nameEn:"Purandar Fort",    type:"battle",  color:"#185fa5", elev:"1389 मीटर",     dist:"पुणे जिल्हा",         year:"१६५५",    event:"पुरंदरचा तह",          eventEn:"Treaty of Purandar",   desc:"१६६५ चा पुरंदरचा तह येथे झाला. मुघलांशी संघर्षातील महत्त्वाचा किल्ला. मुरारबाजींचे शौर्य.",     descEn:"The 1665 Treaty of Purandar was signed here. Key fort in Mughal conflict. Scene of Murarbayi's heroism.",             tags:["पुरंदर तह","मुरारबाजी","मुघल"], tagsEn:["Treaty","Murarbayi","Mughals"] },
];


const INFO_TABLE = [
  { keyMr:"🎂 जन्म",        keyEn:"🎂 Born",        valMr:"१९ फेब्रुवारी १६३०",   valEn:"19 February 1630" },
  { keyMr:"🏰 जन्मस्थान",   keyEn:"🏰 Birthplace",  valMr:"शिवनेरी किल्ला",       valEn:"Shivneri Fort" },
  { keyMr:"👨 वडील",        keyEn:"👨 Father",       valMr:"शाहाजी महाराज",        valEn:"Shahaji Maharaj" },
  { keyMr:"👩 आई",          keyEn:"👩 Mother",       valMr:"राजमाता जिजाबाई",      valEn:"Rajmata Jijabai" },
  { keyMr:"👑 राज्याभिषेक", keyEn:"👑 Coronation",   valMr:"६ जून १६७४",           valEn:"6 June 1674" },
  { keyMr:"📍 राजधानी",     keyEn:"📍 Capital",      valMr:"रायगड किल्ला",         valEn:"Raigad Fort" },
  { keyMr:"⚔ घराणे",       keyEn:"⚔ Dynasty",      valMr:"भोसले",                valEn:"Bhonsle" },
  { keyMr:"🕊 निधन",        keyEn:"🕊 Death",        valMr:"३ एप्रिल १६८०",        valEn:"3 April 1680" },
];

// ── CSS STYLES ─────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Marathi&family=Mukta:wght@400;600;700&display=swap');
  :root {
    --ink:#050200; --ink2:#0a0400; --ink3:#110600; --ink4:#190900;
    --saf:#ff7a00; --saf2:#ff9933; --saf3:#ffb84d;
    --gold:#c8910c; --gold2:#e6b42a; --gold3:#f4d05a;
    --cream:#f0ddb8; --cream2:#ddc898; --mute:#967030;
    --bdr:rgba(200,145,12,.18); --bdr2:rgba(255,122,0,.2);
    --fd:'Tiro Devanagari Marathi',serif; --fb:'Mukta',sans-serif;
  }
  *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
  html{scroll-behavior:smooth}
  body{font-family:var(--fb);background:var(--ink);color:var(--cream);overflow-x:hidden;line-height:1.8}
  img{display:block;width:100%;height:100%;object-fit:cover;object-position:center top}
  a{text-decoration:none;color:inherit}
  ::-webkit-scrollbar{width:5px}
  ::-webkit-scrollbar-track{background:var(--ink)}
  ::-webkit-scrollbar-thumb{background:var(--saf);border-radius:3px}
  .wrap{max-width:1100px;margin:0 auto;padding:0 1.5rem}

  /* Loader */
  .loader{position:fixed;inset:0;background:var(--ink);display:flex;align-items:center;justify-content:center;z-index:9999;transition:opacity .6s,visibility .6s}
  .loader.done{opacity:0;visibility:hidden;pointer-events:none}
  .ld-emblem{font-size:3.5rem;display:block;margin-bottom:1.5rem;animation:emblemPulse 1.5s ease-in-out infinite alternate}
  @keyframes emblemPulse{from{transform:scale(.9) rotate(-5deg);filter:drop-shadow(0 0 10px rgba(255,122,0,.5))}to{transform:scale(1.1) rotate(5deg);filter:drop-shadow(0 0 25px rgba(255,122,0,.9))}}
  .ld-bar{width:220px;height:3px;background:var(--ink4);border-radius:2px;overflow:hidden;margin:0 auto 1rem}
  .ld-prog{height:100%;background:linear-gradient(90deg,var(--saf),var(--gold2));width:0;transition:width .08s}
  .ld-msg{font-family:var(--fd);font-size:.9rem;color:var(--mute);text-align:center}

  /* Navbar */
  .nav{position:fixed;top:0;left:0;right:0;z-index:800;transition:background .4s,box-shadow .4s}
  .nav.stuck{background:rgba(5,2,0,.96);backdrop-filter:blur(20px);box-shadow:0 1px 0 var(--bdr),0 4px 24px rgba(0,0,0,.6)}
  .nav-inner{max-width:1200px;margin:0 auto;padding:0 1.5rem;height:66px;display:flex;align-items:center;gap:.5rem}
  .nav-brand{display:flex;align-items:center;gap:9px;font-family:var(--fd);font-size:1.3rem;color:var(--gold2);flex-shrink:0}
  .nav-links{display:flex;gap:0;list-style:none;align-items:center;flex:1;justify-content:center;margin:0 .3rem}
  .nl{font-family:var(--fb);font-size:.88rem;font-weight:600;color:var(--cream2);padding:6px 10px;border-radius:8px;cursor:pointer;transition:color .3s,background .3s;position:relative;white-space:nowrap;background:none;border:none}
  .nl::after{content:'';position:absolute;bottom:4px;left:50%;transform:translateX(-50%) scaleX(0);width:55%;height:2px;background:var(--saf);border-radius:2px;transition:transform .3s}
  .nl:hover,.nl.on{color:var(--saf);background:rgba(255,122,0,.07)}
  .nl:hover::after,.nl.on::after{transform:translateX(-50%) scaleX(1)}
  .lang-toggle{display:flex;align-items:center;background:rgba(255,122,0,.08);border:1.5px solid rgba(255,122,0,.35);border-radius:20px;padding:2px;gap:0;flex-shrink:0;cursor:pointer;transition:all .3s}
  .lang-toggle:hover{border-color:var(--saf);box-shadow:0 0 14px rgba(255,122,0,.2)}
  .lt-btn{font-family:var(--fb);font-size:.75rem;font-weight:600;padding:4px 10px;border-radius:16px;border:none;background:transparent;color:rgba(255,122,0,.6);cursor:pointer;transition:all .3s}
  .lt-btn.active{background:linear-gradient(135deg,#922d00,var(--saf));color:#000;box-shadow:0 2px 10px rgba(255,122,0,.45)}
  .nav-right{display:flex;align-items:center;gap:.4rem;flex-shrink:0;margin-left:auto}
  .ham{display:none;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:6px;flex-shrink:0}
  .ham span{display:block;width:22px;height:2px;background:var(--cream2);border-radius:2px;transition:all .3s}

  /* Hero */
  .hero{position:relative;min-height:100vh;display:flex;align-items:center;justify-content:center;text-align:center;overflow:hidden;background:radial-gradient(ellipse 80% 55% at 50% 30%,rgba(255,122,0,.14),transparent 65%),radial-gradient(ellipse 50% 60% at 10% 80%,rgba(200,145,12,.1),transparent 60%),linear-gradient(170deg,var(--ink) 0%,#110600 45%,var(--ink) 100%);padding:110px 1.5rem 90px}
  #heroCanvas{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
  .hero-content{position:relative;z-index:2;max-width:820px;margin:0 auto}
  .hero-frame{position:absolute;inset:22px;pointer-events:none;z-index:1}
  .hf-corner{position:absolute;font-size:1.3rem;color:var(--gold);opacity:.32;animation:cornerGlow 3.5s ease-in-out infinite alternate}
  .hf-corner.tl{top:0;left:0}.hf-corner.tr{top:0;right:0}.hf-corner.bl{bottom:0;left:0}.hf-corner.br{bottom:0;right:0}
  @keyframes cornerGlow{from{opacity:.18}to{opacity:.52}}
  .hf-line{position:absolute;background:linear-gradient(90deg,transparent,rgba(200,145,12,.22),transparent)}
  .hf-line.top{top:6px;left:30px;right:30px;height:1px}.hf-line.bot{bottom:6px;left:30px;right:30px;height:1px}
  .hf-line.lft{left:6px;top:30px;bottom:30px;width:1px;background:linear-gradient(180deg,transparent,rgba(200,145,12,.22),transparent)}
  .hf-line.rgt{right:6px;top:30px;bottom:30px;width:1px;background:linear-gradient(180deg,transparent,rgba(200,145,12,.22),transparent)}
  .hero-tribute{display:inline-flex;align-items:center;gap:18px;margin-bottom:1.6rem;position:relative}
  .diya{font-size:1.8rem;filter:drop-shadow(0 0 12px rgba(255,180,0,.9));animation:diyaFlame 2.5s ease-in-out infinite alternate}
  @keyframes diyaFlame{0%{transform:scale(1) rotate(-4deg)}50%{transform:scale(1.12)}100%{transform:scale(1.06) rotate(4deg)}}
  .tribute-text{display:flex;flex-direction:column;align-items:center;gap:2px}
  .t1{font-family:var(--fd);font-size:clamp(.9rem,1.8vw,1.1rem);color:var(--cream2);letter-spacing:.1em}
  .t2{font-family:var(--fd);font-size:clamp(1.4rem,3.5vw,2.3rem);background:linear-gradient(90deg,var(--gold2),var(--saf3),var(--gold3),var(--gold2));background-size:200%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 3.5s linear infinite}
  @keyframes shimmer{from{background-position:0%}to{background-position:200%}}
  .hero-name{display:flex;flex-direction:column;align-items:center;margin-bottom:.8rem}
  .hn-top{font-family:var(--fd);font-size:clamp(1.1rem,2.6vw,1.75rem);color:var(--cream2);letter-spacing:.06em}
  .hn-main{font-family:var(--fd);font-size:clamp(2.6rem,7.5vw,6rem);font-weight:400;line-height:1;background:linear-gradient(135deg,var(--gold3) 0%,var(--saf2) 40%,var(--gold2) 70%,var(--gold3) 100%);background-size:300%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:shimmer 5s linear infinite;filter:drop-shadow(0 0 40px rgba(200,145,12,.5))}
  .hn-dates{font-family:var(--fb);font-size:.8rem;color:var(--mute);letter-spacing:.12em;margin-top:.3rem}
  .hero-badge{display:inline-flex;align-items:center;gap:12px;font-family:var(--fd);font-size:clamp(1rem,2vw,1.3rem);letter-spacing:.08em;color:var(--gold2);margin-bottom:1.4rem;background:rgba(200,145,12,.1);border:1px solid rgba(200,145,12,.3);padding:8px 22px;border-radius:30px}
  .hero-tagline{font-family:var(--fd);font-size:clamp(.95rem,2vw,1.2rem);color:var(--saf3);letter-spacing:.07em;margin-bottom:1rem}
  .hero-bio{font-size:clamp(.95rem,1.7vw,1.06rem);color:var(--cream2);opacity:.88;max-width:640px;margin:0 auto 1.4rem;line-height:1.9}
  .hero-quote{display:inline-flex;align-items:flex-start;gap:8px;background:rgba(255,122,0,.07);border:1px solid var(--bdr2);border-radius:12px;padding:14px 22px;margin-bottom:1.8rem;max-width:640px}
  .hq-mark{font-size:2.4rem;line-height:.7;color:var(--saf);opacity:.45;flex-shrink:0;font-family:Georgia,serif}
  .hq-text{font-family:var(--fd);font-size:clamp(.95rem,1.9vw,1.18rem);color:var(--saf3);line-height:1.72;text-align:left}
  .hero-btns{display:flex;gap:.9rem;justify-content:center;flex-wrap:wrap;margin-bottom:2.2rem}
  .btn-main{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,#922d00,var(--saf));color:#000;font-family:var(--fb);font-weight:700;font-size:.98rem;padding:13px 28px;border-radius:10px;box-shadow:0 4px 22px rgba(255,122,0,.45);border:none;cursor:pointer;transition:all .3s}
  .btn-main:hover{transform:translateY(-3px);box-shadow:0 8px 32px rgba(255,122,0,.65)}
  .btn-sec{display:inline-flex;align-items:center;background:transparent;color:var(--gold2);font-family:var(--fb);font-weight:600;font-size:.98rem;padding:12px 26px;border-radius:10px;border:1.5px solid var(--gold);cursor:pointer;transition:all .3s}
  .btn-sec:hover{background:rgba(200,145,12,.2);transform:translateY(-3px)}
  .hero-stats{display:inline-flex;align-items:center;background:rgba(255,255,255,.03);border:1px solid var(--bdr);border-radius:14px;padding:14px 8px;flex-wrap:wrap;justify-content:center}
  .hstat{padding:5px 24px;text-align:center}
  .hstat-v{display:block;font-family:var(--fd);font-size:1.85rem;color:var(--gold2);line-height:1;margin-bottom:3px}
  .hstat-l{display:block;font-size:.74rem;color:var(--mute);letter-spacing:.08em}
  .hstat-sep{width:1px;height:40px;background:var(--bdr)}

  /* Sections */
  .section{padding:90px 0;position:relative;overflow:hidden}
  .sec-hd{text-align:center;margin-bottom:56px}
  .sec-chip{display:inline-block;background:linear-gradient(135deg,#5a2000,var(--saf));color:#000;font-family:var(--fb);font-weight:700;font-size:.7rem;letter-spacing:.24em;text-transform:uppercase;padding:5px 16px;border-radius:20px;margin-bottom:12px}
  .sec-title{font-family:var(--fd);font-size:clamp(1.8rem,3.8vw,2.85rem);color:var(--gold2);font-weight:400;line-height:1.25}
  .sec-ornament{display:flex;align-items:center;justify-content:center;gap:12px;color:var(--gold);opacity:.55;font-size:1.1rem;margin:.5rem 0}
  .sec-ornament span{display:block;height:1px;width:60px;background:linear-gradient(90deg,transparent,var(--gold),transparent)}
  .sec-desc{font-size:.97rem;color:var(--mute);max-width:580px;margin:.5rem auto 0;line-height:1.82}

  /* About */
  .about-sec{background:radial-gradient(ellipse 55% 60% at 5% 50%,rgba(255,122,0,.13),transparent 60%),radial-gradient(ellipse 45% 50% at 95% 20%,rgba(200,145,12,.11),transparent 55%),linear-gradient(180deg,#060200 0%,#0d0500 50%,#060200 100%)}
  .about-grid{display:grid;grid-template-columns:300px 1fr;gap:52px;align-items:start}
  .portrait-box{height:380px;background:var(--ink4);border-radius:16px;overflow:hidden;border:2px solid var(--bdr);margin-bottom:16px;box-shadow:0 0 30px rgba(200,145,12,.2),0 20px 55px rgba(0,0,0,.55)}
  .portrait-label{background:var(--ink3);border:1px solid var(--bdr);border-radius:10px;padding:12px 16px;text-align:center;margin-bottom:16px;font-family:var(--fd);font-size:.96rem;color:var(--gold2)}
  .info-table{background:var(--ink3);border:1px solid var(--bdr);border-radius:14px;overflow:hidden}
  .info-row{display:flex;justify-content:space-between;align-items:center;padding:11px 16px;border-bottom:1px solid var(--bdr);transition:background .3s}
  .info-row:last-child{border-bottom:none}
  .info-row:hover{background:rgba(255,122,0,.06)}
  .ir-key{font-size:.8rem;color:var(--mute);font-weight:600}
  .ir-val{font-size:.86rem;color:var(--cream2);font-weight:600;text-align:right}
  .about-tags{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:1.4rem}
  .tag{font-size:.8rem;font-weight:600;padding:5px 15px;border-radius:20px;border:1px solid var(--bdr);background:rgba(200,145,12,.1);color:var(--gold2);transition:all .3s;cursor:default}
  .tag.saf{background:rgba(255,122,0,.1);border-color:var(--bdr2);color:var(--saf3)}
  .story-block{margin-bottom:1.5rem}
  .story-block h3{font-family:var(--fd);font-size:1.1rem;color:var(--saf3);margin-bottom:.6rem;font-weight:400;display:flex;align-items:center;gap:8px}
  .story-block h3::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--bdr),transparent)}
  .story-block p{font-size:.95rem;color:var(--cream2);opacity:.88;line-height:1.9}
  .story-quote{background:var(--ink3);border-left:3px solid var(--saf);border-radius:0 10px 10px 0;padding:14px 18px;margin-top:1rem;display:flex;gap:8px}
  .sq-mark{font-size:2rem;line-height:.7;color:var(--saf);opacity:.45;flex-shrink:0;font-family:Georgia,serif}
  .sq-text{font-family:var(--fd);font-size:.98rem;color:var(--saf3);line-height:1.7}

  /* Childhood */
  .childhood-sec{background:radial-gradient(ellipse 70% 55% at 30% 50%,rgba(255,122,0,.11),transparent 60%),radial-gradient(ellipse 50% 60% at 80% 20%,rgba(200,145,12,.10),transparent 55%),linear-gradient(160deg,#060200 0%,#0e0500 50%,#060200 100%)}
  .childhood-intro{text-align:center;max-width:740px;margin:0 auto 3rem;font-size:1.02rem;color:var(--cream2);line-height:1.9}
  .childhood-cards{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
  .cc-card{background:var(--ink3);border:1px solid var(--bdr);border-radius:18px;overflow:hidden;transition:all .4s}
  .cc-card:hover{transform:translateY(-10px);border-color:var(--bdr2);box-shadow:0 22px 55px rgba(0,0,0,.45),0 0 30px rgba(255,122,0,.2)}
  .cc-img-wrap{position:relative;height:240px;background:var(--ink4);overflow:hidden}
  .cc-img-wrap img{transition:transform .6s,filter .4s;filter:brightness(.82) saturate(.88)}
  .cc-card:hover .cc-img-wrap img{transform:scale(1.08);filter:brightness(.95) saturate(1.1)}
  .cc-img-fade{position:absolute;inset:0;background:linear-gradient(to top,rgba(6,3,0,.88) 0%,transparent 55%);pointer-events:none}
  .cc-img-label{position:absolute;bottom:12px;left:14px;font-family:var(--fd);font-size:.82rem;color:var(--gold2);background:rgba(0,0,0,.45);padding:3px 12px;border-radius:20px;border:1px solid rgba(200,145,12,.3)}
  .cc-body{padding:20px 22px 24px}
  .cc-body h3{font-family:var(--fd);font-size:1.35rem;color:var(--gold2);margin-bottom:6px;font-weight:400}
  .cc-subtitle{font-size:.78rem;color:var(--saf);letter-spacing:.08em;text-transform:uppercase;font-weight:700;margin-bottom:12px;display:block}
  .cc-body p{font-size:.92rem;color:var(--mute);line-height:1.85}

  /* Timeline */
  .timeline-sec{background:radial-gradient(ellipse 70% 50% at 50% 50%,rgba(255,122,0,.10),transparent 60%),linear-gradient(170deg,#060200 0%,#090400 100%)}
  .tl-wrap{position:relative;padding:10px 0 20px}
  .tl-line{position:absolute;top:0;bottom:0;left:50%;transform:translateX(-50%);width:2px;background:linear-gradient(180deg,transparent 0%,var(--saf) 8%,var(--gold2) 50%,var(--saf) 92%,transparent 100%)}
  .tl-item{display:flex;align-items:flex-start;margin-bottom:48px;position:relative;width:50%}
  .tl-left{padding-right:50px;justify-content:flex-end}
  .tl-right{padding-left:50px;margin-left:50%}
  .tl-card{background:var(--ink3);border:1px solid var(--bdr);border-radius:14px;padding:20px 22px;max-width:400px;width:100%;transition:all .3s}
  .tl-card:hover{border-color:var(--bdr2);box-shadow:0 0 28px rgba(255,122,0,.2);transform:scale(1.02)}
  .tl-card.crown{border-color:rgba(200,145,12,.4);background:linear-gradient(135deg,var(--ink3),rgba(200,145,12,.06))}
  .tl-year{display:inline-block;background:linear-gradient(135deg,#5a2000,var(--saf));color:#000;font-weight:700;font-size:.76rem;padding:3px 13px;border-radius:20px;margin-bottom:8px}
  .tl-card h3{font-family:var(--fd);font-size:1.06rem;color:var(--gold2);margin-bottom:6px;font-weight:400}
  .tl-card p{font-size:.88rem;color:var(--mute);line-height:1.8}
  .tl-left .tl-card::after{content:'';position:absolute;top:16px;right:-9px;border:9px solid transparent;border-left-color:var(--ink3)}
  .tl-right .tl-card::after{content:'';position:absolute;top:16px;left:-9px;border:9px solid transparent;border-right-color:var(--ink3)}
  .tl-node{position:absolute;top:13px;width:34px;height:34px;background:var(--ink4);border:2px solid var(--gold2);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.9rem;z-index:2;box-shadow:0 0 12px rgba(200,145,12,.3)}
  .tl-node.crown{border-color:var(--saf);box-shadow:0 0 20px rgba(255,122,0,.55)}
  .tl-left .tl-node{right:-17px}.tl-right .tl-node{left:-17px}

  /* Forts */
  .forts-sec{background:radial-gradient(ellipse 90% 35% at 50% 0%,rgba(255,122,0,.12),transparent 50%),radial-gradient(ellipse 90% 35% at 50% 100%,rgba(200,145,12,.10),transparent 50%),linear-gradient(180deg,#060200 0%,#0c0500 50%,#060200 100%)}
  .forts-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:22px}
  .fort-card{background:var(--ink3);border:1px solid var(--bdr);border-radius:18px;overflow:hidden;transition:all .4s;will-change:transform}
  .fort-card:hover{transform:translateY(-9px);border-color:var(--bdr2);box-shadow:0 22px 55px rgba(0,0,0,.45),0 0 32px rgba(255,122,0,.22)}
  .fc-img{position:relative;height:220px;background:var(--ink4);overflow:hidden}
  .fc-img img{transition:transform .6s,filter .4s;filter:brightness(.82) saturate(.88)}
  .fort-card:hover .fc-img img{transform:scale(1.08);filter:brightness(.95) saturate(1.1)}
  .fc-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(5,2,0,.85) 0%,transparent 55%);pointer-events:none}
  .fc-badge{position:absolute;top:12px;right:12px;background:linear-gradient(135deg,#5a2000,var(--saf));color:#000;font-size:.7rem;font-weight:700;padding:3px 11px;border-radius:20px}
  .fc-elev{position:absolute;bottom:12px;left:12px;font-size:.75rem;color:var(--cream2);background:rgba(0,0,0,.55);padding:3px 11px;border-radius:20px;border:1px solid rgba(255,255,255,.1)}
  .fc-body{padding:20px 22px}
  .fc-body h3{font-family:var(--fd);font-size:1.3rem;color:var(--gold2);margin-bottom:3px;font-weight:400}
  .fc-subtitle{font-size:.78rem;color:var(--saf);font-style:italic;margin-bottom:10px}
  .fc-body p{font-size:.88rem;color:var(--mute);line-height:1.8;margin-bottom:14px}
  .fc-pills{display:flex;flex-wrap:wrap;gap:6px}
  .fc-pill{background:rgba(255,122,0,.09);border:1px solid var(--bdr2);color:var(--saf3);font-size:.72rem;padding:3px 11px;border-radius:20px}

  /* Battles */
  .battles-sec{background:radial-gradient(ellipse 60% 45% at 50% 10%,rgba(255,122,0,.11),transparent 55%),linear-gradient(180deg,#060200 0%,#080200 50%,#060200 100%)}
  .battles-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
  .battle-card{background:var(--ink3);border:1px solid var(--bdr);border-radius:15px;padding:22px 18px;position:relative;overflow:hidden;transition:all .35s;will-change:transform}
  .battle-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--saf),var(--gold2),var(--saf));transform:scaleX(0);transition:transform .35s}
  .battle-card:hover::before{transform:scaleX(1)}
  .battle-card:hover{transform:translateY(-7px);border-color:rgba(200,145,12,.3);box-shadow:0 16px 42px rgba(0,0,0,.42)}
  .bc-yr{display:inline-block;background:linear-gradient(135deg,#5a2000,var(--saf));color:#000;font-weight:700;font-size:.75rem;padding:3px 12px;border-radius:20px;margin-bottom:10px}
  .bc-icon{font-size:2rem;display:block;margin-bottom:10px}
  .battle-card h3{font-family:var(--fd);font-size:1.02rem;color:var(--gold2);margin-bottom:8px;font-weight:400}
  .bc-vs{display:flex;align-items:center;gap:6px;margin-bottom:8px;font-size:.8rem;color:var(--mute)}
  .bc-vs strong{color:var(--saf);font-size:.75rem}
  .battle-card p{font-size:.86rem;color:var(--mute);line-height:1.78;margin-bottom:12px}
  .bc-result{display:inline-block;font-size:.76rem;padding:3px 12px;border-radius:20px;background:rgba(255,255,255,.05);border:1px solid var(--bdr);color:var(--mute)}
  .bc-result.win{background:rgba(0,200,80,.07);border-color:rgba(0,200,80,.22);color:#4cc870}

  /* Mavale */
  .mavale-sec{background:radial-gradient(ellipse 70% 55% at 50% 50%,rgba(200,145,12,.10),transparent 60%),linear-gradient(135deg,#060200 0%,#0c0500 50%,#060200 100%)}
  .mavale-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .mavale-card{background:var(--ink3);border:1px solid var(--bdr);border-radius:16px;padding:26px 20px;text-align:center;position:relative;overflow:hidden;transition:all .4s;will-change:transform}
  .mavale-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--saf),var(--gold2),var(--saf));transform:scaleX(0);transition:transform .4s}
  .mavale-card:hover::before{transform:scaleX(1)}
  .mavale-card:hover{transform:translateY(-9px);border-color:rgba(200,145,12,.32);box-shadow:0 20px 50px rgba(0,0,0,.4),0 0 26px rgba(200,145,12,.22)}
  .mc-icon{font-size:2.5rem;display:block;margin-bottom:14px;filter:drop-shadow(0 0 8px rgba(255,122,0,.4))}
  .mavale-card h3{font-family:var(--fd);font-size:1.15rem;color:var(--gold2);margin-bottom:4px;font-weight:400}
  .mc-title{font-size:.78rem;color:var(--saf);letter-spacing:.08em;text-transform:uppercase;font-weight:700;margin-bottom:12px;display:block}
  .mavale-card p{font-size:.88rem;color:var(--mute);line-height:1.8}

  /* Legacy */
  .legacy-sec{background:radial-gradient(ellipse 80% 60% at 50% 100%,rgba(255,122,0,.12),transparent 55%),linear-gradient(180deg,#060200 0%,#090400 100%)}
  .legacy-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
  .legacy-item{display:flex;gap:15px;align-items:flex-start;background:var(--ink3);border:1px solid var(--bdr);border-radius:15px;padding:22px 18px;transition:all .3s;will-change:transform}
  .legacy-item:hover{border-color:var(--bdr2);transform:translateY(-6px);box-shadow:0 16px 40px rgba(0,0,0,.4),0 0 25px rgba(255,122,0,.18)}
  .li-icon{font-size:2.1rem;flex-shrink:0;filter:drop-shadow(0 0 7px rgba(255,122,0,.35))}
  .li-body h3{font-family:var(--fd);font-size:.98rem;color:var(--saf3);margin-bottom:7px;font-weight:400}
  .li-body p{font-size:.86rem;color:var(--mute);line-height:1.8}

  /* Gallery */
  .gallery-sec{background:radial-gradient(ellipse 60% 50% at 50% 50%,rgba(255,122,0,.09),transparent 60%),linear-gradient(180deg,#060200 0%,#0c0500 50%,#060200 100%)}
  .gal-mosaic{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:220px 220px;gap:14px}
  .gal-item{position:relative;overflow:hidden;border-radius:12px;border:1px solid var(--bdr);cursor:pointer;background:var(--ink4);transition:border-color .3s}
  .gal-item:hover{border-color:var(--bdr2)}
  .gal-tall{grid-row:span 2}.gal-wide{grid-column:span 2}
  .gal-item img{width:100%;height:100%;object-fit:cover;transition:transform .5s,filter .4s;filter:brightness(.82)}
  .gal-item:hover img{transform:scale(1.08);filter:brightness(.95)}
  .gal-ov{position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,122,0,.6),rgba(5,2,0,.6));display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;opacity:0;transition:opacity .3s}
  .gal-item:hover .gal-ov{opacity:1}
  .gal-ov span{font-size:1.8rem;color:#fff}
  .gal-ov p{color:#fff;font-family:var(--fd);font-size:.86rem}

  /* Lightbox */
  .lightbox{position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.93);backdrop-filter:blur(12px)}
  .lb-inner{position:relative;text-align:center;max-width:88vw;animation:lbIn .28s ease}
  @keyframes lbIn{from{transform:scale(.85);opacity:0}to{transform:scale(1);opacity:1}}
  .lb-inner img{max-width:100%;max-height:72vh;object-fit:contain;border-radius:12px;border:2px solid var(--bdr)}
  .lb-close{position:absolute;top:-46px;right:0;width:38px;height:38px;background:rgba(255,122,0,.18);border:1px solid var(--saf);border-radius:50%;color:#fff;font-size:.9rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .3s}
  .lb-close:hover{background:var(--saf)}
  .lb-cap{margin-top:14px;font-family:var(--fd);color:var(--gold2);font-size:.92rem}

  /* Quotes */
  .quotes-sec{background:radial-gradient(ellipse 75% 65% at 50% 50%,rgba(255,122,0,.11),transparent 60%),linear-gradient(180deg,#060200 0%,#080300 100%)}
  .q-slide{text-align:center;animation:qIn .45s ease}
  @keyframes qIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
  .q-mark{display:block;font-size:4.5rem;line-height:.5;color:var(--saf);opacity:.27;margin-bottom:1rem;font-family:Georgia,serif}
  .q-slide blockquote{font-family:var(--fd);font-size:clamp(1.1rem,2.3vw,1.5rem);color:var(--cream2);line-height:1.82;margin-bottom:1.2rem}
  .q-slide cite{font-size:.82rem;color:var(--saf);letter-spacing:.08em;font-style:italic}
  .q-controls{display:flex;align-items:center;justify-content:center;gap:14px;margin-top:1.8rem}
  .q-btn{width:40px;height:40px;border-radius:50%;background:rgba(255,122,0,.1);border:1px solid var(--bdr2);color:var(--saf3);font-size:1.2rem;cursor:pointer;transition:all .3s;display:flex;align-items:center;justify-content:center}
  .q-btn:hover{background:rgba(255,122,0,.22);transform:scale(1.12)}
  .q-dots{display:flex;gap:7px;align-items:center}
  .qdot{width:7px;height:7px;border-radius:50%;background:var(--ink);border:1px solid var(--bdr2);cursor:pointer;transition:all .3s}
  .qdot.on{background:var(--saf);width:22px;border-radius:4px}

  /* Footer */
  .footer{background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(255,122,0,.10),transparent 55%),linear-gradient(180deg,#0c0500 0%,#060200 100%);border-top:1px solid var(--bdr);padding-top:55px}
  .footer-grid{display:grid;grid-template-columns:1.8fr 1fr 1.2fr;gap:44px;padding-bottom:36px}
  .footer-logo{display:flex;align-items:center;gap:9px;font-family:var(--fd);font-size:1.3rem;color:var(--gold2);margin-bottom:.9rem}
  .footer-brand p{font-size:.9rem;color:var(--mute);line-height:1.86}
  .footer-salute{font-family:var(--fd);color:var(--saf3);margin-top:.8rem}
  .footer-links h4{font-size:.74rem;color:var(--saf);letter-spacing:.2em;text-transform:uppercase;font-weight:700;margin-bottom:13px;padding-bottom:7px;border-bottom:1px solid var(--bdr)}
  .footer-links ul{list-style:none}
  .footer-links li{margin-bottom:9px}
  .footer-links a{font-size:.9rem;color:var(--mute);display:flex;align-items:center;gap:5px;transition:color .3s}
  .footer-links a::before{content:'›';color:var(--saf)}
  .footer-links a:hover{color:var(--saf3)}
  .footer-big-q{display:flex;align-items:flex-start;gap:8px}
  .fbq-mark{font-size:3.5rem;line-height:.6;color:var(--saf);opacity:.28;font-family:Georgia,serif;flex-shrink:0}
  .fbq-text{font-family:var(--fd);font-size:1.05rem;color:var(--gold2);line-height:1.7;opacity:.85}
  .footer-bar{display:flex;justify-content:space-between;align-items:center;padding:17px 0;border-top:1px solid var(--bdr);font-size:.78rem;color:var(--mute);flex-wrap:wrap;gap:8px}

  /* Scroll to top */
  .stt{position:fixed;bottom:26px;right:26px;width:42px;height:42px;background:linear-gradient(135deg,#5a2000,var(--saf));border:none;border-radius:50%;color:#000;font-size:1.05rem;font-weight:800;cursor:pointer;z-index:700;opacity:0;transform:translateY(15px) scale(.85);pointer-events:none;transition:all .3s;box-shadow:0 4px 18px rgba(255,122,0,.4)}
  .stt.show{opacity:1;transform:translateY(0) scale(1);pointer-events:all}
  .stt:hover{transform:translateY(-3px) scale(1.1)}

  /* Responsive */

/* ═══════════════════════════════════════════════════
   COMPLETE RESPONSIVE SYSTEM
   320px → 480px → 768px → 1024px → 1280px → 1440px+
   ═══════════════════════════════════════════════════ */

/* ── LARGE DESKTOP (1440px+) ── */
@media (min-width: 1440px) {
  .wrap { max-width: 1320px; }
  .sec-title { font-size: 3.2rem; }
  .hn-main { font-size: 7rem; }
  .forts-grid { grid-template-columns: repeat(2,1fr); gap: 28px; }
  .battles-grid { grid-template-columns: repeat(3,1fr); gap: 22px; }
  .mavale-grid { grid-template-columns: repeat(3,1fr); gap: 24px; }
  .legacy-grid { grid-template-columns: repeat(3,1fr); gap: 24px; }
  .hero-bio { font-size: 1.15rem; max-width: 720px; }
}

/* ── STANDARD DESKTOP (1025px - 1439px) ── */
@media (min-width: 1025px) and (max-width: 1439px) {
  .wrap { max-width: 1100px; }
  .forts-grid { grid-template-columns: repeat(2,1fr); }
  .battles-grid { grid-template-columns: repeat(3,1fr); }
  .mavale-grid { grid-template-columns: repeat(3,1fr); }
  .legacy-grid { grid-template-columns: repeat(3,1fr); }
}

/* ── LAPTOP (769px - 1024px) ── */
@media (max-width: 1024px) {
  .wrap { max-width: 960px; padding: 0 1.5rem; }
  
  /* Navbar */
  .nl { font-size: .82rem; padding: 6px 9px; }
  .nav-brand { font-size: 1.2rem; }
  
  /* About */
  .about-grid { grid-template-columns: 1fr; gap: 32px; }
  .about-portrait-col { 
    position: static; 
    display: grid; 
    grid-template-columns: 240px 1fr; 
    gap: 20px; 
    align-items: start; 
  }
  .portrait-box { height: 320px; }
  
  /* Grids */
  .forts-grid { grid-template-columns: repeat(2,1fr); gap: 18px; }
  .battles-grid { grid-template-columns: repeat(2,1fr); gap: 16px; }
  .mavale-grid { grid-template-columns: repeat(2,1fr); gap: 18px; }
  .legacy-grid { grid-template-columns: repeat(2,1fr); gap: 16px; }
  .childhood-cards { grid-template-columns: repeat(3,1fr); gap: 16px; }
  
  /* Timeline */
  .tl-line { left: 18px; }
  .tl-item, .tl-right {
    width: 100%; 
    padding-left: 54px; 
    padding-right: 0; 
    margin-left: 0; 
    justify-content: flex-start;
  }
  .tl-left .tl-card::after,
  .tl-right .tl-card::after {
    right: auto; left: -9px;
    border-left-color: transparent;
    border-right-color: var(--ink3);
  }
  .tl-left .tl-node, .tl-right .tl-node { left: 1px; right: auto; }
  
  /* Footer */
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 28px; }
  .footer-brand { grid-column: span 2; }
  
  /* Gallery */
  .gal-mosaic { 
    grid-template-columns: repeat(3,1fr); 
    grid-template-rows: 200px 200px; 
  }
  
  /* Hero */
  .hero-stats { gap: 0; }
  .hstat { padding: 5px 16px; }
}

/* ── TABLET (481px - 768px) ── */
@media (max-width: 768px) {
  /* Base */
  .section { padding: 60px 0; }
  .wrap { padding: 0 1.2rem; }
  
  /* Navbar */
  .nav-inner { padding: 0 1rem; height: 60px; }
  .nav-brand { font-size: 1.1rem; }
  .nav-links {
    display: none;
    position: fixed;
    top: 60px; left: 0; right: 0;
    background: rgba(5,2,0,.97);
    backdrop-filter: blur(18px);
    flex-direction: column;
    padding: 12px;
    gap: 3px;
    border-bottom: 1px solid var(--bdr);
    z-index: 799;
  }
  .nav-links.open { display: flex; }
  .nl { 
    font-size: .95rem; 
    padding: 10px 14px; 
    text-align: center;
    width: 100%;
    border-radius: 8px;
  }
  .ham { display: flex; }
  .lang-toggle { margin-left: auto; }
  
  /* Section Headers */
  .sec-title { font-size: 1.9rem; }
  .sec-ornament span { width: 40px; }
  
  /* Hero */
  .hero { padding: 80px 1.2rem 70px; }
  .hn-main { font-size: 3rem; }
  .hn-top { font-size: 1.1rem; }
  .hero-tribute { gap: 12px; }
  .t2 { font-size: 1.6rem; }
  .hero-bio { font-size: .95rem; }
  .hero-btns { flex-direction: column; align-items: center; }
  .btn-main, .btn-sec { width: 100%; max-width: 280px; justify-content: center; }
  .hero-stats { 
    flex-direction: row; 
    flex-wrap: wrap; 
    justify-content: center;
    gap: 0;
  }
  .hstat { padding: 8px 14px; }
  .hstat-sep { display: none; }
  .hero-quote { padding: 12px 16px; }
  
  /* About */
  .about-grid { grid-template-columns: 1fr; gap: 28px; }
  .about-portrait-col { 
    position: static; 
    display: grid; 
    grid-template-columns: 200px 1fr; 
    gap: 16px; 
  }
  .portrait-box { height: 280px; margin-bottom: 12px; }
  
  /* Grids - 1 column on tablet */
  .forts-grid { grid-template-columns: 1fr; gap: 16px; }
  .battles-grid { grid-template-columns: repeat(2,1fr); gap: 14px; }
  .mavale-grid { grid-template-columns: repeat(2,1fr); gap: 16px; }
  .legacy-grid { grid-template-columns: repeat(2,1fr); gap: 14px; }
  .childhood-cards { grid-template-columns: 1fr; gap: 16px; }
  
  /* Gallery */
  .gal-mosaic { 
    grid-template-columns: repeat(2,1fr); 
    grid-template-rows: auto;
    gap: 10px;
  }
  .gal-tall { grid-row: span 1; }
  .gal-wide { grid-column: span 2; }
  .gal-item { height: 180px; }
  
  /* Timeline */
  .tl-card { padding: 16px 18px; }
  .tl-card h3 { font-size: .96rem; }
  .tl-card p { font-size: .84rem; }
  
  /* Fort cards */
  .fc-img { height: 200px; }
  .fc-body { padding: 16px 18px; }
  
  /* Footer */
  .footer-grid { grid-template-columns: 1fr; gap: 24px; }
  .footer-brand { grid-column: span 1; }
  .footer-bar { flex-direction: column; text-align: center; gap: 6px; }
  
  /* Quotes */
  .q-slide blockquote { font-size: 1.1rem; }
  
  /* Scroll to top */
  .stt { bottom: 18px; right: 18px; width: 38px; height: 38px; font-size: .95rem; }
}

/* ── MOBILE LARGE (421px - 480px) ── */
@media (max-width: 480px) {
  .sec-title { font-size: 1.65rem; }
  .hn-main { font-size: 2.4rem; }
  .hero-badge { font-size: .85rem; padding: 6px 14px; }
  
  /* About portrait - stack vertically */
  .about-portrait-col { grid-template-columns: 1fr; }
  .portrait-box { height: 240px; }
  
  /* Battles - 1 column */
  .battles-grid { grid-template-columns: 1fr; }
  .mavale-grid { grid-template-columns: 1fr; }
  .legacy-grid { grid-template-columns: 1fr; }
  
  /* Gallery */
  .gal-mosaic { grid-template-columns: 1fr; gap: 8px; }
  .gal-wide { grid-column: span 1; }
  .gal-item { height: 200px; }
  .gal-tall { grid-row: span 1; }
  
  /* Footer */
  .footer-grid { grid-template-columns: 1fr; }
  .fbq-text { font-size: .95rem; }
  
  /* Cards */
  .cc-img-wrap { height: 200px; }
  .fc-img { height: 185px; }
  
  /* Stats */
  .hero-stats { 
    padding: 10px 6px;
    gap: 0;
  }
  .hstat { padding: 6px 10px; }
  .hstat-v { font-size: 1.5rem; }
}

/* ── MOBILE SMALL (320px - 420px) ── */
@media (max-width: 420px) {
  .wrap { padding: 0 .9rem; }
  .nav-inner { padding: 0 .9rem; height: 56px; }
  .nav-brand { font-size: 1rem; }
  .nav-brand-icon { font-size: 1rem; }
  
  /* Hero */
  .hn-main { font-size: 2rem; }
  .hn-top { font-size: .9rem; letter-spacing: .12em; }
  .hn-dates { font-size: .72rem; }
  .hero-badge { font-size: .78rem; padding: 5px 12px; gap: 6px; }
  .t1 { font-size: .82rem; }
  .t2 { font-size: 1.3rem; }
  .diya { font-size: 1.4rem; }
  .hero-bio { font-size: .9rem; }
  .hero-tagline { font-size: .9rem; }
  .hero-quote { padding: 10px 14px; }
  .hq-text { font-size: .88rem; }
  .btn-main, .btn-sec { font-size: .88rem; padding: 11px 20px; }
  
  /* Section */
  .section { padding: 50px 0; }
  .sec-title { font-size: 1.45rem; }
  .sec-chip { font-size: .65rem; }
  
  /* Cards */
  .tl-card { padding: 14px 16px; }
  .battle-card { padding: 18px 14px; }
  .mavale-card { padding: 20px 14px; }
  .cc-body { padding: 16px 16px 20px; }
  .cc-body h3 { font-size: 1.1rem; }
  .fc-body { padding: 14px 16px; }
  .fc-body h3 { font-size: 1.1rem; }
  
  /* Info table */
  .ir-key { font-size: .74rem; }
  .ir-val { font-size: .78rem; }
  
  /* Lang toggle */
  .lt-btn { font-size: .7rem; padding: 4px 8px; }
  
  /* Quotes */
  .q-slide blockquote { font-size: .98rem; }
  .q-mark { font-size: 3.5rem; }
  
  /* Footer */
  .footer-bar { font-size: .72rem; }
  .footer-big-q { display: none; }
  .fbq-mark { font-size: 2.5rem; }
}



  /* ── MAP SECTION ── */
  .map-sec{background:radial-gradient(ellipse 70% 55% at 50% 50%,rgba(200,145,12,.08),transparent 60%),linear-gradient(170deg,#060200 0%,#0c0500 50%,#060200 100%)}
  .map-container{display:grid;grid-template-columns:1fr 300px;gap:1.5rem;align-items:start}
  .map-svg-wrap{background:rgba(255,255,255,.03);border:1px solid var(--bdr);border-radius:16px;overflow:hidden;position:relative}
  .map-svg-wrap svg{width:100%;height:460px;display:block}
  .fort-dot{cursor:pointer;transition:all .2s;filter:drop-shadow(0 0 6px currentColor)}
  .fort-dot:hover{transform:scale(1.4)}
  .fort-dot.sel{transform:scale(1.5)}
  .fort-lbl{font-family:var(--fd);font-size:11px;pointer-events:none;font-weight:400}
  .map-legend{display:flex;gap:1rem;flex-wrap:wrap;margin-top:.75rem;padding:.6rem 1rem;background:rgba(255,255,255,.03);border:1px solid var(--bdr);border-radius:10px}
  .leg-it{display:flex;align-items:center;gap:6px;font-size:.75rem;color:var(--mute)}
  .leg-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
  .map-filters{display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem}
  .mf-btn{font-family:var(--fb);font-size:.73rem;font-weight:600;padding:5px 13px;border-radius:20px;border:1px solid var(--bdr);background:transparent;color:var(--mute);cursor:pointer;transition:all .25s;letter-spacing:.05em}
  .mf-btn:hover{border-color:var(--bdr2);color:var(--saf)}
  .mf-btn.on{background:linear-gradient(135deg,#5a2000,var(--saf));color:#000;border-color:transparent}
  .map-panel{display:flex;flex-direction:column;gap:.75rem}
  .map-detail{background:var(--ink3);border:1px solid var(--bdr);border-radius:14px;padding:1.1rem;min-height:220px;transition:all .3s}
  .map-detail.has-fort{border-color:var(--bdr2)}
  .md-empty{display:flex;align-items:center;justify-content:center;height:180px;font-size:.88rem;color:var(--mute);text-align:center;line-height:1.7}
  .md-name{font-family:var(--fd);font-size:1.2rem;color:var(--gold2);margin-bottom:.25rem;font-weight:400}
  .md-loc{font-size:.78rem;color:var(--mute);margin-bottom:.75rem}
  .md-row{display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid var(--bdr);font-size:.82rem}
  .md-row:last-of-type{border-bottom:none}
  .md-key{color:var(--mute)}
  .md-val{color:var(--cream2);font-weight:600;text-align:right}
  .md-desc{font-size:.88rem;color:var(--mute);line-height:1.82;margin-top:.75rem;padding-top:.75rem;border-top:1px solid var(--bdr)}
  .md-tags{display:flex;gap:5px;flex-wrap:wrap;margin-top:.75rem}
  .md-tag{background:rgba(255,122,0,.09);border:1px solid var(--bdr2);color:var(--saf3);font-size:.72rem;padding:3px 10px;border-radius:20px}
  .map-list{display:flex;flex-direction:column;gap:6px;max-height:220px;overflow-y:auto}
  .map-list::-webkit-scrollbar{width:3px}
  .map-list::-webkit-scrollbar-thumb{background:var(--saf);border-radius:2px}
  .ml-item{background:var(--ink3);border:1px solid var(--bdr);border-radius:10px;padding:10px 14px;cursor:pointer;transition:all .25s;display:flex;align-items:center;gap:9px}
  .ml-item:hover{border-color:var(--bdr2);transform:translateX(4px)}
  .ml-item.sel{border-color:rgba(255,122,0,.5);background:rgba(255,122,0,.07)}
  .ml-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
  .ml-name{font-family:var(--fd);font-size:.92rem;color:var(--gold2);font-weight:400}
  .ml-event{font-size:.74rem;color:var(--mute)}
  .map-count{font-size:.78rem;color:var(--mute);margin-bottom:.5rem}
  @media(max-width:1024px){.map-container{grid-template-columns:1fr}}
  @media(max-width:768px){
    .map-svg-wrap svg{height:320px}
    .map-legend{gap:.6rem}
    .leg-it{font-size:.68rem}
  }

  /* ── INFOGRAPHIC SECTION ── */
  .info-sec{background:radial-gradient(ellipse 80% 60% at 50% 50%,rgba(255,122,0,.09),transparent 65%),linear-gradient(170deg,#060200 0%,#0d0500 50%,#060200 100%);position:relative;overflow:hidden}
  .info-sec::before{content:'';position:absolute;inset:0;background-image:repeating-linear-gradient(45deg,transparent,transparent 40px,rgba(200,145,12,.025) 40px,rgba(200,145,12,.025) 41px);pointer-events:none}

  /* Big Numbers */
  .ig-numbers{display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;margin-bottom:3.5rem}
  .ig-num-card{background:var(--ink3);border:1px solid var(--bdr);border-radius:18px;padding:1.8rem 1.2rem;text-align:center;position:relative;overflow:hidden;transition:all .3s}
  .ig-num-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--saf),var(--gold2));transform:scaleX(0);transition:transform .4s}
  .ig-num-card:hover::before{transform:scaleX(1)}
  .ig-num-card:hover{transform:translateY(-6px);border-color:var(--bdr2);box-shadow:0 16px 40px rgba(0,0,0,.4),0 0 24px rgba(255,122,0,.15)}
  .ig-icon{font-size:2.2rem;margin-bottom:.7rem;display:block}
  .ig-value{font-family:var(--fd);font-size:clamp(2rem,4vw,3rem);color:var(--gold2);line-height:1;display:block;margin-bottom:.4rem}
  .ig-label{font-size:.8rem;color:var(--mute);letter-spacing:.06em;line-height:1.5}

  /* Timeline Bar */
  .ig-timeline{margin-bottom:3.5rem}
  .ig-tl-title{font-family:var(--fd);font-size:1.2rem;color:var(--saf3);margin-bottom:1.2rem;font-weight:400}
  .ig-tl-bar{position:relative;height:6px;background:rgba(255,255,255,.07);border-radius:4px;margin-bottom:2rem}
  .ig-tl-fill{position:absolute;top:0;left:0;height:100%;background:linear-gradient(90deg,var(--saf),var(--gold2));border-radius:4px;transition:width 1.5s ease}
  .ig-tl-events{display:flex;flex-direction:column;gap:.75rem}
  .ig-event{display:flex;gap:1rem;align-items:flex-start;padding:.9rem 1.1rem;background:var(--ink3);border:1px solid var(--bdr);border-radius:12px;transition:all .3s}
  .ig-event:hover{border-color:var(--bdr2);transform:translateX(6px)}
  .ig-event-yr{font-family:var(--fd);font-size:.88rem;color:var(--saf);font-weight:600;min-width:60px;flex-shrink:0;padding-top:2px}
  .ig-event-dot{width:10px;height:10px;border-radius:50%;flex-shrink:0;margin-top:5px;box-shadow:0 0 8px currentColor}
  .ig-event-text{font-size:.9rem;color:var(--cream2);line-height:1.7}

  /* Comparison Bars */
  .ig-compare{margin-bottom:3.5rem}
  .ig-cmp-title{font-family:var(--fd);font-size:1.2rem;color:var(--saf3);margin-bottom:1.2rem;font-weight:400}
  .ig-bar-row{margin-bottom:1.1rem}
  .ig-bar-label{display:flex;justify-content:space-between;margin-bottom:.4rem;font-size:.84rem}
  .ig-bar-name{color:var(--cream2)}
  .ig-bar-val{color:var(--gold2);font-weight:600}
  .ig-bar-track{height:10px;background:rgba(255,255,255,.06);border-radius:5px;overflow:hidden}
  .ig-bar-fill{height:100%;border-radius:5px;transition:width 1.5s ease;background:linear-gradient(90deg,var(--saf),var(--gold2))}

  /* Quote Banner */
  .ig-quote{background:linear-gradient(135deg,rgba(255,122,0,.08),rgba(200,145,12,.08));border:1px solid rgba(200,145,12,.25);border-radius:16px;padding:2rem;text-align:center;position:relative;overflow:hidden}
  .ig-quote::before{content:'❝';position:absolute;top:-10px;left:20px;font-size:6rem;color:rgba(255,122,0,.07);font-family:Georgia,serif;line-height:1}
  .ig-q-text{font-family:var(--fd);font-size:clamp(1.1rem,2.2vw,1.4rem);color:var(--gold2);line-height:1.75;position:relative;z-index:1}
  .ig-q-cite{font-size:.82rem;color:var(--saf);margin-top:.75rem;letter-spacing:.08em}

  /* Achievements grid */
  .ig-achieve{display:grid;grid-template-columns:repeat(3,1fr);gap:1.2rem;margin-bottom:3.5rem}
  .ig-ach-card{background:var(--ink3);border:1px solid var(--bdr);border-radius:14px;padding:1.2rem;display:flex;gap:.9rem;align-items:flex-start;transition:all .3s}
  .ig-ach-card:hover{border-color:var(--bdr2);transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.35)}
  .ig-ach-icon{font-size:1.8rem;flex-shrink:0;filter:drop-shadow(0 0 6px rgba(255,122,0,.4))}
  .ig-ach-body h4{font-family:var(--fd);font-size:.95rem;color:var(--saf3);margin-bottom:.3rem;font-weight:400}
  .ig-ach-body p{font-size:.82rem;color:var(--mute);line-height:1.7}

  @media(max-width:1024px){.ig-numbers{grid-template-columns:repeat(2,1fr)}.ig-achieve{grid-template-columns:repeat(2,1fr)}}
  @media(max-width:768px){.ig-numbers{grid-template-columns:repeat(2,1fr)}.ig-achieve{grid-template-columns:1fr}}
  @media(max-width:480px){.ig-numbers{grid-template-columns:1fr}}

  /* ── SCROLL PROGRESS BAR ── */
  .scroll-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,var(--saf),var(--gold2),var(--saf));z-index:9999;transition:width .1s linear;box-shadow:0 0 8px rgba(255,122,0,.6)}

  /* ── SOCIAL SHARE ── */
  .share-wrap{position:fixed;right:20px;bottom:80px;z-index:700;display:flex;flex-direction:column;gap:8px}
  .share-btn{width:42px;height:42px;border-radius:50%;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:1.1rem;transition:all .3s;box-shadow:0 4px 14px rgba(0,0,0,.4)}
  .share-btn:hover{transform:scale(1.18) translateX(-4px);box-shadow:0 6px 20px rgba(0,0,0,.5)}
  .share-btn.wa{background:#25d366}
  .share-btn.fb{background:#1877f2}
  .share-btn.tw{background:#1da1f2}
  .share-btn.cp{background:var(--ink3);border:1px solid var(--bdr2);color:var(--saf)}
  .share-label{position:absolute;right:50px;background:rgba(5,2,0,.9);border:1px solid var(--bdr);border-radius:8px;padding:4px 10px;font-size:.74rem;color:var(--cream2);white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .2s}
  .share-btn:hover .share-label{opacity:1}
  .share-copied{position:fixed;bottom:160px;right:70px;background:var(--saf);color:#000;font-size:.8rem;font-weight:700;padding:6px 14px;border-radius:20px;z-index:9999;animation:fadeInOut 2s forwards}
  @keyframes fadeInOut{0%{opacity:0;transform:translateY(10px)}20%{opacity:1;transform:translateY(0)}80%{opacity:1}100%{opacity:0}}

  /* ── QUIZ SECTION ── */
  .quiz-sec{background:radial-gradient(ellipse 70% 55% at 50% 40%,rgba(255,122,0,.10),transparent 60%),linear-gradient(170deg,#060200 0%,#0e0500 50%,#060200 100%)}
  .quiz-wrap{max-width:720px;margin:0 auto}
  .quiz-box{background:var(--ink3);border:1px solid var(--bdr);border-radius:20px;padding:2rem;position:relative;overflow:hidden}
  .quiz-box::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--saf),var(--gold2),var(--saf))}
  .quiz-progress-wrap{margin-bottom:1.5rem}
  .quiz-prog-text{display:flex;justify-content:space-between;font-size:.78rem;color:var(--mute);margin-bottom:.4rem}
  .quiz-prog-bar{height:5px;background:rgba(255,255,255,.07);border-radius:3px;overflow:hidden}
  .quiz-prog-fill{height:100%;background:linear-gradient(90deg,var(--saf),var(--gold2));border-radius:3px;transition:width .4s ease}
  .quiz-q{font-family:var(--fd);font-size:clamp(1.05rem,2.2vw,1.3rem);color:var(--gold2);margin-bottom:1.4rem;line-height:1.65;font-weight:400}
  .quiz-options{display:flex;flex-direction:column;gap:.7rem;margin-bottom:1.5rem}
  .quiz-opt{background:rgba(255,255,255,.04);border:1px solid var(--bdr);border-radius:12px;padding:.9rem 1.1rem;cursor:pointer;font-family:var(--fd);font-size:.97rem;color:var(--cream2);text-align:left;transition:all .25s;display:flex;align-items:center;gap:.75rem}
  .quiz-opt:hover:not(:disabled){background:rgba(255,122,0,.08);border-color:var(--bdr2);transform:translateX(4px)}
  .quiz-opt.correct{background:rgba(0,200,80,.1);border-color:rgba(0,200,80,.4);color:#4cc870}
  .quiz-opt.wrong{background:rgba(220,50,50,.1);border-color:rgba(220,50,50,.35);color:#e07070}
  .quiz-opt.reveal{background:rgba(0,200,80,.07);border-color:rgba(0,200,80,.25)}
  .quiz-opt:disabled{cursor:default}
  .quiz-opt-icon{font-size:1rem;flex-shrink:0;width:20px;text-align:center}
  .quiz-fact{background:rgba(200,145,12,.07);border:1px solid rgba(200,145,12,.2);border-radius:10px;padding:.85rem 1rem;font-size:.88rem;color:var(--cream2);line-height:1.72;margin-bottom:1.2rem}
  .quiz-fact strong{color:var(--gold2)}
  .quiz-next{background:linear-gradient(135deg,#922d00,var(--saf));color:#000;font-family:var(--fb);font-weight:700;font-size:.95rem;padding:11px 28px;border-radius:10px;border:none;cursor:pointer;transition:all .3s;box-shadow:0 4px 16px rgba(255,122,0,.35)}
  .quiz-next:hover{transform:translateY(-2px);box-shadow:0 6px 22px rgba(255,122,0,.5)}
  .quiz-result{text-align:center;padding:1rem 0}
  .qr-emoji{font-size:3.5rem;display:block;margin-bottom:.8rem}
  .qr-score{font-family:var(--fd);font-size:2.8rem;color:var(--gold2);display:block;margin-bottom:.3rem}
  .qr-msg{font-family:var(--fd);font-size:1.1rem;color:var(--saf3);margin-bottom:.5rem}
  .qr-sub{font-size:.88rem;color:var(--mute);margin-bottom:1.5rem;line-height:1.7}
  .quiz-restart{background:transparent;border:1.5px solid var(--gold);color:var(--gold2);font-family:var(--fb);font-weight:600;font-size:.9rem;padding:10px 24px;border-radius:10px;cursor:pointer;transition:all .3s}
  .quiz-restart:hover{background:rgba(200,145,12,.15);transform:translateY(-2px)}
  @media(max-width:480px){.quiz-box{padding:1.4rem}.quiz-q{font-size:.98rem}.quiz-opt{padding:.8rem .9rem;font-size:.9rem}}

  /* ── SCROLL PROGRESS BAR ── */
  .scroll-bar{position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,var(--saf),var(--gold2),var(--saf3));z-index:9999;transition:width .1s linear;box-shadow:0 0 8px rgba(255,122,0,.6)}

  /* ── SOCIAL SHARE ── */
  .share-wrap{display:flex;align-items:center;gap:.75rem;justify-content:center;padding:2rem 0 1rem}
  .share-label{font-family:var(--fd);font-size:.95rem;color:var(--mute)}
  .share-btn{display:inline-flex;align-items:center;gap:6px;font-family:var(--fb);font-size:.82rem;font-weight:600;padding:8px 18px;border-radius:20px;border:none;cursor:pointer;transition:all .3s;text-decoration:none}
  .share-btn:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,.35)}
  .share-wa{background:#25D366;color:#000}
  .share-fb{background:#1877F2;color:#fff}
  .share-tw{background:#1DA1F2;color:#fff}
  .share-copy{background:var(--ink3);border:1px solid var(--bdr);color:var(--cream2)}
  .share-copy:hover{border-color:var(--saf);color:var(--saf)}
  .copy-done{color:var(--gold2)!important;border-color:var(--gold2)!important}

  /* ── QUIZ SECTION ── */
  .quiz-sec{background:radial-gradient(ellipse 70% 60% at 50% 40%,rgba(255,122,0,.1),transparent 60%),linear-gradient(170deg,#060200 0%,#0e0500 50%,#060200 100%)}
  .quiz-wrap{max-width:720px;margin:0 auto}
  .quiz-box{background:var(--ink3);border:1px solid var(--bdr);border-radius:20px;padding:2.5rem;position:relative;overflow:hidden}
  .quiz-box::before{content:'';position:absolute;top:0;left:0;right:0;height:4px;background:linear-gradient(90deg,var(--saf),var(--gold2),var(--saf))}
  .quiz-progress{display:flex;align-items:center;justify-content:space-between;margin-bottom:1.5rem}
  .qp-bar{flex:1;height:6px;background:rgba(255,255,255,.07);border-radius:3px;margin:0 1rem;overflow:hidden}
  .qp-fill{height:100%;background:linear-gradient(90deg,var(--saf),var(--gold2));border-radius:3px;transition:width .4s ease}
  .qp-text{font-size:.8rem;color:var(--mute);white-space:nowrap}
  .quiz-q{font-family:var(--fd);font-size:clamp(1.05rem,2vw,1.3rem);color:var(--gold2);margin-bottom:1.5rem;line-height:1.7;font-weight:400}
  .quiz-opts{display:flex;flex-direction:column;gap:.75rem;margin-bottom:1.5rem}
  .quiz-opt{background:rgba(255,255,255,.04);border:1px solid var(--bdr);border-radius:12px;padding:1rem 1.25rem;cursor:pointer;transition:all .25s;font-size:.95rem;color:var(--cream2);text-align:left;font-family:var(--fb)}
  .quiz-opt:hover:not(:disabled){background:rgba(255,122,0,.08);border-color:var(--bdr2);transform:translateX(5px)}
  .quiz-opt.correct{background:rgba(0,200,80,.1);border-color:#4cc870;color:#4cc870}
  .quiz-opt.wrong{background:rgba(220,50,50,.1);border-color:#e05050;color:#e05050}
  .quiz-opt:disabled{cursor:default}
  .quiz-feedback{padding:.9rem 1.1rem;border-radius:10px;font-size:.9rem;margin-bottom:1rem;line-height:1.7}
  .quiz-feedback.correct{background:rgba(0,200,80,.08);border:1px solid rgba(0,200,80,.25);color:#5dd88a}
  .quiz-feedback.wrong{background:rgba(220,50,50,.08);border:1px solid rgba(220,50,50,.25);color:#e07878}
  .quiz-next{background:linear-gradient(135deg,#5a2000,var(--saf));color:#000;font-family:var(--fb);font-weight:700;font-size:.95rem;padding:11px 28px;border-radius:10px;border:none;cursor:pointer;transition:all .3s}
  .quiz-next:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(255,122,0,.45)}
  .quiz-result{text-align:center;padding:1.5rem 0}
  .qr-score{font-family:var(--fd);font-size:3.5rem;color:var(--gold2);line-height:1;margin-bottom:.5rem}
  .qr-total{font-size:1rem;color:var(--mute);margin-bottom:1.2rem}
  .qr-msg{font-family:var(--fd);font-size:1.15rem;color:var(--saf3);margin-bottom:1.5rem;line-height:1.7}
  .quiz-restart{background:var(--ink3);border:1px solid var(--bdr);color:var(--cream2);font-family:var(--fb);font-weight:600;font-size:.9rem;padding:10px 24px;border-radius:10px;cursor:pointer;transition:all .3s}
  .quiz-restart:hover{border-color:var(--saf);color:var(--saf)}

  /* ── DARK/LIGHT MODE ── */
  body.light-mode {
    --ink:#fdf8ee; --ink2:#f5edda; --ink3:#ede0c4; --ink4:#e4d3b0;
    --ink5:#d8c49a;
    --cream:#1a0c00; --cream2:#2d1800; --mute:#5a3d15;
    --bdr:rgba(120,80,20,.25); --bdr2:rgba(180,90,0,.4);
    --saf:#c05500; --saf2:#d46800; --saf3:#b84d00;
    --gold:#8a6000; --gold2:#a07000; --gold3:#c89000;
    color:#1a0c00;
  }

  /* ── Light mode: Navbar ── */
  body.light-mode .nav { background:rgba(253,248,238,.95); }
  body.light-mode .nav.stuck { background:rgba(253,248,238,.98);box-shadow:0 2px 20px rgba(0,0,0,.12); }
  body.light-mode .nav-brand { color:#8a6000; }
  body.light-mode .nl { color:#5a3d15; }
  body.light-mode .nl:hover,body.light-mode .nl.on { color:#c05500;background:rgba(192,85,0,.08); }

  /* ── Light mode: Hero ── */
  body.light-mode .hero {
    background:
      radial-gradient(ellipse 80% 55% at 50% 30%,rgba(200,100,0,.1),transparent 65%),
      linear-gradient(170deg,#fdf8ee 0%,#f5e8cc 45%,#fdf8ee 100%);
  }
  body.light-mode .hn-main {
    background:linear-gradient(135deg,#8a6000 0%,#c05500 40%,#a07000 70%,#8a6000 100%);
    background-size:300%;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
    filter:none;
  }
  body.light-mode .hn-top { color:#5a3d15; }
  body.light-mode .hn-dates { color:#8a6a30; }
  body.light-mode .hero-tagline { color:#c05500; }
  body.light-mode .hero-bio { color:#2d1800; }
  body.light-mode .t1 { color:#5a3d15; }
  body.light-mode .t2 {
    background:linear-gradient(90deg,#8a6000,#c05500,#a07000,#8a6000);
    background-size:200%;
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    background-clip:text;
  }
  body.light-mode .hq-text { color:#c05500; }
  body.light-mode .hero-badge { color:#8a6000;background:rgba(138,96,0,.1);border-color:rgba(138,96,0,.3); }
  body.light-mode .hstat-v { color:#8a6000; }
  body.light-mode .hstat-l { color:#8a6a30; }
  body.light-mode .hf-corner { color:#a07000; }

  /* ── Light mode: Sections ── */
  body.light-mode .section { background:inherit; }
  body.light-mode .about-sec,body.light-mode .forts-sec,
  body.light-mode .legacy-sec,body.light-mode .quotes-sec { background:#fdf8ee; }
  body.light-mode .timeline-sec,body.light-mode .battles-sec,
  body.light-mode .mavale-sec,body.light-mode .gallery-sec,
  body.light-mode .childhood-sec { background:#f5edda; }
  body.light-mode .map-sec,body.light-mode .info-sec,
  body.light-mode .letters-sec,body.light-mode .quiz-sec { background:#fdf8ee; }

  body.light-mode .sec-title { color:#8a6000; }
  body.light-mode .sec-chip { color:#000; }
  body.light-mode .sec-desc { color:#5a3d15; }
  body.light-mode .sec-ornament { color:#a07000; }

  /* ── Light mode: Cards ── */
  body.light-mode .tl-card,
  body.light-mode .fort-card,
  body.light-mode .battle-card,
  body.light-mode .mavale-card,
  body.light-mode .legacy-item,
  body.light-mode .cc-card,
  body.light-mode .ig-num-card,
  body.light-mode .ig-ach-card,
  body.light-mode .ig-event,
  body.light-mode .letter-card,
  body.light-mode .quiz-box,
  body.light-mode .map-detail,
  body.light-mode .ml-item { background:#ede0c4;border-color:rgba(120,80,20,.25); }

  body.light-mode .tl-card h3,
  body.light-mode .fc-body h3,
  body.light-mode .mavale-card h3,
  body.light-mode .li-body h3,
  body.light-mode .cc-body h3,
  body.light-mode .ig-ach-body h4,
  body.light-mode .lh-title,
  body.light-mode .md-name,
  body.light-mode .ml-name { color:#8a6000; }

  body.light-mode .tl-card p,
  body.light-mode .fc-body p,
  body.light-mode .battle-card p,
  body.light-mode .mavale-card p,
  body.light-mode .li-body p,
  body.light-mode .cc-body p,
  body.light-mode .ig-ach-body p,
  body.light-mode .letter-content,
  body.light-mode .md-desc { color:#5a3d15; }

  /* ── Light mode: Info table ── */
  body.light-mode .info-table,
  body.light-mode .info-row { background:#ede0c4;border-color:rgba(120,80,20,.2); }
  body.light-mode .ir-key { color:#8a6a30; }
  body.light-mode .ir-val { color:#2d1800; }
  body.light-mode .portrait-label { background:#ede0c4;color:#8a6000; }
  body.light-mode .about-tags .tag { background:rgba(138,96,0,.12);color:#8a6000;border-color:rgba(138,96,0,.3); }

  /* ── Light mode: Quote slider ── */
  body.light-mode .q-slide blockquote { color:#2d1800; }
  body.light-mode .q-mark { color:#c05500; }
  body.light-mode .q-slide cite { color:#c05500; }

  /* ── Light mode: Footer ── */
  body.light-mode .footer { background:#ede0c4;border-color:rgba(120,80,20,.25); }
  body.light-mode .footer-logo,body.light-mode .fbq-text { color:#8a6000; }
  body.light-mode .footer-brand p { color:#5a3d15; }
  body.light-mode .footer-links a { color:#8a6a30; }
  body.light-mode .footer-bar { color:#8a6a30; }

  /* ── Light mode: Chatbot ── */
  body.light-mode .chatbot-window { background:#fdf8ee;border-color:rgba(120,80,20,.3); }
  body.light-mode .cb-msgs { background:#f5edda; }
  body.light-mode .cb-msg.bot { background:#ede0c4;border-color:rgba(120,80,20,.2);color:#2d1800; }
  body.light-mode .cb-input { background:#ede0c4;border-color:rgba(120,80,20,.2);color:#2d1800; }
  body.light-mode .cb-sug { color:#c05500;border-color:rgba(192,85,0,.4); }
  body.light-mode .cb-input-row { border-color:rgba(120,80,20,.2); }

  /* ── Light mode: Quiz ── */
  body.light-mode .quiz-opt { background:rgba(0,0,0,.05);border-color:rgba(120,80,20,.25);color:#2d1800; }
  body.light-mode .quiz-q { color:#8a6000; }
  body.light-mode .qr-score { color:#8a6000; }
  body.light-mode .qr-msg { color:#c05500; }

  /* ── Light mode: Loader ── */
  body.light-mode .loader { background:#fdf8ee; }
  body.light-mode .ld-msg { color:#8a6a30; }

  /* ── Light mode: Scroll bar ── */
  body.light-mode .scroll-bar { box-shadow:0 0 6px rgba(192,85,0,.4); }

  /* ── Light mode: Jayanti popup ── */
  body.light-mode .jayanti-popup { background:#fdf8ee;border-color:rgba(138,96,0,.4); }
  body.light-mode .jp-title { color:#8a6000; }
  body.light-mode .jp-date { background:rgba(0,0,0,.04); }
  body.light-mode .jp-label { color:#8a6a30; }
  body.light-mode .jp-val { color:#c05500; }
  body.light-mode .jp-msg { color:#8a6000; }
  .mode-toggle {
    width:38px;height:38px;border-radius:50%;
    background:rgba(255,122,0,.1);border:1.5px solid rgba(255,122,0,.35);
    display:flex;align-items:center;justify-content:center;
    cursor:pointer;font-size:1.1rem;transition:all .3s;
    flex-shrink:0;
  }
  .mode-toggle:hover { background:rgba(255,122,0,.2); transform:rotate(20deg); }

  /* ── LETTERS SECTION ── */
  .letters-sec { background:radial-gradient(ellipse 70% 55% at 30% 50%,rgba(200,145,12,.09),transparent 60%),linear-gradient(160deg,#060200 0%,#0e0600 50%,#060200 100%); }
  .letters-grid { display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem; }
  .letter-card { background:var(--ink3);border:1px solid var(--bdr);border-radius:18px;overflow:hidden;transition:all .4s;cursor:pointer; }
  .letter-card:hover { transform:translateY(-8px);border-color:var(--bdr2);box-shadow:0 20px 50px rgba(0,0,0,.4),0 0 28px rgba(200,145,12,.15); }
  .letter-header { padding:1.2rem 1.4rem;border-bottom:1px solid var(--bdr);position:relative; }
  .letter-header::before { content:'📜';position:absolute;right:1rem;top:50%;transform:translateY(-50%);font-size:2rem;opacity:.3; }
  .lh-year { font-family:var(--fd);font-size:.82rem;color:var(--saf);margin-bottom:.3rem;letter-spacing:.06em; }
  .lh-title { font-family:var(--fd);font-size:1.05rem;color:var(--gold2);font-weight:400;margin-bottom:.3rem; }
  .lh-meta { font-size:.78rem;color:var(--mute); }
  .letter-body { padding:1.2rem 1.4rem; }
  .letter-content { font-family:var(--fd);font-size:.92rem;color:var(--cream2);line-height:1.9;opacity:.88;font-style:italic;margin-bottom:.9rem;border-left:3px solid var(--bdr2);padding-left:.9rem; }
  .letter-note { font-size:.75rem;color:var(--mute);font-style:italic;padding:.5rem .8rem;background:rgba(255,255,255,.03);border-radius:6px; }
  .letter-tag { display:inline-block;font-size:.72rem;font-weight:700;padding:3px 12px;border-radius:20px;margin-bottom:.6rem;color:#000; }
  @media(max-width:768px){ .letters-grid { grid-template-columns:1fr; } }

  /* ── CHATBOT ── */
  .chatbot-fab { position:fixed;bottom:80px;right:26px;width:52px;height:52px;border-radius:50%;background:linear-gradient(135deg,#5a2000,var(--saf));border:none;cursor:pointer;z-index:800;display:flex;align-items:center;justify-content:center;font-size:1.4rem;box-shadow:0 4px 20px rgba(255,122,0,.5);transition:all .3s; }
  .chatbot-fab:hover { transform:scale(1.12);box-shadow:0 8px 30px rgba(255,122,0,.7); }
  .chatbot-fab .cb-badge { position:absolute;top:-3px;right:-3px;width:14px;height:14px;background:#4cc870;border-radius:50%;border:2px solid var(--ink);animation:cbPulse 2s ease-in-out infinite; }
  @keyframes cbWindowIn { from{opacity:0;transform:translateY(20px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes cbPulse { 0%,100%{transform:scale(1)}50%{transform:scale(1.3)} }
  .chatbot-window { position:fixed;bottom:145px;right:26px;width:340px;max-height:480px;background:var(--ink2);border:1px solid rgba(200,145,12,.3);border-radius:18px;z-index:801;display:flex;flex-direction:column;box-shadow:0 16px 50px rgba(0,0,0,.6),0 0 30px rgba(255,122,0,.15);overflow:hidden;animation:cbWindowIn .3s ease; }
  .cb-head { padding:1rem 1.1rem;background:linear-gradient(135deg,#3a1500,#7a3000);border-bottom:1px solid var(--bdr);display:flex;align-items:center;gap:.7rem; }
  .cb-avatar { width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,var(--saf),var(--gold2));display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0; }
  .cb-title { font-family:var(--fd);font-size:.95rem;color:var(--gold2);font-weight:400; }
  .cb-sub { font-size:.72rem;color:rgba(255,180,80,.7); }
  .cb-msgs { flex:1;overflow-y:auto;padding:.9rem;display:flex;flex-direction:column;gap:.6rem;min-height:200px; }
  .cb-msgs::-webkit-scrollbar { width:3px; }
  .cb-msgs::-webkit-scrollbar-thumb { background:var(--saf);border-radius:2px; }
  .cb-msg { max-width:85%;padding:.65rem .9rem;border-radius:12px;font-size:.86rem;line-height:1.6; }
  .cb-msg.bot { background:var(--ink3);border:1px solid var(--bdr);color:var(--cream2);align-self:flex-start;border-bottom-left-radius:4px; }
  .cb-msg.user { background:linear-gradient(135deg,#5a2000,var(--saf));color:#000;align-self:flex-end;border-bottom-right-radius:4px;font-weight:600; }
  .cb-msg.typing { opacity:.7; }
  .cb-suggestions { padding:.5rem .9rem;display:flex;flex-wrap:wrap;gap:.4rem; }
  .cb-sug { font-size:.73rem;padding:4px 10px;border-radius:15px;border:1px solid var(--bdr2);background:transparent;color:var(--saf3);cursor:pointer;transition:all .2s;font-family:var(--fd); }
  .cb-sug:hover { background:rgba(255,122,0,.1); }
  .cb-input-row { padding:.7rem;border-top:1px solid var(--bdr);display:flex;gap:.5rem; }
  .cb-input { flex:1;background:var(--ink3);border:1px solid var(--bdr);border-radius:10px;padding:.55rem .8rem;color:var(--cream2);font-family:var(--fb);font-size:.85rem;outline:none; }
  .cb-input:focus { border-color:var(--saf); }
  .cb-send { background:linear-gradient(135deg,#5a2000,var(--saf));border:none;border-radius:10px;padding:.55rem .9rem;color:#000;font-weight:700;cursor:pointer;font-size:.9rem;transition:all .3s; }
  .cb-send:hover { transform:scale(1.05); }
  @media(max-width:480px){ .chatbot-window{width:calc(100vw - 2rem);right:1rem;} }

  /* ── JAYANTI POPUP ── */
  .jayanti-popup { position:fixed;top:80px;right:24px;z-index:850;max-width:320px;background:linear-gradient(135deg,#0d0500,#1a0a00);border:1px solid rgba(200,145,12,.4);border-radius:16px;padding:1.2rem 1.4rem;box-shadow:0 8px 40px rgba(0,0,0,.7),0 0 30px rgba(255,122,0,.2);animation:popupIn .4s ease; }
  @keyframes popupIn { from{opacity:0;transform:translateY(-15px) scale(.95)}to{opacity:1;transform:translateY(0) scale(1)} }
  .jp-close { position:absolute;top:10px;right:12px;background:none;border:none;color:var(--mute);cursor:pointer;font-size:.9rem;transition:color .2s; }
  .jp-close:hover { color:var(--saf); }
  .jp-icon { font-size:2rem;text-align:center;margin-bottom:.4rem; }
  .jp-title { font-family:var(--fd);font-size:1rem;color:var(--gold2);margin-bottom:.5rem;font-weight:400; }
  .jp-dates { display:flex;flex-direction:column;gap:.4rem; }
  .jp-date { display:flex;justify-content:space-between;font-size:.82rem;padding:.4rem .6rem;background:rgba(255,255,255,.04);border-radius:6px; }
  .jp-label { color:var(--mute); }
  .jp-val { color:var(--saf3);font-weight:600; }
  .jp-msg { font-family:var(--fd);font-size:.88rem;color:var(--cream2);margin-top:.7rem;padding:.6rem .8rem;background:rgba(200,145,12,.07);border-radius:8px;text-align:center; }
  /* ── CUSTOM CURSOR ── */
  body { cursor: none; }
  .custom-cursor {
    position:fixed; top:0; left:0; pointer-events:none; z-index:99999;
    width:24px; height:24px; transition:transform .15s ease;
  }
  .cursor-dot {
    position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    width:8px; height:8px; background:var(--saf); border-radius:50%;
    box-shadow:0 0 10px var(--saf),0 0 20px var(--saf);
    transition:transform .1s;
  }
  .cursor-ring {
    position:absolute; top:50%; left:50%; transform:translate(-50%,-50%);
    width:24px; height:24px; border:1.5px solid rgba(255,122,0,.5);
    border-radius:50%; transition:all .12s ease;
  }
  .cursor-flag {
    position:absolute; top:-8px; left:2px;
    font-size:12px; opacity:.85;
    transition:opacity .2s;
  }
  body.cursor-hover .cursor-ring { transform:translate(-50%,-50%) scale(1.8); border-color:var(--saf); }
  body.cursor-hover .cursor-dot { transform:translate(-50%,-50%) scale(0.5); }
  body * { cursor: none !important; }
  @media(max-width:768px){ body { cursor: auto; } .custom-cursor { display:none; } body * { cursor:auto !important; } }

  /* ── MUSIC PLAYER ── */
  .music-player {
    position:fixed; bottom:26px; left:26px; z-index:800;
    background:rgba(5,2,0,.92); border:1px solid rgba(200,145,12,.35);
    border-radius:50px; padding:8px 16px 8px 10px;
    display:flex; align-items:center; gap:10px;
    backdrop-filter:blur(12px);
    box-shadow:0 4px 20px rgba(0,0,0,.5),0 0 15px rgba(255,122,0,.1);
    transition:all .3s;
  }
  .music-player:hover { box-shadow:0 6px 28px rgba(0,0,0,.6),0 0 22px rgba(255,122,0,.2); }
  .mp-btn {
    width:34px; height:34px; border-radius:50%;
    background:linear-gradient(135deg,#5a2000,var(--saf));
    border:none; cursor:pointer; display:flex; align-items:center;
    justify-content:center; font-size:1rem; transition:all .3s; color:#000;
    flex-shrink:0;
  }
  .mp-btn:hover { transform:scale(1.1); }
  .mp-info { display:flex; flex-direction:column; gap:1px; }
  .mp-title { font-family:var(--fd); font-size:.72rem; color:var(--gold2); white-space:nowrap; }
  .mp-sub { font-size:.65rem; color:var(--mute); }
  .mp-wave { display:flex; align-items:center; gap:2px; height:16px; }
  .mp-bar {
    width:2.5px; background:var(--saf); border-radius:2px;
    animation:waveAnim 1s ease-in-out infinite;
    opacity:.7;
  }
  .mp-bar:nth-child(1){height:6px;animation-delay:0s}
  .mp-bar:nth-child(2){height:12px;animation-delay:.1s}
  .mp-bar:nth-child(3){height:8px;animation-delay:.2s}
  .mp-bar:nth-child(4){height:14px;animation-delay:.3s}
  .mp-bar:nth-child(5){height:6px;animation-delay:.4s}
  .mp-bar.paused { animation-play-state:paused; height:4px!important; }
  @keyframes waveAnim {
    0%,100%{transform:scaleY(1)} 50%{transform:scaleY(1.8)}
  }
  @media(max-width:480px){ .music-player { bottom:80px; left:16px; padding:6px 12px 6px 8px; } }

  /* ── PDF DOWNLOAD BUTTON ── */
  .pdf-download-wrap { text-align:center; margin:2rem 0 1rem; }
  .pdf-btn {
    display:inline-flex; align-items:center; gap:8px;
    background:linear-gradient(135deg,#922d00,var(--saf));
    color:#000; font-family:var(--fb); font-weight:700; font-size:.95rem;
    padding:12px 28px; border-radius:10px; border:none; cursor:pointer;
    box-shadow:0 4px 20px rgba(255,122,0,.4); transition:all .3s;
    text-decoration:none;
  }
  .pdf-btn:hover { transform:translateY(-3px); box-shadow:0 8px 30px rgba(255,122,0,.6); }

  /* ── ANIMATED COUNTER ── */
  .counter-sec {
    background:linear-gradient(135deg,rgba(255,122,0,.08),rgba(200,145,12,.08));
    border-top:1px solid var(--bdr); border-bottom:1px solid var(--bdr);
    padding:3rem 0;
  }
  .counter-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:1rem; text-align:center; }
  .counter-item { padding:1rem; }
  .counter-num {
    font-family:var(--fd); font-size:clamp(2rem,4vw,3.2rem);
    color:var(--gold2); line-height:1; display:block; margin-bottom:.4rem;
    font-weight:400;
  }
  .counter-lbl { font-size:.78rem; color:var(--mute); letter-spacing:.06em; line-height:1.5; }
  .counter-sep { width:1px; background:var(--bdr); align-self:stretch; margin:1rem 0; }
  @media(max-width:768px){ .counter-grid { grid-template-columns:repeat(3,1fr); } .counter-sep { display:none; } }
  @media(max-width:480px){ .counter-grid { grid-template-columns:repeat(2,1fr); } }

  /* ── PAGE TRANSITIONS ── */
  .page-transition {
    position:fixed; inset:0; background:var(--ink);
    z-index:9998; pointer-events:none;
    opacity:0; transition:opacity .4s ease;
  }
  .page-transition.active { opacity:1; }

  /* ── FORT TOUR MODAL ── */
  .tour-modal {
    position:fixed; inset:0; z-index:9000;
    background:rgba(0,0,0,.95); backdrop-filter:blur(16px);
    display:flex; align-items:center; justify-content:center;
    padding:1rem;
  }
  .tour-inner {
    max-width:900px; width:100%; background:var(--ink2);
    border:1px solid var(--bdr); border-radius:20px; overflow:hidden;
    position:relative;
  }
  .tour-header {
    padding:1.2rem 1.5rem; background:linear-gradient(135deg,#2a1000,#5a2000);
    display:flex; align-items:center; justify-content:space-between;
    border-bottom:1px solid var(--bdr);
  }
  .tour-title { font-family:var(--fd); font-size:1.2rem; color:var(--gold2); font-weight:400; }
  .tour-close {
    width:36px; height:36px; border-radius:50%; background:rgba(255,122,0,.15);
    border:1px solid var(--saf); color:#fff; cursor:pointer; font-size:.9rem;
    display:flex; align-items:center; justify-content:center; transition:background .3s;
  }
  .tour-close:hover { background:var(--saf); }
  .tour-frame { width:100%; height:450px; border:none; }
  .tour-forts { display:flex; gap:.5rem; padding:.8rem 1rem; flex-wrap:wrap; background:var(--ink3); }
  .tour-fort-btn {
    font-family:var(--fb); font-size:.78rem; padding:5px 14px; border-radius:20px;
    border:1px solid var(--bdr); background:transparent; color:var(--mute);
    cursor:pointer; transition:all .25s;
  }
  .tour-fort-btn:hover,.tour-fort-btn.on { background:rgba(255,122,0,.1); border-color:var(--saf); color:var(--saf); }
  .tour-open-btn {
    display:inline-flex; align-items:center; gap:7px;
    background:var(--ink3); color:var(--gold2); font-family:var(--fb);
    font-weight:600; font-size:.92rem; padding:10px 22px; border-radius:10px;
    border:1px solid var(--bdr); cursor:pointer; transition:all .3s;
  }
  .tour-open-btn:hover { border-color:var(--bdr2); transform:translateY(-2px); }

  /* ── CUSTOM CURSOR ── */
  body { cursor: none; }
  .custom-cursor {
    position:fixed; width:20px; height:20px;
    pointer-events:none; z-index:99999;
    transform:translate(-50%,-50%);
    transition:transform .1s ease, opacity .2s;
    font-size:18px; line-height:1;
  }
  .custom-cursor.clicking { transform:translate(-50%,-50%) scale(.7); }
  .cursor-ring {
    position:fixed; width:36px; height:36px;
    border:2px solid rgba(255,122,0,.5);
    border-radius:50%; pointer-events:none;
    z-index:99998; transform:translate(-50%,-50%);
    transition:all .12s ease;
  }
  .cursor-ring.clicking { width:24px;height:24px;border-color:var(--saf); }
  @media(max-width:768px){ body{cursor:auto} .custom-cursor,.cursor-ring{display:none} }

  /* ── MUSIC PLAYER ── */
  .music-player {
    position:fixed; bottom:26px; left:26px; z-index:800;
    display:flex; align-items:center; gap:.6rem;
    background:rgba(5,2,0,.88); border:1px solid var(--bdr2);
    border-radius:30px; padding:8px 14px 8px 8px;
    backdrop-filter:blur(12px);
    box-shadow:0 4px 20px rgba(0,0,0,.5),0 0 20px rgba(255,122,0,.1);
    transition:all .3s;
  }
  .music-player:hover { border-color:var(--saf);box-shadow:0 4px 24px rgba(255,122,0,.2); }
  .mp-btn {
    width:34px; height:34px; border-radius:50%;
    background:linear-gradient(135deg,#5a2000,var(--saf));
    border:none; cursor:pointer; display:flex;
    align-items:center; justify-content:center;
    font-size:.95rem; transition:all .3s; flex-shrink:0;
    color:#000;
  }
  .mp-btn:hover { transform:scale(1.1); }
  .mp-info { display:flex; flex-direction:column; }
  .mp-title { font-family:var(--fd); font-size:.75rem; color:var(--gold2); line-height:1.3; }
  .mp-status { font-size:.65rem; color:var(--mute); }
  .mp-bars {
    display:flex; align-items:flex-end; gap:2px; height:16px;
  }
  .mp-bar {
    width:3px; background:var(--saf); border-radius:2px;
    animation:mpBounce 1s ease-in-out infinite;
  }
  .mp-bar:nth-child(2){animation-delay:.1s}
  .mp-bar:nth-child(3){animation-delay:.2s}
  .mp-bar:nth-child(4){animation-delay:.15s}
  @keyframes mpBounce{0%,100%{height:4px}50%{height:14px}}
  .mp-bars.paused .mp-bar { animation:none; height:4px; }

  /* ── PAGE TRANSITIONS ── */
  .page-transition {
    position:fixed; inset:0; z-index:9998;
    background:linear-gradient(135deg,#060200,#1a0800);
    display:flex; align-items:center; justify-content:center;
    pointer-events:none;
    animation:pageOut .6s ease forwards;
  }
  .page-transition.entering { animation:pageIn .6s ease forwards; }
  @keyframes pageIn {
    from{opacity:1;transform:scaleY(1)}
    to{opacity:0;transform:scaleY(0);transform-origin:top}
  }
  @keyframes pageOut {
    from{opacity:0;transform:scaleY(0)}
    to{opacity:1;transform:scaleY(1);transform-origin:bottom}
  }
  .pt-emblem { font-size:4rem; animation:emblemSpin 1s ease; }
  @keyframes emblemSpin{from{transform:rotate(-180deg) scale(0)}to{transform:rotate(0) scale(1)}}

  /* ── ACHIEVEMENTS COUNTER ── */
  .achieve-sec {
    background:linear-gradient(135deg,#060200,#0d0500,#060200);
    position:relative; overflow:hidden;
    border-top:1px solid var(--bdr);
    border-bottom:1px solid var(--bdr);
  }
  .achieve-sec::before {
    content:''; position:absolute; inset:0;
    background:radial-gradient(ellipse 80% 100% at 50% 50%,rgba(255,122,0,.07),transparent);
    pointer-events:none;
  }
  .achieve-grid {
    display:grid; grid-template-columns:repeat(4,1fr);
    gap:0; padding:3rem 0;
  }
  .achieve-item {
    text-align:center; padding:2rem 1rem;
    border-right:1px solid var(--bdr);
    position:relative;
  }
  .achieve-item:last-child{border-right:none}
  .achieve-item::before {
    content:''; position:absolute; bottom:0; left:10%; right:10%;
    height:2px;
    background:linear-gradient(90deg,transparent,var(--saf),transparent);
    transform:scaleX(0); transition:transform .6s ease;
  }
  .achieve-item.counted::before{transform:scaleX(1)}
  .achieve-num {
    font-family:var(--fd); font-size:clamp(2.5rem,5vw,4rem);
    color:var(--gold2); line-height:1; display:block;
    margin-bottom:.4rem;
  }
  .achieve-plus { color:var(--saf); font-size:.7em; }
  .achieve-label { font-size:.82rem; color:var(--mute); letter-spacing:.08em; }
  @media(max-width:768px){
    .achieve-grid{grid-template-columns:repeat(2,1fr)}
    .achieve-item:nth-child(2){border-right:none}
    .achieve-item{border-bottom:1px solid var(--bdr)}
    .achieve-item:last-child,.achieve-item:nth-last-child(2){border-bottom:none}
  }
  @media(max-width:480px){
    .achieve-grid{grid-template-columns:1fr 1fr}
  }

  /* ── PDF DOWNLOAD BUTTON ── */
  .pdf-download-wrap {
    text-align:center; padding:2.5rem 0 1rem;
  }
  .pdf-btn {
    display:inline-flex; align-items:center; gap:10px;
    background:linear-gradient(135deg,#1a0800,#3d1500);
    border:1.5px solid rgba(200,145,12,.4);
    color:var(--gold2); font-family:var(--fd);
    font-size:1rem; padding:14px 32px;
    border-radius:12px; cursor:pointer;
    transition:all .3s; text-decoration:none;
    box-shadow:0 4px 20px rgba(0,0,0,.4);
  }
  .pdf-btn:hover {
    background:linear-gradient(135deg,#3d1500,#7a2e00);
    border-color:var(--gold2);
    transform:translateY(-3px);
    box-shadow:0 8px 30px rgba(200,145,12,.25);
  }
  .pdf-btn-icon { font-size:1.3rem; }

  /* ── CUSTOM CURSOR ── */
  body { cursor: none; }
  .custom-cursor {
    position: fixed; pointer-events: none; z-index: 99999;
    width: 20px; height: 20px;
    transform: translate(-50%, -50%);
    transition: transform .1s ease;
  }
  .custom-cursor.clicked { transform: translate(-50%,-50%) scale(.7); }
  .cursor-trail {
    position: fixed; pointer-events: none; z-index: 99998;
    width: 8px; height: 8px; border-radius: 50%;
    background: rgba(255,122,0,.4);
    transform: translate(-50%,-50%);
    transition: all .15s ease;
  }
  @media(max-width:768px){ body { cursor: auto; } .custom-cursor,.cursor-trail { display:none; } }

  /* ── PAGE TRANSITIONS ── */
  .page-transition {
    position: fixed; inset: 0; z-index: 9998;
    background: linear-gradient(135deg, #0d0500, #3a1500);
    display: flex; align-items: center; justify-content: center;
    opacity: 0; pointer-events: none;
    transition: opacity .4s ease;
  }
  .page-transition.active { opacity: 1; pointer-events: all; }
  .pt-emblem { font-size: 4rem; animation: emblemPulse 1s ease-in-out infinite alternate; }

  /* ── MUSIC PLAYER ── */
  .music-player {
    position: fixed; bottom: 26px; left: 26px; z-index: 800;
    background: rgba(13,5,0,.92);
    border: 1px solid rgba(200,145,12,.35);
    border-radius: 50px;
    padding: 8px 16px 8px 8px;
    display: flex; align-items: center; gap: 10px;
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 20px rgba(0,0,0,.5), 0 0 20px rgba(255,122,0,.1);
    transition: all .3s;
  }
  .music-player:hover { border-color: var(--saf); box-shadow: 0 4px 24px rgba(0,0,0,.6), 0 0 24px rgba(255,122,0,.2); }
  .mp-btn {
    width: 36px; height: 36px; border-radius: 50%;
    background: linear-gradient(135deg,#5a2000,var(--saf));
    border: none; cursor: pointer; color: #000;
    font-size: 1rem; display: flex; align-items: center; justify-content: center;
    transition: all .3s; flex-shrink: 0;
  }
  .mp-btn:hover { transform: scale(1.1); }
  .mp-info { display: flex; flex-direction: column; }
  .mp-title { font-family: var(--fd); font-size: .78rem; color: var(--gold2); line-height: 1.3; }
  .mp-sub { font-size: .68rem; color: var(--mute); }
  .mp-bars { display: flex; align-items: flex-end; gap: 2px; height: 16px; }
  .mp-bar {
    width: 3px; background: var(--saf); border-radius: 2px;
    animation: musicBar 1s ease-in-out infinite alternate;
  }
  .mp-bar:nth-child(2) { animation-delay: .2s; }
  .mp-bar:nth-child(3) { animation-delay: .4s; }
  .mp-bar:nth-child(4) { animation-delay: .1s; }
  .mp-bar:nth-child(5) { animation-delay: .3s; }
  .mp-bars.paused .mp-bar { animation-play-state: paused; height: 4px !important; }
  @keyframes musicBar {
    from { height: 4px; }
    to { height: 16px; }
  }
  @media(max-width:480px){ .music-player { bottom:18px; left:18px; padding:6px 12px 6px 6px; } }

  /* ── ACHIEVEMENTS COUNTER ── */
  .counter-sec {
    background: linear-gradient(135deg,#0d0500,#1a0800,#0d0500);
    border-top: 1px solid var(--bdr); border-bottom: 1px solid var(--bdr);
    padding: 3rem 0;
  }
  .counter-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem; }
  .counter-item { text-align: center; padding: 1.5rem 1rem; position: relative; }
  .counter-item::after {
    content: ''; position: absolute; right: 0; top: 20%; bottom: 20%;
    width: 1px; background: var(--bdr);
  }
  .counter-item:last-child::after { display: none; }
  .counter-num {
    font-family: var(--fd); font-size: clamp(2.2rem,5vw,3.5rem);
    color: var(--gold2); line-height: 1; display: block; margin-bottom: .4rem;
  }
  .counter-label { font-size: .82rem; color: var(--mute); letter-spacing: .08em; line-height: 1.5; }
  .counter-icon { font-size: 1.6rem; display: block; margin-bottom: .5rem; }
  @media(max-width:768px){ .counter-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:480px){ .counter-grid { grid-template-columns: repeat(2,1fr); gap:.5rem; } }

  /* ── PDF DOWNLOAD BUTTON ── */
  .pdf-download-bar {
    background: linear-gradient(135deg,rgba(255,122,0,.08),rgba(200,145,12,.08));
    border: 1px solid rgba(200,145,12,.25); border-radius: 14px;
    padding: 1.2rem 1.6rem;
    display: flex; align-items: center; justify-content: space-between;
    gap: 1rem; margin: 2rem 0; flex-wrap: wrap;
  }
  .pdf-info { display: flex; align-items: center; gap: .9rem; }
  .pdf-icon { font-size: 2.2rem; }
  .pdf-text h4 { font-family: var(--fd); font-size: 1rem; color: var(--gold2); margin-bottom: .2rem; font-weight: 400; }
  .pdf-text p { font-size: .82rem; color: var(--mute); }
  .pdf-btn {
    background: linear-gradient(135deg,#5a2000,var(--saf));
    color: #000; font-family: var(--fd); font-weight: 700; font-size: .9rem;
    padding: 10px 22px; border-radius: 10px; border: none; cursor: pointer;
    transition: all .3s; white-space: nowrap; text-decoration: none;
    display: inline-flex; align-items: center; gap: 6px;
  }
  .pdf-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(255,122,0,.45); }

  /* ── CUSTOM CURSOR ── */
  @media (pointer: fine) {
    * { cursor: none !important; }
    .custom-cursor {
      position: fixed; top: 0; left: 0; pointer-events: none; z-index: 99999;
      transform: translate(-50%, -50%);
      transition: transform .15s ease, width .2s, height .2s;
    }
    .cursor-main {
      width: 22px; height: 22px; border-radius: 50%;
      background: radial-gradient(circle, rgba(255,122,0,.9), rgba(200,145,12,.7));
      box-shadow: 0 0 12px rgba(255,122,0,.6), 0 0 24px rgba(255,122,0,.3);
      border: 1.5px solid rgba(255,255,255,.5);
      transition: transform .1s, width .2s, height .2s;
    }
    .cursor-trail {
      width: 8px; height: 8px; border-radius: 50%;
      background: rgba(255,122,0,.5);
      position: fixed; pointer-events: none; z-index: 99998;
      transform: translate(-50%, -50%);
      transition: all .25s ease;
    }
    .custom-cursor.clicking .cursor-main {
      transform: scale(.7);
      background: radial-gradient(circle, rgba(200,145,12,.9), rgba(255,122,0,.7));
    }
    .custom-cursor.hovering .cursor-main {
      transform: scale(1.5);
      background: radial-gradient(circle, rgba(255,122,0,.7), transparent);
      border-color: rgba(255,122,0,.8);
    }
  }

  /* ── PAGE TRANSITIONS ── */
  .page-transition {
    position: fixed; inset: 0; z-index: 9990;
    background: linear-gradient(135deg, #050200, #1a0800);
    display: flex; align-items: center; justify-content: center;
    pointer-events: none;
    animation: pageReveal .6s cubic-bezier(.77,0,.175,1) forwards;
  }
  .pt-emblem { font-size: 4rem; animation: ptSpin .6s ease-in-out; }
  @keyframes pageReveal {
    0%   { clip-path: circle(100%); opacity: 1; }
    100% { clip-path: circle(0% at 50% 50%); opacity: 0; }
  }
  @keyframes ptSpin {
    0%   { transform: rotate(0deg) scale(1); }
    50%  { transform: rotate(180deg) scale(1.3); }
    100% { transform: rotate(360deg) scale(1); }
  }

  /* ── ANIMATED COUNTERS ── */
  .counter-sec {
    background: linear-gradient(135deg, #0d0500, #1a0800);
    border-top: 1px solid var(--bdr); border-bottom: 1px solid var(--bdr);
    padding: 3rem 0;
  }
  .counter-grid {
    display: grid; grid-template-columns: repeat(4,1fr); gap: 1rem;
  }
  .counter-item {
    text-align: center; padding: 1.5rem 1rem;
    background: rgba(255,255,255,.03); border: 1px solid var(--bdr);
    border-radius: 16px; transition: all .3s; position: relative; overflow: hidden;
  }
  .counter-item::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,122,0,.05), transparent);
    opacity: 0; transition: opacity .3s;
  }
  .counter-item:hover::before { opacity: 1; }
  .counter-item:hover { transform: translateY(-5px); border-color: var(--bdr2); }
  .ci-icon { font-size: 2rem; margin-bottom: .6rem; display: block;
    filter: drop-shadow(0 0 8px rgba(255,122,0,.4)); }
  .ci-num {
    font-family: var(--fd); font-size: clamp(2rem,4vw,3rem);
    color: var(--gold2); line-height: 1; display: block; margin-bottom: .3rem;
  }
  .ci-label { font-size: .8rem; color: var(--mute); letter-spacing: .08em; }
  @media(max-width:768px){ .counter-grid { grid-template-columns: repeat(2,1fr); } }
  @media(max-width:480px){ .counter-grid { grid-template-columns: 1fr 1fr; gap:.7rem; } }

  /* ── MUSIC PLAYER ── */
  .music-player {
    position: fixed; bottom: 26px; left: 26px; z-index: 800;
    background: rgba(5,2,0,.92); border: 1px solid rgba(200,145,12,.3);
    border-radius: 50px; padding: .45rem .45rem .45rem 1rem;
    display: flex; align-items: center; gap: .7rem;
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 20px rgba(0,0,0,.5), 0 0 15px rgba(255,122,0,.1);
    transition: all .3s;
  }
  .music-player:hover { border-color: rgba(255,122,0,.5); }
  .mp-info { display: flex; flex-direction: column; }
  .mp-title { font-family: var(--fd); font-size: .78rem; color: var(--gold2); }
  .mp-sub { font-size: .68rem; color: var(--mute); }
  .mp-btn {
    width: 34px; height: 34px; border-radius: 50%;
    background: linear-gradient(135deg, #5a2000, var(--saf));
    border: none; color: #000; font-size: .9rem; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    transition: all .3s; flex-shrink: 0;
  }
  .mp-btn:hover { transform: scale(1.1); }
  .mp-bars {
    display: flex; align-items: center; gap: 2px; height: 16px;
  }
  .mp-bar {
    width: 3px; background: var(--saf); border-radius: 2px;
    animation: mpBar .8s ease-in-out infinite alternate;
  }
  .mp-bar:nth-child(2) { animation-delay: .15s; }
  .mp-bar:nth-child(3) { animation-delay: .3s; }
  .mp-bar:nth-child(4) { animation-delay: .45s; }
  @keyframes mpBar {
    from { height: 4px; opacity: .5; }
    to   { height: 14px; opacity: 1; }
  }
  .mp-bar.paused { animation: none; height: 4px; }

  /* ── PDF DOWNLOAD BTN ── */
  .pdf-download-btn {
    display: inline-flex; align-items: center; gap: 8px;
    background: linear-gradient(135deg, #5a2000, var(--saf));
    color: #000; font-family: var(--fb); font-weight: 700; font-size: .9rem;
    padding: 10px 22px; border-radius: 10px; border: none; cursor: pointer;
    transition: all .3s; text-decoration: none;
    box-shadow: 0 4px 16px rgba(255,122,0,.4);
  }
  .pdf-download-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,122,0,.6); }
  .pdf-section {
    text-align: center; padding: 2rem 0;
    border-top: 1px solid var(--bdr);
  }

  /* ── CUSTOM CURSOR ── */
  @media (hover: hover) {
    *, *::before, *::after { cursor: none !important; }
  }
  .custom-cursor {
    position: fixed; top: 0; left: 0; pointer-events: none; z-index: 99999;
    transition: opacity .3s;
  }
  .cc-dot {
    position: absolute; width: 12px; height: 12px; border-radius: 50%;
    background: var(--saf); transform: translate(-50%,-50%);
    box-shadow: 0 0 10px var(--saf), 0 0 20px rgba(255,122,0,.4);
    transition: transform .1s, width .2s, height .2s;
  }
  .cc-ring {
    position: absolute; width: 36px; height: 36px; border-radius: 50%;
    border: 1.5px solid rgba(255,122,0,.5); transform: translate(-50%,-50%);
    transition: transform .12s ease, width .2s, height .2s, opacity .2s;
  }
  .cc-flag {
    position: absolute; font-size: 1rem; transform: translate(-50%,-120%);
    opacity: 0; transition: opacity .2s; pointer-events: none;
  }
  .custom-cursor.clicking .cc-dot { width: 8px; height: 8px; background: var(--gold2); }
  .custom-cursor.clicking .cc-ring { width: 28px; height: 28px; opacity: .8; }
  .custom-cursor.on-link .cc-flag { opacity: 1; }
  .custom-cursor.on-link .cc-dot { width: 16px; height: 16px; }
  .custom-cursor.on-link .cc-ring { width: 44px; height: 44px; border-color: var(--gold2); }
  @media (max-width: 768px) { .custom-cursor { display: none; } }

  /* ── PAGE TRANSITIONS ── */
  .page-transition {
    position: fixed; inset: 0; z-index: 9998; pointer-events: none;
    background: linear-gradient(135deg, #0d0500, var(--saf), #0d0500);
    transform: translateX(-100%);
  }
  .page-transition.in { animation: ptIn .5s ease forwards; }
  .page-transition.out { animation: ptOut .5s ease forwards; }
  @keyframes ptIn  { from{transform:translateX(-100%)} to{transform:translateX(0)} }
  @keyframes ptOut { from{transform:translateX(0)} to{transform:translateX(100%)} }

  /* ── ACHIEVEMENT COUNTER ── */
  .counter-sec {
    background: linear-gradient(135deg,#0d0500,#1a0800,#0d0500);
    padding: 2.5rem 0; border-top: 1px solid var(--bdr);
    border-bottom: 1px solid var(--bdr); position: relative; overflow: hidden;
  }
  .counter-sec::before {
    content: ''; position: absolute; inset: 0;
    background: radial-gradient(ellipse 80% 100% at 50% 50%, rgba(255,122,0,.07), transparent);
    pointer-events: none;
  }
  .counter-grid {
    display: flex; align-items: center; justify-content: center;
    flex-wrap: wrap; gap: 0;
  }
  .counter-item {
    text-align: center; padding: 1rem 2.5rem; position: relative;
  }
  .counter-item:not(:last-child)::after {
    content: ''; position: absolute; right: 0; top: 20%; bottom: 20%;
    width: 1px; background: var(--bdr);
  }
  .counter-num {
    font-family: var(--fd); font-size: clamp(2rem,4vw,3rem);
    color: var(--gold2); line-height: 1; display: block; margin-bottom: .3rem;
  }
  .counter-label {
    font-size: .78rem; color: var(--mute); letter-spacing: .08em;
  }
  @media(max-width:768px){
    .counter-item { padding: .8rem 1.4rem; }
    .counter-num { font-size: 1.8rem; }
  }

  /* ── MUSIC PLAYER ── */
  .music-player {
    position: fixed; bottom: 26px; left: 26px; z-index: 800;
    background: rgba(13,5,0,.92); border: 1px solid var(--bdr);
    border-radius: 14px; padding: .7rem 1rem;
    display: flex; align-items: center; gap: .75rem;
    backdrop-filter: blur(12px);
    box-shadow: 0 4px 24px rgba(0,0,0,.5);
    transition: all .3s; min-width: 200px;
  }
  .music-player:hover { border-color: var(--bdr2); }
  .mp-btn {
    width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
    background: linear-gradient(135deg,#5a2000,var(--saf));
    border: none; color: #000; font-size: 1rem;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: all .3s;
  }
  .mp-btn:hover { transform: scale(1.1); }
  .mp-info { flex: 1; min-width: 0; }
  .mp-title { font-family: var(--fd); font-size: .8rem; color: var(--gold2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .mp-sub { font-size: .7rem; color: var(--mute); }
  .mp-wave { display: flex; align-items: center; gap: 2px; height: 16px; }
  .mp-bar {
    width: 3px; border-radius: 2px; background: var(--saf);
    animation: mpWave 1s ease-in-out infinite;
  }
  .mp-bar:nth-child(2){animation-delay:.15s;height:10px}
  .mp-bar:nth-child(3){animation-delay:.3s;height:14px}
  .mp-bar:nth-child(4){animation-delay:.45s;height:8px}
  .mp-bar:nth-child(5){animation-delay:.6s;height:12px}
  @keyframes mpWave {
    0%,100%{transform:scaleY(.5);opacity:.5}
    50%{transform:scaleY(1);opacity:1}
  }
  .mp-bar.paused { animation-play-state: paused; }
  @media(max-width:480px){ .music-player { left:12px; bottom:70px; min-width:160px; } }

  /* ── SEO META hidden visuals ── */
  .seo-hidden { position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0,0,0,0); }

  @keyframes mpWave {
    from { transform: scaleY(0.4); opacity: .5; }
    to   { transform: scaleY(1);   opacity: 1; }
  }
`;

// ── COMPONENTS ────────────────────────────────────────────────────

function T({ mr, en, block }) {
  const lang = useLang();
  const Tag = block ? "p" : "span";
  return <Tag>{lang === "mr" ? mr : en}</Tag>;
}

function SectionHeader({ chipMr, chipEn, titleMr, titleEn, desc, descEn }) {
  const lang = useLang();
  return (
    <div className="sec-hd">
      <span className="sec-chip">{lang === "mr" ? chipMr : chipEn}</span>
      <h2 className="sec-title">{lang === "mr" ? titleMr : titleEn}</h2>
      <div className="sec-ornament"><span></span>⚜<span></span></div>
      {desc && <p className="sec-desc">{lang === "mr" ? desc : (descEn || desc)}</p>}
    </div>
  );
}



function Loader({ done }) {
  const [prog, setProg] = useState(0);
  useEffect(() => {
    let pct = 0;
    const t = setInterval(() => {
      pct += Math.random() * 18 + 7;
      if (pct >= 100) { setProg(100); clearInterval(t); }
      else setProg(Math.min(pct, 100));
    }, 90);
    return () => clearInterval(t);
  }, []);
  return (
    <div className={`loader${done ? " done" : ""}`}>
      <div className="ld-wrap">
        <span className="ld-emblem">🚩</span>
        <div className="ld-bar"><div className="ld-prog" style={{ width: prog + "%" }} /></div>
        <p className="ld-msg">लोड होत आहे...</p>
      </div>
    </div>
  );
}

function HeroCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const cvs = ref.current;
    const ctx = cvs.getContext("2d");
    let W, H, raf;
    const COLS = ["rgba(200,145,12,","rgba(255,122,0,","rgba(240,190,55,","rgba(255,160,50,"];
    const resize = () => { W = cvs.width = cvs.offsetWidth; H = cvs.height = cvs.offsetHeight; };
    window.addEventListener("resize", resize, { passive: true });
    resize();
    class Pt {
      constructor() { this.reset(); this.y = Math.random() * H; }
      reset() {
        this.x = Math.random() * W; this.y = H + Math.random() * 60;
        this.sz = Math.random() * 2.2 + 0.6;
        this.vy = -(Math.random() * 0.52 + 0.2); this.vx = (Math.random() - 0.5) * 0.32;
        this.a = 0; this.maxA = Math.random() * 0.48 + 0.1; this.in_ = true;
        this.col = COLS[Math.floor(Math.random() * COLS.length)];
        this.ph = Math.random() * Math.PI * 2; this.dia = Math.random() > 0.8;
      }
      step() {
        this.x += this.vx + Math.sin(this.ph) * 0.13; this.y += this.vy; this.ph += 0.036;
        if (this.in_) { this.a += 0.009; if (this.a >= this.maxA) this.in_ = false; }
        else this.a -= 0.005;
        if (this.a <= 0 || this.y < -20) this.reset();
      }
      draw() {
        const a = Math.max(0, this.a);
        ctx.globalAlpha = a; ctx.fillStyle = this.col + a + ")";
        if (this.dia) {
          ctx.save(); ctx.translate(this.x, this.y); ctx.rotate(Math.PI / 4);
          const s = this.sz * 1.3; ctx.fillRect(-s, -s, s * 2, s * 2); ctx.restore();
        } else { ctx.beginPath(); ctx.arc(this.x, this.y, this.sz, 0, Math.PI * 2); ctx.fill(); }
      }
    }
    const pts = Array.from({ length: 60 }, () => new Pt());
    const loop = () => {
      ctx.clearRect(0, 0, W, H); ctx.globalAlpha = 1;
      pts.forEach(p => { p.step(); p.draw(); });
      ctx.globalAlpha = 1; raf = requestAnimationFrame(loop);
    };
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { if (!raf) loop(); }
      else { cancelAnimationFrame(raf); raf = null; }
    }, { threshold: 0.02 });
    obs.observe(cvs);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = null; }
      else if (!raf) loop();
    });
    return () => { window.removeEventListener("resize", resize); obs.disconnect(); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} id="heroCanvas" />;
}

function Navbar({ setLang }) {
  const lang = useLang();
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  useEffect(() => {
    const onScroll = () => {
      setStuck(window.scrollY > 55);
      const y = window.scrollY + 90;
      document.querySelectorAll("section[id]").forEach(s => {
        if (y >= s.offsetTop && y < s.offsetTop + s.offsetHeight) setActiveId(s.id);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 66, behavior: "smooth" });
    setOpen(false);
  };
  return (
    <nav className={`nav${stuck ? " stuck" : ""}`}>
      <div className="nav-inner">
        <a href="#hero" className="nav-brand" onClick={e => { e.preventDefault(); scrollTo("hero"); }}>
          <span>⚔</span><span>शिवछत्रपती</span>
        </a>
        <ul className={`nav-links${open ? " open" : ""}`}>
          {NAV_LINKS.map(l => (
            <li key={l.href}>
              <button className={`nl${activeId === l.href ? " on" : ""}`} onClick={() => scrollTo(l.href)}>
                {lang === "mr" ? l.mr : l.en}
              </button>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <ModeToggle />
          <div className="lang-toggle">
            <button className={`lt-btn${lang === "mr" ? " active" : ""}`} onClick={() => setLang("mr")}>मराठी</button>
            <button className={`lt-btn${lang === "en" ? " active" : ""}`} onClick={() => setLang("en")}>EN</button>
          </div>
          <button className={`ham${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const lang = useLang();
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 66, behavior: "smooth" });
  };
  return (
    <section className="hero" id="hero">
      <HeroCanvas />
      <div className="hero-frame">
        <span className="hf-corner tl">⚜</span><span className="hf-corner tr">⚜</span>
        <span className="hf-corner bl">⚜</span><span className="hf-corner br">⚜</span>
        <div className="hf-line top"/><div className="hf-line bot"/>
        <div className="hf-line lft"/><div className="hf-line rgt"/>
      </div>
      <div className="hero-content">
        <div className="hero-tribute">
          <span className="diya">🪔</span>
          <div className="tribute-text">
            <span className="t1">{lang === "mr" ? "माझ्या दैवताला" : "A tribute to my deity"}</span>
            <span className="t2">{lang === "mr" ? "मनाचा मुजरा" : "A Heartfelt Salute"}</span>
          </div>
          <span className="diya">🪔</span>
        </div>
        <div className="hero-name">
          <span className="hn-top">{lang === "mr" ? "छत्रपती" : "Chhatrapati"}</span>
          <span className="hn-main">{lang === "mr" ? "शिवाजी महाराज" : "Shivaji Maharaj"}</span>
          <span className="hn-dates">{lang === "mr" ? "१९ फेब्रुवारी १६३० — ३ एप्रिल १६८०" : "19 February 1630 — 3 April 1680"}</span>
        </div>
        <div className="hero-badge">
          <span>🚩</span>
          <span>{lang === "mr" ? "मराठा साम्राज्याचे संस्थापक" : "Founder of the Maratha Empire"}</span>
          <span>🚩</span>
        </div>
        <p className="hero-tagline">{lang === "mr" ? "स्वराज्य माझा जन्मसिद्ध हक्क आहे" : "Swarajya is my birthright"}</p>
        <p className="hero-bio">{lang === "mr" ? "धर्मवीर, रणशूर आणि न्यायी — छत्रपती शिवाजी महाराज हे केवळ एक राजा नव्हते. ते एक युगपुरुष होते ज्यांनी करोडो रयतेसाठी स्वराज्याचे स्वप्न सत्यात उतरवले." : "Fearless, just and visionary — Chhatrapati Shivaji Maharaj was not merely a king. He was an epoch-maker who transformed the dream of Swarajya into reality for millions."}</p>
        <div className="hero-quote">
          <span className="hq-mark">"</span>
          <span className="hq-text">{lang === "mr" ? "स्वराज्य माझा जन्मसिद्ध हक्क आहे आणि तो मी मिळवणारच!" : "Swarajya is my birthright and I shall have it!"}</span>
        </div>
        <div className="hero-btns">
          <button className="btn-main" onClick={() => scrollTo("about")}>
            {lang === "mr" ? "महाराजांबद्दल जाणून घ्या" : "Explore His Life"} →
          </button>
          <button className="btn-sec" onClick={() => scrollTo("timeline")}>
            {lang === "mr" ? "इतिहासाचा कालपट" : "View Timeline"}
          </button>
        </div>
        <div className="hero-stats">
          {[
            { v:"३५०+", mr:"किल्ले", en:"Forts" },
            { v:"१६७४", mr:"राज्याभिषेक वर्ष", en:"Coronation Year" },
            { v:"३०+",  mr:"युद्धे जिंकली", en:"Battles Won" },
            { v:"५१",   mr:"वर्षे आयुष्य", en:"Years of Life" },
          ].map((s, i) => (
            <div key={s.v} style={{display:"contents"}}>
              {i > 0 && <div className="hstat-sep"/>}
              <div className="hstat">
                <span className="hstat-v">{s.v}</span>
                <span className="hstat-l">{lang === "mr" ? s.mr : s.en}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
              <img src="images/maharaj.jpg" alt="Chhatrapati Shivaji Maharaj"
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

function Childhood() {
  const lang = useLang();
  const cards = [
    { img:"images/jijamata.jpg", labelMr:"राजमाता", labelEn:"Rajmata", nameMr:"राजमाता जिजाबाई", nameEn:"Rajmata Jijabai", subtMr:"स्वराज्याची जननी", subtEn:"Mother of Swarajya", descMr:"जिजाबाईंनी शिवाजींना रामायण, महाभारत आणि वीरांच्या कथा सांगून त्यांच्यात देशभक्ती आणि न्यायाची भावना जागृत केली.", descEn:"Jijabai narrated stories of brave warriors, awakening patriotism and justice in Shivaji. She was his true inspiration." },
    { img:"images/Shivneri_Fort.jpg", labelMr:"जन्मभूमी", labelEn:"Birthplace", nameMr:"शिवनेरी किल्ला", nameEn:"Shivneri Fort", subtMr:"बालपणाची भूमी", subtEn:"Land of Childhood", descMr:"शिवनेरी किल्ला म्हणजे शिवाजी महाराजांची जन्मभूमी. पर्वत, जंगल आणि किल्ल्यांच्या सान्निध्यात वाढलेल्या शिवाजींमध्ये धाडस स्वाभाविकपणे आले.", descEn:"Shivneri Fort is Maharaj's birthplace. Growing up among mountains and forts, bravery came naturally to young Shivaji." },
    { img:"images/dadoji.jpg", labelMr:"गुरू", labelEn:"Teacher", nameMr:"दादोजी कोंडदेव", nameEn:"Dadoji Konddev", subtMr:"पहिले गुरू", subtEn:"First Teacher", descMr:"दादोजी कोंडदेव यांनी महाराजांना तलवारबाजी, घोडेस्वारी, युद्धशास्त्र आणि राज्यकारभार यांचे शिक्षण दिले.", descEn:"Dadoji Konddev trained Maharaj in swordsmanship, horsemanship, military science and administration." },
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

function Forts() {
  const lang = useLang();
  return (
    <section className="section forts-sec" id="forts">
      <div className="wrap">
        <SectionHeader chipMr="किल्ले" chipEn="Forts"
          titleMr="गडांचे साम्राज्य" titleEn="Empire of Forts"
          desc="महाराजांनी ३५० हून अधिक किल्ले जिंकले, बांधले आणि सुरक्षित केले."
          descEn="Maharaj captured, built and secured over 350 forts — the backbone of Swarajya." />
        <div className="forts-grid">
          {FORTS_DATA.map(f => (
            <div className="fort-card" key={f.nameMr}
              onMouseMove={e => { const r=e.currentTarget.getBoundingClientRect(); const x=(e.clientX-r.left)/r.width-.5; const y=(e.clientY-r.top)/r.height-.5; e.currentTarget.style.transform=`translateY(-9px) rotateX(${-y*5}deg) rotateY(${x*5}deg)`; }}
              onMouseLeave={e => { e.currentTarget.style.transform=""; }}>
              <div className="fc-img">
                <img src={f.img} alt={f.nameMr} onError={e=>e.target.closest(".fc-img").style.background="#1a0800"} />
                <div className="fc-overlay"/>
                <span className="fc-badge">{lang==="mr"?f.badgeMr:f.badgeEn}</span>
                <span className="fc-elev">{f.elev}</span>
              </div>
              <div className="fc-body">
                <h3>{lang==="mr"?f.nameMr:f.nameEn}</h3>
                <p className="fc-subtitle">{lang==="mr"?f.subtitleMr:f.subtitleEn}</p>
                <p>{lang==="mr"?f.descMr:f.descEn}</p>
                <div className="fc-pills">
                  {(lang==="mr"?f.pillsMr:f.pillsEn).map(p=><span className="fc-pill" key={p}>{p}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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
                <strong>VS</strong>
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

function Mavale() {
  const lang = useLang();
  return (
    <section className="section mavale-sec" id="mavale">
      <div className="wrap">
        <SectionHeader chipMr="मावळे" chipEn="Warriors"
          titleMr="शिवरायांचे शूर मावळे" titleEn="The Brave Warriors of Shivaji"
          desc="महाराजांचे खरे बळ त्यांचे निष्ठावंत मावळे होते."
          descEn="Maharaj's true strength was his loyal warriors. Without them, Swarajya was not possible." />
        <div className="mavale-grid">
          {MAVALE_DATA.map(m => (
            <div className="mavale-card" key={m.nameMr}>
              <span className="mc-icon">{m.icon}</span>
              <h3>{lang==="mr"?m.nameMr:m.nameEn}</h3>
              <span className="mc-title">{lang==="mr"?m.titleMr:m.titleEn}</span>
              <p>{lang==="mr"?m.descMr:m.descEn}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

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

function Gallery() {
  const lang = useLang();
  const [lb, setLb] = useState(null);
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") setLb(null); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
  useEffect(() => { document.body.style.overflow = lb ? "hidden" : ""; }, [lb]);
  return (
    <section className="section gallery-sec" id="gallery">
      <div className="wrap">
        <SectionHeader chipMr="दालन" chipEn="Gallery"
          titleMr="चित्र दालन" titleEn="Photo Gallery" />
        <div className="gal-mosaic">
          {GALLERY_DATA.map((g, i) => (
            <div key={i} className={`gal-item${g.tall?" gal-tall":""}${g.wide?" gal-wide":""}`}
              onClick={() => setLb(g)}>
              <img src={g.img} alt={g.capMr} loading="lazy" />
              <div className="gal-ov">
                <span>⊕</span>
                <p>{lang==="mr"?g.labelMr:g.labelEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lb && (
        <div className="lightbox" onClick={() => setLb(null)}>
          <div className="lb-inner" onClick={e => e.stopPropagation()}>
            <button className="lb-close" onClick={() => setLb(null)}>✕</button>
            <img src={lb.img} alt={lb.capMr} />
            <p className="lb-cap">{lang==="mr"?lb.capMr:lb.capEn}</p>
          </div>
        </div>
      )}
    </section>
  );
}

function Quotes() {
  const lang = useLang();
  const [cur, setCur] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCur(c => (c + 1) % QUOTES_DATA.length), 5500);
    return () => clearInterval(t);
  }, []);
  const q = QUOTES_DATA[cur];
  return (
    <section className="section quotes-sec" id="quotes">
      <div className="wrap">
        <SectionHeader chipMr="सुविचार" chipEn="Quotes"
          titleMr="अमर वाणी" titleEn="Immortal Words" />
        <div className="quotes-slider" style={{ maxWidth:700, margin:"0 auto" }}>
          <div className="q-slide">
            <span className="q-mark">❝</span>
            <blockquote>{lang==="mr"?q.mr:q.en}</blockquote>
            <cite>— {lang==="mr"?"छत्रपती शिवाजी महाराज":"Chhatrapati Shivaji Maharaj"}</cite>
          </div>
          <div className="q-controls">
            <button className="q-btn" onClick={() => setCur(c => (c-1+QUOTES_DATA.length)%QUOTES_DATA.length)}>‹</button>
            <div className="q-dots">
              {QUOTES_DATA.map((_,i) => <div key={i} className={`qdot${i===cur?" on":""}`} onClick={() => setCur(i)} />)}
            </div>
            <button className="q-btn" onClick={() => setCur(c => (c+1)%QUOTES_DATA.length)}>›</button>
          </div>
        </div>
      </div>
    </section>
  );
}



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

        {/* Big Numbers Grid */}
        <div className="ig-numbers">
          {BIG_NUMBERS.map((n, i) => (
            <div className="ig-num-card reveal" key={n.value} style={{"--i": i}}>
              <span className="ig-icon">{n.icon}</span>
              <span className="ig-value">{n.value}</span>
              <span className="ig-label">{lang === "mr" ? n.labelMr : n.labelEn}</span>
            </div>
          ))}
        </div>

        {/* Achievement Cards */}
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

        {/* Timeline + Compare side by side */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"2rem",marginBottom:"3rem"}}>

          {/* Timeline */}
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

          {/* Comparison Bars */}
          <div className="ig-compare">
            <div className="ig-cmp-title">
              {lang === "mr" ? "📊 महाराजांचे कौशल्य" : "📊 Maharaj's Skills"}
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

        {/* Quote Banner */}
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

function FortMap() {
  const lang = useLang();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("all");
  const mapRef = useRef(null);
  const leafletMap = useRef(null);
  const markersRef = useRef([]);

  const filters = [
    { key:"all",     mr:"सर्व",       en:"All" },
    { key:"capital", mr:"राजधानी",    en:"Capital" },
    { key:"battle",  mr:"युद्धभूमी",  en:"Battle" },
    { key:"birth",   mr:"जन्मभूमी",  en:"Birthplace" },
    { key:"sea",     mr:"सागरी",      en:"Sea Fort" },
  ];

  const legend = [
    { color:"#d85a30", mr:"राजधानी",   en:"Capital" },
    { color:"#185fa5", mr:"युद्धभूमी", en:"Battle" },
    { color:"#3b6d11", mr:"जन्मभूमी", en:"Birthplace" },
    { color:"#534ab7", mr:"सागरी",     en:"Sea Fort" },
  ];

  const visible = FORTS_MAP_DATA.filter(f => filter === "all" || f.type === filter);
  const selFort = FORTS_MAP_DATA.find(f => f.id === selected);

  // Load Leaflet CSS + JS dynamically
  useEffect(() => {
    if (document.getElementById('leaflet-css')) return;
    const link = document.createElement('link');
    link.id = 'leaflet-css';
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload = () => initMap();
    document.head.appendChild(script);
  }, []);

  const initMap = () => {
    if (!mapRef.current || leafletMap.current) return;

    const L = window.L;
    const map = L.map(mapRef.current, {
      center: [18.5, 74.5],
      zoom: 7,
      zoomControl: true,
      attributionControl: true,
    });

    // Dark themed tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    leafletMap.current = map;
    addMarkers(map, FORTS_MAP_DATA);
  };

  const addMarkers = (map, forts) => {
    const L = window.L;
    if (!L) return;

    // Clear old markers
    markersRef.current.forEach(m => map.removeLayer(m));
    markersRef.current = [];

    forts.forEach(fort => {
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:16px;height:16px;border-radius:50%;
          background:${fort.color};
          border:2.5px solid rgba(255,255,255,0.85);
          box-shadow:0 0 10px ${fort.color},0 0 20px ${fort.color}44;
          cursor:pointer;transition:all .2s;
        "></div>`,
        iconSize: [16,16],
        iconAnchor: [8,8],
      });

      const marker = L.marker([fort.lat, fort.lng], { icon })
        .addTo(map)
        .on('click', () => setSelected(prev => prev === fort.id ? null : fort.id));

      // Tooltip
      marker.bindTooltip(`
        <div style="font-family:serif;font-size:13px;color:#e8b830;font-weight:600;background:#0d0500;border:1px solid rgba(200,145,12,.4);border-radius:8px;padding:6px 12px;">
          🏰 ${fort.name}
        </div>
      `, { 
        permanent: false, 
        direction: 'top', 
        offset: [0, -10],
        opacity: 1,
        className: 'shivaji-tooltip'
      });

      markersRef.current.push(marker);
    });
  };

  // Re-add markers when filter changes
  useEffect(() => {
    if (!leafletMap.current || !window.L) return;
    addMarkers(leafletMap.current, visible);
  }, [filter]);

  // Fly to selected fort
  useEffect(() => {
    if (!leafletMap.current || !selFort) return;
    leafletMap.current.flyTo([selFort.lat, selFort.lng], 10, { duration: 1.2 });
  }, [selected]);

  return (
    <section className="section map-sec" id="map">
      <div className="wrap">
        <SectionHeader
          chipMr="नकाशा" chipEn="Map"
          titleMr="किल्ल्यांचा नकाशा" titleEn="Map of Forts"
          desc="महाराजांनी जिंकलेल्या व बांधलेल्या प्रमुख किल्ल्यांचा इंटरएक्टिव नकाशा"
          descEn="Interactive map of the key forts captured and built by Maharaj" />

        <div className="map-filters">
          {filters.map(f => (
            <button key={f.key}
              className={`mf-btn${filter === f.key ? " on" : ""}`}
              onClick={() => { setFilter(f.key); setSelected(null); }}>
              {lang === "mr" ? f.mr : f.en}
            </button>
          ))}
        </div>

        <div className="map-container">
          {/* Real Leaflet Map */}
          <div>
            <div className="map-svg-wrap" style={{borderRadius:16,overflow:"hidden",position:"relative"}}>
              <div ref={mapRef} style={{height:460,width:"100%"}} />
              {/* Overlay badge */}
              <div style={{
                position:"absolute",top:12,left:12,zIndex:1000,
                background:"rgba(5,2,0,.88)",border:"1px solid rgba(200,145,12,.35)",
                borderRadius:10,padding:"6px 14px",
                fontFamily:"var(--fd)",fontSize:".82rem",color:"var(--gold2)"
              }}>
                🏰 {visible.length} {lang==="mr"?"किल्ले":"Forts"}
              </div>
            </div>
            <div className="map-legend">
              {legend.map(l => (
                <div className="leg-it" key={l.color}>
                  <div className="leg-dot" style={{background:l.color}}/>
                  <span>{lang==="mr"?l.mr:l.en}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <div className="map-panel">
            <div className={`map-detail${selFort?" has-fort":""}`}>
              {!selFort ? (
                <div className="md-empty">
                  🗺<br/>
                  {lang==="mr"
                    ?"नकाशावरील किल्ल्यावर click करा — संपूर्ण माहिती मिळेल"
                    :"Click on a fort marker on the map to see details"}
                </div>
              ) : (
                <>
                  <div className="md-name">{lang==="mr"?selFort.name:selFort.nameEn}</div>
                  <div className="md-loc">📍 {selFort.dist}</div>
                  <div className="md-row"><span className="md-key">⛰ {lang==="mr"?"उंची":"Elevation"}</span><span className="md-val">{selFort.elev}</span></div>
                  <div className="md-row"><span className="md-key">📅 {lang==="mr"?"वर्ष":"Year"}</span><span className="md-val">{selFort.year}</span></div>
                  <div className="md-row"><span className="md-key">⭐ {lang==="mr"?"प्रसिद्ध":"Famous for"}</span><span className="md-val">{lang==="mr"?selFort.event:selFort.eventEn}</span></div>
                  <div className="md-desc">{lang==="mr"?selFort.desc:selFort.descEn}</div>
                  <div className="md-tags">
                    {(lang==="mr"?selFort.tags:selFort.tagsEn).map(t=>(
                      <span className="md-tag" key={t}>{t}</span>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              <div className="map-count">{visible.length} {lang==="mr"?"किल्ले":"Forts"}</div>
              <div className="map-list">
                {visible.map(f => (
                  <div key={f.id}
                    className={`ml-item${selected===f.id?" sel":""}`}
                    onClick={() => setSelected(selected===f.id ? null : f.id)}>
                    <div className="ml-dot" style={{background:f.color}}/>
                    <div>
                      <div className="ml-name">{lang==="mr"?f.name:f.nameEn}</div>
                      <div className="ml-event">{lang==="mr"?f.event:f.eventEn} · {f.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaflet tooltip custom style */}
      <style>{`
        .shivaji-tooltip { background:transparent!important; border:none!important; box-shadow:none!important; }
        .shivaji-tooltip::before { display:none!important; }
        .leaflet-container { background:#0d0500!important; }
        .leaflet-control-attribution { background:rgba(5,2,0,.7)!important; color:#967030!important; font-size:10px!important; }
        .leaflet-control-attribution a { color:var(--saf)!important; }
      `}</style>
    </section>
  );
}


function Footer() {
  const lang = useLang();
  const scrollTo = id => { const el=document.getElementById(id); if(el) window.scrollTo({top:el.offsetTop-66,behavior:"smooth"}); };
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo"><span>⚔</span><span>शिवछत्रपती</span></div>
            <p>{lang==="mr"?"छत्रपती शिवाजी महाराजांच्या जीवन, पराक्रम आणि अजरामर वारशाला समर्पित हे संकेतस्थळ.":"A website dedicated to the life, valor and immortal legacy of Chhatrapati Shivaji Maharaj."}</p>
            <p className="footer-salute">🚩 जय शिवाजी! जय भवानी! 🚩</p>
          </div>
          <div className="footer-links">
            <h4>{lang==="mr"?"जलद दुवे":"Quick Links"}</h4>
            <ul>
              {NAV_LINKS.map(l => (
                <li key={l.href}><a href={"#"+l.href} onClick={e=>{e.preventDefault();scrollTo(l.href)}}>{lang==="mr"?l.mr:l.en}</a></li>
              ))}
            </ul>
          </div>
          <div className="footer-big-q">
            <span className="fbq-mark">❝</span>
            <div className="fbq-text">{lang==="mr"?"स्वराज्य माझा जन्मसिद्ध हक्क आहे आणि तो मी मिळवणारच!":"Swarajya is my birthright and I shall have it!"}</div>
          </div>
        </div>
        <PDFDownload />
        <PDFDownload />
        <div className="footer-bar">
          <span>© २०२६ — {lang==="mr"?"डिझाइन व विकसित:":"Designed by:"} <a href="https://github.com/somnathhake09" target="_blank" rel="noreferrer">सोमनाथ हाके</a></span>
          <span>🚩 हर हर महादेव! 🚩</span>
        </div>
      </div>
    </footer>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────

// ── QUIZ DATA ────────────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════════
// HISTORICAL LETTERS DATA — Based on actual historical records
// ══════════════════════════════════════════════════════════════════
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

// ══════════════════════════════════════════════════════════════════
// CHATBOT DATA — 100% historically accurate Q&A
// ══════════════════════════════════════════════════════════════════
const CHATBOT_QA = [
  { keysMr:["जन्म","जन्मस्थान","कधी","कुठे जन्मले"], keysEn:["born","birth","when","where born"],
    ansMr:"छत्रपती शिवाजी महाराजांचा जन्म १९ फेब्रुवारी १६३० रोजी शिवनेरी किल्ल्यावर (जुन्नर, पुणे जिल्हा) झाला. त्यांचे नाव शिवाईदेवीच्या नावावरून 'शिवाजी' ठेवले गेले. 🏰",
    ansEn:"Chhatrapati Shivaji Maharaj was born on 19 February 1630 at Shivneri Fort (Junnar, Pune District). He was named 'Shivaji' after the goddess Shivai. 🏰" },
  { keysMr:["आई","जिजाबाई","माता"], keysEn:["mother","jijabai","mom"],
    ansMr:"महाराजांच्या आई राजमाता जिजाबाई (१५९८-१६७४) होत्या. त्यांनीच शिवाजींना रामायण, महाभारत आणि वीरांच्या कथा सांगून स्वराज्याची प्रेरणा दिली. महाराजांच्या राज्याभिषेकानंतर काही दिवसांतच त्यांचे निधन झाले. 🙏",
    ansEn:"Maharaj's mother was Rajmata Jijabai (1598-1674). She inspired Shivaji with stories from Ramayana, Mahabharata and tales of heroes. She passed away just days after Maharaj's coronation. 🙏" },
  { keysMr:["वडील","शाहाजी","पिता"], keysEn:["father","shahaji","dad"],
    ansMr:"महाराजांचे वडील शाहाजी भोसले (१५९४-१६६४) होते. ते आदिलशाहीत सरदार होते. त्यांनी महाराजांना पुणे परगण्याची जहागीर दिली. शाहाजी महाराज एक कुशल सेनानी होते. ⚔",
    ansEn:"Maharaj's father was Shahaji Bhonsle (1594-1664). He served as a commander under the Adilshahi. He gave young Shivaji the Pune region as a jagir. Shahaji was a skilled military commander. ⚔" },
  { keysMr:["राज्याभिषेक","छत्रपती","कधी राजा"], keysEn:["coronation","crowned","chhatrapati","king"],
    ansMr:"महाराजांचा भव्य राज्याभिषेक ६ जून १६७४ रोजी रायगड किल्ल्यावर झाला. काशीचे प्रसिद्ध विद्वान गागाभट्ट यांनी विधी केले. यावेळी ५०,००० हून अधिक लोक उपस्थित होते. ते 'छत्रपती' ही पदवी धारण करणारे पहिले मराठा राजा ठरले. 👑",
    ansEn:"The grand coronation took place on 6 June 1674 at Raigad Fort. Gagabhatt, the renowned scholar from Kashi, performed the rituals. Over 50,000 people were present. He became the first Maratha king to hold the title 'Chhatrapati'. 👑" },
  { keysMr:["अफझलखान","प्रतापगड","वाघनख"], keysEn:["afzal khan","tiger claws","pratapgad"],
    ansMr:"१० नोव्हेंबर १६५९ रोजी प्रतापगडाजवळ महाराजांनी अफझलखानाचा वध केला. अफझलखान आदिलशाहाने पाठवलेला ताकदवान सरदार होता — सुमारे १०,००० सैन्यासह आला होता. महाराजांनी वाघनखाने (tiger claws) त्याचा वध केला. हा स्वराज्यासाठी टर्निंग पॉइंट ठरला! ⚔",
    ansEn:"On 10 November 1659, Maharaj killed Afzal Khan near Pratapgad. Afzal Khan was a powerful commander of the Adilshahi with an army of ~10,000. Maharaj killed him with wagh nakh (tiger claws). This became the turning point for Swarajya! ⚔" },
  { keysMr:["किल्ले","किती किल्ले","गड"], keysEn:["forts","how many forts","fort"],
    ansMr:"महाराजांनी त्यांच्या कारकिर्दीत सुमारे ३५०+ किल्ले ताब्यात घेतले, बांधले किंवा दुरुस्त केले. रायगड (राजधानी), सिंहगड, प्रतापगड, तोरणा, राजगड, शिवनेरी हे प्रमुख किल्ले आहेत. किल्ले हे स्वराज्याचा कणा होते. 🏰",
    ansEn:"During his reign, Maharaj controlled, built or repaired around 350+ forts. Raigad (capital), Sinhagad, Pratapgad, Torna, Rajgad, Shivneri are the major forts. Forts were the backbone of Swarajya. 🏰" },
  { keysMr:["नौदल","समुद्र","जहाज"], keysEn:["navy","naval","sea","ship"],
    ansMr:"महाराज भारताच्या पहिल्या संघटित नौदलाचे निर्माते आहेत. त्यांनी कोकण किनाऱ्यावर अनेक नौदल तळ उभारले. सिंधुदुर्ग (१६६४) हा समुद्रात बांधलेला अभेद्य किल्ला. कान्होजी आंग्रे हे त्यांचे प्रसिद्ध नौदल सेनापती. ⚓",
    ansEn:"Maharaj is the founder of India's first organised navy. He built several naval bases along the Konkan coast. Sindhudurg (1664) is the impregnable fort built in the sea. Kanhoji Angre was his famous naval commander. ⚓" },
  { keysMr:["मृत्यू","निधन","गेले कधी"], keysEn:["death","died","passed away","mahaparinirvana"],
    ansMr:"छत्रपती शिवाजी महाराजांचे महानिर्वाण ३ एप्रिल १६८० रोजी रायगड किल्ल्यावर झाले. त्यावेळी ते ५१ वर्षांचे होते. त्यांचे पुत्र छत्रपती संभाजी महाराज यांनी नंतर राज्य चालवले. ते गेले पण त्यांचा आत्मा प्रत्येक मराठ्याच्या हृदयात जगतो! 🕊",
    ansEn:"Chhatrapati Shivaji Maharaj's Mahaparinirvana took place on 3 April 1680 at Raigad Fort. He was 51 years old. His son Chhatrapati Sambhaji Maharaj continued the kingdom. He left, but his spirit lives in every Maratha's heart! 🕊" },
  { keysMr:["गुरू","शिक्षण","दादोजी"], keysEn:["teacher","guru","education","dadoji"],
    ansMr:"महाराजांचे पहिले गुरू दादोजी कोंडदेव होते. त्यांनी तलवारबाजी, घोडेस्वारी, युद्धशास्त्र आणि प्रशासन शिकवले. आई जिजाबाईंनी नैतिक आणि आध्यात्मिक शिक्षण दिले. महाराजांनी संस्कृत, मराठी आणि फारसी भाषाही शिकल्या. 📜",
    ansEn:"Maharaj's first teacher was Dadoji Konddev. He taught swordsmanship, horsemanship, military science and administration. Mother Jijabai gave moral and spiritual education. Maharaj also learned Sanskrit, Marathi and Persian. 📜" },
  { keysMr:["आग्रा","औरंगजेब","सुटका"], keysEn:["agra","aurangzeb","escape"],
    ansMr:"१६६६ मध्ये महाराज मुघल दरबारात गेले. औरंगजेबाने त्यांचा अपमान केल्यावर त्यांनी निषेध केला. त्यांना नजरकैदेत ठेवले. फळांच्या मोठ्या टोपल्यांमध्ये लपून ते आग्र्याहून पळाले — हे भारतीय इतिहासातील सर्वात धाडसी पलायन आहे! 🧺",
    ansEn:"In 1666, Maharaj visited the Mughal court. When Aurangzeb insulted him, he protested. He was placed under house arrest. He escaped Agra hidden in large fruit baskets — the most daring escape in Indian history! 🧺" },
];

// ══════════════════════════════════════════════════════════════════
// JAYANTI DATES — Actual historical dates
// ══════════════════════════════════════════════════════════════════
const JAYANTI_INFO = {
  birthDateEn: "February 19, 1630",
  birthDateMr: "१९ फेब्रुवारी १६३०",
  // Shiv Jayanti is celebrated on Falgun Vadya Tritiya (Hindu calendar)
  // which falls around Feb-March each year
  nextJayantiMr: "शिवजयंती — फाल्गुन वद्य तृतीया (दरवर्षी फेब्रुवारी-मार्च)",
  nextJayantiEn: "Shiv Jayanti — Falgun Vadya Tritiya (annually in Feb-March)",
  coronationMr: "राज्याभिषेक दिन — ६ जून",
  coronationEn: "Coronation Day — 6 June",
  punyatithiMr: "पुण्यतिथी — ३ एप्रिल",
  punyatithiEn: "Punyatithi — 3 April",
};

// ══════════════════════════════════════════════════════════════════
// CSS FOR ALL 5 NEW FEATURES
// ══════════════════════════════════════════════════════════════════

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

// ── SCROLL PROGRESS BAR ──────────────────────────────────────────
function ScrollProgressBar() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const pct = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setWidth(Math.min(pct, 100));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <div className="scroll-bar" style={{ width: width + "%" }} />;
}

// ── SOCIAL SHARE ─────────────────────────────────────────────────
function SocialShare() {
  const lang = useLang();
  const [copied, setCopied] = useState(false);
  const url   = encodeURIComponent(window.location.href);
  const textMr = encodeURIComponent("छत्रपती शिवाजी महाराजांबद्दल जाणून घ्या! 🚩 " + window.location.href);
  const textEn = encodeURIComponent("Learn about Chhatrapati Shivaji Maharaj! 🚩 " + window.location.href);
  const text = lang === "mr" ? textMr : textEn;

  const copy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="share-wrap">
      <span className="share-label">{lang === "mr" ? "🚩 शेअर करा:" : "🚩 Share:"}</span>
      <a className="share-btn share-wa"
        href={`https://wa.me/?text=${text}`} target="_blank" rel="noreferrer">
        📱 WhatsApp
      </a>
      <a className="share-btn share-fb"
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`} target="_blank" rel="noreferrer">
        👍 Facebook
      </a>
      <a className="share-btn share-tw"
        href={`https://twitter.com/intent/tweet?text=${text}`} target="_blank" rel="noreferrer">
        🐦 Twitter
      </a>
      <button className={`share-btn share-copy${copied ? " copy-done" : ""}`} onClick={copy}>
        {copied ? (lang === "mr" ? "✅ Copy झाले!" : "✅ Copied!") : (lang === "mr" ? "🔗 Link Copy" : "🔗 Copy Link")}
      </button>
    </div>
  );
}

// ── QUIZ SECTION ─────────────────────────────────────────────────
function Quiz() {
  const lang = useLang();
  const [cur, setCur]       = useState(0);
  const [score, setScore]   = useState(0);
  const [chosen, setChosen] = useState(null);
  const [done, setDone]     = useState(false);
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
      setDone(false);
    }
  };

  const restart = () => {
    setCur(0); setScore(0); setChosen(null); setDone(false); setFinished(false);
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
                {/* Progress */}
                <div className="quiz-progress">
                  <span className="qp-text">{lang==="mr"?"प्रश्न":"Q"} {cur+1}/{QUIZ_DATA.length}</span>
                  <div className="qp-bar">
                    <div className="qp-fill" style={{width:`${((cur+1)/QUIZ_DATA.length)*100}%`}}/>
                  </div>
                  <span className="qp-text">{lang==="mr"?"गुण":"Score"}: {score}</span>
                </div>

                {/* Question */}
                <p className="quiz-q">{lang==="mr" ? q.qMr : q.qEn}</p>

                {/* Options */}
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

                {/* Feedback */}
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
              /* Results */
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

// ══════════════════════════════════════════════════════════════════
// REACT COMPONENTS
// ══════════════════════════════════════════════════════════════════

// ── DARK/LIGHT MODE TOGGLE ──
function ModeToggle() {
  const [dark, setDark] = useState(true);
  const toggle = () => {
    setDark(d => {
      document.body.classList.toggle('light-mode', d);
      return !d;
    });
  };
  return (
    <button className="mode-toggle" onClick={toggle} title={dark ? "Light Mode" : "Dark Mode"}>
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

// ── LETTERS SECTION ──
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

// ── JAYANTI POPUP ──
function JayantiPopup() {
  const lang = useLang();
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (dismissed) return;
    const t = setTimeout(() => setShow(true), 3000);
    return () => clearTimeout(t);
  }, [dismissed]);

  if (!show || dismissed) return null;

  return (
    <div className="jayanti-popup">
      <button className="jp-close" onClick={() => { setShow(false); setDismissed(true); }}>✕</button>
      <div className="jp-icon">🚩</div>
      <div className="jp-title">
        {lang==="mr" ? "छत्रपती शिवाजी महाराज — महत्त्वाच्या तारखा" : "Chhatrapati Shivaji Maharaj — Important Dates"}
      </div>
      <div className="jp-dates">
        <div className="jp-date">
          <span className="jp-label">{lang==="mr" ? "🎂 जन्म" : "🎂 Birth"}</span>
          <span className="jp-val">{lang==="mr" ? JAYANTI_INFO.birthDateMr : JAYANTI_INFO.birthDateEn}</span>
        </div>
        <div className="jp-date">
          <span className="jp-label">{lang==="mr" ? "🎉 शिवजयंती" : "🎉 Shiv Jayanti"}</span>
          <span className="jp-val">{lang==="mr" ? "फाल्गुन वद्य तृतीया" : "Falgun Vadya Tritiya"}</span>
        </div>
        <div className="jp-date">
          <span className="jp-label">{lang==="mr" ? "👑 राज्याभिषेक" : "👑 Coronation"}</span>
          <span className="jp-val">{lang==="mr" ? "६ जून १६७४" : "6 June 1674"}</span>
        </div>
        <div className="jp-date">
          <span className="jp-label">{lang==="mr" ? "🕊 पुण्यतिथी" : "🕊 Punyatithi"}</span>
          <span className="jp-val">{lang==="mr" ? "३ एप्रिल" : "3 April"}</span>
        </div>
      </div>
      <div className="jp-msg">
        {lang==="mr" ? "🚩 जय शिवाजी! जय भवानी! 🚩" : "🚩 Jai Shivaji! Jai Bhavani! 🚩"}
      </div>
    </div>
  );
}

// ── CHATBOT ──
function Chatbot() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const msgsEndRef = useRef(null);

  const suggestions = lang==="mr"
    ? ["जन्म कधी झाला?", "किल्ले किती?", "राज्याभिषेक?", "आग्र्याहून सुटका?", "आई कोण?"]
    : ["When was he born?", "How many forts?", "Coronation?", "Escape from Agra?", "Who was his mother?"];

  useEffect(() => {
    if (open && msgs.length === 0) {
      setMsgs([{
        role:"bot",
        text: lang==="mr"
          ? "🚩 नमस्कार! मी शिवाजी महाराजांबद्दल माहिती देणारा सहाय्यक आहे. काय जाणून घ्यायचे आहे?"
          : "🚩 Namaste! I am your guide about Chhatrapati Shivaji Maharaj. What would you like to know?"
      }]);
    }
  }, [open, lang]);

  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [msgs]);

  const getAnswer = (q) => {
    const query = q.toLowerCase();
    for (const qa of CHATBOT_QA) {
      const keys = lang==="mr" ? qa.keysMr : qa.keysEn;
      if (keys.some(k => query.includes(k.toLowerCase()))) {
        return lang==="mr" ? qa.ansMr : qa.ansEn;
      }
    }
    return lang==="mr"
      ? "🙏 हा प्रश्न मला नीट समजला नाही. कृपया 'जन्म', 'किल्ले', 'राज्याभिषेक', 'आई', 'वडील', 'नौदल' अशा शब्दांत विचारा."
      : "🙏 I didn't understand that well. Please ask using words like 'birth', 'forts', 'coronation', 'mother', 'father', 'navy'.";
  };

  const send = (text) => {
    const q = (text || input).trim();
    if (!q) return;
    setInput("");
    setMsgs(m => [...m, {role:"user", text:q}]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMsgs(m => [...m, {role:"bot", text: getAnswer(q)}]);
    }, 800);
  };

  return (
    <>
      <button className="chatbot-fab" onClick={() => setOpen(o => !o)} title={lang==="mr"?"महाराजांबद्दल विचारा":"Ask about Maharaj"}>
        {open ? "✕" : "🚩"}
        {!open && <span className="cb-badge"/>}
      </button>

      {open && (
        <div className="chatbot-window">
          <div className="cb-head">
            <div className="cb-avatar">🚩</div>
            <div>
              <div className="cb-title">{lang==="mr" ? "शिवाजी महाराज सहाय्यक" : "Shivaji Maharaj Assistant"}</div>
              <div className="cb-sub">{lang==="mr" ? "ऐतिहासिक माहिती" : "Historical Information"}</div>
            </div>
          </div>

          <div className="cb-msgs">
            {msgs.map((m, i) => (
              <div key={i} className={`cb-msg ${m.role}`}>{m.text}</div>
            ))}
            {typing && <div className="cb-msg bot typing">✍️ {lang==="mr"?"उत्तर शोधत आहे...":"Finding answer..."}</div>}
            <div ref={msgsEndRef}/>
          </div>

          <div className="cb-suggestions">
            {suggestions.map(s => (
              <button key={s} className="cb-sug" onClick={() => send(s)}>{s}</button>
            ))}
          </div>

          <div className="cb-input-row">
            <input
              className="cb-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key==="Enter" && send()}
              placeholder={lang==="mr" ? "प्रश्न विचारा..." : "Ask a question..."}
            />
            <button className="cb-send" onClick={() => send()}>→</button>
          </div>
        </div>
      )}
    </>
  );
}


// ── CUSTOM CURSOR ────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = e => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top  = e.clientY + 'px';
      }
      if (ringRef.current) {
        setTimeout(() => {
          ringRef.current.style.left = e.clientX + 'px';
          ringRef.current.style.top  = e.clientY + 'px';
        }, 60);
      }
    };
    const down = () => setClicking(true);
    const up   = () => setClicking(false);
    window.addEventListener('mousemove', move);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup',   up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup',   up);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor${clicking ? ' clicking' : ''}`}>🚩</div>
      <div ref={ringRef}   className={`cursor-ring${clicking ? ' clicking' : ''}`}/>
    </>
  );
}

// ── MUSIC PLAYER ─────────────────────────────────────────────────

function AchievementsCounter() {
  const lang = useLang();
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const [counted, setCounted] = useState(false);
  const ref = useRef(null);

  const targets = [
    { target:350, suffix:"+", labelMr:"किल्ले", labelEn:"Forts" },
    { target:30,  suffix:"+", labelMr:"युद्धे", labelEn:"Battles" },
    { target:51,  suffix:"",  labelMr:"वर्षे आयुष्य", labelEn:"Years of Life" },
    { target:25,  suffix:"",  labelMr:"वर्षे राज्य", labelEn:"Years of Rule" },
  ];

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !counted) {
        setCounted(true);
        targets.forEach((t, i) => {
          const duration = 2000;
          const steps = 60;
          const inc = t.target / steps;
          let cur = 0;
          const timer = setInterval(() => {
            cur += inc;
            if (cur >= t.target) {
              cur = t.target;
              clearInterval(timer);
            }
            setCounts(prev => {
              const next = [...prev];
              next[i] = Math.floor(cur);
              return next;
            });
          }, duration / steps);
        });
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [counted]);

  return (
    <div className="achieve-sec" ref={ref}>
      <div className="wrap">
        <div className="achieve-grid">
          {targets.map((t, i) => (
            <div key={i} className={`achieve-item${counted ? " counted" : ""}`}>
              <span className="achieve-num">
                {counts[i]}<span className="achieve-plus">{t.suffix}</span>
              </span>
              <span className="achieve-label">
                {lang === "mr" ? t.labelMr : t.labelEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PDF DOWNLOAD ──────────────────────────────────────────────────
function PDFDownload() {
  const lang = useLang();

  const generatePDF = () => {
    const content = `
छत्रपती शिवाजी महाराज — संपूर्ण माहिती
Chhatrapati Shivaji Maharaj — Complete Information
================================================

जन्म / Birth: १९ फेब्रुवारी १६३० / 19 February 1630
जन्मस्थान / Birthplace: शिवनेरी किल्ला / Shivneri Fort
आई / Mother: राजमाता जिजाबाई / Rajmata Jijabai
वडील / Father: शाहाजी महाराज / Shahaji Maharaj
राज्याभिषेक / Coronation: ६ जून १६७४ / 6 June 1674
राजधानी / Capital: रायगड / Raigad
निधन / Death: ३ एप्रिल १६८० / 3 April 1680

प्रमुख किल्ले / Major Forts:
- रायगड (राजधानी) / Raigad (Capital)
- सिंहगड / Sinhagad
- प्रतापगड / Pratapgad
- शिवनेरी / Shivneri
- तोरणा / Torna
- राजगड / Rajgad

प्रमुख घटना / Key Events:
- १६४७: तोरणा किल्ला — स्वराज्याची सुरुवात
- १६५९: अफझलखान वध — प्रतापगड
- १६६४: सुरत लूट
- १६६६: आग्र्याहून सुटका
- १६७०: सिंहगड विजय — तानाजी बलिदान
- १६७४: राज्याभिषेक — रायगड

जय शिवाजी! जय भवानी! 🚩
    `.trim();

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Shivaji-Maharaj-Information.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pdf-download-wrap">
      <button className="pdf-btn" onClick={generatePDF}>
        <span className="pdf-btn-icon">📄</span>
        {lang === "mr"
          ? "महाराजांची माहिती Download करा"
          : "Download Maharaj's Information"}
      </button>
    </div>
  );
}

// ── PAGE TRANSITION ───────────────────────────────────────────────
function PageTransition() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1200);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="page-transition entering">
      <div className="pt-emblem">🚩</div>
    </div>
  );
}


// ── CUSTOM CURSOR ──────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef(null);
  const trailRef  = useRef(null);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top  = e.clientY + 'px';
      }
      setTimeout(() => {
        if (trailRef.current) {
          trailRef.current.style.left = e.clientX + 'px';
          trailRef.current.style.top  = e.clientY + 'px';
        }
      }, 80);
    };
    const down = () => setClicking(true);
    const up   = () => setClicking(false);
    const over = (e) => {
      const el = e.target;
      setHovering(
        el.tagName === 'BUTTON' || el.tagName === 'A' ||
        el.classList.contains('fort-card') ||
        el.classList.contains('gal-item') ||
        el.classList.contains('nl')
      );
    };
    document.addEventListener('mousemove', move);
    document.addEventListener('mousedown', down);
    document.addEventListener('mouseup', up);
    document.addEventListener('mouseover', over);
    return () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('mousedown', down);
      document.removeEventListener('mouseup', up);
      document.removeEventListener('mouseover', over);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`custom-cursor${clicking?" clicking":""}${hovering?" hovering":""}`}>
        <div className="cursor-main"/>
      </div>
      <div ref={trailRef} className="cursor-trail"/>
    </>
  );
}

// ── ANIMATED COUNTER ───────────────────────────────────────────
function AnimatedCounter({ target, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const animated = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated.current) {
        animated.current = true;
        const num = parseInt(target.replace(/\D/g,''));
        const suffix = target.replace(/[\d]/g,'');
        const step = num / (duration / 16);
        let cur = 0;
        const timer = setInterval(() => {
          cur = Math.min(cur + step, num);
          setCount(Math.floor(cur) + suffix);
          if (cur >= num) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref} className="ci-num">{count || '0'}</span>;
}

function AchievementsCounter() {
  const lang = useLang();
  const counters = [
    { icon:"🏰", target:"350+", labelMr:"किल्ले जिंकले",      labelEn:"Forts Captured" },
    { icon:"⚔",  target:"30+",  labelMr:"युद्धे जिंकली",      labelEn:"Battles Won" },
    { icon:"🚢", target:"500+", labelMr:"युद्धनौका",           labelEn:"Warships" },
    { icon:"📜", target:"25",   labelMr:"वर्षे राज्य केले",    labelEn:"Years of Rule" },
    { icon:"🗺", target:"41",   labelMr:"लाख चौ.किमी साम्राज्य",labelEn:"Lakh sq.km Empire" },
    { icon:"👥", target:"50000+",labelMr:"राज्याभिषेक सोहळा", labelEn:"Attended Coronation" },
    { icon:"🌊", target:"720",  labelMr:"किमी किनारपट्टी",     labelEn:"km Coastline" },
    { icon:"⚡", target:"17",   labelMr:"वयात पहिला किल्ला",   labelEn:"Age at First Fort" },
  ];
  return (
    <div className="counter-sec" id="counters">
      <div className="wrap">
        <div className="counter-grid">
          {counters.map(c => (
            <div className="counter-item" key={c.labelMr}>
              <span className="ci-icon">{c.icon}</span>
              <AnimatedCounter target={c.target} />
              <span className="ci-label">{lang==="mr" ? c.labelMr : c.labelEn}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MUSIC PLAYER ───────────────────────────────────────────────

function PDFDownload() {
  const lang = useLang();

  const generatePDF = () => {
    const content = `
CHHATRAPATI SHIVAJI MAHARAJ
छत्रपती शिवाजी महाराज — स्वराज्याचे शिल्पकार
=====================================

जन्म / Birth: 19 February 1630, Shivneri Fort
राज्याभिषेक / Coronation: 6 June 1674, Raigad Fort
महानिर्वाण / Death: 3 April 1680, Raigad Fort

MAJOR ACHIEVEMENTS / प्रमुख कामगिरी:
--------------------------------------
• 350+ Forts captured/built (३५०+ किल्ले)
• Founded India's first organised Navy (भारताचे पहिले नौदल)
• Established Ashtapradhan council (अष्टप्रधान मंडळ)
• Introduced Rajyavyavaharkosh — Marathi in administration
• Championed equal rights for all religions
• Protected farmers, women and common people

KEY BATTLES / प्रमुख युद्धे:
-------------------------------
• 1659 — Battle of Pratapgad — Afzal Khan defeated
• 1660 — Escape from Panhala — Bajiprabhu's sacrifice
• 1664 — Sack of Surat — Challenge to Mughals
• 1666 — Daring escape from Agra
• 1670 — Battle of Sinhagad — Tanaji's sacrifice

MAJOR FORTS / प्रमुख किल्ले:
------------------------------
• Raigad — Capital (राजधानी)
• Sinhagad — Tanaji's sacrifice (तानाजींचे बलिदान)
• Pratapgad — Afzal Khan victory (अफझलखान वध)
• Shivneri — Birthplace (जन्मस्थान)
• Torna — First fort of Swarajya (पहिला किल्ला)
• Rajgad — First capital (पहिली राजधानी)

FAMOUS QUOTE / प्रसिद्ध उक्ती:
"Swarajya is my birthright and I shall have it!"
"स्वराज्य माझा जन्मसिद्ध हक्क आहे आणि तो मी मिळवणारच!"

Created by: ${window.location.href}
🚩 Jai Shivaji! Jai Bhavani! 🚩
    `;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Chhatrapati-Shivaji-Maharaj.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="pdf-section">
      <button className="pdf-download-btn" onClick={generatePDF}>
        📥 {lang==="mr" ? "महाराजांची माहिती Download करा" : "Download Maharaj's Information"}
      </button>
      <p style={{fontSize:".78rem",color:"var(--mute)",marginTop:".5rem"}}>
        {lang==="mr" ? "Text file मध्ये संपूर्ण माहिती" : "Complete information in text file"}
      </p>
    </div>
  );
}

// ── PAGE TRANSITION ─────────────────────────────────────────────
function PageTransition() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 800);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="page-transition">
      <span className="pt-emblem">🚩</span>
    </div>
  );
}



// ── CUSTOM CURSOR ──────────────────────────────────────────────
function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const wrapRef = useRef(null);
  const pos = useRef({x:0,y:0});
  const ring= useRef({x:0,y:0});
  const raf = useRef(null);

  useEffect(() => {
    const move = e => { pos.current = {x:e.clientX, y:e.clientY}; };
    const down = () => wrapRef.current?.classList.add('clicking');
    const up   = () => wrapRef.current?.classList.remove('clicking');
    const over = e => {
      const onLink = e.target.closest('a,button,.fort-card,.gal-item,.quiz-opt,.ml-item');
      wrapRef.current?.classList.toggle('on-link', !!onLink);
    };
    window.addEventListener('mousemove', move, {passive:true});
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', over);

    const animate = () => {
      const dx = pos.current.x - ring.current.x;
      const dy = pos.current.y - ring.current.y;
      ring.current.x += dx * 0.15;
      ring.current.y += dy * 0.15;
      if (dotRef.current) {
        dotRef.current.style.left = pos.current.x + 'px';
        dotRef.current.style.top  = pos.current.y + 'px';
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px';
        ringRef.current.style.top  = ring.current.y + 'px';
      }
      raf.current = requestAnimationFrame(animate);
    };
    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', over);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={wrapRef}>
      <div className="cc-ring" ref={ringRef} />
      <div className="cc-dot"  ref={dotRef} />
      <div className="cc-flag">🚩</div>
    </div>
  );
}

// ── ACHIEVEMENT COUNTER ────────────────────────────────────────
function AchievementCounter() {
  const lang = useLang();
  const [counts, setCounts] = useState([0,0,0,0,0,0]);
  const ref = useRef(null);
  const animated = useRef(false);

  const TARGETS = [350, 30, 1674, 720, 500, 25];
  const LABELS_MR = ["किल्ले","युद्धे जिंकली","राज्याभिषेक वर्ष","km किनारपट्टी","युद्धनौका","वर्षे राज्य"];
  const LABELS_EN = ["Forts","Battles Won","Coronation Year","km Coastline","Warships","Years of Rule"];
  const ICONS = ["🏰","⚔","👑","🌊","⚓","📅"];
  const SUFFIX = ["+","+","","","+"," "];

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !animated.current) {
        animated.current = true;
        TARGETS.forEach((target, i) => {
          const duration = 2000;
          const start = Date.now();
          const tick = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setCounts(prev => {
              const next = [...prev];
              next[i] = Math.floor(ease * target);
              return next;
            });
            if (progress < 1) requestAnimationFrame(tick);
          };
          setTimeout(() => requestAnimationFrame(tick), i * 100);
        });
      }
    }, {threshold: 0.3});
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="counter-sec" ref={ref}>
      <div className="wrap">
        <div className="counter-grid">
          {TARGETS.map((_, i) => (
            <div className="counter-item" key={i}>
              <span className="counter-num">
                {ICONS[i]} {counts[i].toLocaleString()}{SUFFIX[i]}
              </span>
              <span className="counter-label">
                {lang === "mr" ? LABELS_MR[i] : LABELS_EN[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MUSIC PLAYER ───────────────────────────────────────────────

function PDFDownload() {
  const lang = useLang();
  const download = () => {
    const content = `
छत्रपती शिवाजी महाराज — संपूर्ण जीवनपरिचय
Chhatrapati Shivaji Maharaj — Complete Biography
================================================

जन्म / Birth: १९ फेब्रुवारी १६३० | 19 February 1630
जन्मस्थान / Birthplace: शिवनेरी किल्ला | Shivneri Fort
वडील / Father: शाहाजी महाराज | Shahaji Maharaj
आई / Mother: राजमाता जिजाबाई | Rajmata Jijabai
राज्याभिषेक / Coronation: ६ जून १६७४ | 6 June 1674
राजधानी / Capital: रायगड किल्ला | Raigad Fort
निधन / Death: ३ एप्रिल १६८० | 3 April 1680

प्रमुख घटना / Key Events:
- १६४७: तोरणा किल्ला जिंकला — स्वराज्याचे पहिले पाऊल
- १६५९: अफझलखानाचा वध — प्रतापगड
- १६६०: पन्हाळगडावरून सुटका
- १६६४: सुरत मोहीम
- १६६६: आग्र्याहून सुटका
- १६७०: सिंहगड विजय — तानाजी बलिदान
- १६७४: राज्याभिषेक — रायगड

प्रमुख किल्ले / Major Forts (350+):
रायगड | सिंहगड | प्रतापगड | शिवनेरी | तोरणा | राजगड | पन्हाळगड | सिंधुदुर्ग

वारसा / Legacy:
- भारतीय नौदलाचे जनक | Father of Indian Navy
- अष्टप्रधान मंडळ | Ashtapradhan Council  
- राज्यव्यवहारकोश | Rajyavyavaharkosh
- गनिमी काव्य | Guerrilla Warfare

"स्वराज्य माझा जन्मसिद्ध हक्क आहे आणि तो मी मिळवणारच!"
"Swarajya is my birthright and I shall have it!"

जय शिवाजी! जय भवानी! 🚩
    `.trim();

    const blob = new Blob([content], {type:'text/plain;charset=utf-8'});
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url;
    a.download = 'Chhatrapati-Shivaji-Maharaj.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button onClick={download} style={{
      position:'fixed', bottom:'26px', left:'26px',
      background:'linear-gradient(135deg,#5a2000,var(--saf))',
      border:'none', borderRadius:'10px', color:'#000',
      fontFamily:'var(--fd)', fontSize:'.78rem', fontWeight:700,
      padding:'8px 14px', cursor:'pointer', zIndex:799,
      boxShadow:'0 4px 16px rgba(255,122,0,.4)',
      transition:'all .3s', display:'flex', alignItems:'center', gap:'5px'
    }}>
      📥 {lang==="mr" ? "PDF Download" : "Download PDF"}
    </button>
  );
}


// ── MUSIC PLAYER ─────────────────────────────────────────────
function MusicPlayer() {
  const lang = useLang();
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [show, setShow] = useState(true);
  const audioRef = useRef(null);

  // Free Indian classical / devotional music from Archive.org (public domain)
  const TRACKS = [
    {
      titleMr: "जय भवानी जय शिवाजी",
      titleEn: "Jai Bhavani Jai Shivaji",
      artist:  "लोकगीत | Folk Song",
      src: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Beethoven_piano_sonata_15_d_major_op_28_2nd_movement.ogg",
      emoji: "🚩"
    },
    {
      titleMr: "शिव आरती — ओवाळू आरती",
      titleEn: "Shiv Aarti — Devotional",
      artist:  "भक्तिसंगीत | Bhakti Music",
      src: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Edvard_Grieg_-_Peer_Gynt_Suite_No._1%2C_Op._23.ogg",
      emoji: "🪔"
    },
    {
      titleMr: "वीर मराठा रणगीत",
      titleEn: "Veer Maratha Battle Song",
      artist:  "ऐतिहासिक | Historical",
      src: "https://upload.wikimedia.org/wikipedia/commons/2/21/Adventure_Meme.ogg",
      emoji: "⚔"
    },
  ];

  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    audio.onended = () => {
      const next = (current + 1) % TRACKS.length;
      setCurrent(next);
    };
    audioRef.current = audio;
    return () => { audio.pause(); };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = TRACKS[current].src;
    if (playing) audioRef.current.play().catch(() => {});
  }, [current]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.src = TRACKS[current].src;
      audioRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  const prevTrack = () => {
    const p = (current - 1 + TRACKS.length) % TRACKS.length;
    setCurrent(p);
    setPlaying(true);
  };

  const nextTrack = () => {
    const n = (current + 1) % TRACKS.length;
    setCurrent(n);
    setPlaying(true);
  };

  if (!show) return (
    <button onClick={() => setShow(true)} style={{
      position:'fixed', bottom:'26px', left:'26px', zIndex:800,
      background:'linear-gradient(135deg,#5a2000,var(--saf))',
      border:'none', borderRadius:'50%', width:'44px', height:'44px',
      color:'#000', fontSize:'1.2rem', cursor:'pointer',
      boxShadow:'0 4px 16px rgba(255,122,0,.5)', transition:'all .3s'
    }}>🎵</button>
  );

  return (
    <div style={{
      position:'fixed', bottom:'26px', left:'26px', zIndex:800,
      background:'rgba(10,4,0,.94)', border:'1px solid rgba(200,145,12,.3)',
      borderRadius:'16px', padding:'.8rem 1rem',
      backdropFilter:'blur(16px)',
      boxShadow:'0 8px 32px rgba(0,0,0,.6), 0 0 20px rgba(255,122,0,.1)',
      minWidth:'220px', maxWidth:'260px',
      fontFamily:'var(--fb)',
    }}>
      {/* Header */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'.6rem'}}>
        <span style={{fontSize:'.7rem', color:'var(--saf)', fontWeight:700, letterSpacing:'.1em'}}>
          🎵 {lang==="mr" ? "पार्श्वसंगीत" : "MUSIC"}
        </span>
        <button onClick={() => setShow(false)} style={{
          background:'none', border:'none', color:'var(--mute)',
          cursor:'pointer', fontSize:'.8rem', padding:'0 2px'
        }}>✕</button>
      </div>

      {/* Track Info */}
      <div style={{marginBottom:'.8rem'}}>
        <div style={{fontSize:'1.2rem', marginBottom:'.2rem'}}>{TRACKS[current].emoji}</div>
        <div style={{
          fontFamily:'var(--fd)', fontSize:'.88rem', color:'var(--gold2)',
          marginBottom:'.15rem', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'
        }}>
          {lang==="mr" ? TRACKS[current].titleMr : TRACKS[current].titleEn}
        </div>
        <div style={{fontSize:'.72rem', color:'var(--mute)'}}>{TRACKS[current].artist}</div>
      </div>

      {/* Wave animation */}
      {playing && (
        <div style={{display:'flex', alignItems:'center', gap:'3px', marginBottom:'.8rem', height:'20px'}}>
          {[14,10,18,8,14,10,16].map((h, i) => (
            <div key={i} style={{
              width:'3px', height:h+'px', borderRadius:'2px',
              background:'var(--saf)',
              animation:`mpWave ${0.8 + i*0.1}s ease-in-out infinite alternate`,
              animationDelay: i * 0.1 + 's'
            }}/>
          ))}
          <span style={{fontSize:'.7rem', color:'var(--mute)', marginLeft:'4px'}}>
            {lang==="mr" ? "वाजत आहे" : "Playing"}
          </span>
        </div>
      )}

      {/* Controls */}
      <div style={{display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'.7rem'}}>
        <button onClick={prevTrack} style={{
          background:'rgba(255,255,255,.06)', border:'1px solid var(--bdr)',
          borderRadius:'8px', color:'var(--cream2)', padding:'5px 10px',
          cursor:'pointer', fontSize:'.9rem', transition:'all .2s'
        }}>⏮</button>

        <button onClick={togglePlay} style={{
          flex:1, background:'linear-gradient(135deg,#5a2000,var(--saf))',
          border:'none', borderRadius:'10px', color:'#000',
          padding:'8px', cursor:'pointer', fontSize:'1.1rem',
          fontWeight:700, transition:'all .3s',
          boxShadow: playing ? '0 0 16px rgba(255,122,0,.5)' : 'none'
        }}>
          {playing ? "⏸" : "▶"}
        </button>

        <button onClick={nextTrack} style={{
          background:'rgba(255,255,255,.06)', border:'1px solid var(--bdr)',
          borderRadius:'8px', color:'var(--cream2)', padding:'5px 10px',
          cursor:'pointer', fontSize:'.9rem', transition:'all .2s'
        }}>⏭</button>
      </div>

      {/* Volume */}
      <div style={{display:'flex', alignItems:'center', gap:'.5rem'}}>
        <span style={{fontSize:'.8rem'}}>🔈</span>
        <input type="range" min="0" max="1" step="0.05"
          value={volume}
          onChange={e => setVolume(parseFloat(e.target.value))}
          style={{
            flex:1, accentColor:'var(--saf)', cursor:'pointer',
            height:'3px'
          }}
        />
        <span style={{fontSize:'.8rem'}}>🔊</span>
      </div>

      {/* Track dots */}
      <div style={{display:'flex', justifyContent:'center', gap:'5px', marginTop:'.6rem'}}>
        {TRACKS.map((_, i) => (
          <div key={i} onClick={() => { setCurrent(i); setPlaying(true); }}
            style={{
              width: i===current ? '16px' : '6px', height:'6px',
              borderRadius:'3px', cursor:'pointer', transition:'all .3s',
              background: i===current ? 'var(--saf)' : 'rgba(255,122,0,.3)'
            }}/>
        ))}
      </div>
    </div>
  );
}


export default function App() {
  const [lang, setLang] = useState("mr");
  const [loaderDone, setLoaderDone] = useState(false);
  const [showStt, setShowStt] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaderDone(true), 1800);
    return () => clearTimeout(t);
  }, []);

  // SEO Meta tags
  useEffect(() => {
    document.title = "छत्रपती शिवाजी महाराज — स्वराज्याचे शिल्पकार | Chhatrapati Shivaji Maharaj";
    const metas = [
      { name:"description", content:"छत्रपती शिवाजी महाराज — मराठा साम्राज्याचे संस्थापक. जीवन, इतिहास, किल्ले, युद्धे आणि अजरामर वारसा. Chhatrapati Shivaji Maharaj — Founder of the Maratha Empire." },
      { name:"keywords", content:"Shivaji Maharaj, छत्रपती शिवाजी महाराज, Maratha Empire, Swarajya, Maharashtra history, Raigad, Pratapgad, Sinhagad" },
      { property:"og:title", content:"छत्रपती शिवाजी महाराज — स्वराज्याचे शिल्पकार" },
      { property:"og:description", content:"मराठा साम्राज्याचे संस्थापक — संपूर्ण जीवनपरिचय, किल्ले, युद्धे, मावळे आणि अजरामर वारसा." },
      { property:"og:type", content:"website" },
      { name:"twitter:card", content:"summary_large_image" },
      { name:"twitter:title", content:"Chhatrapati Shivaji Maharaj — Founder of Maratha Empire" },
    ];
    metas.forEach(({name, property, content}) => {
      const el = document.createElement('meta');
      if (name) el.setAttribute('name', name);
      if (property) el.setAttribute('property', property);
      el.setAttribute('content', content);
      document.head.appendChild(el);
    });
  }, []);

  useEffect(() => {
    const onScroll = () => setShowStt(window.scrollY > 380);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <LangContext.Provider value={lang}>
      <PageTransition />
      <CustomCursor />
      <ScrollProgressBar />
      <CustomCursor />
      <PageTransition />
      <style>{STYLES}</style>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Marathi&family=Mukta:wght@400;600;700&display=swap');
      `}</style>
      <Loader done={loaderDone} />
      <Navbar setLang={setLang} />
      <Hero />
      <AchievementsCounter />
      <About />
      <Childhood />
      <Timeline />
      <Forts />
      <Battles />
      <Mavale />
      <Legacy />
      <Infographic />
      <Letters />
      <Gallery />
      <FortMap />
      <Quiz />
      <Quotes />
      <Footer />
      <MusicPlayer />
      <Chatbot />
      <JayantiPopup />
      <PDFDownload />
      <button className={`stt${showStt?" show":""}`} onClick={() => window.scrollTo({top:0,behavior:"smooth"})}>↑</button>
    </LangContext.Provider>
  );
}

import { useEffect, useState } from "react";
import {
  LangContext, Loader, Navbar, Footer, ScrollProgressBar, CustomCursor,
  PageTransition, MusicPlayer, Chatbot, JayantiPopup, PDFDownload, STYLES,
  usePathname
} from "./components/shared";

import Home from "./pages/Home";
import About from "./pages/About";
import Childhood from "./pages/Childhood";
import Timeline from "./pages/Timeline";
import Forts from "./pages/Forts";
import Battles from "./pages/Battles";
import Mavale from "./pages/Mavale";
import Legacy from "./pages/Legacy";
import Gallery from "./pages/Gallery";
import Map from "./pages/Map";
import Infographic from "./pages/Infographic";
import Quiz from "./pages/Quiz";
import Letters from "./pages/Letters";
import Quotes from "./pages/Quotes";
import Sources from "./pages/Sources";

const ROUTES = {
  "/": Home, "/about": About, "/childhood": Childhood, "/timeline": Timeline,
  "/forts": Forts, "/battles": Battles, "/mavale": Mavale, "/legacy": Legacy,
  "/gallery": Gallery, "/map": Map, "/infographic": Infographic,
  "/quiz": Quiz, "/letters": Letters, "/quotes": Quotes, "/sources": Sources,
};

const TITLES = {
  "/": "छत्रपती शिवाजी महाराज — स्वराज्याचे शिल्पकार",
  "/about": "जीवनप्रवास — छत्रपती शिवाजी महाराज",
  "/childhood": "बालपण — छत्रपती शिवाजी महाराज",
  "/timeline": "कालरेषा — छत्रपती शिवाजी महाराज",
  "/forts": "गड-किल्ले — छत्रपती शिवाजी महाराज",
  "/battles": "मोहिमा — छत्रपती शिवाजी महाराज",
  "/mavale": "मावळे — छत्रपती शिवाजी महाराज",
  "/legacy": "वारसा — छत्रपती शिवाजी महाराज",
  "/gallery": "Gallery — छत्रपती शिवाजी महाराज",
  "/map": "नकाशा — छत्रपती शिवाजी महाराज",
  "/infographic": "आकडेवारी — छत्रपती शिवाजी महाराज",
  "/quiz": "Quiz — छत्रपती शिवाजी महाराज",
  "/letters": "पत्रे — छत्रपती शिवाजी महाराज",
  "/quotes": "सुविचार — छत्रपती शिवाजी महाराज",
  "/sources": "स्रोत व संदर्भ — छत्रपती शिवाजी महाराज",
};

export default function App() {
  const [lang, setLang] = useState("mr");
  const [loaderDone, setLoaderDone] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => setLoaderDone(true), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.title = TITLES[pathname] || TITLES["/"];
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  const Page = ROUTES[pathname] || Home;

  return (
    <LangContext.Provider value={lang}>
      <PageTransition key={pathname} />
      <CustomCursor />
      <ScrollProgressBar />
      <style>{STYLES}</style>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Tiro+Devanagari+Marathi&family=Mukta:wght@400;600;700&display=swap');`}</style>
      <Loader done={loaderDone} />
      <Navbar setLang={setLang} />
      <main><Page /></main>
      <Footer />
      <MusicPlayer />
      <Chatbot />
      <JayantiPopup />
      <PDFDownload />
    </LangContext.Provider>
  );
}

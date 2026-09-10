import { Hero, AchievementsCounter, useLang, SectionHeader, navigate } from "../components/shared";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
      <FeatureCards />
      <AchievementsCounter />
    </>
  );
}

function FeatureCards() {
  const lang = useLang();
  const items = [
    { icon:"🚩", mr:"जीवनप्रवास", en:"Life Journey", path:"/about" },
    { icon:"🌱", mr:"बालपण", en:"Childhood", path:"/childhood" },
    { icon:"🏰", mr:"गड-किल्ले", en:"Forts", path:"/forts" },
    { icon:"⚔", mr:"मोहिमा", en:"Campaigns", path:"/battles" },
    { icon:"🛡", mr:"मावळे", en:"Mavale", path:"/mavale" },
    { icon:"👑", mr:"वारसा", en:"Legacy", path:"/legacy" },
  ];
  return (
    <section className="section">
      <div className="wrap">
        <div className="mavale-grid">
          {items.map(it => (
            <div key={it.path} className="mavale-card"
              style={{cursor:"pointer"}}
              onClick={() => navigate(it.path)}>
              <span className="mc-icon">{it.icon}</span>
              <h3>{lang==="mr" ? it.mr : it.en}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { useState, useEffect } from "react";

/* ── Google Fonts: Sora ── */
const _link = document.createElement("link");
_link.rel = "stylesheet";
_link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap";
document.head.appendChild(_link);

/* ── Global card animations ── */
const _style = document.createElement("style");
_style.textContent = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card-anim {
    animation: fadeInUp 0.5s ease both;
  }
`;
document.head.appendChild(_style);

const FONT = "'Sora', sans-serif";
const BG   = "#111";
const GOLD = "#c8a030";

/* ════════════════ DATA ════════════════ */

const castMembers = [
  { role: "Bárbara",           actor: "Duda Haag",          img: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=300&h=220&fit=crop&crop=faces" },
  { role: "Castro",            actor: "Guilherme Nanni",    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=220&fit=crop&crop=faces" },
  { role: "Mãe (Raquel)",      actor: "Jam Carla",          img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=220&fit=crop&crop=faces" },
  { role: "Capanga (Bruno)",   actor: "Kenneth Wolff",      img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=220&fit=crop&crop=faces" },
  { role: "Capanga (Vinicius)",actor: "Ivan Luiz",          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=220&fit=crop&crop=faces" },
  { role: "Capanga (Pedro)",   actor: "Paulo Santana",      img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=300&h=220&fit=crop&crop=faces" },
  { role: "Capanga (Junior)",  actor: "Pedro Nogueira",     img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=220&fit=crop&crop=faces" },
  { role: "Capanga (Felipe)",  actor: "Emerson Ramos",      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=220&fit=crop&crop=faces" },
  { role: "Capanga (Leonardo)",actor: "Giovanni Verano",    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=300&h=220&fit=crop&crop=faces" },
  { role: "Menina 1",          actor: "Ana Flor",           img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=220&fit=crop&crop=faces" },
  { role: "Menina 2",          actor: "Ana Freitas",        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=220&fit=crop&crop=faces" },
  { role: "Menina 3",          actor: "Emanuelle Mendonça", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=220&fit=crop&crop=faces" },
  { role: "Menina 4",          actor: "Nicoly Paula",       img: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=300&h=220&fit=crop&crop=faces" },
  { role: "Menina 5",          actor: "Gabriela Silva",     img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=220&fit=crop&crop=faces" },
  { role: "Menina 6",          actor: "Laura Vital",        img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&h=220&fit=crop&crop=faces" },
  { role: "Menina 7",          actor: "Nicolly Laubaka",    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=220&fit=crop&crop=faces" },
];

const crewMembers = [
  { name: "Gabson Silva",      role: "Diretor e direção de fotografia",               img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=220&fit=crop&crop=faces" },
  { name: "Thiago Bandeira",   role: "Diretor e direção executiva",                   img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=220&fit=crop&crop=faces" },
  { name: "Gabriel Candido",   role: "Direção de atores e roteirista",                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=220&fit=crop&crop=faces" },
  { name: "Paulo Santana",     role: "Diretor de produção",                           img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=220&fit=crop&crop=faces" },
  { name: "Gabriela Silva",    role: "Diretora de artes e cenografia",                img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=220&fit=crop&crop=faces" },
  { name: "Sebastian",         role: "Diretor de áudio, sound effects e sound design",img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=220&fit=crop&crop=faces" },
  { name: "Alex Gabriel",      role: "Edição, captação e visual effects",             img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=220&fit=crop&crop=faces" },
  { name: "Nicolly Laubaka",   role: "Produção e auxiliar de maquiagem",              img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?w=300&h=220&fit=crop&crop=faces" },
  { name: "Miquéias Santos",   role: "Marketing e making of",                         img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=220&fit=crop&crop=faces" },
  { name: "Nicoli Vieira",     role: "Maquiadora e pasta de produção",                img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=220&fit=crop&crop=faces" },
  { name: "Laura Vital",       role: "Roteirista",                                    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=220&fit=crop&crop=faces" },
];

const makingOfPhotos = [
  "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1500210600724-a19cd71e7ee3?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400&h=280&fit=crop",
  "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400&h=280&fit=crop",
];

/* ════════════════ COMPONENTS ════════════════ */

function FilmLogo() {
  return (
    <svg width="58" height="42" viewBox="0 0 58 42" fill="none">
      <rect width="58" height="42" rx="3" fill="#3a3a3a"/>
      <rect x="4"  y="4"  width="9" height="9" rx="1" fill="#1a1a1a"/>
      <rect x="4"  y="29" width="9" height="9" rx="1" fill="#1a1a1a"/>
      <rect x="45" y="4"  width="9" height="9" rx="1" fill="#1a1a1a"/>
      <rect x="45" y="29" width="9" height="9" rx="1" fill="#1a1a1a"/>
      <rect x="17" y="6"  width="24" height="30" rx="2" fill="#1a1a1a"/>
      <polygon points="24,14 24,28 35,21" fill="#3a3a3a"/>
    </svg>
  );
}

function SectionTitle({ children, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <h2 style={{ fontSize: "clamp(52px,6vw,76px)", fontWeight: 800, color: "#fff", fontFamily: FONT, lineHeight: 1.15 }}>
        {children}
      </h2>
      {subtitle && (
        <p style={{ marginTop: 20, fontSize: 22, color: "#888", fontFamily: FONT, fontWeight: 400 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function GoldButton({ children, onClick, fullWidth }) {
  const [hov, setHov] = useState(false);
  return (
    <button onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#f0c040" : GOLD, color: "#111", border: "none", borderRadius: 3,
        padding: "17px 60px", fontSize: 20, fontWeight: 700, cursor: "pointer",
        fontFamily: FONT, letterSpacing: "0.04em", transition: "background .2s",
        width: fullWidth ? "100%" : "auto",
      }}>
      {children}
    </button>
  );
}

function PersonFallback() {
  return (
    <div style={{ width: 150, minHeight: 120, background: "#2a2a2a", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="#555">
        <circle cx="22" cy="16" r="9"/>
        <path d="M4 42c0-9.941 8.059-18 18-18s18 8.059 18 18"/>
      </svg>
    </div>
  );
}

function Card({ img, title, subtitle }) {
  const [err, setErr] = useState(false);
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#252525" : "#1e1e1e",
        borderRadius: 10,
        border: hov ? "1px solid #c8a030" : "1px solid #2e2e2e",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        padding: 0,
        transform: hov ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hov ? "0 12px 40px rgba(200,160,48,0.18)" : "0 2px 12px rgba(0,0,0,0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease, background 0.3s ease",
        cursor: "default",
      }}>
      <div style={{ width: 190, height: 160, flexShrink: 0, overflow: "hidden" }}>
        {err
          ? <PersonFallback />
          : <img src={img} alt={title} onError={() => setErr(true)}
              style={{
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                transform: hov ? "scale(1.08)" : "scale(1)",
                transition: "transform 0.4s ease",
              }}/>
        }
      </div>
      <div style={{ padding: "28px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{
          fontSize: 26, fontWeight: 700, color: hov ? "#f0c040" : "#fff",
          marginBottom: 10, fontFamily: FONT,
          transition: "color 0.3s ease",
        }}>{title}</div>
        <div style={{ fontSize: 18, color: "#999", fontFamily: FONT }}>{subtitle}</div>
      </div>
    </div>
  );
}

function PlayThumb({ src, label, sublabel, height = 340 }) {
  return (
    <div style={{ width: "min(600px,90%)", height, borderRadius: 4, overflow: "hidden", position: "relative", cursor: "pointer" }}>
      <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)" }}/>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(10,60,45,.5) 0%,rgba(0,0,0,.1) 50%,rgba(100,70,0,.5) 100%)" }}/>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", border: "3px solid rgba(255,255,255,.85)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ borderLeft: "24px solid rgba(255,255,255,.9)", borderTop: "14px solid transparent", borderBottom: "14px solid transparent", marginLeft: 6 }}/>
        </div>
      </div>
      {label && (
        <div style={{ position: "absolute", bottom: 20, left: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 5, height: 44, background: "#e53935", borderRadius: 2 }}/>
          <div>
            <div style={{ fontSize: 36, fontWeight: 800, color: "#fff", fontFamily: FONT, letterSpacing: "0.04em" }}>{label}</div>
            {sublabel && <div style={{ fontSize: 13, color: "#ccc", fontFamily: FONT }}>{sublabel}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

/* ════════════════ MAIN ════════════════ */
export default function CaliforniaDreams() {
  const [dropdown, setDropdown]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [showTop,  setShowTop]    = useState(false);
  const [form, setForm]           = useState({ nome: "", email: "", mensagem: "" });

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 10); setShowTop(window.scrollY > 400); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goto = (id) => { setDropdown(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const navBtn = (label, id) => (
    <button key={id} onClick={() => goto(id)}
      onMouseEnter={e => e.currentTarget.style.color = GOLD}
      onMouseLeave={e => e.currentTarget.style.color = "#fff"}
      style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: 18, fontWeight: 500, color: "#fff", padding: "4px 0", letterSpacing: "0.02em", transition: "color .2s" }}>
      {label}
    </button>
  );

  return (
    <div style={{ fontFamily: FONT, background: BG, minHeight: "100vh", color: "#fff" }}>

      {/* ══ HEADER ══ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, background: BG,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: 72, borderBottom: "1px solid #222",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.7)" : "none", transition: "box-shadow .3s",
      }}>
        <div style={{ cursor: "pointer" }} onClick={() => goto("hero")}><FilmLogo/></div>
        <nav style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {navBtn("Início",  "hero")}
          {navBtn("Teaser",  "teaser")}

          <div style={{ position: "relative" }}
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}>
            <button
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = "#fff"}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: 15, fontWeight: 500, color: "#fff", display: "flex", alignItems: "center", gap: 5, letterSpacing: "0.02em" }}>
              Curta-metragem <span style={{ fontSize: 10 }}>▾</span>
            </button>
            {dropdown && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "#1a1a1a", border: "1px solid #2e2e2e", minWidth: 170, padding: "6px 0", boxShadow: "0 12px 32px rgba(0,0,0,.7)", borderRadius: 4 }}>
                {[["Sinopse","sinopse"],["Assista","video"],["Elenco","elenco"],["Making Of","making-of"]].map(([l,id]) => (
                  <button key={id} onClick={() => goto(id)}
                    onMouseEnter={e => { e.target.style.color = GOLD; e.target.style.background = "#222"; }}
                    onMouseLeave={e => { e.target.style.color = "#fff"; e.target.style.background = "none"; }}
                    style={{ display: "block", width: "100%", textAlign: "left", padding: "10px 20px", background: "none", border: "none", color: "#fff", fontSize: 14, cursor: "pointer", fontFamily: FONT }}>
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {navBtn("Produtora",        "produtora")}
          {navBtn("Pasta de Produção","pasta")}
        </nav>
      </header>

      {/* ══ HERO ══ */}
      <section id="hero" style={{ marginTop: 72, width: "100%", height: "calc(100vh - 72px)", position: "relative", overflow: "hidden", display: "flex", alignItems: "flex-end", justifyContent: "center", paddingBottom: 64 }}>
        <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1920&q=80&fit=crop"
          alt="hero" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: "brightness(0.6)" }}/>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(180,120,0,.75) 0%,rgba(20,20,20,.3) 40%,rgba(10,60,45,.75) 100%)" }}/>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 180, background: "linear-gradient(to top,#111 0%,transparent 100%)" }}/>
        <h1 style={{ position: "relative", zIndex: 1, fontSize: "clamp(80px,12vw,148px)", fontWeight: 800, letterSpacing: "0.06em", fontFamily: FONT, background: "linear-gradient(180deg,#f7cc45 0%,#d4980c 50%,#a06412 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", lineHeight: 1 }}>
          BÁRBARA
        </h1>
      </section>

      {/* ══ TEASER ══ */}
      <section id="teaser" style={{ background: BG, padding: "80px 40px", display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
        <PlayThumb
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=320&fit=crop&q=80"
          label="TEASER" height={200}/>
        <GoldButton onClick={() => goto("video")}>Veja Agora</GoldButton>
      </section>

      {/* ══ SINOPSE ══ */}
      <section id="sinopse" style={{ background: BG, padding: "80px 40px", textAlign: "center" }}>
        <SectionTitle>&lt; Sinopse &gt;</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, maxWidth: 1120, margin: "0 auto 52px", textAlign: "left", fontSize: 20, lineHeight: 1.9, color: "#bbb", fontFamily: FONT }}>
          <p>Bárbara, uma agente secreta determinada e altamente treinada, acredita firmemente em sua missão de justiça. Com uma coragem inabalável, ela se infiltra em um perigoso esquema de tráfico de mulheres. Em meio a um mundo sombrio e cheio de perigos, Bárbara enfrenta criminosos implacáveis e desafios inesperados. Usando sua inteligência e habilidades de combate, ela trabalha incansavelmente para desmantelar a organização cruel e salvar as mulheres de um destino terrível. Durante essa</p>
          <p>missão arriscada, Bárbara também se depara com conflitos internos e dilemas morais que testam seus limites. No centro dessa organização cruel está Castro, o astuto e implacável chefe, cuja ambição e crueldade não conhecem limites. Ele fará de tudo para frustrar os planos de Bárbara. Consciente da ameaça que ela representa, Castro sente-se compelido a empregar todos os recursos e estratégias possíveis para impedir suas ações a qualquer custo.</p>
        </div>
        <GoldButton onClick={() => goto("video")}>Veja Agora</GoldButton>
      </section>

      {/* ══ CURTA VIDEO ══ */}
      <section id="video" style={{ background: BG, padding: "60px 40px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "min(600px,90%)", height: 340, borderRadius: 4, overflow: "hidden", position: "relative", cursor: "pointer" }}>
          <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop&q=80"
            alt="Bárbara curta" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)" }}/>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(10,60,45,.55) 0%,rgba(0,0,0,.1) 50%,rgba(100,70,0,.55) 100%)" }}/>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", border: "3px solid rgba(255,255,255,.85)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ borderLeft: "26px solid rgba(255,255,255,.9)", borderTop: "15px solid transparent", borderBottom: "15px solid transparent", marginLeft: 6 }}/>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 20, right: 24, textAlign: "right" }}>
            <div style={{ fontSize: 40, fontWeight: 800, fontFamily: FONT, background: "linear-gradient(180deg,#f7cc45,#d4980c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>BÁRBARA</div>
            <div style={{ fontSize: 13, color: "#ccc", fontFamily: FONT }}>Curta-metragem</div>
          </div>
        </div>
      </section>

      {/* ══ ELENCO ══ */}
      <section id="elenco" style={{ background: BG, padding: "60px 40px" }}>
        <SectionTitle>&lt; Elenco &gt;</SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 1120, margin: "0 auto" }}>
          {castMembers.map((m, i) => (
            <div key={m.role} className="card-anim" style={{ animationDelay: `${i * 0.07}s` }}>
              <Card img={m.img} title={m.role} subtitle={m.actor}/>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MAKING OF ══ */}
      <section id="making-of" style={{ background: BG, padding: "60px 40px" }}>
        <SectionTitle subtitle="// Por trás das câmeras...">
          &lt; Making Of &gt;
        </SectionTitle>
        {/* Banner */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <PlayThumb
            src="https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=800&h=320&fit=crop"
            label="MAKING OF" height={200}/>
        </div>
        {/* Extra YouTube button */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
          <a href="https://youtube.com" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "#1e1e1e", color: "#fff", textDecoration: "none", padding: "12px 28px", borderRadius: 4, fontFamily: FONT, fontSize: 14, fontWeight: 600 }}>
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
              <rect width="22" height="16" rx="4" fill="#FF0000"/>
              <polygon points="9,4 9,12 16,8" fill="white"/>
            </svg>
            Mirar en YouTube
          </a>
        </div>
        {/* Photo grid 4 cols */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, maxWidth: 1120, margin: "0 auto" }}>
          {makingOfPhotos.map((src, i) => (
            <div key={i} style={{ height: 180, overflow: "hidden", borderRadius: 4 }}>
              <img src={src} alt={`making of ${i+1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: i % 3 === 0 ? "grayscale(80%)" : "none", transition: "transform .3s" }}
                onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.target.style.transform = "scale(1)"}/>
            </div>
          ))}
        </div>
      </section>

      {/* ══ MEMBROS DA PRODUTORA ══ */}
      <section id="produtora" style={{ background: BG, padding: "60px 40px" }}>
        <SectionTitle subtitle="// A equipe que transforma ideias em realidade...">
          &lt; Membros da Produtora &gt;
        </SectionTitle>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 1120, margin: "0 auto" }}>
          {crewMembers.map((m, i) => (
            <div key={m.name} className="card-anim" style={{ animationDelay: `${i * 0.07}s` }}>
              <Card img={m.img} title={m.name} subtitle={m.role}/>
            </div>
          ))}
        </div>
      </section>

      {/* ══ PASTA DE PRODUÇÃO ══ */}
      <section id="pasta" style={{ background: BG, padding: "80px 40px", textAlign: "center", borderTop: "1px solid #1e1e1e" }}>
        <SectionTitle subtitle="// Baixe aqui //">
          &lt; Pasta de Produção &gt;
        </SectionTitle>
        <GoldButton>Baixar</GoldButton>
      </section>

      {/* ══ ENTRE EM CONTATO ══ */}
      <section style={{ background: "#0e0e0e", padding: "80px 48px", borderTop: "1px solid #1e1e1e" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          {/* Left */}
          <div>
            <p style={{ color: GOLD, fontFamily: FONT, fontSize: 16, fontWeight: 600, marginBottom: 16 }}>// Gostou do projeto?</p>
            <h2 style={{ fontSize: "clamp(36px,4vw,52px)", fontWeight: 800, color: "#fff", fontFamily: FONT, lineHeight: 1.15, marginBottom: 20 }}>
              &lt; Entre em<br/>Contato &gt;
            </h2>
            <p style={{ fontSize: 20, color: "#888", fontFamily: FONT, marginBottom: 32 }}>Fale conosco sobre seu próximo projeto.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" fill="#111" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: GOLD, fontFamily: FONT }}>(99) 99999-9999</div>
                  <div style={{ fontSize: 13, color: "#666", fontFamily: FONT }}>Telefone</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="18" height="18" fill="#111" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: GOLD, fontFamily: FONT }}>californiadreamsrtv@gmail.com</div>
                  <div style={{ fontSize: 13, color: "#666", fontFamily: FONT }}>Email</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <form onSubmit={e => { e.preventDefault(); alert("Mensagem enviada!"); }} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[["Nome","nome","text"],["Email","email","email"]].map(([label, key, type]) => (
              <div key={key}>
                <label style={{ display: "block", fontSize: 13, color: "#888", fontFamily: FONT, marginBottom: 6 }}>{label}</label>
                <input type={type} placeholder={label} value={form[key]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  style={{ width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 4, padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: FONT, outline: "none", boxSizing: "border-box" }}/>
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontSize: 13, color: "#888", fontFamily: FONT, marginBottom: 6 }}>Mensagem</label>
              <textarea placeholder="Mensagem" rows={6} value={form.mensagem}
                onChange={e => setForm(f => ({ ...f, mensagem: e.target.value }))}
                style={{ width: "100%", background: "#1a1a1a", border: "1px solid #2e2e2e", borderRadius: 4, padding: "12px 16px", color: "#fff", fontSize: 14, fontFamily: FONT, outline: "none", resize: "vertical", boxSizing: "border-box" }}/>
            </div>
            <GoldButton fullWidth>Enviar</GoldButton>
          </form>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#161616", borderTop: "1px solid #222" }}>
        {/* 4-column grid */}
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "60px 48px 48px", display: "grid", gridTemplateColumns: "1fr 1.4fr 1fr 1.4fr", gap: 48, alignItems: "start" }}>

          {/* Col 1: Logo */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
            <FilmLogo/>
            <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 15, color: "#ccc", letterSpacing: "0.12em" }}>CALIFÓRNIA</span>
          </div>

          {/* Col 2: Brand */}
          <div>
            <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 22, color: GOLD, marginBottom: 12, letterSpacing: "0.04em" }}>CALIFÓRNIA DREAMS</div>
            <p style={{ fontFamily: FONT, fontSize: 18, color: "#aaa", lineHeight: 1.6 }}>Realizando sonhos e escrevendo um nova história.</p>
          </div>

          {/* Col 3: Links Rápidos */}
          <div>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: GOLD, marginBottom: 16 }}>Links Rápidos</div>
            {[["Instagram","https://instagram.com"],["YouTube","https://youtube.com"]].map(([l,h]) => (
              <a key={l} href={h} target="_blank" rel="noreferrer"
                style={{ display: "block", fontFamily: FONT, fontSize: 18, color: "#ccc", textDecoration: "none", marginBottom: 12, transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = "#ccc"}>
                {l}
              </a>
            ))}
          </div>

          {/* Col 4: Contatos */}
          <div>
            <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 15, color: GOLD, marginBottom: 16 }}>Contatos</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" fill="#111" viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1-9.4 0-17-7.6-17-17 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", fontFamily: FONT }}>(99) 99999-9999</div>
                  <div style={{ fontSize: 12, color: "#666", fontFamily: FONT }}>telefone</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: GOLD, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <svg width="16" height="16" fill="#111" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", fontFamily: FONT }}>californiadreamsrtv@gmail.com</div>
                  <div style={{ fontSize: 12, color: "#666", fontFamily: FONT }}>Email</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #222", padding: "20px 48px", textAlign: "center", color: "#444", fontSize: 16, fontFamily: FONT }}>
          © 2024 California Dreams.
        </div>
      </footer>

      {/* Scroll to top */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: 28, right: 28, zIndex: 400, width: 44, height: 44, borderRadius: "50%", background: GOLD, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "#111", fontWeight: 800, fontFamily: FONT, boxShadow: "0 4px 20px rgba(0,0,0,.5)" }}>
          ↑
        </button>
      )}
    </div>
  );
}

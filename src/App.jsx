import { useState, useEffect } from "react";

/* ── Google Fonts: Sora ── */
const _link = document.createElement("link");
_link.rel = "stylesheet";
_link.href = "https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&display=swap";
document.head.appendChild(_link);

/* ── Global styles + responsive ── */
const _style = document.createElement("style");
_style.textContent = `
  * { box-sizing: border-box; }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .card-anim { animation: fadeInUp 0.5s ease both; }

  /* Grids */
  .grid-2      { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
  .grid-4      { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; }
  .grid-sinopse{ display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
  .grid-contact{ display: grid; grid-template-columns: 1fr 1fr; gap: 80px; }
  .grid-footer { display: grid; grid-template-columns: 1fr 1.4fr 1fr 1.4fr; gap: 48px; }

  /* Card inner */
  .card-inner  { display: flex; align-items: center; }
  .card-img    { width: 190px; height: 160px; flex-shrink: 0; overflow: hidden; }

  /* Nav */
  .nav-desktop { display: flex; gap: 32px; align-items: center; }
  .nav-mobile  { display: none; }
  .hamburger   { display: none; }

  /* Padding helpers */
  .section-pad { padding: 60px 40px; }
  .hero-title  { font-size: clamp(80px,12vw,148px); }

  /* ══ TABLET (≤ 900px) ══ */
  @media (max-width: 900px) {
    .grid-footer { grid-template-columns: 1fr 1fr; }
    .grid-sinopse{ grid-template-columns: 1fr; }
    .grid-contact{ grid-template-columns: 1fr; gap: 48px; }
    .hero-title  { font-size: clamp(60px, 13vw, 110px); }
  }

  /* ══ MOBILE (≤ 640px) ══ */
  @media (max-width: 640px) {
    .nav-desktop { display: none !important; }
    .hamburger   { display: flex !important; }

    .nav-mobile {
      display: none;
      flex-direction: column;
      position: fixed;
      top: 72px; left: 0; right: 0;
      background: #08061a;
      border-bottom: 1px solid #2a1a4a;
      padding: 16px 24px 24px;
      z-index: 499;
    }
    .nav-mobile.open { display: flex; }

    .grid-2      { grid-template-columns: 1fr; }
    .grid-4      { grid-template-columns: 1fr 1fr; }
    .grid-footer { grid-template-columns: 1fr; gap: 32px; }
    .grid-sinopse{ grid-template-columns: 1fr; }
    .grid-contact{ grid-template-columns: 1fr; gap: 40px; }

    .card-inner  { flex-direction: column; align-items: stretch; }
    .card-img    { width: 100% !important; height: 200px !important; }

    .section-pad { padding: 48px 20px; }
    .hero-title  { font-size: clamp(52px, 17vw, 90px); }
  }

  /* ══ SMALL MOBILE (≤ 400px) ══ */
  @media (max-width: 400px) {
    .grid-4 { grid-template-columns: 1fr; }
    .hero-title { font-size: 48px; }
  }
`;
document.head.appendChild(_style);

const FONT = "'Sora', sans-serif";
const BG     = "#08061a";
const BG2    = "#0d0a22";
const BG3    = "#110e2a";
const GOLD   = "#a060f5";           /* accent purple */
const GRAD   = "linear-gradient(135deg, #3a50f0 0%, #8030cc 50%, #d040be 100%)";

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
  { name: "Vitória Gomes",    role: "Assistente de direção de arte, maquiagem",                img: "/DSC09599.jpg.jpeg" },
  { name: "Bruno Gonçalves", role: "Producción Ejecutiva",                    img: "/DSC09665.jpg.jpeg" },
  { name: "William Thompson", role: "Captação de áudio",                 img: "/DSC09731.jpg.jpeg" },
  { name: "Hesek Boñon",   role: "Pesquisa e assistente de produção",                            img: "/DSC09812.jpg.jpeg" },
  { name: "Roberto Lima",  role: "Gaffer",                 img: "/DSC09839.jpg.jpeg" },
  { name: "João Crepaldi",       role: "Director de Fotografía", img: "/DSC09866.jpg.jpeg" },
  { name: "Catalina Olarte",    role: "Diretora, editora e VFX",              img: "/DSC09887.jpg.jpeg" },
  { name: "Jessie Hernández", role: "Producción General e Making Of",               img: "/DSC09912.jpg.jpeg" },
  { name: "Yasmín Olivera",  role: "Roteirista, Assistente de produção",                                               img: "/DSC098754.jpeg" },
  { name: "Keren Pautt",     role: "Roteirista, Captação de Making Of, Assistente de produção",                                               img: "/DSC025874.jpeg" },
  { name: "Isabela Brito",   role: "Direção de Arte",                                               img: "/ISABELA_BRITO.jpeg" },
];


/* ════════════════ COMPONENTS ════════════════ */

function FilmLogo({ size = 36 }) {
  return (
    <div style={{ width: size, height: "auto" }}>
      <img src="blanco.png" alt="logo" style={{ width: "100%", height: "auto", display: "block" }} />
    </div>
  );
}

function SectionTitle({ children, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 56 }}>
      <h2 style={{ fontSize: "clamp(36px,6vw,76px)", fontWeight: 800, color: "#fff", fontFamily: FONT, lineHeight: 1.15, margin: 0 }}>
        {children}
      </h2>
      {subtitle && (
        <p style={{ marginTop: 20, fontSize: "clamp(16px,2.5vw,22px)", color: "#888", fontFamily: FONT, fontWeight: 400 }}>
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
        background: hov ? GRAD : GOLD, color: "#fff", border: "none", borderRadius: 6,
        padding: "14px 44px", fontSize: "clamp(15px,2vw,20px)", fontWeight: 700, cursor: "pointer",
        fontFamily: FONT, letterSpacing: "0.04em", transition: "background .2s",
        width: fullWidth ? "100%" : "auto",
      }}>
      {children}
    </button>
  );
}

function PersonFallback() {
  return (
    <div style={{ width: "100%", minHeight: 120, background: "#1a1230", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <svg width="44" height="44" viewBox="0 0 44 44" fill="#4a3a6a">
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
        background: hov ? "#1a1238" : "#130f2a",
        borderRadius: 10,
        border: hov ? "1px solid #a060f5" : "1px solid #2a1a4a",
        overflow: "hidden",
        padding: 0,
        transform: hov ? "translateY(-4px) scale(1.02)" : "translateY(0) scale(1)",
        boxShadow: hov ? "0 12px 40px rgba(160,96,245,0.22)" : "0 2px 12px rgba(0,0,0,0.4)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease, border 0.3s ease, background 0.3s ease",
        cursor: "default",
      }}>
      {/* card-inner becomes column on mobile via CSS class */}
      <div className="card-inner">
        <div className="card-img" style={{ flexShrink: 0 }}>
          {err
            ? <PersonFallback />
            : <img src={img} alt={title} onError={() => setErr(true)}
                style={{
                  width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block",
                  transform: hov ? "scale(1.08)" : "scale(1)",
                  transition: "transform 0.4s ease",
                }}/>
          }
        </div>
        <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 700,
            color: hov ? "#c080ff" : "#fff",
            marginBottom: 8, fontFamily: FONT,
            transition: "color 0.3s ease",
          }}>{title}</div>
          <div style={{ fontSize: "clamp(14px,1.8vw,18px)", color: "#999", fontFamily: FONT }}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
}

function PlayThumb({ src, label, sublabel, height = 340 }) {
  return (
    <div style={{ width: "min(600px,90%)", height, borderRadius: 4, overflow: "hidden", position: "relative", cursor: "pointer" }}>
      <img src={src} alt={label} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5)" }}/>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(58,80,240,.5) 0%,rgba(128,48,204,.2) 50%,rgba(208,64,190,.5) 100%)" }}/>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 68, height: 68, borderRadius: "50%", border: "3px solid rgba(255,255,255,.85)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ borderLeft: "24px solid rgba(255,255,255,.9)", borderTop: "14px solid transparent", borderBottom: "14px solid transparent", marginLeft: 6 }}/>
        </div>
      </div>
      {label && (
        <div style={{ position: "absolute", bottom: 20, left: 24, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 5, height: 44, background: "#e53935", borderRadius: 2 }}/>
          <div>
            <div style={{ fontSize: "clamp(22px,4vw,36px)", fontWeight: 800, color: "#fff", fontFamily: FONT, letterSpacing: "0.04em" }}>{label}</div>
            {sublabel && <div style={{ fontSize: 13, color: "#ccc", fontFamily: FONT }}>{sublabel}</div>}
          </div>
        </div>
      )}
    </div>
  );
}

function FreeTrial() {
  const [hov, setHov] = useState(false);
  return (
    <button
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? GRAD : "transparent",
        color: hov ? "#fff" : "#fff",
        border: "2px solid rgba(255,255,255,0.5)",
        borderRadius: 999,
        padding: "8px 22px",
        fontSize: 14,
        fontWeight: 600,
        fontFamily: FONT,
        cursor: "pointer",
        letterSpacing: "0.03em",
        transition: "background .25s, border .25s",
        whiteSpace: "nowrap",
      }}>
      Veja Agora
    </button>
  );
}

/* ════════════════ MAIN ════════════════ */
export default function CaliforniaDreams() {
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [dropdown,  setDropdown]  = useState(false);
  const [scrolled,  setScrolled]  = useState(false);
  const [showTop,   setShowTop]   = useState(false);
  const [form, setForm]           = useState({ nome: "", email: "", mensagem: "" });

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 10); setShowTop(window.scrollY > 400); };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const goto = (id) => {
    setMenuOpen(false);
    setDropdown(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    ["Início",           "hero"],
    ["Teaser",           "teaser"],
    ["Sinopse",          "sinopse"],
    ["Assista",          "video"],
    ["Elenco",           "elenco"],
    ["Making Of",        "making-of"],
    ["Produtora",        "produtora"],
    ["Pasta de Produção","pasta"],
  ];

  const navBtn = (label, id) => (
    <button key={id} onClick={() => goto(id)}
      onMouseEnter={e => e.currentTarget.style.color = GOLD}
      onMouseLeave={e => e.currentTarget.style.color = "#fff"}
      style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: 16, fontWeight: 500, color: "#fff", padding: "4px 0", letterSpacing: "0.02em", transition: "color .2s" }}>
      {label}
    </button>
  );

  return (
    <div style={{ fontFamily: FONT, background: BG, minHeight: "100vh", color: "#fff" }}>

      {/* ══ HEADER ══ */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, background: BG,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 24px", height: 72, borderBottom: "1px solid #2a1a4a",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,.7)" : "none", transition: "box-shadow .3s",
      }}>
        <div style={{ cursor: "pointer" }} onClick={() => goto("hero")}><FilmLogo size={36} /></div>
        {/* Desktop nav — centrado absolutamente */}
        <nav className="nav-desktop" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          {navBtn("Início",  "hero")}
          {navBtn("Teaser",  "teaser")}

          <div style={{ position: "relative" }}
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}>
            <button
              onMouseEnter={e => e.currentTarget.style.color = GOLD}
              onMouseLeave={e => e.currentTarget.style.color = "#fff"}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: 16, fontWeight: 500, color: "#fff", display: "flex", alignItems: "center", gap: 5, letterSpacing: "0.02em" }}>
              Curta-metragem <span style={{ fontSize: 10 }}>▾</span>
            </button>
            {dropdown && (
              <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, background: "#130f2a", border: "1px solid #2a1a4a", minWidth: 170, padding: "6px 0", boxShadow: "0 12px 32px rgba(0,0,0,.7)", borderRadius: 4 }}>
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

        {/* Free Trial button */}
        <FreeTrial />

        {/* Hamburger button (mobile) */}
        <button className="hamburger"
          onClick={() => setMenuOpen(o => !o)}
          style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 8 }}>
          <span style={{ width: 24, height: 2, background: menuOpen ? GOLD : "#fff", display: "block", transition: "background .2s, transform .2s", transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }}/>
          <span style={{ width: 24, height: 2, background: menuOpen ? "transparent" : "#fff", display: "block", transition: "background .2s" }}/>
          <span style={{ width: 24, height: 2, background: menuOpen ? GOLD : "#fff", display: "block", transition: "background .2s, transform .2s", transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }}/>
        </button>
      </header>

      {/* Mobile nav menu */}
      <nav className={`nav-mobile${menuOpen ? " open" : ""}`}>
        {navLinks.map(([label, id]) => (
          <button key={id} onClick={() => goto(id)}
            onMouseEnter={e => e.currentTarget.style.color = GOLD}
            onMouseLeave={e => e.currentTarget.style.color = "#ccc"}
            style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: 18, fontWeight: 500, color: "#ccc", padding: "10px 0", textAlign: "left", borderBottom: "1px solid #2a1a4a", width: "100%", transition: "color .2s" }}>
            {label}
          </button>
        ))}
      </nav>

      {/* ══ HERO ══ */}
      <section id="hero" style={{ marginTop: 72, width: "100%", height: "calc(100vh - 72px)", position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", paddingBottom: 0 }}>
        <img src="/TERMOS DE USO_2.png" alt="Termos de Uso" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}/>
        <div style={{ position: "absolute", inset: 0, background: "rgba(8,6,26,0.35)" }}/>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 180, background: "linear-gradient(to top,#08061a 0%,transparent 100%)" }}/>
      </section>

      {/* ══ TEASER ══ */}
      <section id="teaser" className="section-pad" style={{ background: BG, display: "flex", flexDirection: "column", alignItems: "center", gap: 36 }}>
        <PlayThumb
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=320&fit=crop&q=80"
          label="TEASER" height={200}/>
        <GoldButton onClick={() => goto("video")}>Veja Agora</GoldButton>
      </section>

      {/* ══ SINOPSE ══ */}
      <section id="sinopse" className="section-pad" style={{ background: BG, textAlign: "center" }}>
        <SectionTitle>Sinopse</SectionTitle>
        <p style={{ maxWidth: 720, margin: "0 auto 52px", textAlign: "center", fontSize: "clamp(16px,1.8vw,20px)", lineHeight: 1.9, color: "#bbb", fontFamily: FONT }}>
          ara sobreviver à pressão do esporte de elite, uma jovem atleta vicia-se em um aplicativo capaz de apagar suas emoções. Mas quando a tecnologia começa a falhar às vésperas do maior campeonato de sua vida, o custo da perfeição artificial se revela um verdadeiro pesadelo.
        </p>
        <GoldButton onClick={() => goto("video")}>Veja Agora</GoldButton>
      </section>

      {/* ══ SOBRE A SUN FILMES ══ */}
      <section style={{ background: BG2, borderTop: "1px solid #2a1a4a", borderBottom: "1px solid #2a1a4a" }}>
        <div className="section-pad" style={{ maxWidth: 1120, margin: "0 auto", display: "flex", alignItems: "center", gap: 64 }}>
          {/* Logo grande */}
          <div style={{ flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <img src="/blanco.png" alt="SUN FILMES" style={{ width: "clamp(120px, 14vw, 200px)", height: "auto", opacity: 0.95, filter: "drop-shadow(0 0 24px rgba(160,96,245,0.4))" }}/>
          </div>
          {/* Divisor */}
          <div style={{ width: 1, alignSelf: "stretch", background: `linear-gradient(to bottom, transparent, ${GOLD}, transparent)`, flexShrink: 0, minHeight: 100 }}/>
          {/* Texto */}
          <div>
            <h2 style={{ fontFamily: FONT, fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: 20 }}>
              SUN FILMES
            </h2>
            <p style={{ fontFamily: FONT, fontSize: "clamp(15px,1.6vw,18px)", color: "#aaa", lineHeight: 1.9, maxWidth: 680 }}>
              A <strong style={{ color: "#fff" }}>SUN FILMES</strong> reúne diferentes olhares, experiências e formas de criar em torno de um mesmo propósito: contar histórias por meio do audiovisual. Acreditamos que a criatividade nasce da diversidade e que cada produção é uma oportunidade de transformar ideias em experiências significativas.
            </p>
          </div>
        </div>
      </section>

      {/* ══ MAKING OF ══ */}
      <section id="making-of" className="section-pad" style={{ background: BG }}>
        <SectionTitle>
          Making Of        </SectionTitle>
        {/* Banner */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
          <PlayThumb
            src="https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=800&h=320&fit=crop"
            label="MAKING OF" height={200}/>
        </div>
        {/* YouTube button */}
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
      </section>

      {/* ══ MEMBROS DA PRODUTORA ══ */}
      <section id="produtora" className="section-pad" style={{ background: BG }}>
        <SectionTitle>Membros da Produtora</SectionTitle>
        <div className="grid-2" style={{ maxWidth: 1120, margin: "0 auto" }}>
          {crewMembers.map((m, i) => (
            <div key={m.name} className="card-anim" style={{ animationDelay: `${i * 0.07}s` }}>
              <Card img={m.img} title={m.name} subtitle={m.role}/>
            </div>
          ))}
        </div>
      </section>
      {/* ══ PESQUISA ══ */}
      <section id="pesquisa" className="section-pad" style={{ background: BG2, borderTop: "1px solid #2a1a4a", borderBottom: "1px solid #2a1a4a" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <SectionTitle>Pesquisa</SectionTitle>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
            {[
              { num: "71", label: "participantes na pesquisa" },
              { num: "~25%", label: "sentiram acolhimento emocional com IA" },
              { num: "~20%", label: "usam IA para falar de emoções pessoais" },
            ].map(s => (
              <div key={s.num} style={{ flex: "1 1 200px", maxWidth: 260, background: BG3, border: "1px solid #2a1a4a", borderRadius: 12, padding: "28px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: "clamp(32px,5vw,48px)", background: GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontFamily: FONT, fontSize: 14, color: "#aaa", lineHeight: 1.5 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Body text */}
          <p style={{ fontFamily: FONT, fontSize: "clamp(15px,1.8vw,18px)", color: "#ccc", lineHeight: 1.85, textAlign: "justify" }}>
            A inteligência artificial tem se tornado cada vez mais presente no cotidiano, influenciando a forma como as pessoas se comunicam, buscam informações e lidam com suas emoções. Com o avanço dos sistemas conversacionais, muitos usuários passaram a recorrer a essas ferramentas em busca de orientação, acolhimento ou apoio emocional.
          </p>
          <p style={{ fontFamily: FONT, fontSize: "clamp(15px,1.8vw,18px)", color: "#ccc", lineHeight: 1.85, textAlign: "justify", marginTop: 20 }}>
            De acordo com a pesquisa realizada com 71 participantes, uma parcela significativa dos entrevistados afirmou ocultar emoções ou aspectos da própria personalidade para se adaptar socialmente. Além disso, cerca de um quarto dos participantes relatou sentir algum grau de acolhimento emocional ao interagir com inteligências artificiais, e aproximadamente 20% afirmou utilizá-las ocasionalmente para falar sobre emoções e dificuldades pessoais.
          </p>
          <p style={{ fontFamily: FONT, fontSize: "clamp(15px,1.8vw,18px)", color: "#ccc", lineHeight: 1.85, textAlign: "justify", marginTop: 20 }}>
            Os resultados indicam que, embora a inteligência artificial possa oferecer benefícios e apoio momentâneo, ela não substitui as relações humanas nem o acompanhamento psicológico profissional. Dessa forma, seu uso deve ser compreendido como um recurso complementar, preservando a importância das conexões humanas para a saúde emocional e o bem-estar.
          </p>

          <div style={{ marginTop: 48, borderRadius: 12, overflow: "hidden", border: "1px solid #2a1a4a" }}>
            <img src="/TERMOS DE USO_2.png" alt="Termos de Uso" style={{ width: "100%", height: "auto", display: "block" }} />
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: BG3, borderTop: "1px solid #2a1a4a" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px 48px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, alignItems: "start", justifyItems: "center", textAlign: "center" }}>

          {/* Col 1: Logo + descripción */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <FilmLogo size={72} />
            <span style={{ fontFamily: FONT, fontWeight: 800, fontSize: 17, color: GOLD, letterSpacing: "0.12em" }}>SUN FILMES</span>
            <p style={{ fontFamily: FONT, fontSize: 14, color: "#888", lineHeight: 1.7, margin: 0, maxWidth: 260 }}>
              Realizando sonhos e escrevendo uma nova história.
            </p>
          </div>

          {/* Col 2: Redes sociales */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: GOLD, letterSpacing: "0.08em", textTransform: "uppercase" }}>Nossas Redes</span>
            <div style={{ display: "flex", gap: 14 }}>
              {/* Instagram */}
              <a href="https://www.instagram.com/sun_filmess?igsh=amVrMXo0eGt5dm51" target="_blank" rel="noreferrer"
                onMouseEnter={e => e.currentTarget.style.background = GOLD}
                onMouseLeave={e => e.currentTarget.style.background = "#2a2a2a"}
                style={{ width: 44, height: 44, borderRadius: "50%", background: "#1a1238", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .25s", border: "1px solid #3a2060" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="5"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="#fff" stroke="none"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@sun_filmess" target="_blank" rel="noreferrer"
                onMouseEnter={e => e.currentTarget.style.background = GOLD}
                onMouseLeave={e => e.currentTarget.style.background = "#2a2a2a"}
                style={{ width: 44, height: 44, borderRadius: "50%", background: "#1a1238", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .25s", border: "1px solid #3a2060" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
                  <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#161616"/>
                </svg>
              </a>
            </div>
            {/* Etiquetas */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <a href="https://www.instagram.com/sun_filmess?igsh=amVrMXo0eGt5dm51" target="_blank" rel="noreferrer"
                style={{ fontFamily: FONT, fontSize: 13, color: "#888", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = "#888"}>
              </a>
              <a href="https://www.youtube.com/@sun_filmess" target="_blank" rel="noreferrer"
                style={{ fontFamily: FONT, fontSize: 13, color: "#888", textDecoration: "none", transition: "color .2s" }}
                onMouseEnter={e => e.target.style.color = GOLD}
                onMouseLeave={e => e.target.style.color = "#888"}>
              </a>
            </div>
          </div>

          {/* Col 3: Links rápidos */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <span style={{ fontFamily: FONT, fontWeight: 700, fontSize: 14, color: GOLD, letterSpacing: "0.08em", textTransform: "uppercase" }}>Links Rápidos</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[["Início","hero"],["Teaser","teaser"],["Elenco","elenco"],["Making Of","making-of"],["Produtora","produtora"]].map(([label, id]) => (
                <button key={id} onClick={() => goto(id)}
                  onMouseEnter={e => e.currentTarget.style.color = GOLD}
                  onMouseLeave={e => e.currentTarget.style.color = "#888"}
                  style={{ background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontSize: 14, color: "#888", padding: 0, transition: "color .2s" }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #2a1a4a", padding: "20px 24px", textAlign: "center", color: "#444", fontSize: 13, fontFamily: FONT }}>
          © 2026 SUN FILMES. Todos os direitos reservados.
        </div>
      </footer>

      {/* ══ SIDEBAR REDES SOCIALES ══ */}
      <div style={{
        position: "fixed", right: 20, top: "50%", transform: "translateY(-50%)",
        zIndex: 400, display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
      }}>
        {/* Línea superior */}
        <div style={{ width: 1, height: 48, background: "#444" }}/>

        {/* Instagram */}
        <a href="https://www.instagram.com/sun_filmess?igsh=amVrMXo0eGt5dm51" target="_blank" rel="noreferrer"
          onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.borderColor = GOLD; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(30,30,30,0.85)"; e.currentTarget.style.borderColor = "#333"; }}
          style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(30,30,30,0.85)", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .25s, border .25s", backdropFilter: "blur(6px)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5"/>
            <circle cx="12" cy="12" r="5"/>
            <circle cx="17.5" cy="6.5" r="1.5" fill="#fff" stroke="none"/>
          </svg>
        </a>

        {/* YouTube */}
        <a href="https://www.youtube.com/@sun_filmess" target="_blank" rel="noreferrer"
          onMouseEnter={e => { e.currentTarget.style.background = GOLD; e.currentTarget.style.borderColor = GOLD; }}
          onMouseLeave={e => { e.currentTarget.style.background = "rgba(30,30,30,0.85)"; e.currentTarget.style.borderColor = "#333"; }}
          style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(30,30,30,0.85)", border: "1px solid #333", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .25s, border .25s", backdropFilter: "blur(6px)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
            <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#161616"/>
          </svg>
        </a>

        {/* Línea inferior */}
        <div style={{ width: 1, height: 48, background: "#444" }}/>
      </div>

      {/* Scroll to top */}
      {showTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: 28, right: 28, zIndex: 400, width: 44, height: 44, borderRadius: "50%", background: GRAD, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(160,96,245,.4)" }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="18 15 12 9 6 15"/>
          </svg>
        </button>
      )}
    </div>
  );
}

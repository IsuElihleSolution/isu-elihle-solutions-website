import { useState, useEffect, useRef } from "react";

const ICON_B64 = "iVBORw0KGgoAAAANSUhEUgAAA+gAAAPoCAIAAADCwUOzAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAFEWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSfvu78nIGlkPSdXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQnPz4KPHg6eG1wbWV0YSB4bWxuczp4PSdhZG9iZTpuczptZXRhLyc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpBdHRyaWI9J2h0dHA6Ly9ucy5hdHRyaWJ1dGlvbi5jb20vYWRzLzEuMC8nPgogIDxBdHRyaWI6QWRzPgogICA8cmRmOlNlcT4KICAgIDxyZGY6bGkgcmRmOnBhcnNlVHlwZT0nUmVzb3VyY2UnPgogICAgIDxBdHRyaWI6Q3JlYXRlZD4yMDI1LTA3LTA3PC9BdHRyaWI6Q3JlYXRlZD4KICAgICA8QXR0cmliOkV4dElkPmFmYWU5MjE4LTRjNjYtNGNmOS05MGMwLWMyYTJhY2M0NDEwOTwvQXR0cmliOkV4dElkPgogICAgIDxBdHRyaWI6RmJJZD41MjUyNjU5MTQxNzk1ODA8L0F0dHJpYjpGYklkPgogICAgIDxBdHRyaWI6VG91Y2hUeXBlPjI8L0F0dHJpYjpUb3VjaFR5cGU+CiAgICA8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvQXR0cmliOkFkcz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5JY29uZSBMb2dvIElzdSBFbGlobGUgU29sdXRpb25zICgxOTIwIHggMTA4MCBweCkgKDEwMDAgeCAxMDAwIHB4KSAtIDE8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KCiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgPHBkZjpBdXRob3I+U2l5YW5kYSBNYWt1cHVsYTwvcGRmOkF1dGhvcj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wPSdodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvJz4KICA8eG1wOkNyZWF0b3JUb29sPkNhbnZhIGRvYz1EQUdzZnBuT09tTSB1c2VyPVVBQjQwYmR5T2tFIGJyYW5kPUJBQjQwVGxyb3RNIHRlbXBsYXRlPUJsdWUgUHVycGxlIE1vZGVybiBNb2xlY3VsZSBUZWNobm9sb2d5IExvZ288L3htcDpDcmVhdG9yVG9vbD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgo8P3hwYWNrZXQgZW5kPSdyJz8+bIgTUQAAIABJREFUeJzs3Xe8VOWh6P37OffeU25573k/77n3veW95RwLqIhSjYmxxhZLrLFr7LHGGGOMPbFijWvbUCygFEFUxIaCDRsqChZA6UjvsNnsPrzLGfew9rQ9ezMbeML3+1l/GFizZs3a8wk/Hp71rH+1AQAA2Or9qy19AgAAQNuEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgDAEAAhDsAAARAuAMAQACEOwAABEC4AwBAAIQ7AAAEQLgD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AOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAABhDsAAAQQ7gAAEEC4AwBAAOEOAAAB/hsvohAcYDRc8wAAAABJRU5ErkJggg==";

// ── BRAND TOKENS ──────────────────────────────────────────────
const C = {
  navy: "#2c3792", magenta: "#bf2293", purple: "#5c2f92",
  lightNavy: "#3d4db5", dark: "#0d0d1a", glass: "rgba(255,255,255,0.06)",
  glassBorder: "rgba(255,255,255,0.11)", muted: "#8b8fa8", offWhite: "#f0eeff"
};

// ── COVERAGE DATA ─────────────────────────────────────────────
const COVERAGE_AREAS = [
  { name: "East London", province: "Eastern Cape", lat: -33.0153, lng: 27.9116, status: "full", speed: "Up to 1Gbps" },
  { name: "Butterworth", province: "Eastern Cape", lat: -32.3314, lng: 28.1497, status: "full", speed: "Up to 500Mbps" },
  { name: "Mthatha", province: "Eastern Cape", lat: -31.5887, lng: 28.7836, status: "partial", speed: "Up to 200Mbps" },
  { name: "King William's Town", province: "Eastern Cape", lat: -32.8786, lng: 27.3967, status: "full", speed: "Up to 500Mbps" },
  { name: "Bhisho", province: "Eastern Cape", lat: -32.8504, lng: 27.4387, status: "full", speed: "Up to 500Mbps" },
  { name: "Queenstown", province: "Eastern Cape", lat: -31.8987, lng: 26.8751, status: "partial", speed: "Up to 100Mbps" },
  { name: "Port Elizabeth", province: "Eastern Cape", lat: -33.9608, lng: 25.6022, status: "coming", speed: "Coming 2025" },
  { name: "Johannesburg", province: "Gauteng", lat: -26.2041, lng: 28.0473, status: "coming", speed: "Coming 2025" },
  { name: "Cape Town", province: "Western Cape", lat: -33.9249, lng: 18.4241, status: "coming", speed: "Coming 2026" },
  { name: "Komani", province: "Eastern Cape", lat: -31.9005, lng: 26.8753, status: "partial", speed: "Up to 100Mbps" },
];

const SERVICES = [
  { id: "fibre", icon: "⚡", title: "Fibre Connectivity", subtitle: "FTTH & FTTB", color: "#bf2293",
    tagline: "Internet at the speed of light", desc: "Ultra-fast, reliable fibre-to-the-home and fibre-to-the-business installations. Direct connectivity to your doorstep — even in underserved areas.",
    features: ["Symmetrical upload & download speeds", "Up to 1Gbps residential packages", "Business-grade SLA guarantees", "Sub-contracting for major fibre operators", "Network design & managed connectivity"],
    plans: [{ name: "Home 50", speed: "50Mbps", price: "R399", ideal: "Light browsing & streaming" }, { name: "Home 200", speed: "200Mbps", price: "R699", ideal: "Remote work & HD video" }, { name: "Home 1G", speed: "1Gbps", price: "R999", ideal: "Power users & gaming" }]
  },
  { id: "5g", icon: "📡", title: "Smart 5G Solutions", subtitle: "Wireless Connectivity", color: "#3d4db5",
    tagline: "Blazing fast, no cables needed", desc: "Advanced 5G network deployments especially for rural and semi-urban areas — offering flexible, high-speed wireless connectivity where fibre isn't yet available.",
    features: ["Rural & semi-urban coverage focus", "Fixed wireless home broadband", "Business wireless backup solutions", "Portable hotspot solutions", "5G small cell deployments"],
    plans: [{ name: "5G Home", speed: "100Mbps", price: "R499", ideal: "Rural households" }, { name: "5G Business", speed: "500Mbps", price: "R1,299", ideal: "SMEs without fibre access" }]
  },
  { id: "ict", icon: "🖥️", title: "ICT Solutions", subtitle: "Hardware & Software", color: "#5c2f92",
    tagline: "Your complete technology partner", desc: "Your one-stop-shop for all ICT needs. From hardware and software reselling to network design and IT consulting — we handle everything end to end.",
    features: ["Hardware: computers, networking gear, POS systems", "Software: OS, productivity, cybersecurity, ERP", "Network infrastructure design", "IT support & managed services", "Cloud migration consulting"],
    plans: []
  },
  { id: "analytics", icon: "📊", title: "Business Analytics", subtitle: "Data Intelligence", color: "#7a2b92",
    tagline: "Turn data into decisions", desc: "Comprehensive data services covering management, security intelligence, monitoring, data mining, and advanced analytics — applied across supply chain, HR, and ERP functions.",
    features: ["Predictive & prescriptive analytics", "Business intelligence dashboards", "Supply chain optimisation", "HR analytics & workforce planning", "ERP data integration"],
    plans: []
  },
  { id: "iot", icon: "🔗", title: "Internet of Things", subtitle: "Smart Connectivity", color: "#2c3792",
    tagline: "Connect everything, control everything", desc: "Platform solutions for device and connectivity management, application enablement, and professional services — focusing on smart agriculture, manufacturing, logistics, and smart cities.",
    features: ["Smart agriculture monitoring systems", "Industrial IoT for manufacturing", "Fleet & logistics tracking", "Smart city infrastructure", "Training, consulting & ongoing support"],
    plans: []
  },
  { id: "digital", icon: "📣", title: "Digital Advertising", subtitle: "Social Media & SEM", color: "#bf2293",
    tagline: "Be seen. Be heard. Convert.", desc: "AI-powered SEM, interactive social media ads, content marketing, programmatic advertising, and full campaign management from audience research to budget planning.",
    features: ["AI-powered search engine marketing", "Programmatic display advertising", "Social media campaign management", "Content creation & strategy", "Performance analytics & reporting"],
    plans: []
  },
];

// ── STYLES ────────────────────────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
  *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior:smooth; }
  body { font-family:'DM Sans',sans-serif; background:#0d0d1a; color:#fff; overflow-x:hidden; }
  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:#0d0d1a; }
  ::-webkit-scrollbar-thumb { background:linear-gradient(var(--magenta,#bf2293),var(--navy,#2c3792)); border-radius:3px; }
  input,textarea,select { font-family:'DM Sans',sans-serif; }
  @keyframes fadeUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
  @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(1.5)} }
  @keyframes spin { from{transform:translate(-50%,-50%) rotate(0deg)} to{transform:translate(-50%,-50%) rotate(360deg)} }
  @keyframes radar { 0%{transform:translate(-50%,-50%) scale(0);opacity:.6} 100%{transform:translate(-50%,-50%) scale(3);opacity:0} }
  @keyframes slideIn { from{opacity:0;transform:translateX(-20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes checkPop { 0%{transform:scale(0)} 70%{transform:scale(1.2)} 100%{transform:scale(1)} }
  @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
`;

// ── SHARED COMPONENTS ─────────────────────────────────────────
function GradText({ children, style = {} }) {
  return (
    <span style={{ background: `linear-gradient(120deg, #d45fca, ${C.magenta} 30%, ${C.purple} 65%, ${C.lightNavy})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", ...style }}>
      {children}
    </span>
  );
}

function Orbs() {
  return (
    <>
      {[
        { w: 500, t: -100, r: -100, bg: C.navy, delay: 0 },
        { w: 350, b: 0, l: "30%", bg: C.magenta, delay: -3 },
        { w: 250, t: "40%", l: -50, bg: C.purple, delay: -5 },
      ].map((o, i) => (
        <div key={i} style={{
          position: "absolute", borderRadius: "50%", filter: "blur(70px)", opacity: .12,
          width: o.w, height: o.w,
          top: o.t, bottom: o.b, left: o.l, right: o.r,
          background: o.bg,
          animation: `float ${8 + i * 2}s ease-in-out infinite`,
          animationDelay: `${o.delay}s`,
          pointerEvents: "none",
        }} />
      ))}
    </>
  );
}

function Badge({ children }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 50, fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "#c5bfff", marginBottom: 24 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: C.magenta, animation: "pulse 2s ease-in-out infinite", display: "inline-block" }} />
      {children}
    </div>
  );
}

function SectionTag({ children }) {
  return <div style={{ fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: C.magenta, fontWeight: 600, marginBottom: 10 }}>{children}</div>;
}

function Btn({ children, onClick, style = {}, variant = "primary" }) {
  const base = { display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 26px", borderRadius: 50, fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 500, letterSpacing: "0.04em", cursor: "pointer", border: "none", transition: "all .25s", ...style };
  if (variant === "primary") return <button onClick={onClick} style={{ ...base, background: `linear-gradient(135deg, ${C.magenta}, ${C.navy})`, color: "#fff", boxShadow: `0 8px 28px rgba(191,34,147,.3)` }}>{children}</button>;
  if (variant === "outline") return <button onClick={onClick} style={{ ...base, background: C.glass, border: `1px solid ${C.glassBorder}`, color: "#fff", backdropFilter: "blur(10px)" }}>{children}</button>;
  if (variant === "ghost") return <button onClick={onClick} style={{ ...base, background: "transparent", color: C.muted, padding: "8px 16px" }}>{children}</button>;
}

// ── NAV ───────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = [
    { label: "Home", id: "home" }, { label: "Services", id: "services" },
    { label: "Coverage", id: "coverage" }, { label: "Team", id: "team" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, padding: "14px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", background: scrolled ? "rgba(13,13,26,.96)" : "rgba(13,13,26,.7)", backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.glassBorder}`, transition: "background .3s" }}>
      <div onClick={() => { setPage("home"); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
        <img src={`data:image/png;base64,${ICON_B64}`} alt="logo" style={{ height: 36 }} />
        <div style={{ lineHeight: 1.15 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 13, letterSpacing: "0.08em" }}>ISU ELIHLE SOLUTIONS</div>
          <div style={{ fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: C.muted }}>Business Consultants</div>
        </div>
      </div>

      {/* Desktop links */}
      <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
        {links.map(l => (
          <button key={l.id} onClick={() => setPage(l.id)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: 13, fontWeight: 500, color: page === l.id ? "#fff" : C.muted, letterSpacing: "0.04em", transition: "color .2s", padding: "4px 0", borderBottom: page === l.id ? `2px solid ${C.magenta}` : "2px solid transparent" }}>
            {l.label}
          </button>
        ))}
        <Btn onClick={() => setPage("order")} style={{ padding: "8px 20px", fontSize: 13 }}>Get Connected</Btn>
      </div>
    </nav>
  );
}

// ── HOME PAGE ─────────────────────────────────────────────────
function HomePage({ setPage }) {
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 64px 80px", position: "relative", overflow: "hidden" }}>
      <Orbs />
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 80% 70% at 70% 50%, rgba(92,47,146,.15) 0%, transparent 60%), radial-gradient(ellipse 50% 60% at 20% 30%, rgba(44,55,146,.18) 0%, transparent 55%)` }} />

      <div style={{ maxWidth: 660, position: "relative", zIndex: 2, animation: "fadeUp .9s ease both" }}>
        <Badge>100% Black-Owned ICT Company · Eastern Cape, South Africa</Badge>
        <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2.6rem,5vw,4.4rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-0.02em", marginBottom: 24 }}>
          Connecting Africa to a<br /><GradText>Brighter Digital Future</GradText>
        </h1>
        <p style={{ fontSize: 17, color: "rgba(255,255,255,.6)", lineHeight: 1.75, maxWidth: 530, marginBottom: 36, fontWeight: 300 }}>
          Bridging the digital divide with affordable fibre, 5G, and integrated ICT solutions — built for communities, businesses, and institutions across South Africa.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Btn onClick={() => setPage("coverage")}>Check My Coverage →</Btn>
          <Btn onClick={() => setPage("services")} variant="outline">Explore Services</Btn>
        </div>
      </div>

      {/* Floating stats */}
      <div style={{ position: "absolute", right: 64, top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: 16, zIndex: 2, animation: "fadeUp 1.1s ease .3s both" }}>
        {[["100%", "Black-Owned"], ["1Gbps", "Max Speed"], ["5G", "Ready"]].map(([num, lab]) => (
          <div key={lab} style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, backdropFilter: "blur(20px)", borderRadius: 16, padding: "18px 28px", textAlign: "center", minWidth: 140 }}>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 28, fontWeight: 800, background: `linear-gradient(135deg, ${C.magenta}, ${C.lightNavy})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{num}</div>
            <div style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginTop: 3 }}>{lab}</div>
          </div>
        ))}
      </div>

      {/* Quick nav cards */}
      <div style={{ position: "absolute", bottom: 48, left: 64, right: 64, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, zIndex: 2, animation: "fadeUp 1.2s ease .5s both" }}>
        {[
          { icon: "⚡", label: "Check Coverage", sub: "See if we serve your area", page: "coverage", color: C.magenta },
          { icon: "📦", label: "Place an Order", sub: "Get connected today", page: "order", color: C.navy },
          { icon: "🔍", label: "Track Your Order", sub: "Real-time order status", page: "track", color: C.purple },
          { icon: "🖥️", label: "Our Services", sub: "All we offer", page: "services", color: C.lightNavy },
        ].map(c => (
          <div key={c.page} onClick={() => setPage(c.page)} style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 16, padding: "18px 20px", cursor: "pointer", transition: "all .25s", display: "flex", alignItems: "center", gap: 14 }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${c.color}55`; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.glassBorder; e.currentTarget.style.transform = "none"; }}>
            <div style={{ width: 42, height: 42, borderRadius: 12, background: `${c.color}22`, border: `1px solid ${c.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>{c.icon}</div>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 13, fontWeight: 700 }}>{c.label}</div>
              <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{c.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SERVICES PAGE ─────────────────────────────────────────────
function ServicesPage({ setPage }) {
  const [active, setActive] = useState(null);

  return (
    <div style={{ minHeight: "100vh", padding: "120px 64px 80px" }}>
      <Orbs />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ marginBottom: 56, maxWidth: 600 }}>
          <SectionTag>What We Do</SectionTag>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Integrated ICT Solutions<br /><GradText>for Every Scale</GradText>
          </h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontWeight: 300, lineHeight: 1.7 }}>From home fibre to enterprise IoT — one partner for your entire digital journey.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 20 }}>
          {SERVICES.map(s => (
            <div key={s.id} onClick={() => setActive(active === s.id ? null : s.id)}
              style={{ background: C.glass, border: `1px solid ${active === s.id ? s.color + "66" : C.glassBorder}`, borderRadius: 22, padding: "28px 28px 24px", cursor: "pointer", transition: "all .3s", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { if (active !== s.id) e.currentTarget.style.borderColor = s.color + "44"; }}
              onMouseLeave={e => { if (active !== s.id) e.currentTarget.style.borderColor = C.glassBorder; }}>

              {active === s.id && <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${s.color}08, transparent)`, pointerEvents: "none" }} />}

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${s.color}22`, border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{s.icon}</div>
                <div style={{ fontSize: 20, color: active === s.id ? s.color : C.muted, transition: "transform .3s, color .3s", transform: active === s.id ? "rotate(45deg)" : "none" }}>+</div>
              </div>

              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: s.color, marginBottom: 10, fontWeight: 600 }}>{s.subtitle}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", lineHeight: 1.6, fontWeight: 300 }}>{s.tagline}</div>

              {active === s.id && (
                <div style={{ marginTop: 20, animation: "fadeUp .35s ease both" }}>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,.65)", lineHeight: 1.7, marginBottom: 18, fontWeight: 300 }}>{s.desc}</p>
                  <div style={{ marginBottom: 16 }}>
                    {s.features.map((f, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: `1px solid ${C.glassBorder}` }}>
                        <span style={{ color: s.color, fontSize: 13 }}>✓</span>
                        <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  {s.plans.length > 0 && (
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, marginBottom: 12 }}>Available Plans</div>
                      <div style={{ display: "grid", gridTemplateColumns: `repeat(${s.plans.length},1fr)`, gap: 10 }}>
                        {s.plans.map((p, i) => (
                          <div key={i} style={{ background: `${s.color}15`, border: `1px solid ${s.color}33`, borderRadius: 12, padding: "14px 12px", textAlign: "center" }}>
                            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 800, color: s.color }}>{p.price}<span style={{ fontSize: 10, fontWeight: 400 }}>/mo</span></div>
                            <div style={{ fontSize: 12, fontWeight: 700, marginTop: 2 }}>{p.name}</div>
                            <div style={{ fontSize: 10, color: C.muted, marginTop: 3 }}>{p.speed} · {p.ideal}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div style={{ marginTop: 20 }}>
                    <Btn onClick={(e) => { e.stopPropagation(); setPage("coverage"); }} style={{ fontSize: 13, padding: "9px 20px" }}>Check Coverage for This Service →</Btn>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: 56, background: `linear-gradient(135deg, rgba(44,55,146,.15), rgba(191,34,147,.08))`, border: `1px solid ${C.glassBorder}`, borderRadius: 24, padding: "40px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Ready to get connected?</div>
            <div style={{ color: "rgba(255,255,255,.55)", fontWeight: 300 }}>Check if we cover your area and place an order in minutes.</div>
          </div>
          <div style={{ display: "flex", gap: 14 }}>
            <Btn onClick={() => setPage("coverage")}>Check My Coverage →</Btn>
            <Btn onClick={() => setPage("contact")} variant="outline">Talk to Us</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── COVERAGE PAGE ─────────────────────────────────────────────
function CoveragePage({ setPage, setCoveredArea }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [searching, setSearching] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: -32, lng: 27 });
  const [selectedDot, setSelectedDot] = useState(null);

  const checkCoverage = (q = query) => {
    if (!q.trim()) return;
    setSearching(true);
    setResult(null);
    setTimeout(() => {
      const match = COVERAGE_AREAS.find(a => a.name.toLowerCase().includes(q.toLowerCase()) || a.province.toLowerCase().includes(q.toLowerCase()));
      setResult(match || { name: q, status: "none" });
      if (match) { setMapCenter({ lat: match.lat, lng: match.lng }); setSelectedDot(match.name); }
      setSearching(false);
    }, 900);
  };

  const statusInfo = {
    full: { label: "Full Coverage", color: "#22c55e", icon: "✅", msg: "Great news! We have full fibre & 5G coverage in your area." },
    partial: { label: "Partial Coverage", color: "#f59e0b", icon: "⚡", msg: "We have limited coverage in your area. 5G wireless options available." },
    coming: { label: "Coming Soon", color: "#3d4db5", icon: "🔜", msg: "We're expanding to your area soon. Register your interest below." },
    none: { label: "Not Yet Covered", color: C.muted, icon: "❌", msg: "We don't yet serve this area. Register your interest and we'll notify you when we expand." },
  };

  // Simple SVG map of South Africa coverage dots
  const mapDots = COVERAGE_AREAS;
  // Convert lat/lng to SVG coords (rough bounding box for SA: lat -35 to -22, lng 16 to 33)
  const toSVG = (lat, lng) => ({
    x: ((lng - 16) / (33 - 16)) * 500,
    y: ((lat - (-22)) / (-35 - -22)) * 300,
  });

  return (
    <div style={{ minHeight: "100vh", padding: "120px 64px 80px" }}>
      <Orbs />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", marginBottom: 56 }}>
          <SectionTag>Coverage Checker</SectionTag>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: 16 }}>
            Are we in <GradText>your area?</GradText>
          </h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontWeight: 300, lineHeight: 1.7, marginBottom: 36 }}>Search your town or suburb to instantly check fibre and 5G coverage availability.</p>

          {/* Search bar */}
          <div style={{ display: "flex", gap: 12, maxWidth: 520, margin: "0 auto" }}>
            <div style={{ flex: 1, position: "relative" }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 16 }}>🔍</span>
              <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && checkCoverage()}
                placeholder="e.g. East London, Butterworth, Mthatha..."
                style={{ width: "100%", padding: "14px 16px 14px 44px", background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 50, color: "#fff", fontSize: 14, outline: "none", backdropFilter: "blur(10px)" }} />
            </div>
            <Btn onClick={() => checkCoverage()} style={{ padding: "14px 24px" }}>{searching ? "Checking…" : "Check"}</Btn>
          </div>

          {/* Quick area chips */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginTop: 20 }}>
            {COVERAGE_AREAS.slice(0, 6).map(a => (
              <button key={a.name} onClick={() => { setQuery(a.name); checkCoverage(a.name); }}
                style={{ padding: "6px 16px", background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 50, color: C.muted, fontSize: 12, cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = C.magenta + "66"; }}
                onMouseLeave={e => { e.currentTarget.style.color = C.muted; e.currentTarget.style.borderColor = C.glassBorder; }}>
                {a.name}
              </button>
            ))}
          </div>
        </div>

        {/* Result card */}
        {result && (
          <div style={{ maxWidth: 520, margin: "0 auto 48px", animation: "fadeUp .4s ease both" }}>
            <div style={{ background: C.glass, border: `1px solid ${result.status ? statusInfo[result.status].color + "55" : C.glassBorder}`, borderRadius: 20, padding: "28px 32px", backdropFilter: "blur(20px)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                <div style={{ fontSize: 32, animation: "checkPop .4s ease both" }}>{statusInfo[result.status]?.icon || "❓"}</div>
                <div>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800 }}>{result.name}</div>
                  <div style={{ fontSize: 12, color: statusInfo[result.status]?.color || C.muted, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", marginTop: 2 }}>{statusInfo[result.status]?.label || "Unknown Area"}</div>
                </div>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.65)", lineHeight: 1.65, marginBottom: 20, fontWeight: 300 }}>{statusInfo[result.status]?.msg}</p>
              {result.speed && <div style={{ background: `${statusInfo[result.status].color}18`, border: `1px solid ${statusInfo[result.status].color}33`, borderRadius: 10, padding: "10px 16px", fontSize: 13, color: statusInfo[result.status].color, marginBottom: 20 }}>📶 Available speed: <strong>{result.speed}</strong></div>}
              {(result.status === "full" || result.status === "partial") && (
                <Btn onClick={() => { setCoveredArea(result); setPage("order"); }} style={{ width: "100%", justifyContent: "center" }}>
                  Order Now for {result.name} →
                </Btn>
              )}
              {(result.status === "coming" || result.status === "none") && (
                <Btn onClick={() => setPage("contact")} variant="outline" style={{ width: "100%", justifyContent: "center" }}>
                  Register My Interest →
                </Btn>
              )}
            </div>
          </div>
        )}

        {/* Map */}
        <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 24, padding: "32px", overflow: "hidden", position: "relative" }}>
          <div style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700 }}>Coverage Map</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 3 }}>Click any dot to check that area</div>
            </div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              {[["#22c55e", "Full Coverage"], ["#f59e0b", "Partial"], ["#3d4db5", "Coming Soon"]].map(([col, lab]) => (
                <div key={lab} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.muted }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: col }} />{lab}
                </div>
              ))}
            </div>
          </div>

          {/* SVG Map */}
          <div style={{ position: "relative", borderRadius: 16, overflow: "hidden", background: "rgba(255,255,255,.03)", border: `1px solid ${C.glassBorder}` }}>
            <svg viewBox="0 0 500 320" style={{ width: "100%", display: "block" }}>
              {/* SA outline (simplified) */}
              <path d="M80,20 L200,10 L350,25 L450,80 L490,160 L460,240 L380,290 L280,310 L180,300 L100,260 L50,200 L30,130 Z" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
              {/* Grid lines */}
              {[0,1,2,3,4].map(i => <line key={`h${i}`} x1="0" y1={i*80} x2="500" y2={i*80} stroke="rgba(255,255,255,.04)" strokeWidth="1" />)}
              {[0,1,2,3,4,5,6].map(i => <line key={`v${i}`} x1={i*83} y1="0" x2={i*83} y2="320" stroke="rgba(255,255,255,.04)" strokeWidth="1" />)}

              {mapDots.map(a => {
                const p = toSVG(a.lat, a.lng);
                const col = a.status === "full" ? "#22c55e" : a.status === "partial" ? "#f59e0b" : "#3d4db5";
                const sel = selectedDot === a.name;
                return (
                  <g key={a.name} style={{ cursor: "pointer" }} onClick={() => { setQuery(a.name); checkCoverage(a.name); }}>
                    {sel && <circle cx={p.x} cy={p.y} r="20" fill={col} opacity=".12" style={{ animation: "radar 1.5s ease-out infinite" }} />}
                    <circle cx={p.x} cy={p.y} r={sel ? 10 : 7} fill={col} opacity={sel ? 1 : .7} stroke={sel ? "#fff" : "transparent"} strokeWidth="2" />
                    <text x={p.x} y={p.y - 13} textAnchor="middle" fill="rgba(255,255,255,.7)" fontSize="9" fontFamily="DM Sans,sans-serif">{a.name}</text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── ORDER PAGE ────────────────────────────────────────────────
function OrderPage({ coveredArea, setPage, setOrderRef }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "", idNumber: "",
    address: "", suburb: "", city: coveredArea?.name || "", province: coveredArea?.province || "Eastern Cape",
    service: "fibre", plan: "Home 200", installation: "standard", notes: ""
  });
  const [submitting, setSubmitting] = useState(false);

  const upd = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const steps = ["Your Details", "Service & Plan", "Address", "Confirm & Order"];

  const genRef = () => "IES-" + Date.now().toString(36).toUpperCase().slice(-6);

  const submit = () => {
    setSubmitting(true);
    setTimeout(() => {
      const ref = genRef();
      setOrderRef({ ref, form, date: new Date().toISOString(), status: "received" });
      setSubmitting(false);
      setPage("track");
    }, 1800);
  };

  const inputStyle = { width: "100%", padding: "12px 16px", background: "rgba(255,255,255,.05)", border: `1px solid ${C.glassBorder}`, borderRadius: 12, color: "#fff", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif", fontWeight: 300, transition: "border-color .2s" };
  const labelStyle = { fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: C.muted, fontWeight: 500, marginBottom: 6, display: "block" };

  return (
    <div style={{ minHeight: "100vh", padding: "120px 64px 80px" }}>
      <Orbs />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto" }}>
        <SectionTag>Order Form</SectionTag>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 8 }}>
          Let's Get You <GradText>Connected</GradText>
        </h2>
        {coveredArea && <p style={{ color: C.muted, fontSize: 14, marginBottom: 36 }}>Ordering for: <strong style={{ color: "#fff" }}>{coveredArea.name}</strong> — {coveredArea.speed}</p>}
        {!coveredArea && <p style={{ color: C.muted, fontSize: 14, marginBottom: 36 }}>Complete the form below and our team will confirm coverage for your address.</p>}

        {/* Step indicator */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 44 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: step > i + 1 ? "pointer" : "default" }} onClick={() => step > i + 1 && setStep(i + 1)}>
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: step > i + 1 ? `linear-gradient(135deg,${C.magenta},${C.navy})` : step === i + 1 ? `linear-gradient(135deg,${C.magenta},${C.purple})` : C.glass, border: `2px solid ${step >= i + 1 ? C.magenta : C.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: step > i + 1 ? 14 : 13, fontFamily: "'Syne',sans-serif", fontWeight: 700, flexShrink: 0, transition: "all .3s" }}>
                  {step > i + 1 ? "✓" : i + 1}
                </div>
                <span style={{ fontSize: 12, color: step === i + 1 ? "#fff" : C.muted, fontWeight: step === i + 1 ? 500 : 300, whiteSpace: "nowrap", display: "none", ["@media(min-width:640px)"]: { display: "block" } }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? `linear-gradient(90deg,${C.magenta},${C.navy})` : C.glassBorder, margin: "0 12px", transition: "background .4s" }} />}
            </div>
          ))}
        </div>

        <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 24, padding: "36px 40px", animation: "slideIn .35s ease both" }}>
          {/* Step 1 */}
          {step === 1 && (
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Tell us about yourself</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div><label style={labelStyle}>First Name</label><input style={inputStyle} value={form.firstName} onChange={e => upd("firstName", e.target.value)} placeholder="Sipho" /></div>
                <div><label style={labelStyle}>Last Name</label><input style={inputStyle} value={form.lastName} onChange={e => upd("lastName", e.target.value)} placeholder="Dlamini" /></div>
              </div>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Email Address</label><input style={inputStyle} type="email" value={form.email} onChange={e => upd("email", e.target.value)} placeholder="sipho@email.co.za" /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div><label style={labelStyle}>Phone Number</label><input style={inputStyle} type="tel" value={form.phone} onChange={e => upd("phone", e.target.value)} placeholder="071 234 5678" /></div>
                <div><label style={labelStyle}>ID Number (Optional)</label><input style={inputStyle} value={form.idNumber} onChange={e => upd("idNumber", e.target.value)} placeholder="For RICA purposes" /></div>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Choose your service</div>
              <label style={labelStyle}>Service Type</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 24 }}>
                {[["fibre", "⚡", "Fibre (FTTH/FTTB)"], ["5g", "📡", "5G Wireless"], ["ict", "🖥️", "ICT Solutions"], ["digital", "📣", "Digital Advertising"]].map(([val, icon, lab]) => (
                  <div key={val} onClick={() => upd("service", val)}
                    style={{ padding: "16px", background: form.service === val ? `rgba(191,34,147,.15)` : "rgba(255,255,255,.03)", border: `2px solid ${form.service === val ? C.magenta : C.glassBorder}`, borderRadius: 14, cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 20 }}>{icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 500 }}>{lab}</span>
                  </div>
                ))}
              </div>
              {(form.service === "fibre" || form.service === "5g") && (
                <>
                  <label style={labelStyle}>Select Plan</label>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
                    {(SERVICES.find(s => s.id === form.service)?.plans || []).map(p => (
                      <div key={p.name} onClick={() => upd("plan", p.name)}
                        style={{ padding: "16px 12px", textAlign: "center", background: form.plan === p.name ? "rgba(191,34,147,.15)" : "rgba(255,255,255,.03)", border: `2px solid ${form.plan === p.name ? C.magenta : C.glassBorder}`, borderRadius: 14, cursor: "pointer", transition: "all .2s" }}>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: C.magenta }}>{p.price}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, margin: "4px 0" }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: C.muted }}>{p.speed}</div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <label style={labelStyle}>Installation Type</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["standard", "🏠", "Standard Installation", "5–7 business days"], ["express", "⚡", "Express Installation", "1–2 business days (+R500)"]].map(([val, icon, lab, sub]) => (
                  <div key={val} onClick={() => upd("installation", val)}
                    style={{ padding: "16px", background: form.installation === val ? "rgba(44,55,146,.2)" : "rgba(255,255,255,.03)", border: `2px solid ${form.installation === val ? C.lightNavy : C.glassBorder}`, borderRadius: 14, cursor: "pointer", transition: "all .2s" }}>
                    <div style={{ fontSize: 20, marginBottom: 6 }}>{icon}</div>
                    <div style={{ fontSize: 13, fontWeight: 600 }}>{lab}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 3 }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Installation address</div>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Street Address</label><input style={inputStyle} value={form.address} onChange={e => upd("address", e.target.value)} placeholder="123 Main Street" /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div><label style={labelStyle}>Suburb</label><input style={inputStyle} value={form.suburb} onChange={e => upd("suburb", e.target.value)} placeholder="e.g. Vincent" /></div>
                <div><label style={labelStyle}>City / Town</label><input style={inputStyle} value={form.city} onChange={e => upd("city", e.target.value)} /></div>
              </div>
              <div style={{ marginBottom: 16 }}><label style={labelStyle}>Province</label>
                <select style={{ ...inputStyle, appearance: "none" }} value={form.province} onChange={e => upd("province", e.target.value)}>
                  {["Eastern Cape","Gauteng","Western Cape","KwaZulu-Natal","Limpopo","Mpumalanga","Free State","Northern Cape","North West"].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div><label style={labelStyle}>Special Instructions (Optional)</label><textarea style={{ ...inputStyle, minHeight: 90, resize: "vertical" }} value={form.notes} onChange={e => upd("notes", e.target.value)} placeholder="e.g. flat number, access code, preferred time..." /></div>
            </div>
          )}

          {/* Step 4 */}
          {step === 4 && (
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 24 }}>Review your order</div>
              {[
                ["Customer", `${form.firstName} ${form.lastName}`],
                ["Email", form.email], ["Phone", form.phone],
                ["Service", form.service.toUpperCase()], ["Plan", form.plan],
                ["Installation", form.installation === "express" ? "Express (1–2 days)" : "Standard (5–7 days)"],
                ["Address", `${form.address}, ${form.suburb}, ${form.city}`],
                ["Province", form.province],
              ].filter(([,v]) => v && v.trim()).map(([k, v]) => (
                <div key={k} style={{ display: "flex", padding: "12px 0", borderBottom: `1px solid ${C.glassBorder}` }}>
                  <div style={{ width: 150, fontSize: 12, color: C.muted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{k}</div>
                  <div style={{ fontSize: 14 }}>{v}</div>
                </div>
              ))}
              <div style={{ marginTop: 24, padding: "16px 20px", background: "rgba(191,34,147,.08)", border: `1px solid rgba(191,34,147,.25)`, borderRadius: 14, fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.65, fontWeight: 300 }}>
                📋 By placing this order, you agree that Isu Elihle Solutions will contact you to confirm your address, verify coverage, and schedule your installation.
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
            {step > 1 ? <Btn onClick={() => setStep(s => s - 1)} variant="outline">← Back</Btn> : <div />}
            {step < 4
              ? <Btn onClick={() => setStep(s => s + 1)}>Continue →</Btn>
              : <Btn onClick={submit} style={{ minWidth: 180, justifyContent: "center" }}>{submitting ? "Placing Order…" : "Place Order ✓"}</Btn>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TRACK PAGE ────────────────────────────────────────────────
function TrackPage({ orderRef, setPage }) {
  const [queryRef, setQueryRef] = useState(orderRef?.ref || "");
  const [tracking, setTracking] = useState(orderRef ? orderRef : null);
  const [searching, setSearching] = useState(false);

  const MILESTONES = [
    { key: "received", label: "Order Received", icon: "📋", desc: "Your order has been submitted and is being reviewed by our team.", done: true, date: tracking?.date ? new Date(tracking.date).toLocaleDateString("en-ZA", { day: "numeric", month: "long", year: "numeric" }) : "" },
    { key: "processing", label: "Processing", icon: "⚙️", desc: "We're verifying your address, confirming coverage, and preparing your installation schedule.", done: !!orderRef, date: orderRef ? "In progress" : "" },
    { key: "scheduled", label: "Installation Scheduled", icon: "📅", desc: "A technician has been assigned and your installation date is confirmed.", done: false, date: "" },
    { key: "installing", label: "Installation In Progress", icon: "🔧", desc: "Our technician is on-site setting up your connection.", done: false, date: "" },
    { key: "testing", label: "Testing & Activation", icon: "📶", desc: "Your connection is being tested and activated on our network.", done: false, date: "" },
    { key: "active", label: "Connection Active", icon: "✅", desc: "Your service is live! Welcome to Isu Elihle Solutions.", done: false, date: "" },
  ];

  const search = () => {
    setSearching(true);
    setTimeout(() => {
      if (queryRef.startsWith("IES-")) {
        setTracking({ ref: queryRef, form: { firstName: "Customer", city: "Your Area", service: "fibre", plan: "Home 200" }, date: new Date().toISOString() });
      } else {
        setTracking(null);
        alert("Order reference not found. Please check your reference number and try again.");
      }
      setSearching(false);
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", padding: "120px 64px 80px" }}>
      <Orbs />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 720, margin: "0 auto" }}>
        <SectionTag>Order Tracking</SectionTag>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
          Track Your <GradText>Order</GradText>
        </h2>
        <p style={{ color: "rgba(255,255,255,.55)", fontWeight: 300, marginBottom: 40 }}>Enter your order reference number to see real-time status and milestones.</p>

        {/* Search */}
        <div style={{ display: "flex", gap: 12, marginBottom: 48 }}>
          <input value={queryRef} onChange={e => setQueryRef(e.target.value)} onKeyDown={e => e.key === "Enter" && search()}
            placeholder="Enter reference e.g. IES-ABC123"
            style={{ flex: 1, padding: "13px 18px", background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 50, color: "#fff", fontSize: 14, outline: "none", fontFamily: "'DM Sans',sans-serif", letterSpacing: "0.05em" }} />
          <Btn onClick={search}>{searching ? "Searching…" : "Track Order"}</Btn>
        </div>

        {tracking && (
          <div style={{ animation: "fadeUp .4s ease both" }}>
            {/* Order summary card */}
            <div style={{ background: `linear-gradient(135deg, rgba(44,55,146,.2), rgba(191,34,147,.1))`, border: `1px solid rgba(191,34,147,.25)`, borderRadius: 20, padding: "24px 28px", marginBottom: 36, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: C.muted, marginBottom: 4 }}>Order Reference</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, letterSpacing: "0.05em" }}>{tracking.ref}</div>
              </div>
              <div style={{ display: "flex", gap: 24 }}>
                <div><div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Customer</div><div style={{ fontSize: 14 }}>{tracking.form?.firstName} {tracking.form?.lastName || ""}</div></div>
                <div><div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Service</div><div style={{ fontSize: 14 }}>{(tracking.form?.service || "").toUpperCase()} · {tracking.form?.plan}</div></div>
                <div><div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Area</div><div style={{ fontSize: 14 }}>{tracking.form?.city}</div></div>
              </div>
              <div style={{ padding: "8px 18px", background: "rgba(34,197,94,.15)", border: "1px solid rgba(34,197,94,.3)", borderRadius: 50, fontSize: 12, color: "#22c55e", fontWeight: 600 }}>● Processing</div>
            </div>

            {/* Timeline */}
            <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 24, padding: "36px 40px" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 32 }}>Installation Milestones</div>
              <div style={{ position: "relative" }}>
                {/* vertical line */}
                <div style={{ position: "absolute", left: 21, top: 0, bottom: 0, width: 2, background: `linear-gradient(180deg, ${C.magenta}, rgba(44,55,146,.3))`, borderRadius: 1 }} />

                {MILESTONES.map((m, i) => (
                  <div key={m.key} style={{ display: "flex", gap: 24, marginBottom: i < MILESTONES.length - 1 ? 32 : 0, position: "relative", animation: `slideIn .4s ease ${i * .1}s both` }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: m.done ? `linear-gradient(135deg, ${C.magenta}, ${C.navy})` : "rgba(255,255,255,.05)", border: `2px solid ${m.done ? C.magenta : C.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0, zIndex: 1, boxShadow: m.done ? `0 0 20px rgba(191,34,147,.3)` : "none", transition: "all .3s" }}>
                      {m.done ? m.icon : <span style={{ fontSize: 14, color: C.muted }}>{i + 1}</span>}
                    </div>
                    <div style={{ paddingTop: 6, flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6, flexWrap: "wrap" }}>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 15, fontWeight: 700, color: m.done ? "#fff" : "rgba(255,255,255,.4)" }}>{m.label}</div>
                        {m.date && <div style={{ fontSize: 11, color: m.done ? C.magenta : C.muted, background: m.done ? "rgba(191,34,147,.12)" : "transparent", padding: "3px 10px", borderRadius: 50, border: m.done ? `1px solid rgba(191,34,147,.25)` : "none" }}>{m.date}</div>}
                      </div>
                      <div style={{ fontSize: 13, color: m.done ? "rgba(255,255,255,.6)" : "rgba(255,255,255,.3)", lineHeight: 1.6, fontWeight: 300 }}>{m.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 24, textAlign: "center" }}>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Questions about your order?</p>
              <Btn onClick={() => setPage("contact")} variant="outline">Contact Support</Btn>
            </div>
          </div>
        )}

        {!tracking && !searching && (
          <div style={{ textAlign: "center", padding: "48px 0" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No order loaded yet</div>
            <p style={{ color: C.muted, fontSize: 14, marginBottom: 24 }}>Enter your reference number above, or place a new order.</p>
            <Btn onClick={() => setPage("order")}>Place an Order →</Btn>
          </div>
        )}
      </div>
    </div>
  );
}

// ── TEAM PAGE ─────────────────────────────────────────────────
function TeamPage() {
  return (
    <div style={{ minHeight: "100vh", padding: "120px 64px 80px" }}>
      <Orbs />
      <div style={{ position: "relative", zIndex: 2, maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
        <SectionTag>Our Team</SectionTag>
        <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 800, lineHeight: 1.12, letterSpacing: "-0.02em", marginBottom: 16 }}>
          The People Behind <GradText>the Mission</GradText>
        </h2>
        <p style={{ color: "rgba(255,255,255,.55)", fontWeight: 300, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 56px" }}>A growing team united by a single purpose — connecting South Africa to the digital future it deserves.</p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 28, padding: "48px 40px", maxWidth: 340, width: "100%", position: "relative", overflow: "hidden" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(191,34,147,.35)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.glassBorder; e.currentTarget.style.transform = "none"; }}
            style={{ transition: "all .3s" }}>
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${C.magenta}, ${C.navy})` }} />
            <div style={{ width: 90, height: 90, borderRadius: "50%", background: `linear-gradient(135deg, ${C.magenta}, ${C.navy})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: "#fff", margin: "0 auto 20px", boxShadow: `0 0 35px rgba(191,34,147,.35)` }}>SM</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Siyanda Makupula</div>
            <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: C.magenta, fontWeight: 600, marginBottom: 18 }}>Founder & Director</div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.7, fontWeight: 300 }}>Entrepreneur and visionary behind Isu Elihle Solutions, driving digital inclusion and ICT growth across South Africa's underserved communities.</p>
          </div>
        </div>

        <div style={{ marginTop: 72, background: `linear-gradient(135deg, rgba(44,55,146,.12), rgba(191,34,147,.06))`, border: `1px solid ${C.glassBorder}`, borderRadius: 20, padding: "36px 40px" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🤝</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, marginBottom: 10 }}>We're Growing</div>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, fontWeight: 300, lineHeight: 1.65, maxWidth: 420, margin: "0 auto" }}>Isu Elihle Solutions is expanding its team. If you're passionate about digital inclusion and ICT in South Africa, we'd love to hear from you.</p>
        </div>
      </div>
    </div>
  );
}

// ── CONTACT PAGE ──────────────────────────────────────────────
function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ minHeight: "100vh", padding: "120px 64px 80px" }}>
      <Orbs />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "80px", maxWidth: 1100, margin: "0 auto", alignItems: "start" }}>
          <div>
            <SectionTag>Get In Touch</SectionTag>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(2rem,3.5vw,2.8rem)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
              Let's Connect <GradText>Your World.</GradText>
            </h2>
            <p style={{ color: "rgba(255,255,255,.55)", fontWeight: 300, lineHeight: 1.7, marginBottom: 32 }}>Whether you're a home user, business, municipality, or ISP partner — we'd love to hear from you.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
              {[["📍", "Eastern Cape, South Africa"], ["🌐", "www.isu-elihle.co.za"], ["📧", "hello@isu-elihle.co.za"]].map(([icon, val]) => (
                <div key={val} style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 14, color: "rgba(255,255,255,.7)" }}>
                  <span style={{ fontSize: 18 }}>{icon}</span>{val}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[["f","#1877f2"],["in","#0077b5"],["ig","#e1306c"],["𝕏","#1da1f2"]].map(([icon, col]) => (
                <a key={icon} href="#" style={{ width: 38, height: 38, borderRadius: "50%", background: C.glass, border: `1px solid ${C.glassBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: C.muted, textDecoration: "none", transition: "all .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = `${col}22`; e.currentTarget.style.borderColor = `${col}55`; e.currentTarget.style.color = col; }}
                  onMouseLeave={e => { e.currentTarget.style.background = C.glass; e.currentTarget.style.borderColor = C.glassBorder; e.currentTarget.style.color = C.muted; }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div style={{ background: C.glass, border: `1px solid ${C.glassBorder}`, borderRadius: 24, padding: "36px 40px", backdropFilter: "blur(20px)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0", animation: "checkPop .4s ease" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Message Sent!</div>
                <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14 }}>We'll get back to you within 1–2 business days.</p>
              </div>
            ) : (
              <>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  {[["First Name","text","Sipho"],["Last Name","text","Dlamini"]].map(([l,t,p]) => (
                    <div key={l}><label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, fontWeight: 500, display: "block", marginBottom: 6 }}>{l}</label><input type={t} placeholder={p} style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,.05)", border: `1px solid ${C.glassBorder}`, borderRadius: 10, color: "#fff", fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif" }} /></div>
                  ))}
                </div>
                {[["Email","email","hello@company.co.za"],["Phone","tel","071 234 5678"]].map(([l,t,p]) => (
                  <div key={l} style={{ marginBottom: 14 }}><label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, fontWeight: 500, display: "block", marginBottom: 6 }}>{l}</label><input type={t} placeholder={p} style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,.05)", border: `1px solid ${C.glassBorder}`, borderRadius: 10, color: "#fff", fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif" }} /></div>
                ))}
                <div style={{ marginBottom: 14 }}><label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, fontWeight: 500, display: "block", marginBottom: 6 }}>Subject</label>
                  <select style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,.05)", border: `1px solid ${C.glassBorder}`, borderRadius: 10, color: "#fff", fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif" }}>
                    {["General Enquiry","Fibre / 5G Quote","Business ICT Solutions","Partnership / Reselling","Technical Support","Other"].map(o => <option key={o} style={{ background: "#1a1a2e" }}>{o}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 20 }}><label style={{ fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: C.muted, fontWeight: 500, display: "block", marginBottom: 6 }}>Message</label><textarea placeholder="Tell us how we can help..." style={{ width: "100%", padding: "11px 14px", background: "rgba(255,255,255,.05)", border: `1px solid ${C.glassBorder}`, borderRadius: 10, color: "#fff", fontSize: 13, outline: "none", fontFamily: "'DM Sans',sans-serif", minHeight: 110, resize: "vertical", fontWeight: 300 }} /></div>
                <button onClick={() => setSent(true)} style={{ width: "100%", padding: "13px", background: `linear-gradient(135deg, ${C.magenta}, ${C.navy})`, color: "#fff", border: "none", borderRadius: 50, fontFamily: "'DM Sans',sans-serif", fontSize: 14, fontWeight: 500, cursor: "pointer", boxShadow: "0 8px 25px rgba(191,34,147,.3)", letterSpacing: "0.04em" }}>Send Message →</button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FOOTER ────────────────────────────────────────────────────
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: `1px solid ${C.glassBorder}`, padding: "40px 64px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 24, background: "rgba(255,255,255,.01)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setPage("home")}>
        <img src={`data:image/png;base64,${ICON_B64}`} alt="logo" style={{ height: 28 }} />
        <div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em" }}>ISU ELIHLE SOLUTIONS</div>
          <div style={{ fontSize: 9, color: C.muted, letterSpacing: "0.14em" }}>Business Consultants</div>
        </div>
      </div>
      <div style={{ fontSize: 12, color: C.muted }}>© 2025 Isu Elihle Solutions. All rights reserved.</div>
      <div style={{ display: "flex", gap: 24 }}>
        {["Privacy Policy","Terms of Service"].map(l => (
          <span key={l} style={{ fontSize: 12, color: C.muted, cursor: "pointer", transition: "color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color = C.magenta}
            onMouseLeave={e => e.currentTarget.style.color = C.muted}>{l}</span>
        ))}
      </div>
    </footer>
  );
}

// ── APP ───────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [coveredArea, setCoveredArea] = useState(null);
  const [orderRef, setOrderRef] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const navigate = (p) => setPage(p);

  return (
    <>
      <style>{globalStyles}</style>
      <Nav page={page} setPage={navigate} />
      <main>
        {page === "home" && <HomePage setPage={navigate} />}
        {page === "services" && <ServicesPage setPage={navigate} />}
        {page === "coverage" && <CoveragePage setPage={navigate} setCoveredArea={setCoveredArea} />}
        {page === "order" && <OrderPage coveredArea={coveredArea} setPage={navigate} setOrderRef={setOrderRef} />}
        {page === "track" && <TrackPage orderRef={orderRef} setPage={navigate} />}
        {page === "team" && <TeamPage />}
        {page === "contact" && <ContactPage />}
      </main>
      <Footer setPage={navigate} />
    </>
  );
}

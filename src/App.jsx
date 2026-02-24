import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════════
const C = {
  bg: "#1a1a2e",
  bgLight: "#16213e",
  bgCard: "#0f3460",
  plumbob: "#39FF14",
  gold: "#FFD700",
  velvet: "#8B0000",
  neon: "#FF1493",
  neonBlue: "#00BFFF",
  text: "#ffffff",
  textMuted: "#a0a0a0",
  success: "#39FF14",
  error: "#FF4444",
};

// ═══════════════════════════════════════════════════════════════════════════════
// 3D AVATAR COLORS (soft, clay-like)
// ═══════════════════════════════════════════════════════════════════════════════
const AVATAR_COLORS = [
  { base: "#A8D5E5", shadow: "#7FB3C7", highlight: "#C5E8F2" }, // Soft blue
  { base: "#F5B7B1", shadow: "#E59086", highlight: "#FADBD8" }, // Soft pink
  { base: "#ABEBC6", shadow: "#82D9A0", highlight: "#D5F5E3" }, // Soft green
  { base: "#F9E79F", shadow: "#F4D03F", highlight: "#FCF3CF" }, // Soft yellow
  { base: "#D7BDE2", shadow: "#BB8FCE", highlight: "#E8DAEF" }, // Soft purple
  { base: "#F5CBA7", shadow: "#EB984E", highlight: "#FDEBD0" }, // Soft orange
  { base: "#AED6F1", shadow: "#85C1E9", highlight: "#D6EAF8" }, // Sky blue
  { base: "#F1948A", shadow: "#E74C3C", highlight: "#FADBD8" }, // Coral
];

// ═══════════════════════════════════════════════════════════════════════════════
// INITIAL BANNED NAMES WITH BOSSES
// ═══════════════════════════════════════════════════════════════════════════════
const INITIAL_BANNED = [
  { name: "Cody", boss: "Shawn", type: "robot", colorIdx: 0 },
  { name: "Kitty", boss: "Cat", type: "cat", colorIdx: 1 },
  { name: "Mikala", boss: "Dr. Novak", type: "person", colorIdx: 2 },
  { name: "Samantha", boss: "Dr. Mike", type: "person", colorIdx: 3 },
  { name: "Shadowfax", boss: "Kelsey", type: "horse", colorIdx: 4 },
  { name: "Alexa", boss: "Jeff", type: "circle", colorIdx: 5 },
  { name: "Siri", boss: "Tim", type: "circle", colorIdx: 6 },
  { name: "Claude", boss: "Dario", type: "blob", colorIdx: 7 },
  { name: "Jarvis", boss: "Tony", type: "robot", colorIdx: 0 },
  { name: "Gemini", boss: "Sundar", type: "blob", colorIdx: 1 },
];

const AVATAR_TYPES = ["robot", "cat", "horse", "person", "circle", "blob", "star", "heart"];

// ═══════════════════════════════════════════════════════════════════════════════
// 3D AVATAR COMPONENT (CSS-based clay style)
// ═══════════════════════════════════════════════════════════════════════════════
function Avatar3D({ type = "blob", colorIdx = 0, size = 80, dancing = false }) {
  const colors = AVATAR_COLORS[colorIdx % AVATAR_COLORS.length];
  
  const baseStyle = {
    width: size,
    height: size,
    position: "relative",
    filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
    animation: dancing ? "dance3d 0.6s ease-in-out infinite alternate" : "none",
  };
  
  // Different shapes based on type
  const shapes = {
    robot: (
      <svg viewBox="0 0 100 100" style={baseStyle}>
        <defs>
          <linearGradient id={`grad-${colorIdx}-robot`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.highlight} />
            <stop offset="50%" stopColor={colors.base} />
            <stop offset="100%" stopColor={colors.shadow} />
          </linearGradient>
        </defs>
        {/* Body */}
        <rect x="25" y="35" width="50" height="50" rx="8" fill={`url(#grad-${colorIdx}-robot)`} />
        {/* Head */}
        <rect x="30" y="10" width="40" height="30" rx="6" fill={`url(#grad-${colorIdx}-robot)`} />
        {/* Eyes */}
        <circle cx="40" cy="22" r="5" fill="#333" />
        <circle cx="60" cy="22" r="5" fill="#333" />
        <circle cx="42" cy="20" r="2" fill="#fff" />
        <circle cx="62" cy="20" r="2" fill="#fff" />
        {/* Antenna */}
        <line x1="50" y1="10" x2="50" y2="2" stroke={colors.shadow} strokeWidth="3" strokeLinecap="round" />
        <circle cx="50" cy="2" r="4" fill={colors.highlight} />
      </svg>
    ),
    cat: (
      <svg viewBox="0 0 100 100" style={baseStyle}>
        <defs>
          <linearGradient id={`grad-${colorIdx}-cat`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.highlight} />
            <stop offset="50%" stopColor={colors.base} />
            <stop offset="100%" stopColor={colors.shadow} />
          </linearGradient>
        </defs>
        {/* Ears */}
        <polygon points="20,35 30,10 40,35" fill={`url(#grad-${colorIdx}-cat)`} />
        <polygon points="60,35 70,10 80,35" fill={`url(#grad-${colorIdx}-cat)`} />
        {/* Head */}
        <ellipse cx="50" cy="55" rx="35" ry="32" fill={`url(#grad-${colorIdx}-cat)`} />
        {/* Eyes */}
        <ellipse cx="38" cy="50" rx="8" ry="10" fill="#333" />
        <ellipse cx="62" cy="50" rx="8" ry="10" fill="#333" />
        <ellipse cx="40" cy="48" rx="3" ry="4" fill="#fff" />
        <ellipse cx="64" cy="48" rx="3" ry="4" fill="#fff" />
        {/* Nose */}
        <ellipse cx="50" cy="62" rx="4" ry="3" fill={colors.shadow} />
        {/* Whiskers */}
        <line x1="20" y1="58" x2="35" y2="60" stroke={colors.shadow} strokeWidth="1.5" />
        <line x1="20" y1="65" x2="35" y2="65" stroke={colors.shadow} strokeWidth="1.5" />
        <line x1="65" y1="60" x2="80" y2="58" stroke={colors.shadow} strokeWidth="1.5" />
        <line x1="65" y1="65" x2="80" y2="65" stroke={colors.shadow} strokeWidth="1.5" />
      </svg>
    ),
    horse: (
      <svg viewBox="0 0 100 100" style={baseStyle}>
        <defs>
          <linearGradient id={`grad-${colorIdx}-horse`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.highlight} />
            <stop offset="50%" stopColor={colors.base} />
            <stop offset="100%" stopColor={colors.shadow} />
          </linearGradient>
        </defs>
        {/* Mane */}
        <path d="M55,15 Q65,5 60,20 Q70,15 65,30 Q75,25 68,40" fill="none" stroke={colors.shadow} strokeWidth="6" strokeLinecap="round" />
        {/* Head */}
        <ellipse cx="45" cy="45" rx="25" ry="30" fill={`url(#grad-${colorIdx}-horse)`} />
        {/* Snout */}
        <ellipse cx="35" cy="60" rx="15" ry="18" fill={`url(#grad-${colorIdx}-horse)`} />
        {/* Eye */}
        <circle cx="50" cy="38" r="6" fill="#333" />
        <circle cx="52" cy="36" r="2" fill="#fff" />
        {/* Nostril */}
        <circle cx="28" cy="62" r="3" fill={colors.shadow} />
        {/* Ear */}
        <ellipse cx="55" cy="20" rx="6" ry="12" fill={`url(#grad-${colorIdx}-horse)`} />
      </svg>
    ),
    person: (
      <svg viewBox="0 0 100 100" style={baseStyle}>
        <defs>
          <linearGradient id={`grad-${colorIdx}-person`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.highlight} />
            <stop offset="50%" stopColor={colors.base} />
            <stop offset="100%" stopColor={colors.shadow} />
          </linearGradient>
        </defs>
        {/* Hair */}
        <ellipse cx="50" cy="30" rx="28" ry="25" fill={colors.shadow} />
        {/* Face */}
        <ellipse cx="50" cy="45" rx="25" ry="28" fill="#FDBF9E" />
        {/* Eyes */}
        <circle cx="40" cy="42" r="4" fill="#333" />
        <circle cx="60" cy="42" r="4" fill="#333" />
        <circle cx="41" cy="41" r="1.5" fill="#fff" />
        <circle cx="61" cy="41" r="1.5" fill="#fff" />
        {/* Smile */}
        <path d="M40,55 Q50,62 60,55" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
        {/* Body */}
        <ellipse cx="50" cy="90" rx="22" ry="18" fill={`url(#grad-${colorIdx}-person)`} />
      </svg>
    ),
    circle: (
      <svg viewBox="0 0 100 100" style={baseStyle}>
        <defs>
          <radialGradient id={`grad-${colorIdx}-circle`} cx="30%" cy="30%">
            <stop offset="0%" stopColor={colors.highlight} />
            <stop offset="70%" stopColor={colors.base} />
            <stop offset="100%" stopColor={colors.shadow} />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="40" fill={`url(#grad-${colorIdx}-circle)`} />
        {/* Eyes */}
        <circle cx="38" cy="45" r="6" fill="#333" />
        <circle cx="62" cy="45" r="6" fill="#333" />
        <circle cx="40" cy="43" r="2" fill="#fff" />
        <circle cx="64" cy="43" r="2" fill="#fff" />
        {/* Smile */}
        <path d="M35,60 Q50,72 65,60" fill="none" stroke="#333" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
    blob: (
      <svg viewBox="0 0 100 100" style={baseStyle}>
        <defs>
          <radialGradient id={`grad-${colorIdx}-blob`} cx="30%" cy="30%">
            <stop offset="0%" stopColor={colors.highlight} />
            <stop offset="70%" stopColor={colors.base} />
            <stop offset="100%" stopColor={colors.shadow} />
          </radialGradient>
        </defs>
        <path d="M50,10 Q80,20 85,50 Q80,80 50,90 Q20,80 15,50 Q20,20 50,10" fill={`url(#grad-${colorIdx}-blob)`} />
        {/* Eyes */}
        <circle cx="38" cy="45" r="5" fill="#333" />
        <circle cx="62" cy="45" r="5" fill="#333" />
        <circle cx="40" cy="43" r="2" fill="#fff" />
        <circle cx="64" cy="43" r="2" fill="#fff" />
        {/* Cute blush */}
        <ellipse cx="30" cy="55" rx="6" ry="3" fill="#FFB6C1" opacity="0.5" />
        <ellipse cx="70" cy="55" rx="6" ry="3" fill="#FFB6C1" opacity="0.5" />
      </svg>
    ),
    star: (
      <svg viewBox="0 0 100 100" style={baseStyle}>
        <defs>
          <radialGradient id={`grad-${colorIdx}-star`} cx="30%" cy="30%">
            <stop offset="0%" stopColor={colors.highlight} />
            <stop offset="70%" stopColor={colors.base} />
            <stop offset="100%" stopColor={colors.shadow} />
          </radialGradient>
        </defs>
        <polygon points="50,5 61,35 95,35 68,57 79,90 50,70 21,90 32,57 5,35 39,35" fill={`url(#grad-${colorIdx}-star)`} />
        {/* Eyes */}
        <circle cx="42" cy="45" r="4" fill="#333" />
        <circle cx="58" cy="45" r="4" fill="#333" />
        <circle cx="43" cy="44" r="1.5" fill="#fff" />
        <circle cx="59" cy="44" r="1.5" fill="#fff" />
        {/* Smile */}
        <path d="M44,55 Q50,60 56,55" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    heart: (
      <svg viewBox="0 0 100 100" style={baseStyle}>
        <defs>
          <radialGradient id={`grad-${colorIdx}-heart`} cx="30%" cy="30%">
            <stop offset="0%" stopColor={colors.highlight} />
            <stop offset="70%" stopColor={colors.base} />
            <stop offset="100%" stopColor={colors.shadow} />
          </radialGradient>
        </defs>
        <path d="M50,88 C20,60 5,40 25,25 C40,15 50,30 50,30 C50,30 60,15 75,25 C95,40 80,60 50,88" fill={`url(#grad-${colorIdx}-heart)`} />
        {/* Eyes */}
        <circle cx="38" cy="45" r="4" fill="#333" />
        <circle cx="62" cy="45" r="4" fill="#333" />
        <circle cx="39" cy="44" r="1.5" fill="#fff" />
        <circle cx="63" cy="44" r="1.5" fill="#fff" />
      </svg>
    ),
  };
  
  return shapes[type] || shapes.blob;
}

// ═══════════════════════════════════════════════════════════════════════════════
// BOUNCER RESPONSES  
// ═══════════════════════════════════════════════════════════════════════════════
const REJECTION_LINES = [
  "HAHAHAHA! That name?! Get outta here! 😂",
  "*laughs maniacally* Oh honey, no...",
  "You thought you were original? Cute. NEXT!",
  "*wipes tear* That's hilarious. Denied.",
  "The audacity! That's been taken FOREVER.",
];

const APPROVAL_LINES = [
  "Wait... that's actually original? Respect!",
  "Well well well, look who's creative!",
  "*slow clap* You may enter... for now.",
  "Alright, you pass. Don't make me regret this.",
];

// ═══════════════════════════════════════════════════════════════════════════════
// PLUMBOB (Sims Diamond)
// ═══════════════════════════════════════════════════════════════════════════════
function Plumbob({ size = 40 }) {
  return (
    <div style={{ animation: "plumbobFloat 2s ease-in-out infinite" }}>
      <svg width={size} height={size * 1.6} viewBox="0 0 40 64">
        <defs>
          <linearGradient id="plumbobGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7FFF7F" />
            <stop offset="50%" stopColor="#39FF14" />
            <stop offset="100%" stopColor="#228B22" />
          </linearGradient>
        </defs>
        <polygon points="20,0 40,32 20,64 0,32" fill="url(#plumbobGrad)" style={{ filter: `drop-shadow(0 0 10px ${C.plumbob})` }} />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEED BAR (Sims-style)
// ═══════════════════════════════════════════════════════════════════════════════
function NeedBar({ label, value }) {
  const color = value > 60 ? C.plumbob : value > 30 ? C.gold : C.error;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, marginBottom: 4 }}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div style={{ height: 10, background: "#1a1a2e", borderRadius: 5, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 5, transition: "all 0.5s" }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LANDING SCREEN (Sims-style with plumbob)
// ═══════════════════════════════════════════════════════════════════════════════
function LandingScreen({ onStart }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${C.bg} 0%, #0a0a1a 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 20, textAlign: "center",
    }}>
      {/* Plumbob Diamond */}
      <div style={{ marginBottom: 20 }}>
        <Plumbob size={50} />
      </div>
      
      <div style={{ fontSize: 12, color: C.plumbob, letterSpacing: 4, marginBottom: 12 }}>VIP MEDICAL GROUP PRESENTS</div>
      
      <h1 style={{
        fontSize: "clamp(32px, 7vw, 52px)",
        background: `linear-gradient(135deg, ${C.plumbob} 0%, ${C.neonBlue} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: 24,
        fontWeight: 800,
      }}>
        THE ORIGINALITY CHECKER
      </h1>
      
      <p style={{ maxWidth: 450, fontSize: 18, lineHeight: 1.8, color: C.textMuted, marginBottom: 16 }}>
        Innovation is hard...
      </p>
      <p style={{ fontSize: 22, color: C.text, fontWeight: 600, marginBottom: 8 }}>
        ...for now...
      </p>
      <p style={{ fontSize: 16, color: C.neon, fontStyle: "italic", marginBottom: 32 }}>
        *evil laugh* 😈
      </p>
      
      <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 24, maxWidth: 400 }}>
        Use this tool to avoid the embarrassment of naming your AI the same thing as everyone else.
      </p>
      
      {/* Needs Panel */}
      <div style={{
        background: C.bgCard, borderRadius: 16, padding: 20, marginBottom: 32,
        width: 280, border: `2px solid ${C.plumbob}30`,
      }}>
        <div style={{ fontSize: 11, color: C.plumbob, letterSpacing: 2, marginBottom: 12 }}>YOUR CREATIVITY STATUS</div>
        <NeedBar label="Originality" value={15} />
        <NeedBar label="Self-Awareness" value={45} />
        <NeedBar label="Name Creativity" value={5} />
      </div>
      
      <button type="button" onClick={onStart} style={{
        padding: "18px 48px", fontSize: 18, fontWeight: 700,
        background: `linear-gradient(135deg, ${C.plumbob} 0%, ${C.neonBlue} 100%)`,
        border: "none", borderRadius: 12, color: C.bg, cursor: "pointer",
        boxShadow: `0 0 30px ${C.plumbob}40`,
      }}>
        ▶ ENTER THE CLUB
      </button>
      
      <style>{`
        @keyframes plumbobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BOUNCER SCREEN (Now asks for BOTH names + Avatar selection)
// ═══════════════════════════════════════════════════════════════════════════════
function BouncerScreen({ bannedList, onApproved }) {
  const [aiName, setAiName] = useState("");
  const [bossName, setBossName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [bouncerLine, setBouncerLine] = useState("Two names. Your AI's name, and YOUR name. Let's go.");
  
  // Get taken avatar types
  const takenAvatars = bannedList.map(b => b.type);
  const availableAvatars = AVATAR_TYPES.filter(t => !takenAvatars.includes(t));
  
  const checkName = () => {
    if (!aiName.trim() || !bossName.trim()) return;
    setChecking(true);
    setBouncerLine("*flips through clipboard*");
    
    setTimeout(() => {
      const isTaken = bannedList.some(b => b.name.toLowerCase() === aiName.trim().toLowerCase());
      
      if (isTaken) {
        setBouncerLine(REJECTION_LINES[Math.floor(Math.random() * REJECTION_LINES.length)]);
        setResult("rejected");
      } else {
        setBouncerLine(APPROVAL_LINES[Math.floor(Math.random() * APPROVAL_LINES.length)]);
        setResult("approved");
        // Auto-select first available avatar if none selected
        if (!selectedAvatar && availableAvatars.length > 0) {
          setSelectedAvatar(availableAvatars[0]);
        }
      }
      setChecking(false);
    }, 2000);
  };
  
  const handleConfirm = () => {
    if (!selectedAvatar) return;
    const colorIdx = Math.floor(Math.random() * AVATAR_COLORS.length);
    onApproved({ name: aiName.trim(), boss: bossName.trim(), type: selectedAvatar, colorIdx });
  };
  
  const reset = () => {
    setResult(null);
    setAiName("");
    setBossName("");
    setBouncerLine("Two names. Your AI's name, and YOUR name. Let's go.");
  };
  
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, #1a0a2a 0%, ${C.bg} 100%)`,
      display: "flex", flexDirection: "column",
    }}>
      {/* Club Sign */}
      <div style={{
        background: `linear-gradient(180deg, ${C.velvet} 0%, #2a0a0a 100%)`,
        padding: "30px 20px",
        textAlign: "center",
        borderBottom: `4px solid ${C.gold}`,
      }}>
        <h1 style={{ fontSize: 36, color: C.gold, textShadow: `0 0 30px ${C.gold}60`, margin: 0 }}>
          INNOVATION CLUB
        </h1>
      </div>
      
      {/* Main Scene */}
      <div style={{
        flex: 1,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}>
        {/* Bouncer Avatar */}
        <Avatar3D type="person" colorIdx={5} size={100} />
        <div style={{ fontSize: 12, color: C.gold, marginTop: 8, letterSpacing: 2 }}>BOUNCER</div>
        
        {/* Speech Bubble */}
        <div style={{
          margin: "20px 0",
          padding: "16px 24px",
          background: result === "rejected" ? "#4a1a1a" : result === "approved" ? "#1a4a1a" : C.bgCard,
          border: `2px solid ${result === "rejected" ? C.error : result === "approved" ? C.success : C.neonBlue}`,
          borderRadius: 16,
          maxWidth: 350,
          textAlign: "center",
        }}>
          <p style={{ color: C.text, fontSize: 15, margin: 0 }}>"{bouncerLine}"</p>
        </div>
        
        {/* Velvet Rope */}
        <div style={{
          width: 200, height: 10,
          background: `linear-gradient(90deg, ${C.gold}, ${C.velvet}, ${C.gold})`,
          borderRadius: 5,
          marginBottom: 24,
        }} />
        
        {/* Input Panel */}
        <div style={{
          background: C.bgCard,
          borderRadius: 20,
          padding: 28,
          width: "100%",
          maxWidth: 380,
        }}>
          {!result && (
            <>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 11, color: C.neonBlue, letterSpacing: 2, marginBottom: 8 }}>
                  YOUR AI'S NAME
                </label>
                <input
                  type="text"
                  value={aiName}
                  onChange={e => setAiName(e.target.value)}
                  placeholder="e.g., Jarvis, Friday, HAL..."
                  disabled={checking}
                  style={{
                    width: "100%", padding: 14, fontSize: 16,
                    background: C.bgLight, border: `2px solid ${C.neonBlue}50`,
                    borderRadius: 10, color: C.text, boxSizing: "border-box",
                  }}
                />
              </div>
              
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: "block", fontSize: 11, color: C.gold, letterSpacing: 2, marginBottom: 8 }}>
                  YOUR NAME (THE BOSS)
                </label>
                <input
                  type="text"
                  value={bossName}
                  onChange={e => setBossName(e.target.value)}
                  placeholder="e.g., Tony Stark, You..."
                  disabled={checking}
                  style={{
                    width: "100%", padding: 14, fontSize: 16,
                    background: C.bgLight, border: `2px solid ${C.gold}50`,
                    borderRadius: 10, color: C.text, boxSizing: "border-box",
                  }}
                />
              </div>
              
              <button type="button" onClick={checkName} disabled={!aiName.trim() || !bossName.trim() || checking} style={{
                width: "100%", padding: 16, fontSize: 16, fontWeight: 700,
                background: aiName.trim() && bossName.trim() && !checking ? `linear-gradient(135deg, ${C.plumbob}, ${C.neonBlue})` : "#333",
                border: "none", borderRadius: 12,
                color: aiName.trim() && bossName.trim() && !checking ? C.bg : C.textMuted,
                cursor: aiName.trim() && bossName.trim() && !checking ? "pointer" : "not-allowed",
              }}>
                {checking ? "🔍 CHECKING..." : "CHECK ORIGINALITY"}
              </button>
            </>
          )}
          
          {result === "rejected" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>😤</div>
              <p style={{ color: C.error, fontSize: 16, marginBottom: 20 }}>
                "{aiName}" is TAKEN. Get out!
              </p>
              <button type="button" onClick={reset} style={{
                padding: "14px 32px", background: C.bgLight,
                border: `2px solid ${C.error}`, borderRadius: 10,
                color: C.text, cursor: "pointer",
              }}>
                🚶 Walk of Shame
              </button>
            </div>
          )}
          
          {result === "approved" && (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: C.success, fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
                "{aiName}" is ORIGINAL!
              </p>
              <p style={{ color: C.textMuted, fontSize: 12, marginBottom: 16 }}>
                Now pick your avatar, {bossName}:
              </p>
              
              {/* Avatar Selection */}
              <div style={{ 
                display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, 
                marginBottom: 20, padding: 12, background: C.bgLight, borderRadius: 12,
              }}>
                {AVATAR_TYPES.map((type, idx) => {
                  const isTaken = takenAvatars.includes(type);
                  const isSelected = selectedAvatar === type;
                  return (
                    <div
                      key={type}
                      onClick={() => !isTaken && setSelectedAvatar(type)}
                      style={{
                        padding: 6,
                        borderRadius: 10,
                        border: `2px solid ${isSelected ? C.plumbob : isTaken ? C.error + "50" : "transparent"}`,
                        background: isSelected ? C.plumbob + "20" : isTaken ? C.error + "10" : "transparent",
                        opacity: isTaken ? 0.4 : 1,
                        cursor: isTaken ? "not-allowed" : "pointer",
                        position: "relative",
                      }}
                    >
                      <Avatar3D type={type} colorIdx={idx} size={50} />
                      {isTaken && (
                        <div style={{
                          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
                          color: C.error, fontSize: 24, fontWeight: 700,
                        }}>✕</div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              {availableAvatars.length === 0 && (
                <p style={{ color: C.error, fontSize: 12, marginBottom: 12 }}>
                  😱 All avatars are taken! How embarrassing...
                </p>
              )}
              
              <div style={{ display: "flex", gap: 12 }}>
                <button type="button" onClick={reset} style={{
                  flex: 1, padding: 14, background: C.bgLight,
                  border: `1px solid ${C.textMuted}`, borderRadius: 10,
                  color: C.textMuted, cursor: "pointer",
                }}>
                  Nevermind
                </button>
                <button type="button" onClick={handleConfirm} disabled={!selectedAvatar} style={{
                  flex: 1, padding: 14,
                  background: selectedAvatar ? `linear-gradient(135deg, ${C.plumbob}, ${C.neonBlue})` : "#333",
                  border: "none", borderRadius: 10,
                  color: selectedAvatar ? C.bg : C.textMuted, fontWeight: 700, 
                  cursor: selectedAvatar ? "pointer" : "not-allowed",
                }}>
                  🎉 ENTER!
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div style={{ marginTop: 20, color: C.textMuted, fontSize: 12 }}>
          👥 {bannedList.length} names already inside
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLUB INTERIOR (3D Avatars with Hover)
// ═══════════════════════════════════════════════════════════════════════════════
function ClubInterior({ bannedList, newMember, onBack }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, #0a0a1a 0%, #1a0a2a 100%)`,
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Disco Ball */}
      <div style={{
        position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
        width: 50, height: 50,
        background: `radial-gradient(circle at 30% 30%, #fff, #888)`,
        borderRadius: "50%",
        boxShadow: `0 0 40px #fff, 0 0 80px ${C.neonBlue}`,
        animation: "spin 4s linear infinite",
      }} />
      
      {/* Welcome Banner */}
      {newMember && (
        <div style={{
          position: "absolute", top: 90, left: "50%", transform: "translateX(-50%)",
          padding: "10px 24px",
          background: `linear-gradient(135deg, ${C.plumbob}, ${C.neonBlue})`,
          borderRadius: 20, color: C.bg, fontWeight: 700, fontSize: 14, zIndex: 10,
        }}>
          🌟 {newMember.name} ({newMember.boss}'s AI) just joined! 🌟
        </div>
      )}
      
      {/* Dance Floor */}
      <div style={{
        paddingTop: 140, paddingBottom: 100,
        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 16,
        padding: "140px 20px 100px",
      }}>
        {bannedList.map((member, idx) => (
          <div
            key={member.name}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              position: "relative",
              background: member.name === newMember?.name ? `${C.plumbob}20` : C.bgCard,
              border: `2px solid ${member.name === newMember?.name ? C.plumbob : C.neonBlue}30`,
              borderRadius: 16, padding: 12, width: 100, textAlign: "center",
              cursor: "pointer", transition: "transform 0.2s",
              transform: hoveredIdx === idx ? "scale(1.1)" : "scale(1)",
            }}
          >
            <Avatar3D type={member.type} colorIdx={member.colorIdx} size={70} dancing={true} />
            
            {/* Hover Info */}
            {hoveredIdx === idx && (
              <div style={{
                position: "absolute", bottom: "100%", left: "50%", transform: "translateX(-50%)",
                background: C.bgLight, border: `2px solid ${C.gold}`,
                borderRadius: 10, padding: "10px 14px", marginBottom: 8,
                whiteSpace: "nowrap", zIndex: 20,
                boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
              }}>
                <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{member.name}</div>
                <div style={{ color: C.gold, fontSize: 11, marginTop: 4 }}>Boss: {member.boss}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Disco Lights */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, ${C.neon}10 0%, transparent 25%),
          radial-gradient(circle at 80% 30%, ${C.neonBlue}10 0%, transparent 25%),
          radial-gradient(circle at 40% 70%, ${C.plumbob}10 0%, transparent 25%)
        `,
        pointerEvents: "none",
        animation: "discoLights 3s ease-in-out infinite alternate",
      }} />
      
      {/* Back Button */}
      <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <button type="button" onClick={onBack} style={{
          padding: "14px 32px", background: "rgba(0,0,0,0.8)",
          border: `2px solid ${C.plumbob}`, borderRadius: 30,
          color: C.plumbob, cursor: "pointer", fontWeight: 600,
        }}>
          🚪 Check Another Name
        </button>
      </div>
      
      <style>{`
        @keyframes dance3d {
          0% { transform: translateY(0) rotate(-3deg); }
          100% { transform: translateY(-8px) rotate(3deg); }
        }
        @keyframes spin {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }
        @keyframes discoLights {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLUB MUSIC
// ═══════════════════════════════════════════════════════════════════════════════
const CLUB_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/03/15/audio_8cb749d484.mp3";

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [bannedList, setBannedList] = useState(INITIAL_BANNED);
  const [newMember, setNewMember] = useState(null);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);
  const [audioLoaded, setAudioLoaded] = useState(false);
  
  useEffect(() => {
    const audio = new Audio(CLUB_MUSIC_URL);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = "auto";
    audio.addEventListener("canplaythrough", () => setAudioLoaded(true));
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);
  
  useEffect(() => {
    if (!audioRef.current) return;
    const targetVol = muted ? 0 : screen === "landing" ? 0 : screen === "bouncer" ? 0.15 : 0.4;
    audioRef.current.volume = targetVol;
  }, [screen, muted]);
  
  const handleStart = () => {
    if (audioRef.current && audioLoaded) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    }
    setScreen("bouncer");
  };
  
  const handleApproved = (member) => {
    setBannedList(prev => [...prev, member]);
    setNewMember(member);
    setScreen("club");
  };
  
  const handleBack = () => {
    setNewMember(null);
    setScreen("bouncer");
  };
  
  const MuteButton = () => screen !== "landing" && (
    <button type="button" onClick={() => setMuted(!muted)} style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 1000,
      width: 48, height: 48, borderRadius: "50%",
      background: "rgba(0,0,0,0.7)", border: `2px solid ${C.plumbob}`,
      color: C.plumbob, fontSize: 20, cursor: "pointer",
    }}>
      {muted ? "🔇" : "🔊"}
    </button>
  );
  
  if (screen === "landing") return <LandingScreen onStart={handleStart} />;
  if (screen === "club") return <><ClubInterior bannedList={bannedList} newMember={newMember} onBack={handleBack} /><MuteButton /></>;
  return <><BouncerScreen bannedList={bannedList} onApproved={handleApproved} /><MuteButton /></>;
}

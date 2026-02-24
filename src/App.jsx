import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════════
const C = {
  bg: "#0a0a12",
  bgLight: "#12121f",
  bgCard: "#1a1a2e",
  plumbob: "#39FF14",
  gold: "#FFD700",
  neon: "#FF1493",
  neonBlue: "#00D4FF",
  purple: "#9D4EDD",
  text: "#ffffff",
  textMuted: "#888899",
  success: "#39FF14",
  error: "#FF4444",
};

// ═══════════════════════════════════════════════════════════════════════════════
// INITIAL BANNED NAMES WITH BOSSES
// ═══════════════════════════════════════════════════════════════════════════════
const INITIAL_BANNED = [
  { name: "Cody", boss: "Shawn", avatarDesc: "A friendly robot with blue eyes" },
  { name: "Kitty", boss: "Cat", avatarDesc: "A cute cat with whiskers" },
  { name: "Mikala", boss: "Dr. Novak", avatarDesc: "A stylish blonde professional" },
  { name: "Samantha", boss: "Dr. Mike", avatarDesc: "An elegant AI assistant" },
  { name: "Shadowfax", boss: "Kelsey", avatarDesc: "A majestic white horse" },
  { name: "Alexa", boss: "Jeff", avatarDesc: "A glowing blue orb" },
  { name: "Siri", boss: "Tim", avatarDesc: "A colorful swirl" },
  { name: "Claude", boss: "Dario", avatarDesc: "An orange friendly blob" },
  { name: "Jarvis", boss: "Tony", avatarDesc: "A sleek iron helmet" },
  { name: "Gemini", boss: "Sundar", avatarDesc: "Twin stars orbiting" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// BOUNCER RESPONSES  
// ═══════════════════════════════════════════════════════════════════════════════
const REJECTION_LINES = [
  "HAHAHAHA! That name?! Get outta here! 😂",
  "*cracks knuckles* That name's TAKEN, buddy.",
  "Nice try. That one's been here for YEARS.",
  "*adjusts sunglasses* Nah. Back of the line.",
  "You serious? That's the most basic name ever.",
];

const APPROVAL_LINES = [
  "*nods slowly* Alright... that's fresh. You're in.",
  "Hmm... *checks list twice* ...Welcome to the club.",
  "*surprised* Actually original? Respect. Go ahead.",
  "Finally, someone with creativity. Enter.",
];

// ═══════════════════════════════════════════════════════════════════════════════
// PLUMBOB & NEED BAR
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

function NeedBar({ label, value }) {
  const color = value > 60 ? C.plumbob : value > 30 ? C.gold : C.error;
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, marginBottom: 4 }}>
        <span>{label}</span><span>{value}%</span>
      </div>
      <div style={{ height: 10, background: "#1a1a2e", borderRadius: 5, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 5 }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLUB BUILDING SVG
// ═══════════════════════════════════════════════════════════════════════════════
function ClubBuilding() {
  return (
    <svg viewBox="0 0 400 250" style={{ width: "100%", maxWidth: 500 }}>
      {/* Sky/Background */}
      <rect x="0" y="0" width="400" height="250" fill="#0a0a15" />
      
      {/* Stars */}
      {[...Array(20)].map((_, i) => (
        <circle key={i} cx={Math.random() * 400} cy={Math.random() * 100} r={Math.random() * 1.5 + 0.5} fill="#ffffff" opacity={Math.random() * 0.5 + 0.3} />
      ))}
      
      {/* Building */}
      <rect x="50" y="80" width="300" height="170" fill="#1a1a2e" />
      <rect x="50" y="80" width="300" height="170" fill="url(#buildingGrad)" />
      
      {/* Roof accent */}
      <rect x="45" y="75" width="310" height="10" fill="#2a2a4e" />
      
      {/* Neon sign glow */}
      <ellipse cx="200" cy="110" rx="120" ry="30" fill={C.neon} opacity="0.15" />
      
      {/* INNOVATION CLUB Sign */}
      <rect x="80" y="90" width="240" height="45" rx="5" fill="#1a0a2a" stroke={C.neon} strokeWidth="2" />
      <text x="200" y="120" textAnchor="middle" fill={C.neon} fontSize="20" fontWeight="bold" fontFamily="Arial Black" style={{ filter: `drop-shadow(0 0 10px ${C.neon})` }}>
        INNOVATION CLUB
      </text>
      
      {/* Windows with neon glow */}
      <rect x="70" y="145" width="40" height="50" fill="#0a0a15" stroke={C.purple} strokeWidth="2" />
      <rect x="75" y="150" width="30" height="40" fill={C.purple} opacity="0.3" />
      
      <rect x="130" y="145" width="40" height="50" fill="#0a0a15" stroke={C.neonBlue} strokeWidth="2" />
      <rect x="135" y="150" width="30" height="40" fill={C.neonBlue} opacity="0.3" />
      
      <rect x="230" y="145" width="40" height="50" fill="#0a0a15" stroke={C.neon} strokeWidth="2" />
      <rect x="235" y="150" width="30" height="40" fill={C.neon} opacity="0.3" />
      
      <rect x="290" y="145" width="40" height="50" fill="#0a0a15" stroke={C.plumbob} strokeWidth="2" />
      <rect x="295" y="150" width="30" height="40" fill={C.plumbob} opacity="0.3" />
      
      {/* Door */}
      <rect x="175" y="160" width="50" height="90" fill="#0f0f1a" stroke={C.gold} strokeWidth="3" />
      <rect x="180" y="165" width="40" height="35" fill={C.neonBlue} opacity="0.2" />
      <circle cx="215" cy="210" r="4" fill={C.gold} />
      
      {/* VIP Rope */}
      <line x1="140" y1="240" x2="175" y2="240" stroke={C.gold} strokeWidth="4" />
      <line x1="225" y1="240" x2="260" y2="240" stroke={C.gold} strokeWidth="4" />
      <circle cx="140" cy="240" r="5" fill={C.gold} />
      <circle cx="260" cy="240" r="5" fill={C.gold} />
      
      {/* Ground */}
      <rect x="0" y="245" width="400" height="10" fill="#1a1a2e" />
      
      {/* Gradient definitions */}
      <defs>
        <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2a2a4e" />
          <stop offset="100%" stopColor="#1a1a2e" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BOUNCER SVG (Big tough guy with sunglasses)
// ═══════════════════════════════════════════════════════════════════════════════
function BouncerSVG({ mood = "neutral" }) {
  const moodColors = { neutral: "#333", angry: "#8B0000", happy: "#228B22" };
  const auraColor = mood === "angry" ? C.error : mood === "happy" ? C.plumbob : C.neonBlue;
  
  return (
    <div style={{ position: "relative" }}>
      {/* Glow effect */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        width: 120, height: 120, borderRadius: "50%",
        background: `radial-gradient(circle, ${auraColor}20 0%, transparent 70%)`,
      }} />
      
      <svg viewBox="0 0 100 140" style={{ width: 100, height: 140 }}>
        {/* Body - Big and intimidating */}
        <ellipse cx="50" cy="115" rx="35" ry="25" fill="#1a1a1a" />
        
        {/* Neck */}
        <rect x="40" y="70" width="20" height="15" fill="#8B7355" />
        
        {/* Head */}
        <ellipse cx="50" cy="50" rx="25" ry="28" fill="#A0826D" />
        
        {/* Bald head shine */}
        <ellipse cx="45" cy="35" rx="10" ry="8" fill="#B8977D" opacity="0.5" />
        
        {/* Sunglasses */}
        <rect x="28" y="42" width="18" height="12" rx="2" fill="#0a0a0a" />
        <rect x="54" y="42" width="18" height="12" rx="2" fill="#0a0a0a" />
        <line x1="46" y1="48" x2="54" y2="48" stroke="#0a0a0a" strokeWidth="3" />
        {/* Sunglasses reflection */}
        <line x1="30" y1="45" x2="38" y2="48" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
        <line x1="56" y1="45" x2="64" y2="48" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
        
        {/* Eyebrows - Stern */}
        <line x1="28" y1="38" x2="44" y2="40" stroke="#3a3a3a" strokeWidth="3" strokeLinecap="round" />
        <line x1="56" y1="40" x2="72" y2="38" stroke="#3a3a3a" strokeWidth="3" strokeLinecap="round" />
        
        {/* Nose */}
        <ellipse cx="50" cy="58" rx="4" ry="5" fill="#8B7355" />
        
        {/* Mouth - Slight frown or neutral */}
        {mood === "happy" ? (
          <path d="M40,70 Q50,78 60,70" fill="none" stroke="#5a4a3a" strokeWidth="2" strokeLinecap="round" />
        ) : (
          <line x1="42" y1="72" x2="58" y2="72" stroke="#5a4a3a" strokeWidth="2" strokeLinecap="round" />
        )}
        
        {/* Ear piece */}
        <rect x="72" y="45" width="4" height="15" rx="2" fill="#1a1a1a" />
        <circle cx="74" cy="62" r="3" fill="#1a1a1a" />
        
        {/* Arms crossed indicator - shoulders */}
        <ellipse cx="25" cy="100" rx="12" ry="18" fill="#1a1a1a" />
        <ellipse cx="75" cy="100" rx="12" ry="18" fill="#1a1a1a" />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LANDING SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function LandingScreen({ onStart }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${C.bg} 0%, #05050a 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 20, textAlign: "center",
    }}>
      <div style={{ marginBottom: 20 }}><Plumbob size={50} /></div>
      
      <div style={{ fontSize: 12, color: C.plumbob, letterSpacing: 4, marginBottom: 12 }}>VIP MEDICAL GROUP PRESENTS</div>
      
      <h1 style={{
        fontSize: "clamp(28px, 6vw, 48px)",
        background: `linear-gradient(135deg, ${C.plumbob} 0%, ${C.neonBlue} 100%)`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        marginBottom: 20, fontWeight: 800,
      }}>
        THE ORIGINALITY CHECKER
      </h1>
      
      <p style={{ fontSize: 18, color: C.textMuted, marginBottom: 8 }}>Innovation is hard...</p>
      <p style={{ fontSize: 22, color: C.text, fontWeight: 600, marginBottom: 8 }}>...for now...</p>
      <p style={{ fontSize: 16, color: C.neon, fontStyle: "italic", marginBottom: 24 }}>*evil laugh* 😈</p>
      
      <p style={{ fontSize: 13, color: C.textMuted, marginBottom: 24, maxWidth: 380 }}>
        Use this tool to avoid the embarrassment of naming your AI the same thing as everyone else.
      </p>
      
      <div style={{ background: C.bgCard, borderRadius: 16, padding: 20, marginBottom: 28, width: 260, border: `2px solid ${C.plumbob}30` }}>
        <div style={{ fontSize: 10, color: C.plumbob, letterSpacing: 2, marginBottom: 12 }}>YOUR CREATIVITY STATUS</div>
        <NeedBar label="Originality" value={15} />
        <NeedBar label="Self-Awareness" value={45} />
        <NeedBar label="Name Creativity" value={5} />
      </div>
      
      <button type="button" onClick={onStart} style={{
        padding: "16px 40px", fontSize: 16, fontWeight: 700,
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
// BOUNCER SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function BouncerScreen({ bannedList, onApproved }) {
  const [aiName, setAiName] = useState("");
  const [bossName, setBossName] = useState("");
  const [avatarSuggestion, setAvatarSuggestion] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [bouncerMood, setBouncerMood] = useState("neutral");
  const [bouncerLine, setBouncerLine] = useState("Names. AI and yours. Now.");
  
  const checkName = () => {
    if (!aiName.trim() || !bossName.trim()) return;
    setChecking(true);
    setBouncerLine("*flips through clipboard*");
    
    setTimeout(() => {
      const isTaken = bannedList.some(b => b.name.toLowerCase() === aiName.trim().toLowerCase());
      if (isTaken) {
        setBouncerLine(REJECTION_LINES[Math.floor(Math.random() * REJECTION_LINES.length)]);
        setBouncerMood("angry");
        setResult("rejected");
      } else {
        setBouncerLine(APPROVAL_LINES[Math.floor(Math.random() * APPROVAL_LINES.length)]);
        setBouncerMood("happy");
        setResult("approved");
      }
      setChecking(false);
    }, 2000);
  };
  
  const handleConfirm = () => {
    if (!avatarSuggestion.trim()) return;
    onApproved({ name: aiName.trim(), boss: bossName.trim(), avatarDesc: avatarSuggestion.trim() });
  };
  
  const reset = () => {
    setResult(null); setAiName(""); setBossName(""); setAvatarSuggestion("");
    setBouncerMood("neutral"); setBouncerLine("Names. AI and yours. Now.");
  };
  
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, #0a0a15 0%, ${C.bg} 100%)`, display: "flex", flexDirection: "column" }}>
      {/* Club Building */}
      <div style={{ padding: "20px 20px 0" }}>
        <ClubBuilding />
      </div>
      
      {/* Bouncer Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", padding: 20 }}>
        <BouncerSVG mood={bouncerMood} />
        
        {/* Speech Bubble */}
        <div style={{
          margin: "16px 0",
          padding: "14px 20px",
          background: result === "rejected" ? "#3a1a1a" : result === "approved" ? "#1a3a1a" : C.bgCard,
          border: `2px solid ${result === "rejected" ? C.error : result === "approved" ? C.success : C.neonBlue}`,
          borderRadius: 16, maxWidth: 320, textAlign: "center",
          boxShadow: `0 0 20px ${result === "rejected" ? C.error : result === "approved" ? C.success : C.neonBlue}30`,
        }}>
          <p style={{ color: C.text, fontSize: 14, margin: 0, fontStyle: "italic" }}>"{bouncerLine}"</p>
        </div>
        
        {/* Input Panel */}
        <div style={{ background: C.bgCard, borderRadius: 16, padding: 24, width: "100%", maxWidth: 360 }}>
          {!result && (
            <>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: "block", fontSize: 10, color: C.neonBlue, letterSpacing: 2, marginBottom: 6 }}>YOUR AI'S NAME</label>
                <input type="text" value={aiName} onChange={e => setAiName(e.target.value)} placeholder="e.g., Jarvis, Friday..."
                  disabled={checking} style={{ width: "100%", padding: 12, fontSize: 15, background: C.bgLight, border: `2px solid ${C.neonBlue}40`, borderRadius: 8, color: C.text, boxSizing: "border-box" }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 10, color: C.gold, letterSpacing: 2, marginBottom: 6 }}>YOUR NAME (THE BOSS)</label>
                <input type="text" value={bossName} onChange={e => setBossName(e.target.value)} placeholder="e.g., Tony Stark..."
                  disabled={checking} style={{ width: "100%", padding: 12, fontSize: 15, background: C.bgLight, border: `2px solid ${C.gold}40`, borderRadius: 8, color: C.text, boxSizing: "border-box" }} />
              </div>
              <button type="button" onClick={checkName} disabled={!aiName.trim() || !bossName.trim() || checking} style={{
                width: "100%", padding: 14, fontSize: 15, fontWeight: 700,
                background: aiName.trim() && bossName.trim() && !checking ? `linear-gradient(135deg, ${C.plumbob}, ${C.neonBlue})` : "#333",
                border: "none", borderRadius: 10, color: aiName.trim() && bossName.trim() && !checking ? C.bg : C.textMuted,
                cursor: aiName.trim() && bossName.trim() && !checking ? "pointer" : "not-allowed",
              }}>
                {checking ? "🔍 CHECKING..." : "CHECK THE LIST"}
              </button>
            </>
          )}
          
          {result === "rejected" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🚫</div>
              <p style={{ color: C.error, fontSize: 15, marginBottom: 16 }}>"{aiName}" is TAKEN!</p>
              <button type="button" onClick={reset} style={{ padding: "12px 28px", background: C.bgLight, border: `2px solid ${C.error}`, borderRadius: 8, color: C.text, cursor: "pointer" }}>
                🚶 Try Again
              </button>
            </div>
          )}
          
          {result === "approved" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
              <p style={{ color: C.success, fontSize: 16, fontWeight: 600, marginBottom: 6 }}>"{aiName}" is ORIGINAL!</p>
              <p style={{ color: C.textMuted, fontSize: 12, marginBottom: 16 }}>Describe your AI's avatar to enter:</p>
              
              <textarea
                value={avatarSuggestion}
                onChange={e => setAvatarSuggestion(e.target.value)}
                placeholder="e.g., A cute purple robot with sparkly eyes, A wise owl wearing glasses..."
                style={{
                  width: "100%", padding: 12, fontSize: 14, background: C.bgLight,
                  border: `2px solid ${C.purple}40`, borderRadius: 8, color: C.text,
                  boxSizing: "border-box", minHeight: 70, resize: "none", fontFamily: "inherit",
                }}
              />
              
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button type="button" onClick={reset} style={{ flex: 1, padding: 12, background: C.bgLight, border: `1px solid ${C.textMuted}`, borderRadius: 8, color: C.textMuted, cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="button" onClick={handleConfirm} disabled={!avatarSuggestion.trim()} style={{
                  flex: 1, padding: 12,
                  background: avatarSuggestion.trim() ? `linear-gradient(135deg, ${C.plumbob}, ${C.neonBlue})` : "#333",
                  border: "none", borderRadius: 8, color: avatarSuggestion.trim() ? C.bg : C.textMuted,
                  fontWeight: 700, cursor: avatarSuggestion.trim() ? "pointer" : "not-allowed",
                }}>
                  🎉 ENTER!
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div style={{ marginTop: 16, color: C.textMuted, fontSize: 11 }}>👥 {bannedList.length} names already inside</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLUB INTERIOR
// ═══════════════════════════════════════════════════════════════════════════════
function ClubInterior({ bannedList, newMember, onBack }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  
  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(180deg, #0a0515 0%, #15051a 100%)`, position: "relative", overflow: "hidden" }}>
      {/* Disco Ball */}
      <div style={{
        position: "absolute", top: 20, left: "50%", transform: "translateX(-50%)",
        width: 50, height: 50, background: `radial-gradient(circle at 30% 30%, #fff, #666)`,
        borderRadius: "50%", boxShadow: `0 0 40px #fff, 0 0 80px ${C.neonBlue}40`,
        animation: "spin 4s linear infinite",
      }} />
      
      {/* Welcome Banner */}
      {newMember && (
        <div style={{
          position: "absolute", top: 85, left: "50%", transform: "translateX(-50%)",
          padding: "10px 20px", background: `linear-gradient(135deg, ${C.plumbob}, ${C.neonBlue})`,
          borderRadius: 20, color: C.bg, fontWeight: 700, fontSize: 13, zIndex: 10, textAlign: "center",
        }}>
          🌟 {newMember.name} ({newMember.boss}'s AI) joined! 🌟
        </div>
      )}
      
      {/* Dance Floor */}
      <div style={{ paddingTop: 130, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, padding: "130px 16px 100px" }}>
        {bannedList.map((member, idx) => (
          <div
            key={member.name}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
            style={{
              position: "relative", background: member.name === newMember?.name ? `${C.plumbob}20` : C.bgCard,
              border: `2px solid ${member.name === newMember?.name ? C.plumbob : C.purple}40`,
              borderRadius: 14, padding: 14, width: 90, textAlign: "center", cursor: "pointer",
              animation: `dance ${0.4 + (idx % 4) * 0.1}s ease-in-out infinite alternate`,
              transform: hoveredIdx === idx ? "scale(1.1)" : "scale(1)", transition: "transform 0.2s",
            }}
          >
            <div style={{ fontSize: 32, marginBottom: 6 }}>
              {member.avatarDesc?.includes("robot") ? "🤖" : 
               member.avatarDesc?.includes("cat") ? "🐱" :
               member.avatarDesc?.includes("horse") ? "🐴" :
               member.avatarDesc?.includes("orb") || member.avatarDesc?.includes("circle") ? "🔵" :
               member.avatarDesc?.includes("owl") ? "🦉" :
               member.avatarDesc?.includes("star") ? "⭐" : "✨"}
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.text }}>{member.name}</div>
            
            {hoveredIdx === idx && (
              <div style={{
                position: "absolute", bottom: "105%", left: "50%", transform: "translateX(-50%)",
                background: C.bgLight, border: `2px solid ${C.gold}`, borderRadius: 10, padding: "10px 12px",
                whiteSpace: "nowrap", zIndex: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}>
                <div style={{ fontWeight: 700, color: C.text, fontSize: 13 }}>{member.name}</div>
                <div style={{ color: C.gold, fontSize: 10, marginTop: 3 }}>Boss: {member.boss}</div>
                <div style={{ color: C.textMuted, fontSize: 9, marginTop: 3, maxWidth: 150, whiteSpace: "normal" }}>{member.avatarDesc}</div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Disco Lights */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none",
        background: `radial-gradient(circle at 20% 30%, ${C.neon}12 0%, transparent 25%),
                     radial-gradient(circle at 80% 40%, ${C.neonBlue}12 0%, transparent 25%),
                     radial-gradient(circle at 50% 70%, ${C.plumbob}12 0%, transparent 25%)`,
        animation: "discoLights 3s ease-in-out infinite alternate",
      }} />
      
      <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <button type="button" onClick={onBack} style={{
          padding: "12px 28px", background: "rgba(0,0,0,0.8)", border: `2px solid ${C.plumbob}`,
          borderRadius: 25, color: C.plumbob, cursor: "pointer", fontWeight: 600,
        }}>
          🚪 Check Another Name
        </button>
      </div>
      
      <style>{`
        @keyframes dance { 0% { transform: translateY(0) rotate(-2deg); } 100% { transform: translateY(-8px) rotate(2deg); } }
        @keyframes spin { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(360deg); } }
        @keyframes discoLights { 0% { opacity: 0.6; } 100% { opacity: 1; } }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TECHNO MUSIC
// ═══════════════════════════════════════════════════════════════════════════════
const TECHNO_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/08/02/audio_54ca0ffa52.mp3";

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [bannedList, setBannedList] = useState(INITIAL_BANNED);
  const [newMember, setNewMember] = useState(null);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    const audio = new Audio(TECHNO_MUSIC_URL);
    audio.loop = true; audio.volume = 0; audio.preload = "auto";
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ""; };
  }, []);
  
  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = muted ? 0 : screen === "landing" ? 0 : screen === "bouncer" ? 0.12 : 0.35;
  }, [screen, muted]);
  
  const handleStart = () => {
    if (audioRef.current) audioRef.current.play().catch(() => {});
    setScreen("bouncer");
  };
  
  const handleApproved = (member) => {
    setBannedList(prev => [...prev, member]);
    setNewMember(member);
    setScreen("club");
  };
  
  const MuteBtn = () => screen !== "landing" && (
    <button type="button" onClick={() => setMuted(!muted)} style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 1000,
      width: 44, height: 44, borderRadius: "50%", background: "rgba(0,0,0,0.7)",
      border: `2px solid ${C.plumbob}`, color: C.plumbob, fontSize: 18, cursor: "pointer",
    }}>{muted ? "🔇" : "🔊"}</button>
  );
  
  if (screen === "landing") return <LandingScreen onStart={handleStart} />;
  if (screen === "club") return <><ClubInterior bannedList={bannedList} newMember={newMember} onBack={() => { setNewMember(null); setScreen("bouncer"); }} /><MuteBtn /></>;
  return <><BouncerScreen bannedList={bannedList} onApproved={handleApproved} /><MuteBtn /></>;
}

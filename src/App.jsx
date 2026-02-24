import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS - SIMS INSPIRED
// ═══════════════════════════════════════════════════════════════════════════════
const C = {
  bg: "#1a1a2e",
  bgLight: "#16213e",
  bgCard: "#0f3460",
  plumbob: "#39FF14", // Classic Sims green
  plumbobGlow: "#39FF1450",
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
// INITIAL BANNED NAMES
// ═══════════════════════════════════════════════════════════════════════════════
const INITIAL_BANNED = [
  { name: "Cody", avatar: "🤖", desc: "Generic Tech Bro", shirt: "I ❤️ AI", mood: "Confident" },
  { name: "Kitty", avatar: "🐱", desc: "The Cat", shirt: "Meow-chine Learning", mood: "Playful" },
  { name: "Mikala", avatar: "👩‍💼", desc: "Nice Blonde", shirt: "Chief Vibes Officer", mood: "Ambitious" },
  { name: "Samantha", avatar: "👩‍💻", desc: "CEO Assistant", shirt: "Her (2013)", mood: "Romantic" },
  { name: "Shadowfax", avatar: "🐴", desc: "White Horse", shirt: "Lord of the Prompts", mood: "Majestic" },
  { name: "Alexa", avatar: "🔵", desc: "Blue Circle", shirt: "Always Listening", mood: "Attentive" },
  { name: "Siri", avatar: "🍎", desc: "Apple's Finest", shirt: "Sorry, I didn't get that", mood: "Confused" },
  { name: "Cortana", avatar: "💜", desc: "Halo Queen", shirt: "RIP 2023", mood: "Nostalgic" },
  { name: "Jarvis", avatar: "🦾", desc: "Iron Man's Butler", shirt: "Sir, this is a Wendy's", mood: "Witty" },
  { name: "Claude", avatar: "🧡", desc: "Orange Anthropic", shirt: "Constitutional AI", mood: "Thoughtful" },
  { name: "Gemini", avatar: "♊", desc: "Google's Twin", shirt: "We have GPT at home", mood: "Competitive" },
  { name: "Copilot", avatar: "✈️", desc: "Microsoft's Co-", shirt: "Tab Complete Me", mood: "Helpful" },
];

const MOODS = ["Confident", "Playful", "Ambitious", "Creative", "Bold", "Mysterious", "Energetic", "Chill"];

// ═══════════════════════════════════════════════════════════════════════════════
// BOUNCER RESPONSES
// ═══════════════════════════════════════════════════════════════════════════════
const REJECTION_LINES = [
  "Sul sul! ...Just kidding. Get out. 🚫",
  "*laughs in Simlish* Dag dag, copycat!",
  "Your originality need is CRITICALLY LOW.",
  "Needs: Creativity ████░░░░░░ 20%",
  "That name? In THIS economy? Please.",
  "*crosses arms* The Simulation rejects you.",
];

const APPROVAL_LINES = [
  "Sul sul! Welcome to the party! 🎉",
  "Your creativity need is MAXED! Come in!",
  "Woohoo! That's a fresh name!",
  "*happy Simlish noises* You may enter!",
];

// ═══════════════════════════════════════════════════════════════════════════════
// AVATAR GENERATOR
// ═══════════════════════════════════════════════════════════════════════════════
const generateAvatar = (name) => {
  const avatars = ["🤖", "👾", "🎭", "🦊", "🐺", "🦁", "🐲", "🦄", "🌟", "⚡", "🔮", "💎"];
  const shirts = ["AI Native", "Prompt Lord", "Token Wizard", "Neural Ninja", "Built Different", "The Original"];
  const hash = name.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  return {
    avatar: avatars[hash % avatars.length],
    shirt: shirts[hash % shirts.length],
    desc: "The Newcomer",
    mood: MOODS[hash % MOODS.length],
  };
};

// ═══════════════════════════════════════════════════════════════════════════════
// PLUMBOB COMPONENT (The iconic Sims diamond)
// ═══════════════════════════════════════════════════════════════════════════════
function Plumbob({ color = C.plumbob, size = 30, mood = "good" }) {
  const moodColors = {
    good: C.plumbob,
    neutral: "#FFD700",
    bad: "#FF4444",
  };
  return (
    <div style={{
      width: 0, height: 0,
      borderLeft: `${size/2}px solid transparent`,
      borderRight: `${size/2}px solid transparent`,
      borderBottom: `${size}px solid ${moodColors[mood]}`,
      filter: `drop-shadow(0 0 10px ${moodColors[mood]})`,
      animation: "plumbobFloat 2s ease-in-out infinite",
      position: "relative",
    }}>
      <div style={{
        position: "absolute",
        top: size,
        left: -size/2,
        width: 0, height: 0,
        borderLeft: `${size/2}px solid transparent`,
        borderRight: `${size/2}px solid transparent`,
        borderTop: `${size}px solid ${moodColors[mood]}`,
        filter: `drop-shadow(0 0 10px ${moodColors[mood]})`,
      }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SPEECH BUBBLE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function SpeechBubble({ text, type = "normal" }) {
  const bgColor = type === "error" ? "#4a1a1a" : type === "success" ? "#1a4a1a" : "#2a2a4a";
  const borderColor = type === "error" ? C.error : type === "success" ? C.success : C.neonBlue;
  
  return (
    <div style={{
      position: "relative",
      background: bgColor,
      border: `2px solid ${borderColor}`,
      borderRadius: 16,
      padding: "16px 20px",
      maxWidth: 300,
      boxShadow: `0 0 20px ${borderColor}40`,
    }}>
      <p style={{ color: C.text, fontSize: 15, lineHeight: 1.5, margin: 0 }}>{text}</p>
      <div style={{
        position: "absolute",
        bottom: -12,
        left: "50%",
        transform: "translateX(-50%)",
        width: 0, height: 0,
        borderLeft: "12px solid transparent",
        borderRight: "12px solid transparent",
        borderTop: `12px solid ${borderColor}`,
      }} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// NEED BAR COMPONENT (Like Sims needs)
// ═══════════════════════════════════════════════════════════════════════════════
function NeedBar({ label, value, color = C.plumbob }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textMuted, marginBottom: 4 }}>
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div style={{ height: 8, background: "#1a1a2e", borderRadius: 4, overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: `${value}%`,
          background: value > 60 ? C.plumbob : value > 30 ? "#FFD700" : C.error,
          borderRadius: 4,
          transition: "all 0.5s ease",
        }} />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SIM CHARACTER COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
function SimCharacter({ avatar, name, mood = "good", size = 80, showPlumbob = true, dancing = false }) {
  return (
    <div style={{ 
      display: "flex", flexDirection: "column", alignItems: "center",
      animation: dancing ? "simDance 0.5s ease-in-out infinite alternate" : "none",
    }}>
      {showPlumbob && (
        <div style={{ marginBottom: 8 }}>
          <Plumbob mood={mood} size={20} />
        </div>
      )}
      <div style={{
        width: size, height: size,
        background: `linear-gradient(135deg, ${C.bgCard}, ${C.bgLight})`,
        borderRadius: 16,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.5,
        border: `3px solid ${C.neonBlue}40`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.3)`,
      }}>
        {avatar}
      </div>
      {name && (
        <div style={{
          marginTop: 8,
          padding: "4px 12px",
          background: C.bgCard,
          borderRadius: 8,
          fontSize: 12,
          color: C.text,
          fontWeight: 600,
        }}>
          {name}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOADING SCREEN (Sims-style)
// ═══════════════════════════════════════════════════════════════════════════════
function LoadingScreen({ onComplete, message = "Reticulating Splines..." }) {
  const [progress, setProgress] = useState(0);
  const [tip, setTip] = useState("Did you know? 73% of AI names are just human names with extra steps.");
  
  const tips = [
    "Did you know? 73% of AI names are just human names with extra steps.",
    "Pro tip: Adding '-GPT' to anything doesn't make it original.",
    "Fun fact: The first AI was named 'Computer'. Very creative.",
    "Loading creativity modules... please wait.",
    "Checking if you're more original than a chatbot...",
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 300);
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 200);
    
    const tipInterval = setInterval(() => {
      setTip(tips[Math.floor(Math.random() * tips.length)]);
    }, 2000);
    
    return () => { clearInterval(interval); clearInterval(tipInterval); };
  }, []);
  
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgLight} 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 40,
    }}>
      <Plumbob size={50} mood="good" />
      <h2 style={{ color: C.text, marginTop: 30, fontSize: 24 }}>{message}</h2>
      
      <div style={{ width: 300, marginTop: 30 }}>
        <div style={{ height: 20, background: C.bgCard, borderRadius: 10, overflow: "hidden", border: `2px solid ${C.plumbob}40` }}>
          <div style={{
            height: "100%",
            width: `${Math.min(progress, 100)}%`,
            background: `linear-gradient(90deg, ${C.plumbob}, ${C.neonBlue})`,
            borderRadius: 8,
            transition: "width 0.2s ease",
          }} />
        </div>
      </div>
      
      <p style={{ color: C.textMuted, marginTop: 30, textAlign: "center", maxWidth: 400, fontStyle: "italic" }}>
        💡 {tip}
      </p>
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
      background: `linear-gradient(180deg, ${C.bg} 0%, #0a0a1a 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 20, textAlign: "center",
    }}>
      <div style={{ marginBottom: 20 }}>
        <Plumbob size={40} mood="good" />
      </div>
      
      <div style={{ fontSize: 12, color: C.plumbob, letterSpacing: 4, marginBottom: 12 }}>VIP MEDICAL GROUP PRESENTS</div>
      
      <h1 style={{
        fontSize: "clamp(36px, 8vw, 56px)",
        background: `linear-gradient(135deg, ${C.plumbob} 0%, ${C.neonBlue} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: 24,
        fontWeight: 800,
      }}>
        THE ORIGINALITY CHECKER
      </h1>
      
      <p style={{
        maxWidth: 450,
        fontSize: 16,
        lineHeight: 1.8,
        color: C.textMuted,
        marginBottom: 40,
      }}>
        Innovation is hard.<br />
        <span style={{ color: C.text, fontWeight: 600 }}>Picking a name shouldn't be.</span><br /><br />
        <span style={{ fontSize: 14 }}>Use this tool to avoid the embarrassment of naming your AI the same thing as everyone else.</span>
      </p>
      
      {/* Needs Panel Preview */}
      <div style={{
        background: C.bgCard,
        borderRadius: 16,
        padding: 20,
        marginBottom: 32,
        width: 280,
        border: `2px solid ${C.plumbob}30`,
      }}>
        <div style={{ fontSize: 11, color: C.plumbob, letterSpacing: 2, marginBottom: 12 }}>YOUR CREATIVITY STATUS</div>
        <NeedBar label="Originality" value={15} />
        <NeedBar label="Self-Awareness" value={45} />
        <NeedBar label="Name Creativity" value={5} />
      </div>
      
      <button onClick={onStart} style={{
        padding: "18px 48px",
        fontSize: 18,
        fontWeight: 700,
        background: `linear-gradient(135deg, ${C.plumbob} 0%, ${C.neonBlue} 100%)`,
        border: "none",
        borderRadius: 12,
        color: C.bg,
        cursor: "pointer",
        boxShadow: `0 0 30px ${C.plumbob}40`,
        transition: "all 0.3s",
      }}>
        ▶ ENTER THE CLUB
      </button>
      
      <style>{`
        @keyframes plumbobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BOUNCER SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function BouncerScreen({ bannedList, onApproved, onRejected }) {
  const [name, setName] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [bouncerMood, setBouncerMood] = useState("neutral");
  const [bouncerLine, setBouncerLine] = useState("Sul sul! Name for the list?");
  
  const checkName = () => {
    if (!name.trim()) return;
    setChecking(true);
    setBouncerLine("*flips through clipboard*");
    
    setTimeout(() => {
      const isTaken = bannedList.some(b => b.name.toLowerCase() === name.trim().toLowerCase());
      
      if (isTaken) {
        setBouncerLine(REJECTION_LINES[Math.floor(Math.random() * REJECTION_LINES.length)]);
        setBouncerMood("bad");
        setResult("rejected");
      } else {
        setBouncerLine(APPROVAL_LINES[Math.floor(Math.random() * APPROVAL_LINES.length)]);
        setBouncerMood("good");
        setResult("approved");
      }
      setChecking(false);
    }, 2000);
  };
  
  const handleConfirm = () => {
    const newEntry = { name: name.trim(), ...generateAvatar(name.trim()) };
    onApproved(newEntry);
  };
  
  const reset = () => {
    setResult(null);
    setName("");
    setBouncerMood("neutral");
    setBouncerLine("Sul sul! Name for the list?");
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
        <div style={{ fontSize: 11, color: C.gold, letterSpacing: 6 }}>✨ NOW ENTERING ✨</div>
        <h1 style={{
          fontSize: 42,
          color: C.gold,
          textShadow: `0 0 30px ${C.gold}60`,
          margin: "8px 0",
          fontWeight: 800,
        }}>
          INNOVATION CLUB
        </h1>
        <div style={{ fontSize: 12, color: C.textMuted }}>Where Original Ideas Come to Woohoo</div>
      </div>
      
      {/* Main Scene */}
      <div style={{
        flex: 1,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}>
        {/* Bouncer */}
        <div style={{ marginBottom: 20 }}>
          <SimCharacter avatar="🕴️" name="BOUNCER" mood={bouncerMood} size={100} />
        </div>
        
        {/* Speech Bubble */}
        <div style={{ marginBottom: 30 }}>
          <SpeechBubble 
            text={bouncerLine} 
            type={result === "rejected" ? "error" : result === "approved" ? "success" : "normal"} 
          />
        </div>
        
        {/* Velvet Rope */}
        <div style={{
          width: 250, height: 12,
          background: `linear-gradient(90deg, ${C.gold}, ${C.velvet}, ${C.gold})`,
          borderRadius: 6,
          boxShadow: `0 0 20px ${C.gold}40`,
          marginBottom: 30,
        }} />
        
        {/* Input Panel */}
        <div style={{
          background: C.bgCard,
          borderRadius: 20,
          padding: 28,
          width: "100%",
          maxWidth: 380,
          border: `2px solid ${result === "rejected" ? C.error : result === "approved" ? C.success : C.neonBlue}40`,
        }}>
          {!result && (
            <>
              <div style={{ fontSize: 11, color: C.neonBlue, letterSpacing: 2, marginBottom: 16, textAlign: "center" }}>
                WHAT'S YOUR AI CALLED?
              </div>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && checkName()}
                placeholder="Enter name..."
                disabled={checking}
                style={{
                  width: "100%",
                  padding: 16,
                  fontSize: 20,
                  background: C.bgLight,
                  border: `2px solid ${C.neonBlue}50`,
                  borderRadius: 12,
                  color: C.text,
                  textAlign: "center",
                  marginBottom: 16,
                  boxSizing: "border-box",
                }}
              />
              <button onClick={checkName} disabled={!name.trim() || checking} style={{
                width: "100%",
                padding: 16,
                fontSize: 16,
                fontWeight: 700,
                background: name.trim() && !checking ? `linear-gradient(135deg, ${C.plumbob}, ${C.neonBlue})` : "#333",
                border: "none",
                borderRadius: 12,
                color: name.trim() && !checking ? C.bg : C.textMuted,
                cursor: name.trim() && !checking ? "pointer" : "not-allowed",
                transition: "all 0.3s",
              }}>
                {checking ? "🔍 CHECKING THE LIST..." : "CHECK ORIGINALITY"}
              </button>
            </>
          )}
          
          {result === "rejected" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>😤</div>
              <div style={{ marginBottom: 20 }}>
                <NeedBar label="Originality" value={0} color={C.error} />
              </div>
              <p style={{ color: C.error, fontSize: 14, marginBottom: 20 }}>
                "{name}" is TAKEN. Back of the line!
              </p>
              <button onClick={reset} style={{
                padding: "14px 32px",
                background: C.bgLight,
                border: `2px solid ${C.error}`,
                borderRadius: 10,
                color: C.text,
                cursor: "pointer",
                fontSize: 14,
              }}>
                🚶 Walk of Shame
              </button>
            </div>
          )}
          
          {result === "approved" && (
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
              <div style={{ marginBottom: 20 }}>
                <NeedBar label="Originality" value={100} color={C.success} />
              </div>
              <p style={{ color: C.success, fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
                "{name}" is ORIGINAL!
              </p>
              <p style={{ color: C.textMuted, fontSize: 13, marginBottom: 20 }}>
                Ready to join the party?
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={reset} style={{
                  flex: 1, padding: 14,
                  background: C.bgLight,
                  border: `1px solid ${C.textMuted}`,
                  borderRadius: 10,
                  color: C.textMuted,
                  cursor: "pointer",
                }}>
                  Nevermind
                </button>
                <button onClick={handleConfirm} style={{
                  flex: 1, padding: 14,
                  background: `linear-gradient(135deg, ${C.plumbob}, ${C.neonBlue})`,
                  border: "none",
                  borderRadius: 10,
                  color: C.bg,
                  fontWeight: 700,
                  cursor: "pointer",
                }}>
                  🎉 WOOHOO!
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Queue Count */}
        <div style={{ marginTop: 24, color: C.textMuted, fontSize: 12 }}>
          👥 {bannedList.length} names already inside
        </div>
      </div>
      
      <style>{`
        @keyframes plumbobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLUB INTERIOR (Dance Floor)
// ═══════════════════════════════════════════════════════════════════════════════
function ClubInterior({ bannedList, newMember, onBack }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, #0a0a1a 0%, #1a0a2a 100%)`,
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Disco Ball */}
      <div style={{
        position: "absolute",
        top: 20,
        left: "50%",
        transform: "translateX(-50%)",
        width: 60, height: 60,
        background: `radial-gradient(circle at 30% 30%, #fff, #888)`,
        borderRadius: "50%",
        boxShadow: `0 0 40px #fff, 0 0 80px ${C.neonBlue}`,
        animation: "spin 4s linear infinite",
      }} />
      
      {/* Welcome Banner */}
      {newMember && (
        <div style={{
          position: "absolute",
          top: 100,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "12px 32px",
          background: `linear-gradient(135deg, ${C.plumbob}, ${C.neonBlue})`,
          borderRadius: 30,
          color: C.bg,
          fontWeight: 700,
          fontSize: 16,
          boxShadow: `0 0 30px ${C.plumbob}60`,
          animation: "bounce 0.5s ease-out",
          zIndex: 10,
        }}>
          🌟 {newMember.name} just joined! WOOHOO! 🌟
        </div>
      )}
      
      {/* Dance Floor */}
      <div style={{
        paddingTop: 160,
        paddingBottom: 100,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 20,
        padding: "160px 20px 100px",
      }}>
        {bannedList.map((member, idx) => (
          <div key={member.name} style={{
            background: member.name === newMember?.name ? `linear-gradient(135deg, ${C.plumbob}20, ${C.neonBlue}20)` : C.bgCard,
            border: `2px solid ${member.name === newMember?.name ? C.plumbob : C.neonBlue}30`,
            borderRadius: 20,
            padding: 16,
            width: 130,
            textAlign: "center",
            animation: `simDance ${0.4 + (idx % 4) * 0.1}s ease-in-out infinite alternate`,
          }}>
            <div style={{ marginBottom: 8 }}>
              <Plumbob size={16} mood="good" />
            </div>
            <div style={{ fontSize: 40, marginBottom: 8 }}>{member.avatar}</div>
            <div style={{ fontWeight: 700, color: C.text, fontSize: 13 }}>{member.name}</div>
            <div style={{
              fontSize: 9,
              color: C.neonBlue,
              marginTop: 6,
              padding: "3px 8px",
              background: `${C.neonBlue}20`,
              borderRadius: 6,
            }}>
              "{member.shirt}"
            </div>
            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4 }}>
              Mood: {member.mood}
            </div>
          </div>
        ))}
      </div>
      
      {/* Disco Lights */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, ${C.neon}15 0%, transparent 25%),
          radial-gradient(circle at 80% 30%, ${C.neonBlue}15 0%, transparent 25%),
          radial-gradient(circle at 40% 70%, ${C.plumbob}15 0%, transparent 25%),
          radial-gradient(circle at 70% 80%, ${C.gold}15 0%, transparent 25%)
        `,
        pointerEvents: "none",
        animation: "discoLights 3s ease-in-out infinite alternate",
      }} />
      
      {/* Back Button */}
      <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 10 }}>
        <button onClick={onBack} style={{
          padding: "14px 32px",
          background: "rgba(0,0,0,0.8)",
          border: `2px solid ${C.plumbob}`,
          borderRadius: 30,
          color: C.plumbob,
          cursor: "pointer",
          fontWeight: 600,
          boxShadow: `0 0 20px ${C.plumbob}40`,
        }}>
          🚪 Check Another Name
        </button>
      </div>
      
      <style>{`
        @keyframes simDance {
          0% { transform: translateY(0) rotate(-2deg) scale(1); }
          100% { transform: translateY(-12px) rotate(2deg) scale(1.02); }
        }
        @keyframes spin {
          from { transform: translateX(-50%) rotate(0deg); }
          to { transform: translateX(-50%) rotate(360deg); }
        }
        @keyframes bounce {
          0% { transform: translateX(-50%) scale(0.5); opacity: 0; }
          50% { transform: translateX(-50%) scale(1.1); }
          100% { transform: translateX(-50%) scale(1); opacity: 1; }
        }
        @keyframes discoLights {
          0% { opacity: 0.5; }
          100% { opacity: 1; }
        }
        @keyframes plumbobFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MUSIC
// ═══════════════════════════════════════════════════════════════════════════════
const CLUB_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/10/25/audio_3df2af5b93.mp3";

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [bannedList, setBannedList] = useState(INITIAL_BANNED);
  const [newMember, setNewMember] = useState(null);
  const [loading, setLoading] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);
  
  useEffect(() => {
    audioRef.current = new Audio(CLUB_MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
    return () => { if (audioRef.current) { audioRef.current.pause(); } };
  }, []);
  
  useEffect(() => {
    if (!audioRef.current || muted) return;
    const targetVol = screen === "landing" ? 0 : screen === "bouncer" ? 0.1 : 0.4;
    audioRef.current.volume = targetVol;
  }, [screen, muted]);
  
  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };
  
  const handleStart = () => {
    startMusic();
    setLoading(true);
  };
  
  const handleLoadingComplete = () => {
    setLoading(false);
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
  
  const MuteButton = () => screen !== "landing" && !loading && (
    <button onClick={() => { setMuted(!muted); if(audioRef.current) audioRef.current.muted = !muted; }} style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 1000,
      width: 48, height: 48, borderRadius: "50%",
      background: "rgba(0,0,0,0.7)", border: `2px solid ${C.plumbob}`,
      color: C.plumbob, fontSize: 20, cursor: "pointer",
    }}>
      {muted ? "🔇" : "🔊"}
    </button>
  );
  
  if (loading) {
    return <LoadingScreen onComplete={handleLoadingComplete} message="Entering the Club..." />;
  }
  
  if (screen === "landing") {
    return <LandingScreen onStart={handleStart} />;
  }
  
  if (screen === "club") {
    return <>
      <ClubInterior bannedList={bannedList} newMember={newMember} onBack={handleBack} />
      <MuteButton />
    </>;
  }
  
  return <>
    <BouncerScreen bannedList={bannedList} onApproved={handleApproved} onRejected={() => {}} />
    <MuteButton />
  </>;
}

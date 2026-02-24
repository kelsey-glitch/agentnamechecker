import { useState, useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// DESIGN TOKENS
// ═══════════════════════════════════════════════════════════════════════════════
const C = {
  bg: "#0a0a0a",
  bgCard: "#1a1a1a",
  gold: "#FFD700",
  goldDark: "#B8860B",
  velvet: "#8B0000",
  neon: "#FF1493",
  neonBlue: "#00BFFF",
  text: "#ffffff",
  textMuted: "#888888",
};

// ═══════════════════════════════════════════════════════════════════════════════
// INITIAL BANNED NAMES (case insensitive)
// ═══════════════════════════════════════════════════════════════════════════════
const INITIAL_BANNED = [
  { name: "Cody", avatar: "🤖", desc: "Generic Tech Bro", shirt: "I ❤️ AI" },
  { name: "Kitty", avatar: "🐱", desc: "The Cat", shirt: "Meow-chine Learning" },
  { name: "Mikala", avatar: "👩‍💼", desc: "Nice Blonde", shirt: "Chief Vibes Officer" },
  { name: "Samantha", avatar: "👩‍💻", desc: "CEO Assistant", shirt: "Her (2013)" },
  { name: "Shadowfax", avatar: "🐴", desc: "White Horse", shirt: "Lord of the Prompts" },
  { name: "Alexa", avatar: "🔵", desc: "Blue Circle", shirt: "Always Listening" },
  { name: "Siri", avatar: "🍎", desc: "Apple's Finest", shirt: "Sorry, I didn't get that" },
  { name: "Cortana", avatar: "💜", desc: "Halo Queen", shirt: "RIP 2023" },
  { name: "Jarvis", avatar: "🦾", desc: "Iron Man's Butler", shirt: "Sir, this is a Wendy's" },
  { name: "Claude", avatar: "🧡", desc: "Orange Anthropic", shirt: "Constitutional AI" },
  { name: "Gemini", avatar: "♊", desc: "Google's Twin", shirt: "We have GPT at home" },
  { name: "Copilot", avatar: "✈️", desc: "Microsoft's Co-", shirt: "Tab Complete Me" },
];

// ═══════════════════════════════════════════════════════════════════════════════
// BOUNCER RESPONSES
// ═══════════════════════════════════════════════════════════════════════════════
const REJECTION_LINES = [
  "HAHAHAHA! You serious right now? 😂",
  "*checks clipboard* Yeah... that's gonna be a no from me, dawg.",
  "Bruh. BRUH. That name's been taken since like... forever.",
  "*laughs in bouncer* Nice try. NEXT!",
  "Oh honey... no. Just no. 💅",
  "*slow clap* Wow. So original. Much innovation. Very taken.",
  "I've seen that name 47 times TODAY. Get outta here!",
];

const APPROVAL_LINES = [
  "Hmm... *checks list twice* ...Actually, that's fresh. Respect.",
  "Well well well... looks like we got a creative one here!",
  "Not bad, not bad at all. Haven't heard that one before.",
  "*nods approvingly* Now THAT'S what I call innovation.",
];

// ═══════════════════════════════════════════════════════════════════════════════
// AVATAR GENERATOR
// ═══════════════════════════════════════════════════════════════════════════════
const generateAvatar = (name) => {
  const avatars = ["🤖", "👾", "🎭", "🦊", "🐺", "🦁", "🐲", "🦄", "🌟", "⚡", "🔮", "💎", "🎪", "🎨", "🚀"];
  const shirts = [
    "AI Native", "Prompt Lord", "Token Wizard", "Neural Ninja",
    "GPT Wrapper", "The Original", "1 of 1", "IYKYK", "Built Different"
  ];
  const hash = name.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  return {
    avatar: avatars[hash % avatars.length],
    shirt: shirts[hash % shirts.length],
    desc: "The New Kid",
  };
};

// ═══════════════════════════════════════════════════════════════════════════════
// LANDING SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function LandingScreen({ onStart }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${C.bg} 0%, #1a0a0a 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 20, textAlign: "center",
    }}>
      <div style={{ fontSize: 14, color: C.gold, letterSpacing: 4, marginBottom: 16 }}>VIP MEDICAL GROUP PRESENTS</div>
      
      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: "clamp(32px, 8vw, 64px)",
        background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldDark} 100%)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: 24,
      }}>
        VIP Originality Checker
      </h1>
      
      <p style={{
        maxWidth: 500,
        fontSize: 18,
        lineHeight: 1.8,
        color: C.textMuted,
        marginBottom: 48,
      }}>
        Innovation is hard.<br />
        <span style={{ color: C.text }}>Picking a name shouldn't be.</span><br /><br />
        Use this tool to avoid the embarrassment of naming your AI the same thing as everyone else.
      </p>
      
      <button onClick={onStart} style={{
        padding: "16px 48px",
        fontSize: 18,
        fontWeight: 700,
        background: `linear-gradient(135deg, ${C.gold} 0%, ${C.goldDark} 100%)`,
        border: "none",
        borderRadius: 50,
        color: C.bg,
        cursor: "pointer",
        boxShadow: `0 0 30px ${C.gold}40`,
        transition: "all 0.3s",
      }}>
        CHECK YOUR NAME →
      </button>
      
      <div style={{ marginTop: 48, fontSize: 12, color: C.textMuted }}>
        🎭 Over 1,000 names already taken. Are you original?
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BOUNCER SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function BouncerScreen({ bannedList, onApproved, onRejected }) {
  const [name, setName] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null); // 'rejected' | 'approved'
  const [bouncerLine, setBouncerLine] = useState("Name?");
  
  const checkName = () => {
    if (!name.trim()) return;
    setChecking(true);
    
    // Check if name is taken (case insensitive)
    const isTaken = bannedList.some(b => b.name.toLowerCase() === name.trim().toLowerCase());
    
    setTimeout(() => {
      if (isTaken) {
        setBouncerLine(REJECTION_LINES[Math.floor(Math.random() * REJECTION_LINES.length)]);
        setResult("rejected");
      } else {
        setBouncerLine(APPROVAL_LINES[Math.floor(Math.random() * APPROVAL_LINES.length)]);
        setResult("approved");
      }
      setChecking(false);
    }, 1500);
  };
  
  const handleConfirm = () => {
    const newEntry = { name: name.trim(), ...generateAvatar(name.trim()) };
    onApproved(newEntry);
  };
  
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, #0a0a1a 0%, #1a0a2a 100%)`,
      display: "flex", flexDirection: "column",
    }}>
      {/* Club exterior header */}
      <div style={{
        background: `linear-gradient(180deg, ${C.velvet} 0%, #2a0a0a 100%)`,
        padding: "40px 20px",
        textAlign: "center",
        borderBottom: `3px solid ${C.gold}`,
      }}>
        <div style={{ fontSize: 12, color: C.gold, letterSpacing: 6 }}>✨ EXCLUSIVE ✨</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 48,
          color: C.gold,
          textShadow: `0 0 20px ${C.gold}40`,
          margin: "8px 0",
        }}>
          INNOVATION CLUB
        </h1>
        <div style={{ fontSize: 14, color: C.textMuted }}>Where Original Ideas Come to Party</div>
      </div>
      
      {/* VIP Entrance Scene */}
      <div style={{
        flex: 1,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: 20,
      }}>
        {/* Velvet rope */}
        <div style={{
          width: 300, height: 20,
          background: `linear-gradient(90deg, ${C.gold}, ${C.velvet}, ${C.gold})`,
          borderRadius: 10,
          boxShadow: `0 0 20px ${C.gold}40`,
          marginBottom: 40,
        }} />
        
        {/* Bouncer */}
        <div style={{
          background: C.bgCard,
          borderRadius: 20,
          padding: 32,
          textAlign: "center",
          border: `2px solid ${result === "rejected" ? "#ff4444" : result === "approved" ? "#44ff44" : C.gold}`,
          maxWidth: 400,
          width: "100%",
        }}>
          {/* Bouncer avatar */}
          <div style={{
            width: 100, height: 100,
            background: "#2a2a2a",
            borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 50,
            margin: "0 auto 20px",
            border: `3px solid ${C.gold}`,
          }}>
            🕴️
          </div>
          
          {/* Bouncer speech */}
          <div style={{
            padding: 16,
            background: "#2a2a2a",
            borderRadius: 12,
            marginBottom: 24,
            minHeight: 60,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <p style={{
              fontSize: 16,
              color: result === "rejected" ? "#ff6666" : result === "approved" ? "#66ff66" : C.text,
              fontStyle: "italic",
            }}>
              {checking ? "🤔 *checks clipboard*..." : `"${bouncerLine}"`}
            </p>
          </div>
          
          {/* Input or result */}
          {!result && (
            <>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                onKeyDown={e => e.key === "Enter" && checkName()}
                placeholder="Your AI's name..."
                style={{
                  width: "100%",
                  padding: 16,
                  fontSize: 18,
                  background: "#1a1a1a",
                  border: `2px solid ${C.gold}`,
                  borderRadius: 12,
                  color: C.text,
                  textAlign: "center",
                  marginBottom: 16,
                }}
              />
              <button onClick={checkName} disabled={!name.trim() || checking} style={{
                width: "100%",
                padding: 16,
                fontSize: 16,
                fontWeight: 700,
                background: name.trim() && !checking ? C.gold : "#333",
                border: "none",
                borderRadius: 12,
                color: C.bg,
                cursor: name.trim() && !checking ? "pointer" : "not-allowed",
              }}>
                {checking ? "CHECKING..." : "CHECK THE LIST"}
              </button>
            </>
          )}
          
          {/* Rejected */}
          {result === "rejected" && (
            <div style={{ animation: "shake 0.5s ease-in-out" }}>
              <div style={{ fontSize: 64, marginBottom: 16 }}>🚫</div>
              <p style={{ color: "#ff6666", fontSize: 14, marginBottom: 16 }}>
                That name is TAKEN. Try again, wannabe.
              </p>
              <button onClick={() => { setResult(null); setName(""); setBouncerLine("Name?"); }} style={{
                padding: "12px 32px",
                background: "#333",
                border: "none",
                borderRadius: 8,
                color: C.text,
                cursor: "pointer",
              }}>
                🚶 Walk of Shame (Try Again)
              </button>
            </div>
          )}
          
          {/* Approved */}
          {result === "approved" && (
            <div>
              <div style={{ fontSize: 64, marginBottom: 16 }}>✨</div>
              <p style={{ color: "#66ff66", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>
                Nice work being unique!
              </p>
              <p style={{ color: C.textMuted, fontSize: 14, marginBottom: 24 }}>
                "{name}" is available. Ready to claim your spot?
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button onClick={() => { setResult(null); setName(""); setBouncerLine("Name?"); }} style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: "#333",
                  border: "none",
                  borderRadius: 8,
                  color: C.text,
                  cursor: "pointer",
                }}>
                  Nah, Changed My Mind
                </button>
                <button onClick={handleConfirm} style={{
                  flex: 1,
                  padding: "12px 16px",
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
                  border: "none",
                  borderRadius: 8,
                  color: C.bg,
                  fontWeight: 700,
                  cursor: "pointer",
                }}>
                  🎉 ENTER THE CLUB
                </button>
              </div>
            </div>
          )}
        </div>
        
        {/* Queue hint */}
        <div style={{ marginTop: 32, color: C.textMuted, fontSize: 12 }}>
          👥 {bannedList.length} names already inside
        </div>
      </div>
      
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLUB INTERIOR (Dancing Avatars)
// ═══════════════════════════════════════════════════════════════════════════════
function ClubInterior({ bannedList, newMember, onBack }) {
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, #1a0a2a 0%, #0a0a1a 100%)`,
      overflow: "hidden",
    }}>
      {/* Club header */}
      <div style={{
        background: "rgba(0,0,0,0.5)",
        padding: "20px",
        textAlign: "center",
        borderBottom: `2px solid ${C.neon}`,
      }}>
        <div style={{ fontSize: 12, color: C.neon, letterSpacing: 4 }}>🎉 WELCOME TO THE</div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 36,
          color: C.gold,
          textShadow: `0 0 20px ${C.neon}`,
        }}>
          INNOVATION CLUB
        </h1>
        {newMember && (
          <div style={{
            marginTop: 12,
            padding: "8px 24px",
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
            borderRadius: 20,
            display: "inline-block",
            color: C.bg,
            fontWeight: 700,
          }}>
            🌟 {newMember.name} just joined the party! 🌟
          </div>
        )}
      </div>
      
      {/* Dance floor */}
      <div style={{
        padding: 20,
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 16,
        marginTop: 20,
      }}>
        {bannedList.map((member, idx) => (
          <div key={member.name} style={{
            background: member.name === newMember?.name ? `linear-gradient(135deg, ${C.gold}20, ${C.neon}20)` : "rgba(255,255,255,0.05)",
            border: `2px solid ${member.name === newMember?.name ? C.gold : "rgba(255,255,255,0.1)"}`,
            borderRadius: 16,
            padding: 16,
            width: 120,
            textAlign: "center",
            animation: `dance ${0.5 + (idx % 3) * 0.2}s ease-in-out infinite alternate`,
          }}>
            <div style={{
              fontSize: 48,
              marginBottom: 8,
              filter: `drop-shadow(0 0 10px ${C.neon})`,
            }}>
              {member.avatar}
            </div>
            <div style={{ fontWeight: 700, color: C.text, fontSize: 14 }}>{member.name}</div>
            <div style={{
              fontSize: 10,
              color: C.neon,
              marginTop: 4,
              padding: "2px 8px",
              background: "rgba(255,20,147,0.2)",
              borderRadius: 4,
            }}>
              {member.shirt}
            </div>
            <div style={{ fontSize: 10, color: C.textMuted, marginTop: 4 }}>{member.desc}</div>
          </div>
        ))}
      </div>
      
      {/* Disco lights effect */}
      <div style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: `
          radial-gradient(circle at 20% 20%, ${C.neon}10 0%, transparent 30%),
          radial-gradient(circle at 80% 80%, ${C.neonBlue}10 0%, transparent 30%),
          radial-gradient(circle at 50% 50%, ${C.gold}05 0%, transparent 50%)
        `,
        pointerEvents: "none",
        animation: "disco 3s ease-in-out infinite",
      }} />
      
      {/* Back button */}
      <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)" }}>
        <button onClick={onBack} style={{
          padding: "12px 32px",
          background: "rgba(0,0,0,0.8)",
          border: `1px solid ${C.gold}`,
          borderRadius: 50,
          color: C.gold,
          cursor: "pointer",
        }}>
          🚪 Check Another Name
        </button>
      </div>
      
      <style>{`
        @keyframes dance {
          0% { transform: translateY(0) rotate(-3deg); }
          100% { transform: translateY(-10px) rotate(3deg); }
        }
        @keyframes disco {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
// CLUB MUSIC URL (royalty-free electronic/club beat)
// ═══════════════════════════════════════════════════════════════════════════════
const CLUB_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/10/25/audio_3df2af5b93.mp3"; // Electronic dance beat

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP WITH AUDIO CONTROL
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("landing"); // 'landing' | 'bouncer' | 'club'
  const [bannedList, setBannedList] = useState(INITIAL_BANNED);
  const [newMember, setNewMember] = useState(null);
  const [musicStarted, setMusicStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(null);
  
  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(CLUB_MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = 0;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  // Control volume based on screen
  useEffect(() => {
    if (!audioRef.current || !musicStarted || muted) return;
    
    const targetVolume = screen === "landing" ? 0 : screen === "bouncer" ? 0.15 : 0.5;
    
    // Smooth volume transition
    const currentVol = audioRef.current.volume;
    const step = (targetVolume - currentVol) / 20;
    let frame = 0;
    
    const transition = setInterval(() => {
      frame++;
      if (frame >= 20) {
        audioRef.current.volume = targetVolume;
        clearInterval(transition);
      } else {
        audioRef.current.volume = Math.max(0, Math.min(1, currentVol + step * frame));
      }
    }, 50);
    
    return () => clearInterval(transition);
  }, [screen, musicStarted, muted]);
  
  // Start music (needs user interaction)
  const startMusic = () => {
    if (audioRef.current && !musicStarted) {
      audioRef.current.play().catch(() => {});
      setMusicStarted(true);
    }
  };
  
  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
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
  
  const handleStart = () => {
    startMusic();
    setScreen("bouncer");
  };
  
  // Mute button (shows on all screens except landing)
  const MuteButton = () => screen !== "landing" && (
    <button onClick={toggleMute} style={{
      position: "fixed", bottom: 20, right: 20, zIndex: 1000,
      width: 48, height: 48, borderRadius: "50%",
      background: "rgba(0,0,0,0.7)", border: `1px solid ${C.gold}`,
      color: C.gold, fontSize: 20, cursor: "pointer",
    }}>
      {muted ? "🔇" : "🔊"}
    </button>
  );
  
  if (screen === "landing") {
    return <LandingScreen onStart={handleStart} />;
  }
  
  if (screen === "club") {
    return (
      <>
        <ClubInterior bannedList={bannedList} newMember={newMember} onBack={handleBack} />
        <MuteButton />
      </>
    );
  }
  
  return (
    <>
      <BouncerScreen 
        bannedList={bannedList} 
        onApproved={handleApproved}
        onRejected={() => {}}
      />
      <MuteButton />
    </>
  );
}

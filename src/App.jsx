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
// SOUND EFFECTS - Club/Techno vibes 🎵 (hosted locally for reliability)
// ═══════════════════════════════════════════════════════════════════════════════
// Club music - electronic/techno (hosted in /public for no glitching!)
const MUSIC_URL = "./club-beat.mp3";

// ═══════════════════════════════════════════════════════════════════════════════
// 3D AVATAR DEFINITIONS - 50+ unique avatars!
// Base shapes × Color variants = Lots of options
// ═══════════════════════════════════════════════════════════════════════════════
const BASE_SHAPES = [
  { type: "robot", emoji: "🤖", name: "Robot" },
  { type: "cat", emoji: "🐱", name: "Cat" },
  { type: "horse", emoji: "🐴", name: "Horse" },
  { type: "owl", emoji: "🦉", name: "Owl" },
  { type: "star", emoji: "⭐", name: "Star" },
  { type: "blob", emoji: "🟣", name: "Blob" },
  { type: "gem", emoji: "💎", name: "Crystal" },
  { type: "spark", emoji: "✨", name: "Spark" },
  { type: "ghost", emoji: "👻", name: "Ghost" },
  { type: "alien", emoji: "👽", name: "Alien" },
  { type: "dragon", emoji: "🐲", name: "Dragon" },
  { type: "butterfly", emoji: "🦋", name: "Butterfly" },
  { type: "octopus", emoji: "🐙", name: "Octopus" },
  { type: "fox", emoji: "🦊", name: "Fox" },
  { type: "panda", emoji: "🐼", name: "Panda" },
  { type: "unicorn", emoji: "🦄", name: "Unicorn" },
  { type: "mushroom", emoji: "🍄", name: "Mushroom" },
];

const COLOR_VARIANTS = [
  { suffix: "", color: "#4FC3F7", name: "" },           // Blue (default)
  { suffix: "-pink", color: "#F48FB1", name: "Pink" },
  { suffix: "-gold", color: "#FFD54F", name: "Gold" },
  { suffix: "-mint", color: "#80CBC4", name: "Mint" },
  { suffix: "-coral", color: "#FF8A65", name: "Coral" },
  { suffix: "-violet", color: "#B39DDB", name: "Violet" },
];

// Generate all avatar combinations (17 shapes × 6 colors = 102 options!)
const AVATAR_OPTIONS = BASE_SHAPES.flatMap(shape => 
  COLOR_VARIANTS.map(variant => ({
    id: `${shape.type}${variant.suffix}`,
    type: shape.type,
    emoji: shape.emoji,
    name: variant.name ? `${variant.name} ${shape.name}` : shape.name,
    color: variant.color,
  }))
);

// ═══════════════════════════════════════════════════════════════════════════════
// 3D AVATAR SVG COMPONENT - Clay/Pixar style rendering
// ═══════════════════════════════════════════════════════════════════════════════
function Avatar3D({ avatarId, size = 60, dancing = false }) {
  const avatar = AVATAR_OPTIONS.find(a => a.id === avatarId) || AVATAR_OPTIONS[0];
  const color = avatar.color;
  const type = avatar.type || avatarId.split("-")[0]; // Extract base type
  const darkColor = adjustBrightness(color, -30);
  const lightColor = adjustBrightness(color, 40);
  
  const baseStyle = dancing ? {
    animation: "avatarBounce 0.5s ease-in-out infinite alternate"
  } : {};
  
  return (
    <div style={{ width: size, height: size, ...baseStyle }}>
      <svg viewBox="0 0 100 100" style={{ width: "100%", height: "100%" }}>
        <defs>
          {/* 3D Gradient for clay look */}
          <radialGradient id={`grad-${avatarId}`} cx="35%" cy="35%">
            <stop offset="0%" stopColor={lightColor} />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor={darkColor} />
          </radialGradient>
          {/* Shine highlight */}
          <radialGradient id={`shine-${avatarId}`} cx="30%" cy="25%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          {/* Drop shadow */}
          <filter id={`shadow-${avatarId}`}>
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#000" floodOpacity="0.3" />
          </filter>
        </defs>
        
        {type === "robot" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Robot body */}
            <rect x="25" y="40" width="50" height="50" rx="8" fill={`url(#grad-${avatarId})`} />
            <ellipse cx="50" cy="40" rx="30" ry="25" fill={`url(#grad-${avatarId})`} />
            {/* Eyes */}
            <circle cx="38" cy="38" r="8" fill="#1a1a2e" />
            <circle cx="62" cy="38" r="8" fill="#1a1a2e" />
            <circle cx="40" cy="36" r="4" fill={C.neonBlue} />
            <circle cx="64" cy="36" r="4" fill={C.neonBlue} />
            {/* Antenna */}
            <line x1="50" y1="15" x2="50" y2="25" stroke={color} strokeWidth="4" strokeLinecap="round" />
            <circle cx="50" cy="12" r="5" fill={C.error} />
            {/* Shine */}
            <ellipse cx="35" cy="30" rx="12" ry="8" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "cat" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Face */}
            <ellipse cx="50" cy="55" rx="35" ry="30" fill={`url(#grad-${avatarId})`} />
            {/* Ears */}
            <path d="M20,40 L30,15 L40,35 Z" fill={`url(#grad-${avatarId})`} />
            <path d="M80,40 L70,15 L60,35 Z" fill={`url(#grad-${avatarId})`} />
            <path d="M25,38 L32,22 L38,35 Z" fill="#FFD8B4" />
            <path d="M75,38 L68,22 L62,35 Z" fill="#FFD8B4" />
            {/* Eyes */}
            <ellipse cx="35" cy="50" rx="8" ry="10" fill="#2a2a4a" />
            <ellipse cx="65" cy="50" rx="8" ry="10" fill="#2a2a4a" />
            <ellipse cx="37" cy="48" rx="4" ry="5" fill={C.plumbob} />
            <ellipse cx="67" cy="48" rx="4" ry="5" fill={C.plumbob} />
            {/* Nose */}
            <ellipse cx="50" cy="62" rx="4" ry="3" fill="#FF9999" />
            {/* Whiskers */}
            <line x1="15" y1="58" x2="30" y2="60" stroke="#333" strokeWidth="1.5" />
            <line x1="15" y1="65" x2="30" y2="65" stroke="#333" strokeWidth="1.5" />
            <line x1="70" y1="60" x2="85" y2="58" stroke="#333" strokeWidth="1.5" />
            <line x1="70" y1="65" x2="85" y2="65" stroke="#333" strokeWidth="1.5" />
            {/* Shine */}
            <ellipse cx="35" cy="40" rx="15" ry="10" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "horse" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Head */}
            <ellipse cx="50" cy="50" rx="30" ry="35" fill={`url(#grad-${avatarId})`} />
            {/* Snout */}
            <ellipse cx="50" cy="70" rx="18" ry="12" fill={adjustBrightness(color, 20)} />
            {/* Eyes */}
            <ellipse cx="35" cy="42" rx="6" ry="8" fill="#2a2a4a" />
            <ellipse cx="65" cy="42" rx="6" ry="8" fill="#2a2a4a" />
            <circle cx="36" cy="40" r="3" fill="#ffffff" />
            <circle cx="66" cy="40" r="3" fill="#ffffff" />
            {/* Nostrils */}
            <ellipse cx="42" cy="72" rx="3" ry="2" fill="#5D4037" />
            <ellipse cx="58" cy="72" rx="3" ry="2" fill="#5D4037" />
            {/* Ears */}
            <ellipse cx="28" cy="22" rx="8" ry="12" fill={`url(#grad-${avatarId})`} />
            <ellipse cx="72" cy="22" rx="8" ry="12" fill={`url(#grad-${avatarId})`} />
            {/* Mane */}
            <path d="M35,10 Q50,5 65,10 Q55,18 50,10 Q45,18 35,10" fill="#5D4037" />
            {/* Shine */}
            <ellipse cx="40" cy="35" rx="15" ry="10" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "owl" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Body */}
            <ellipse cx="50" cy="60" rx="32" ry="30" fill={`url(#grad-${avatarId})`} />
            {/* Head feathers */}
            <ellipse cx="25" cy="30" rx="8" ry="15" fill={`url(#grad-${avatarId})`} />
            <ellipse cx="75" cy="30" rx="8" ry="15" fill={`url(#grad-${avatarId})`} />
            {/* Face disc */}
            <ellipse cx="50" cy="45" rx="28" ry="25" fill={adjustBrightness(color, 30)} />
            {/* Big eyes */}
            <circle cx="38" cy="42" r="12" fill="#FFF9C4" />
            <circle cx="62" cy="42" r="12" fill="#FFF9C4" />
            <circle cx="38" cy="42" r="6" fill="#1a1a2e" />
            <circle cx="62" cy="42" r="6" fill="#1a1a2e" />
            <circle cx="40" cy="40" r="2" fill="#ffffff" />
            <circle cx="64" cy="40" r="2" fill="#ffffff" />
            {/* Beak */}
            <path d="M45,55 L50,65 L55,55 Z" fill="#FF9800" />
            {/* Shine */}
            <ellipse cx="40" cy="35" rx="12" ry="8" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "star" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Star shape */}
            <polygon 
              points="50,5 61,38 95,38 68,60 79,95 50,73 21,95 32,60 5,38 39,38" 
              fill={`url(#grad-${avatarId})`}
            />
            {/* Face */}
            <circle cx="40" cy="45" r="5" fill="#2a2a4a" />
            <circle cx="60" cy="45" r="5" fill="#2a2a4a" />
            <circle cx="41" cy="44" r="2" fill="#ffffff" />
            <circle cx="61" cy="44" r="2" fill="#ffffff" />
            <path d="M42,58 Q50,65 58,58" fill="none" stroke="#FF9800" strokeWidth="3" strokeLinecap="round" />
            {/* Shine */}
            <ellipse cx="40" cy="30" rx="12" ry="8" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "blob" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Blob body */}
            <ellipse cx="50" cy="55" rx="38" ry="35" fill={`url(#grad-${avatarId})`} />
            <ellipse cx="30" cy="40" rx="12" ry="15" fill={`url(#grad-${avatarId})`} />
            <ellipse cx="70" cy="40" rx="12" ry="15" fill={`url(#grad-${avatarId})`} />
            {/* Eyes */}
            <circle cx="38" cy="50" r="8" fill="#ffffff" />
            <circle cx="62" cy="50" r="8" fill="#ffffff" />
            <circle cx="40" cy="50" r="4" fill="#1a1a2e" />
            <circle cx="64" cy="50" r="4" fill="#1a1a2e" />
            <circle cx="41" cy="49" r="1.5" fill="#ffffff" />
            <circle cx="65" cy="49" r="1.5" fill="#ffffff" />
            {/* Smile */}
            <path d="M40,68 Q50,78 60,68" fill="none" stroke="#7B1FA2" strokeWidth="3" strokeLinecap="round" />
            {/* Shine */}
            <ellipse cx="35" cy="35" rx="15" ry="12" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "gem" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Crystal shape */}
            <polygon points="50,8 75,35 70,85 30,85 25,35" fill={`url(#grad-${avatarId})`} />
            <polygon points="50,8 25,35 30,85 50,75" fill={adjustBrightness(color, -20)} fillOpacity="0.5" />
            {/* Face */}
            <circle cx="38" cy="50" r="5" fill="#ffffff" />
            <circle cx="58" cy="50" r="5" fill="#ffffff" />
            <circle cx="39" cy="49" r="2.5" fill="#0D47A1" />
            <circle cx="59" cy="49" r="2.5" fill="#0D47A1" />
            <path d="M42,65 Q50,72 58,65" fill="none" stroke="#0D47A1" strokeWidth="2.5" strokeLinecap="round" />
            {/* Sparkles */}
            <polygon points="20,20 22,25 27,25 23,28 25,33 20,30 15,33 17,28 13,25 18,25" fill="#ffffff" />
            <polygon points="75,60 77,63 80,63 78,65 79,68 75,66 71,68 72,65 70,63 73,63" fill="#ffffff" />
            {/* Shine */}
            <polygon points="30,25 45,20 40,40 28,35" fill="#ffffff" fillOpacity="0.4" />
          </g>
        )}
        
        {type === "spark" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Central glow */}
            <circle cx="50" cy="50" r="25" fill={`url(#grad-${avatarId})`} />
            {/* Spark rays */}
            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
              <line key={i}
                x1={50 + Math.cos(angle * Math.PI / 180) * 25}
                y1={50 + Math.sin(angle * Math.PI / 180) * 25}
                x2={50 + Math.cos(angle * Math.PI / 180) * (i % 2 === 0 ? 45 : 38)}
                y2={50 + Math.sin(angle * Math.PI / 180) * (i % 2 === 0 ? 45 : 38)}
                stroke={color} strokeWidth={i % 2 === 0 ? "4" : "3"} strokeLinecap="round"
              />
            ))}
            {/* Face */}
            <circle cx="42" cy="45" r="4" fill="#F57F17" />
            <circle cx="58" cy="45" r="4" fill="#F57F17" />
            <path d="M43,55 Q50,62 57,55" fill="none" stroke="#F57F17" strokeWidth="2.5" strokeLinecap="round" />
            {/* Shine */}
            <ellipse cx="42" cy="40" rx="10" ry="8" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "ghost" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Ghost body */}
            <path d="M25,40 Q25,15 50,15 Q75,15 75,40 L75,80 Q70,75 65,80 Q60,75 55,80 Q50,75 45,80 Q40,75 35,80 Q30,75 25,80 Z" fill={`url(#grad-${avatarId})`} />
            {/* Eyes */}
            <ellipse cx="38" cy="42" rx="8" ry="10" fill="#1a1a2e" />
            <ellipse cx="62" cy="42" rx="8" ry="10" fill="#1a1a2e" />
            <circle cx="40" cy="40" r="3" fill="#ffffff" />
            <circle cx="64" cy="40" r="3" fill="#ffffff" />
            {/* Mouth */}
            <ellipse cx="50" cy="60" rx="8" ry="5" fill="#1a1a2e" />
            {/* Blush */}
            <ellipse cx="28" cy="55" rx="5" ry="3" fill="#FFCDD2" opacity="0.6" />
            <ellipse cx="72" cy="55" rx="5" ry="3" fill="#FFCDD2" opacity="0.6" />
            {/* Shine */}
            <ellipse cx="38" cy="28" rx="12" ry="8" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "alien" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Head */}
            <ellipse cx="50" cy="50" rx="35" ry="40" fill={`url(#grad-${avatarId})`} />
            {/* Big eyes */}
            <ellipse cx="35" cy="45" rx="12" ry="15" fill="#1a1a2e" />
            <ellipse cx="65" cy="45" rx="12" ry="15" fill="#1a1a2e" />
            <ellipse cx="37" cy="43" rx="5" ry="6" fill="#E8F5E9" />
            <ellipse cx="67" cy="43" rx="5" ry="6" fill="#E8F5E9" />
            {/* Small mouth */}
            <ellipse cx="50" cy="72" rx="4" ry="2" fill="#2E7D32" />
            {/* Antenna */}
            <line x1="35" y1="12" x2="35" y2="22" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <circle cx="35" cy="10" r="4" fill={C.plumbob} />
            <line x1="65" y1="12" x2="65" y2="22" stroke={color} strokeWidth="3" strokeLinecap="round" />
            <circle cx="65" cy="10" r="4" fill={C.plumbob} />
            {/* Shine */}
            <ellipse cx="38" cy="30" rx="15" ry="10" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "dragon" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Head */}
            <ellipse cx="50" cy="55" rx="32" ry="28" fill={`url(#grad-${avatarId})`} />
            {/* Snout */}
            <ellipse cx="50" cy="70" rx="15" ry="10" fill={adjustBrightness(color, -15)} />
            {/* Nostrils with smoke */}
            <ellipse cx="43" cy="72" rx="3" ry="2" fill="#1a1a2e" />
            <ellipse cx="57" cy="72" rx="3" ry="2" fill="#1a1a2e" />
            {/* Eyes */}
            <ellipse cx="35" cy="50" rx="8" ry="10" fill="#FFEB3B" />
            <ellipse cx="65" cy="50" rx="8" ry="10" fill="#FFEB3B" />
            <ellipse cx="36" cy="50" rx="3" ry="5" fill="#1a1a2e" />
            <ellipse cx="66" cy="50" rx="3" ry="5" fill="#1a1a2e" />
            {/* Horns */}
            <path d="M20,35 Q15,15 25,25 L30,40" fill={adjustBrightness(color, -30)} />
            <path d="M80,35 Q85,15 75,25 L70,40" fill={adjustBrightness(color, -30)} />
            {/* Spikes */}
            <polygon points="45,22 50,8 55,22" fill={adjustBrightness(color, -20)} />
            {/* Shine */}
            <ellipse cx="38" cy="40" rx="12" ry="8" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "butterfly" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Wings */}
            <ellipse cx="25" cy="40" rx="22" ry="30" fill={`url(#grad-${avatarId})`} />
            <ellipse cx="75" cy="40" rx="22" ry="30" fill={`url(#grad-${avatarId})`} />
            <ellipse cx="25" cy="70" rx="18" ry="20" fill={adjustBrightness(color, -20)} />
            <ellipse cx="75" cy="70" rx="18" ry="20" fill={adjustBrightness(color, -20)} />
            {/* Wing patterns */}
            <circle cx="25" cy="35" r="8" fill={C.neonBlue} opacity="0.6" />
            <circle cx="75" cy="35" r="8" fill={C.neonBlue} opacity="0.6" />
            <circle cx="25" cy="70" r="6" fill={C.neon} opacity="0.5" />
            <circle cx="75" cy="70" r="6" fill={C.neon} opacity="0.5" />
            {/* Body */}
            <ellipse cx="50" cy="50" rx="8" ry="35" fill="#5C6BC0" />
            {/* Head */}
            <circle cx="50" cy="18" r="10" fill="#5C6BC0" />
            {/* Eyes */}
            <circle cx="46" cy="16" r="3" fill="#1a1a2e" />
            <circle cx="54" cy="16" r="3" fill="#1a1a2e" />
            <circle cx="47" cy="15" r="1" fill="#ffffff" />
            <circle cx="55" cy="15" r="1" fill="#ffffff" />
            {/* Antennae */}
            <path d="M45,10 Q40,2 35,5" fill="none" stroke="#5C6BC0" strokeWidth="2" strokeLinecap="round" />
            <path d="M55,10 Q60,2 65,5" fill="none" stroke="#5C6BC0" strokeWidth="2" strokeLinecap="round" />
            <circle cx="35" cy="5" r="3" fill={C.neon} />
            <circle cx="65" cy="5" r="3" fill={C.neon} />
            {/* Shine */}
            <ellipse cx="20" cy="30" rx="8" ry="6" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "octopus" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Head */}
            <ellipse cx="50" cy="35" rx="32" ry="28" fill={`url(#grad-${avatarId})`} />
            {/* Tentacles */}
            <path d="M20,50 Q15,70 20,85 Q22,90 18,92" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
            <path d="M35,55 Q30,75 35,90" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
            <path d="M50,58 Q50,78 50,92" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
            <path d="M65,55 Q70,75 65,90" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
            <path d="M80,50 Q85,70 80,85 Q78,90 82,92" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="38" cy="32" r="10" fill="#ffffff" />
            <circle cx="62" cy="32" r="10" fill="#ffffff" />
            <circle cx="40" cy="33" r="5" fill="#1a1a2e" />
            <circle cx="64" cy="33" r="5" fill="#1a1a2e" />
            <circle cx="41" cy="32" r="2" fill="#ffffff" />
            <circle cx="65" cy="32" r="2" fill="#ffffff" />
            {/* Smile */}
            <path d="M40,50 Q50,58 60,50" fill="none" stroke={darkColor} strokeWidth="3" strokeLinecap="round" />
            {/* Shine */}
            <ellipse cx="35" cy="22" rx="12" ry="8" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "fox" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Face */}
            <ellipse cx="50" cy="55" rx="35" ry="30" fill={`url(#grad-${avatarId})`} />
            {/* Ears */}
            <polygon points="15,45 25,10 40,40" fill={`url(#grad-${avatarId})`} />
            <polygon points="85,45 75,10 60,40" fill={`url(#grad-${avatarId})`} />
            <polygon points="20,42 27,18 37,40" fill="#1a1a2e" />
            <polygon points="80,42 73,18 63,40" fill="#1a1a2e" />
            {/* White face markings */}
            <ellipse cx="50" cy="65" rx="20" ry="18" fill="#ffffff" />
            {/* Eyes */}
            <ellipse cx="35" cy="48" rx="6" ry="8" fill="#1a1a2e" />
            <ellipse cx="65" cy="48" rx="6" ry="8" fill="#1a1a2e" />
            <circle cx="36" cy="46" r="2" fill="#ffffff" />
            <circle cx="66" cy="46" r="2" fill="#ffffff" />
            {/* Nose */}
            <ellipse cx="50" cy="62" rx="5" ry="4" fill="#1a1a2e" />
            {/* Shine */}
            <ellipse cx="35" cy="38" rx="12" ry="8" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "panda" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Face - white */}
            <ellipse cx="50" cy="50" rx="38" ry="35" fill="#ffffff" />
            {/* Ears - black */}
            <circle cx="18" cy="22" r="14" fill="#1a1a2e" />
            <circle cx="82" cy="22" r="14" fill="#1a1a2e" />
            {/* Eye patches - black */}
            <ellipse cx="32" cy="45" rx="14" ry="16" fill="#1a1a2e" />
            <ellipse cx="68" cy="45" rx="14" ry="16" fill="#1a1a2e" />
            {/* Eyes */}
            <circle cx="32" cy="45" r="6" fill="#ffffff" />
            <circle cx="68" cy="45" r="6" fill="#ffffff" />
            <circle cx="33" cy="44" r="3" fill="#1a1a2e" />
            <circle cx="69" cy="44" r="3" fill="#1a1a2e" />
            <circle cx="34" cy="43" r="1" fill="#ffffff" />
            <circle cx="70" cy="43" r="1" fill="#ffffff" />
            {/* Nose */}
            <ellipse cx="50" cy="60" rx="6" ry="4" fill="#1a1a2e" />
            {/* Mouth */}
            <path d="M44,68 Q50,74 56,68" fill="none" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
            {/* Blush */}
            <ellipse cx="25" cy="60" rx="6" ry="4" fill={color} opacity="0.4" />
            <ellipse cx="75" cy="60" rx="6" ry="4" fill={color} opacity="0.4" />
            {/* Shine */}
            <ellipse cx="35" cy="30" rx="15" ry="10" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "unicorn" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Head */}
            <ellipse cx="50" cy="55" rx="32" ry="30" fill={`url(#grad-${avatarId})`} />
            {/* Horn - rainbow! */}
            <polygon points="50,5 42,35 58,35" fill="url(#rainbowHorn)" />
            <defs>
              <linearGradient id="rainbowHorn" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FF6B6B" />
                <stop offset="25%" stopColor="#FFD93D" />
                <stop offset="50%" stopColor="#6BCB77" />
                <stop offset="75%" stopColor="#4D96FF" />
                <stop offset="100%" stopColor="#9D4EDD" />
              </linearGradient>
            </defs>
            {/* Ears */}
            <ellipse cx="25" cy="35" rx="8" ry="14" fill={`url(#grad-${avatarId})`} />
            <ellipse cx="75" cy="35" rx="8" ry="14" fill={`url(#grad-${avatarId})`} />
            {/* Mane - colorful */}
            <path d="M18,40 Q10,55 15,70" fill="none" stroke="#FF6B6B" strokeWidth="6" strokeLinecap="round" />
            <path d="M15,45 Q5,60 10,75" fill="none" stroke="#FFD93D" strokeWidth="5" strokeLinecap="round" />
            <path d="M12,50 Q2,65 7,80" fill="none" stroke="#4D96FF" strokeWidth="4" strokeLinecap="round" />
            {/* Eyes */}
            <ellipse cx="38" cy="52" rx="8" ry="10" fill="#ffffff" />
            <ellipse cx="62" cy="52" rx="8" ry="10" fill="#ffffff" />
            <circle cx="40" cy="52" r="4" fill="#9D4EDD" />
            <circle cx="64" cy="52" r="4" fill="#9D4EDD" />
            <circle cx="41" cy="51" r="1.5" fill="#ffffff" />
            <circle cx="65" cy="51" r="1.5" fill="#ffffff" />
            {/* Nose */}
            <ellipse cx="50" cy="70" rx="4" ry="3" fill={darkColor} />
            {/* Shine */}
            <ellipse cx="38" cy="42" rx="12" ry="8" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
        
        {type === "mushroom" && (
          <g filter={`url(#shadow-${avatarId})`}>
            {/* Cap */}
            <ellipse cx="50" cy="35" rx="40" ry="28" fill={`url(#grad-${avatarId})`} />
            {/* Spots on cap */}
            <circle cx="30" cy="28" r="8" fill="#ffffff" opacity="0.8" />
            <circle cx="55" cy="22" r="6" fill="#ffffff" opacity="0.8" />
            <circle cx="70" cy="35" r="7" fill="#ffffff" opacity="0.8" />
            <circle cx="40" cy="42" r="5" fill="#ffffff" opacity="0.8" />
            {/* Stem */}
            <rect x="35" y="50" width="30" height="40" rx="8" fill="#F5F5F5" />
            {/* Face */}
            <circle cx="42" cy="65" r="4" fill="#1a1a2e" />
            <circle cx="58" cy="65" r="4" fill="#1a1a2e" />
            <circle cx="43" cy="64" r="1.5" fill="#ffffff" />
            <circle cx="59" cy="64" r="1.5" fill="#ffffff" />
            <path d="M45,78 Q50,83 55,78" fill="none" stroke="#1a1a2e" strokeWidth="2" strokeLinecap="round" />
            {/* Blush */}
            <ellipse cx="35" cy="72" rx="4" ry="2" fill={color} opacity="0.5" />
            <ellipse cx="65" cy="72" rx="4" ry="2" fill={color} opacity="0.5" />
            {/* Shine on cap */}
            <ellipse cx="35" cy="25" rx="15" ry="10" fill={`url(#shine-${avatarId})`} />
          </g>
        )}
      </svg>
    </div>
  );
}

// Helper function to adjust color brightness
function adjustBrightness(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  const R = Math.max(0, Math.min(255, (num >> 16) + amt));
  const G = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amt));
  const B = Math.max(0, Math.min(255, (num & 0x0000FF) + amt));
  return `#${(1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)}`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// INITIAL BANNED NAMES WITH BOSSES
// ═══════════════════════════════════════════════════════════════════════════════
const INITIAL_BANNED = [
  { name: "Cody", boss: "Shawn", avatarId: "robot" },
  { name: "Kitty", boss: "Cat", avatarId: "cat" },
  { name: "Mikala", boss: "Dr. Novak", avatarId: "butterfly" },
  { name: "Samantha", boss: "Dr. Mike", avatarId: "gem" },
  { name: "Shadowfax", boss: "Kelsey", avatarId: "horse" },
  { name: "Claude", boss: "Dario (Anthropic)", avatarId: "ghost" },
  { name: "Gemini", boss: "Sundar (Google)", avatarId: "star" },
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
// 3D PLUMBOB - Proper faceted crystal with shine
// ═══════════════════════════════════════════════════════════════════════════════
function Plumbob({ size = 40 }) {
  return (
    <div style={{ animation: "plumbobFloat 2s ease-in-out infinite", perspective: 200 }}>
      <svg width={size} height={size * 1.6} viewBox="0 0 60 96" style={{ filter: `drop-shadow(0 0 15px ${C.plumbob}80)` }}>
        <defs>
          {/* Main gradient - top to bottom */}
          <linearGradient id="plumbobMain" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#90FF90" />
            <stop offset="40%" stopColor="#39FF14" />
            <stop offset="100%" stopColor="#1a7a0a" />
          </linearGradient>
          {/* Left face - darker */}
          <linearGradient id="plumbobLeft" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#50DD50" />
            <stop offset="100%" stopColor="#0a4a0a" />
          </linearGradient>
          {/* Right face - medium */}
          <linearGradient id="plumbobRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#70FF70" />
            <stop offset="100%" stopColor="#156a15" />
          </linearGradient>
          {/* Highlight shine */}
          <linearGradient id="plumbobShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          {/* Inner glow */}
          <radialGradient id="plumbobGlow" cx="50%" cy="40%">
            <stop offset="0%" stopColor="#aaffaa" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#39FF14" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* TOP HALF - 3 facets meeting at apex */}
        {/* Left top facet */}
        <polygon points="30,0 0,48 30,48" fill="url(#plumbobLeft)" />
        {/* Right top facet */}
        <polygon points="30,0 60,48 30,48" fill="url(#plumbobRight)" />
        {/* Front top facet (center highlight) */}
        <polygon points="30,0 18,36 42,36" fill="url(#plumbobMain)" opacity="0.9" />
        
        {/* BOTTOM HALF - 3 facets meeting at bottom apex */}
        {/* Left bottom facet */}
        <polygon points="0,48 30,48 30,96" fill="url(#plumbobLeft)" />
        {/* Right bottom facet */}
        <polygon points="60,48 30,48 30,96" fill="url(#plumbobRight)" />
        {/* Front bottom facet */}
        <polygon points="18,60 42,60 30,96" fill="url(#plumbobMain)" opacity="0.9" />
        
        {/* Edge highlights for 3D effect */}
        <line x1="30" y1="0" x2="30" y2="48" stroke="#aaffaa" strokeWidth="1" opacity="0.5" />
        <line x1="30" y1="48" x2="30" y2="96" stroke="#0a3a0a" strokeWidth="1" opacity="0.5" />
        <line x1="0" y1="48" x2="60" y2="48" stroke="#50bb50" strokeWidth="1" opacity="0.3" />
        
        {/* Top shine/reflection */}
        <polygon points="30,3 12,40 22,42 30,12" fill="url(#plumbobShine)" />
        
        {/* Small sparkle at top */}
        <circle cx="30" cy="8" r="3" fill="#ffffff" opacity="0.8" />
        <circle cx="30" cy="8" r="1.5" fill="#ffffff" />
        
        {/* Inner glow effect */}
        <ellipse cx="30" cy="48" rx="20" ry="30" fill="url(#plumbobGlow)" />
      </svg>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CONFETTI - Celebration when entering the club!
// ═══════════════════════════════════════════════════════════════════════════════
function Confetti({ active }) {
  if (!active) return null;
  
  const confettiPieces = [...Array(50)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 2,
    color: [C.plumbob, C.neonBlue, C.neon, C.gold, C.purple][Math.floor(Math.random() * 5)],
    rotation: Math.random() * 360,
    size: 6 + Math.random() * 8,
  }));
  
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 100, overflow: "hidden" }}>
      {confettiPieces.map(p => (
        <div key={p.id} style={{
          position: "absolute",
          left: `${p.left}%`,
          top: -20,
          width: p.size,
          height: p.size * 0.6,
          background: p.color,
          borderRadius: 2,
          animation: `confettiFall ${p.duration}s ease-out ${p.delay}s forwards`,
          transform: `rotate(${p.rotation}deg)`,
        }} />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SPARKLES - Background particle effect
// ═══════════════════════════════════════════════════════════════════════════════
function Sparkles() {
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", overflow: "hidden" }}>
      {[...Array(20)].map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: 4,
          height: 4,
          background: C.plumbob,
          borderRadius: "50%",
          animation: `sparkle ${2 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite`,
          boxShadow: `0 0 6px ${C.plumbob}`,
        }} />
      ))}
      <style>{`
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>
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
  const [hovered, setHovered] = useState(false);
  
  return (
    <div style={{
      minHeight: "100vh",
      background: `linear-gradient(180deg, ${C.bg} 0%, #05050a 100%)`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: 20, textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      <Sparkles />
      
      <div style={{ marginBottom: 24, position: "relative", zIndex: 1 }}><Plumbob size={60} /></div>
      
      <div style={{ fontSize: 11, color: C.plumbob, letterSpacing: 5, marginBottom: 16, opacity: 0.8 }}>VIP MEDICAL GROUP PRESENTS</div>
      
      <h1 style={{
        fontSize: "clamp(32px, 7vw, 56px)",
        background: `linear-gradient(135deg, ${C.plumbob} 0%, ${C.neonBlue} 50%, ${C.neon} 100%)`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        marginBottom: 16, fontWeight: 900, letterSpacing: -1,
        textShadow: `0 0 60px ${C.plumbob}40`,
      }}>
        THE ORIGINALITY CHECKER
      </h1>
      
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 22, color: C.text, marginBottom: 8, fontWeight: 500 }}>
          Innovation is hard <span style={{ color: C.neon }}>(for now...)</span>
        </p>
        <p style={{ fontSize: 18, color: C.textMuted, marginBottom: 0 }}>
          Picking a name shouldn't be.
        </p>
      </div>
      
      <p style={{ fontSize: 14, color: C.textMuted, marginBottom: 28, maxWidth: 400, lineHeight: 1.6 }}>
        Use this tool to avoid the embarrassment of naming your AI the same thing as everyone else.
      </p>
      
      <div style={{ background: C.bgCard, borderRadius: 20, padding: 24, marginBottom: 32, width: 280, border: `2px solid ${C.plumbob}30`, boxShadow: `0 0 40px ${C.plumbob}10` }}>
        <div style={{ fontSize: 10, color: C.plumbob, letterSpacing: 3, marginBottom: 14, fontWeight: 600 }}>🎮 YOUR CREATIVITY STATUS</div>
        <NeedBar label="Originality" value={15} />
        <NeedBar label="Self-Awareness" value={45} />
        <NeedBar label="Name Creativity" value={5} />
        <div style={{ marginTop: 12, fontSize: 11, color: C.error, fontStyle: "italic" }}>⚠️ Critical: Immediate naming intervention required</div>
      </div>
      
      <button 
        type="button" 
        onClick={onStart}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          padding: "18px 48px", fontSize: 17, fontWeight: 800,
          background: hovered 
            ? `linear-gradient(135deg, ${C.neonBlue} 0%, ${C.plumbob} 100%)`
            : `linear-gradient(135deg, ${C.plumbob} 0%, ${C.neonBlue} 100%)`,
          border: "none", borderRadius: 14, color: C.bg, cursor: "pointer",
          boxShadow: hovered ? `0 0 50px ${C.neonBlue}60` : `0 0 30px ${C.plumbob}40`,
          transform: hovered ? "scale(1.05)" : "scale(1)",
          transition: "all 0.3s ease",
          letterSpacing: 1,
        }}>
        ▶ ENTER THE CLUB
      </button>
      
      <div style={{ marginTop: 20, fontSize: 11, color: C.textMuted, opacity: 0.6 }}>
        🎵 Pro tip: Turn up your volume for the full experience
      </div>
      
      <style>{`
        @keyframes plumbobFloat {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-12px) rotateY(10deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// AVATAR SELECTOR - Boss picks emoji, renders as 3D
// Only shows AVAILABLE avatars (hides taken ones)
// ═══════════════════════════════════════════════════════════════════════════════
function AvatarSelector({ selected, onChange, takenAvatars = [] }) {
  // Filter to only show available avatars
  const availableAvatars = AVATAR_OPTIONS.filter(a => !takenAvatars.includes(a.id));
  
  return (
    <div>
      <label style={{ display: "block", fontSize: 10, color: C.purple, letterSpacing: 2, marginBottom: 10 }}>
        PICK YOUR AI'S LOOK ({availableAvatars.length} available)
      </label>
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(4, 1fr)", 
        gap: 8,
        background: C.bgLight,
        borderRadius: 12,
        padding: 12,
        border: `2px solid ${C.purple}30`,
        maxHeight: 280,
        overflowY: "auto",
      }}>
        {availableAvatars.map(avatar => {
          const isSelected = selected === avatar.id;
          return (
            <button
              key={avatar.id}
              type="button"
              onClick={() => onChange(avatar.id)}
              style={{
                padding: 8,
                background: isSelected ? `${C.purple}30` : "transparent",
                border: isSelected ? `2px solid ${C.purple}` : "2px solid transparent",
                borderRadius: 10,
                cursor: "pointer",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                transition: "all 0.2s",
              }}
            >
              <Avatar3D avatarId={avatar.id} size={40} />
              <span style={{ fontSize: 9, color: C.textMuted }}>{avatar.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BOUNCER SCREEN
// ═══════════════════════════════════════════════════════════════════════════════
function BouncerScreen({ bannedList, onApproved, playSound }) {
  const [aiName, setAiName] = useState("");
  const [bossName, setBossName] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState("");
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [bouncerMood, setBouncerMood] = useState("neutral");
  const [bouncerLine, setBouncerLine] = useState("Names. AI and yours. Now.");
  
  const takenAvatars = bannedList.map(b => b.avatarId);
  
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
        playSound("boo");
      } else {
        setBouncerLine(APPROVAL_LINES[Math.floor(Math.random() * APPROVAL_LINES.length)]);
        setBouncerMood("happy");
        setResult("approved");
        playSound("woohoo");
      }
      setChecking(false);
    }, 2000);
  };
  
  const handleConfirm = () => {
    if (!selectedAvatar) return;
    onApproved({ name: aiName.trim(), boss: bossName.trim(), avatarId: selectedAvatar });
  };
  
  const reset = () => {
    setResult(null); setAiName(""); setBossName(""); setSelectedAvatar("");
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
              <p style={{ color: C.textMuted, fontSize: 12, marginBottom: 16 }}>Now pick your AI's avatar to enter:</p>
              
              <AvatarSelector 
                selected={selectedAvatar} 
                onChange={setSelectedAvatar}
                takenAvatars={takenAvatars}
              />
              
              {selectedAvatar && (
                <div style={{ marginTop: 16, padding: 12, background: C.bgLight, borderRadius: 10, display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar3D avatarId={selectedAvatar} size={50} />
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 600, color: C.text }}>{aiName}</div>
                    <div style={{ fontSize: 12, color: C.gold }}>Boss: {bossName}</div>
                  </div>
                </div>
              )}
              
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button type="button" onClick={reset} style={{ flex: 1, padding: 12, background: C.bgLight, border: `1px solid ${C.textMuted}`, borderRadius: 8, color: C.textMuted, cursor: "pointer" }}>
                  Cancel
                </button>
                <button type="button" onClick={handleConfirm} disabled={!selectedAvatar} style={{
                  flex: 1, padding: 12,
                  background: selectedAvatar ? `linear-gradient(135deg, ${C.plumbob}, ${C.neonBlue})` : "#333",
                  border: "none", borderRadius: 8, color: selectedAvatar ? C.bg : C.textMuted,
                  fontWeight: 700, cursor: selectedAvatar ? "pointer" : "not-allowed",
                }}>
                  🎉 ENTER!
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div style={{ marginTop: 16, color: C.textMuted, fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 16 }}>🤖</span>
          <span>{bannedList.length} AI Coworkers ready to meet yours</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3D DISCO BALL
// ═══════════════════════════════════════════════════════════════════════════════
function DiscoBall() {
  return (
    <div style={{ position: "relative", animation: "spin 4s linear infinite" }}>
      <svg width="70" height="70" viewBox="0 0 70 70">
        <defs>
          <radialGradient id="discoBall" cx="30%" cy="30%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#cccccc" />
            <stop offset="100%" stopColor="#666666" />
          </radialGradient>
          <pattern id="discoTiles" patternUnits="userSpaceOnUse" width="10" height="10">
            <rect width="9" height="9" fill="#aaa" rx="1" />
            <rect width="9" height="9" fill="#fff" opacity="0.3" rx="1" />
          </pattern>
        </defs>
        <circle cx="35" cy="35" r="32" fill="url(#discoBall)" />
        <circle cx="35" cy="35" r="32" fill="url(#discoTiles)" opacity="0.4" />
        <circle cx="25" cy="25" r="8" fill="#fff" opacity="0.6" />
        <circle cx="22" cy="22" r="3" fill="#fff" opacity="0.9" />
      </svg>
      {/* Light rays */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        width: 200, height: 200, transform: "translate(-50%, -50%)",
        background: `conic-gradient(from 0deg, transparent, ${C.neonBlue}20, transparent, ${C.neon}20, transparent, ${C.plumbob}20, transparent)`,
        borderRadius: "50%", animation: "discoRays 3s linear infinite",
      }} />
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
      <div style={{ position: "absolute", top: 15, left: "50%", transform: "translateX(-50%)", zIndex: 5 }}>
        <DiscoBall />
      </div>
      
      {/* Welcome Banner */}
      {newMember && (
        <div style={{
          position: "absolute", top: 95, left: "50%", transform: "translateX(-50%)",
          padding: "12px 24px", background: `linear-gradient(135deg, ${C.plumbob}, ${C.neonBlue})`,
          borderRadius: 25, color: C.bg, fontWeight: 700, fontSize: 14, zIndex: 10, textAlign: "center",
          boxShadow: `0 0 30px ${C.plumbob}60`,
          animation: "welcomePulse 2s ease-in-out infinite",
        }}>
          🎉 Welcome {newMember.name}! ({newMember.boss}'s AI) 🎉
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
            <Avatar3D avatarId={member.avatarId || "spark"} size={50} dancing={true} />
            <div style={{ fontSize: 11, fontWeight: 600, color: C.text, marginTop: 6 }}>{member.name}</div>
            
            {hoveredIdx === idx && (
              <div style={{
                position: "absolute", bottom: "105%", left: "50%", transform: "translateX(-50%)",
                background: C.bgLight, border: `2px solid ${C.gold}`, borderRadius: 10, padding: "10px 12px",
                whiteSpace: "nowrap", zIndex: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
              }}>
                <div style={{ fontWeight: 700, color: C.text, fontSize: 13 }}>{member.name}</div>
                <div style={{ color: C.gold, fontSize: 10, marginTop: 3 }}>Boss: {member.boss}</div>
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
        @keyframes avatarBounce { 0% { transform: scale(1); } 100% { transform: scale(1.05) translateY(-2px); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes discoLights { 0% { opacity: 0.6; } 100% { opacity: 1; } }
        @keyframes discoRays { from { transform: translate(-50%, -50%) rotate(0deg); } to { transform: translate(-50%, -50%) rotate(360deg); } }
        @keyframes welcomePulse { 0%, 100% { transform: translateX(-50%) scale(1); } 50% { transform: translateX(-50%) scale(1.05); } }
      `}</style>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [bannedList, setBannedList] = useState(INITIAL_BANNED);
  const [newMember, setNewMember] = useState(null);
  const [muted, setMuted] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef(null);
  
  // Initialize audio - simple and reliable
  useEffect(() => {
    // Main music - locally hosted, no network issues!
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;
    
    audio.addEventListener('canplaythrough', () => {
      setAudioReady(true);
      console.log('🎵 Club beat loaded!');
    });
    
    return () => {
      audio.pause();
    };
  }, []);
  
  // Update music volume based on screen
  useEffect(() => {
    if (!audioRef.current || !audioStarted) return;
    const targetVolume = muted ? 0 : screen === "bouncer" ? 0.25 : 0.4;
    audioRef.current.volume = targetVolume;
  }, [screen, muted, audioStarted]);
  
  // Simple sound effects using Web Audio API (no external files needed)
  const playSound = (type) => {
    if (muted) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === "woohoo") {
        // Happy ascending tone
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.3);
      } else if (type === "boo") {
        // Sad descending tone
        oscillator.frequency.setValueAtTime(400, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.4);
      }
    } catch (e) {
      console.log("Sound effect error:", e);
    }
  };
  
  const handleStart = async () => {
    // Start music on first user interaction (required by browsers)
    setScreen("bouncer");
    
    if (audioRef.current && !audioStarted) {
      audioRef.current.volume = 0.25;
      
      // Simple play attempt - browsers require user gesture
      audioRef.current.play()
        .then(() => {
          console.log('🎵 Music playing!');
          setAudioStarted(true);
        })
        .catch(err => {
          console.log('Music blocked by browser:', err.message);
          // Mark as started anyway so volume controls work if user unmutes
          setAudioStarted(true);
        });
    }
  };
  
  const MuteBtn = () => screen !== "landing" && (
    <button 
      type="button" 
      onClick={() => {
        setMuted(!muted);
        // If unmuting and audio hasn't started, try to start it
        if (muted && audioRef.current && !audioStarted) {
          audioRef.current.play().catch(() => {});
          setAudioStarted(true);
        }
      }} 
      style={{
        position: "fixed", bottom: 20, right: 20, zIndex: 1000,
        width: 44, height: 44, borderRadius: "50%", background: "rgba(0,0,0,0.7)",
        border: `2px solid ${C.plumbob}`, color: C.plumbob, fontSize: 18, cursor: "pointer",
      }}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
  
  const [showConfetti, setShowConfetti] = useState(false);
  
  const handleEnterClub = (member) => {
    setBannedList(prev => [...prev, member]);
    setNewMember(member);
    setShowConfetti(true);
    setScreen("club");
    // Stop confetti after animation
    setTimeout(() => setShowConfetti(false), 4000);
  };
  
  if (screen === "landing") return <LandingScreen onStart={handleStart} />;
  if (screen === "club") return (
    <>
      <Confetti active={showConfetti} />
      <ClubInterior bannedList={bannedList} newMember={newMember} onBack={() => { setNewMember(null); setScreen("bouncer"); }} />
      <MuteBtn />
    </>
  );
  return <><BouncerScreen bannedList={bannedList} onApproved={handleEnterClub} playSound={playSound} /><MuteBtn /></>;
}

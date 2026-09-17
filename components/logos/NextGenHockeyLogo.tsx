import React from 'react';

interface LogoProps {
  className?: string;
}

export const NextGenHockeyLogo: React.FC<LogoProps> = ({ className = "h-14" }) => {
  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 320 370"
        className="w-full h-full object-contain overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="NextGen Hockey Logo"
      >
        <defs>
          {/* Blue Ice Gradient */}
          <linearGradient id="hockeyBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Shield Navy Gradient */}
          <radialGradient id="hockeyShieldBg" cx="50%" cy="35%" r="70%">
            <stop offset="0%" stopColor="#0D2744" />
            <stop offset="60%" stopColor="#07192C" />
            <stop offset="100%" stopColor="#030C17" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="hockeyGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#38BDF8" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* SHIELD OUTER WITH BLUE BORDER */}
        <g filter="url(#hockeyGlow)">
          <path
            d="M 50 65 
               Q 160 15 270 65 
               L 275 235 
               Q 275 295 160 350 
               Q 45 295 45 235 
               Z"
            fill="url(#hockeyShieldBg)"
            stroke="url(#hockeyBlueGrad)"
            strokeWidth="9"
            strokeLinejoin="round"
          />

          {/* Inner Inset Rim Accent */}
          <path
            d="M 62 75 
               Q 160 30 258 75 
               L 262 230 
               Q 262 285 160 336 
               Q 58 285 58 230 
               Z"
            stroke="#1e3a5f"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* TYPOGRAPHY GROUP */}
        <g transform="translate(160, 130)" textAnchor="middle">
          {/* NEXT - Pure White Heavy Sans */}
          <text
            x="0"
            y="0"
            fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
            fontWeight="950"
            fontSize="58"
            fill="#FFFFFF"
            letterSpacing="-0.01em"
          >
            NEXT
          </text>

          {/* GEN - Cyan Ice Blue */}
          <text
            x="0"
            y="56"
            fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
            fontWeight="950"
            fontSize="62"
            fill="url(#hockeyBlueGrad)"
            letterSpacing="-0.01em"
          >
            GEN
          </text>

          {/* HOCKEY - Clean White Subtitle */}
          <text
            x="0"
            y="102"
            fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
            fontWeight="800"
            fontSize="20"
            fill="#FFFFFF"
            letterSpacing="0.32em"
          >
            HOCKEY
          </text>
        </g>

        {/* DOUBLE CURVED ICE BLUE SWOOP SMILE AT BOTTOM */}
        <g transform="translate(160, 240)">
          {/* Upper Swoop */}
          <path
            d="M -95 15 Q 0 85 95 15"
            stroke="url(#hockeyBlueGrad)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Lower Echo Swoop */}
          <path
            d="M -70 45 Q 0 95 70 45"
            stroke="#0284C7"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </svg>
    </div>
  );
};

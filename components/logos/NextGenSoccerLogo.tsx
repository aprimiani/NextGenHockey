import React from 'react';

interface LogoProps {
  className?: string;
}

export const NextGenSoccerLogo: React.FC<LogoProps> = ({ className = "h-14" }) => {
  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 340 380"
        className="w-full h-full object-contain overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="NextGen Soccer Logo"
      >
        <defs>
          {/* Lime Green Accent Gradient */}
          <linearGradient id="soccerLimeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BEF227" />
            <stop offset="50%" stopColor="#A3E635" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>

          {/* Shield Dark Radial Gradient */}
          <radialGradient id="soccerShieldBg" cx="50%" cy="40%" r="65%">
            <stop offset="0%" stopColor="#141E15" />
            <stop offset="60%" stopColor="#0B0F0C" />
            <stop offset="100%" stopColor="#050805" />
          </radialGradient>

          {/* Drop shadow */}
          <filter id="soccerGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#84CC16" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* OUTER SHIELD WITH LIME BORDER */}
        <g filter="url(#soccerGlow)">
          {/* Shield Path */}
          <path
            d="M 60 70 
               Q 170 15 280 70 
               L 285 240 
               Q 285 295 170 355 
               Q 55 295 55 240 
               Z"
            fill="url(#soccerShieldBg)"
            stroke="url(#soccerLimeGrad)"
            strokeWidth="10"
            strokeLinejoin="round"
          />

          {/* Inner Inset Rim Accent */}
          <path
            d="M 72 80 
               Q 170 32 268 80 
               L 272 235 
               Q 272 285 170 340 
               Q 68 285 68 235 
               Z"
            stroke="#27272a"
            strokeWidth="2"
            fill="none"
          />
        </g>

        {/* SOCCER BALL AT TOP BREAKING OUT */}
        <g transform="translate(170, 75)">
          {/* Motion Swooshes Left & Right */}
          <path
            d="M -75 -15 Q -65 -45 -45 -55"
            stroke="#A3E635"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M -85 5 Q -75 -25 -55 -40"
            stroke="#A3E635"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 75 -15 Q 65 -45 45 -55"
            stroke="#A3E635"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 85 5 Q 75 -25 55 -40"
            stroke="#A3E635"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Soccer Ball Body (Radius 50) */}
          <circle cx="0" cy="-10" r="48" fill="#F8FAFC" stroke="#0B0F0C" strokeWidth="4" />

          {/* Center Black Pentagon */}
          <polygon
            points="0,-18 16,-8 10,12 -10,12 -16,-8"
            fill="#0B0F0C"
          />

          {/* Lines connecting center pentagon to perimeter panels */}
          <line x1="0" y1="-18" x2="0" y2="-48" stroke="#0B0F0C" strokeWidth="3" />
          <line x1="16" y1="-8" x2="42" y2="-22" stroke="#0B0F0C" strokeWidth="3" />
          <line x1="10" y1="12" x2="28" y2="34" stroke="#0B0F0C" strokeWidth="3" />
          <line x1="-10" y1="12" x2="-28" y2="34" stroke="#0B0F0C" strokeWidth="3" />
          <line x1="-16" y1="-8" x2="-42" y2="-22" stroke="#0B0F0C" strokeWidth="3" />

          {/* Outer edge pentagons/patches */}
          <polygon points="-24,-42 -4,-48 -14,-32" fill="#0B0F0C" />
          <polygon points="24,-42 4,-48 14,-32" fill="#0B0F0C" />
          <polygon points="40,2 48,-14 36,-10" fill="#0B0F0C" />
          <polygon points="-40,2 -48,-14 -36,-10" fill="#0B0F0C" />
        </g>

        {/* TYPOGRAPHY GROUP */}
        <g transform="translate(170, 155) skewX(-12)" textAnchor="middle">
          {/* NEXT - Pure White Athletic Italic */}
          <text
            x="0"
            y="0"
            fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
            fontWeight="950"
            fontSize="54"
            fill="#FFFFFF"
            letterSpacing="-0.01em"
          >
            NEXT
          </text>

          {/* GEN - Neon Lime Athletic Italic */}
          <text
            x="0"
            y="52"
            fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
            fontWeight="950"
            fontSize="60"
            fill="url(#soccerLimeGrad)"
            letterSpacing="-0.01em"
          >
            GEN
          </text>
        </g>

        {/* 'SOCCER' SUBTITLE */}
        <g transform="translate(170, 235)">
          <text
            x="0"
            y="0"
            fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
            fontWeight="900"
            fontSize="18"
            fill="#FFFFFF"
            textAnchor="middle"
            letterSpacing="0.32em"
          >
            SOCCER
          </text>
        </g>

        {/* HORIZONTAL WING ACCENTS & STAR */}
        <g transform="translate(170, 252)">
          {/* Left Wing */}
          <polygon points="-80,0 -16,-2 -16,2" fill="#A3E635" />
          {/* Right Wing */}
          <polygon points="80,0 16,-2 16,2" fill="#A3E635" />
          {/* Center 5-point Star */}
          <polygon
            points="0,-8 2.5,-2 8.5,-2 3.8,1.5 5.5,7.5 0,3.8 -5.5,7.5 -3.8,1.5 -8.5,-2 -2.5,-2"
            fill="#A3E635"
          />
        </g>

        {/* 5 VERTICAL STRIPES AT BOTTOM SHIELD APEX */}
        <g transform="translate(170, 268)">
          {/* Alternating Lime and Dark stripes */}
          <rect x="-42" y="0" width="12" height="42" fill="#A3E635" />
          <rect x="-24" y="0" width="12" height="52" fill="#0B0F0C" />
          <rect x="-6" y="0" width="12" height="60" fill="#A3E635" />
          <rect x="12" y="0" width="12" height="52" fill="#0B0F0C" />
          <rect x="30" y="0" width="12" height="42" fill="#A3E635" />
        </g>
      </svg>
    </div>
  );
};

import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'compact';
}

export const NextGenSportsLogo: React.FC<LogoProps> = ({ className = "h-12", variant = 'full' }) => {
  return (
    <div className={`inline-flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 540 180"
        className="w-full h-full object-contain overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="NextGen Sports"
      >
        <defs>
          {/* Gold metallic gradient for GEN */}
          <linearGradient id="sportsGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFF176" />
            <stop offset="25%" stopColor="#FBC02D" />
            <stop offset="70%" stopColor="#F57F17" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>

          {/* Speed streak orange gradient */}
          <linearGradient id="streakOrangeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF9800" />
            <stop offset="50%" stopColor="#F57C00" />
            <stop offset="100%" stopColor="#E65100" />
          </linearGradient>

          {/* Drop shadow filter */}
          <filter id="sportsShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.6" />
          </filter>
        </defs>

        <g filter="url(#sportsShadow)">
          {/* TOP SPEED STREAK (Orange wing extending right) */}
          <path
            d="M 140 32 L 455 24 L 430 38 L 195 44 Z"
            fill="url(#streakOrangeGrad)"
          />

          {/* BOTTOM SPEED STREAK (Orange wing extending left) */}
          <path
            d="M 105 135 L 420 128 L 350 144 L 175 146 Z"
            fill="url(#streakOrangeGrad)"
          />

          {/* MAIN LETTERING CONTAINER - Angled Italic Athletic Typography */}
          {/* Heavy Black Outline for 3D Athletic Block Effect */}
          <g transform="skewX(-14)">
            {/* NEXT - Heavy Shadow & Outline */}
            <text
              x="135"
              y="108"
              fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
              fontWeight="950"
              fontSize="82"
              fill="#0a0a0c"
              stroke="#0a0a0c"
              strokeWidth="14"
              strokeLinejoin="round"
              letterSpacing="-0.02em"
            >
              NEXT
            </text>

            {/* GEN - Heavy Shadow & Outline */}
            <text
              x="332"
              y="108"
              fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
              fontWeight="950"
              fontSize="82"
              fill="#0a0a0c"
              stroke="#0a0a0c"
              strokeWidth="14"
              strokeLinejoin="round"
              letterSpacing="-0.02em"
            >
              GEN
            </text>

            {/* NEXT - White Core Fill */}
            <text
              x="135"
              y="108"
              fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
              fontWeight="950"
              fontSize="82"
              fill="#FFFFFF"
              letterSpacing="-0.02em"
            >
              NEXT
            </text>

            {/* GEN - Gold Metallic Core Fill */}
            <text
              x="332"
              y="108"
              fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
              fontWeight="950"
              fontSize="82"
              fill="url(#sportsGoldGrad)"
              letterSpacing="-0.02em"
            >
              GEN
            </text>
          </g>

          {/* 'SPORTS' BLACK PILL BANNER */}
          <g transform="skewX(-14)">
            <path
              d="M 185 120 L 375 120 L 368 148 L 178 148 Z"
              fill="#0a0a0c"
              stroke="#1f242d"
              strokeWidth="2"
            />
            <text
              x="276"
              y="141"
              fontFamily="'Outfit', system-ui, -apple-system, sans-serif"
              fontWeight="900"
              fontSize="20"
              fill="#FFFFFF"
              textAnchor="middle"
              letterSpacing="0.28em"
            >
              SPORTS
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

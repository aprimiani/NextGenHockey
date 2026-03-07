import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-10" }) => (
  <svg viewBox="0 0 220 270" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Next Gen Hockey Logo">
    {/* Shield Background - Expanded shape */}
    <path 
      d="M 5 40 Q 110 -10 215 40 L 215 170 Q 110 300 5 170 Z" 
      fill="#1e293b" 
      stroke="#38bdf8"
      strokeWidth="3"
    />
    
    {/* Text Group - Centered vertically and horizontally */}
    <g fontFamily="'Outfit', sans-serif" fontWeight="900" textAnchor="middle">
      {/* NEXT - White - Centered */}
      <text x="110" y="90" fontSize="64" fill="white">NEXT</text>
      
      {/* GEN - Light Blue - Centered */}
      <text x="110" y="145" fontSize="64" fill="#38bdf8">GEN</text>
    </g>

    {/* HOCKEY - Positioned with more breathing room */}
    <text x="110" y="185" fontFamily="'Outfit', sans-serif" fontWeight="700" fontSize="22" fill="white" letterSpacing="0.3em" textAnchor="middle">HOCKEY</text>

    {/* Blue Curved Smile/Accent - Adjusted for new proportions */}
    <path 
      d="M 40 195 Q 110 235 180 195" 
      stroke="#38bdf8" 
      strokeWidth="3" 
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
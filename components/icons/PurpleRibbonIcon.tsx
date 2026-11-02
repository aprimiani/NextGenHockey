import React from 'react';

interface PurpleRibbonIconProps {
  className?: string;
  size?: number;
}

export const PurpleRibbonIcon: React.FC<PurpleRibbonIconProps> = ({
  className = 'w-3.5 h-3.5',
  size
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    aria-hidden="true"
  >
    {/* Awareness ribbon loop */}
    <path
      d="M12 2.5C9.5 2.5 7.6 4.6 8.2 7.8C8.8 10.7 10.6 13.6 12 15.8C13.4 13.6 15.2 10.7 15.8 7.8C16.4 4.6 14.5 2.5 12 2.5Z"
      fill="url(#purpleRibbonGradShared)"
      stroke="#c084fc"
      strokeWidth="1.2"
      strokeLinejoin="round"
    />
    {/* Left tail */}
    <path
      d="M10.2 13.5L5.5 21C5.2 21.5 5.8 22.1 6.3 21.8L10.8 18.8L12 15.8"
      stroke="#c084fc"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right tail */}
    <path
      d="M13.8 13.5L18.5 21C18.8 21.5 18.2 22.1 17.7 21.8L13.2 18.8L12 15.8"
      stroke="#a855f7"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="purpleRibbonGradShared" x1="8" y1="2.5" x2="16" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#d8b4fe" />
        <stop offset="0.6" stopColor="#a855f7" />
        <stop offset="1" stopColor="#7e22ce" />
      </linearGradient>
    </defs>
  </svg>
);

import React from 'react';
import { NextGenHockeyLogo } from './logos/NextGenHockeyLogo';

export const Logo: React.FC<{ className?: string }> = ({ className = "h-10" }) => (
  <NextGenHockeyLogo className={className} />
);

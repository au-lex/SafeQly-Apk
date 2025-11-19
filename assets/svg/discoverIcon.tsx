// components/icons/DiscoverIcon.js
import React from 'react';
import { Svg, Path } from 'react-native-svg';

export const DiscoverSvg = ({ width = 23, height = 23, stroke = "#124E9B" }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Z"
      stroke={stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      fill={stroke} // Filled for active state
    />
    <Path
      d="M13.5 8C10.47 8 8 10.48 8 13.5c0 1.37 1.12 2.5 2.5 2.5 3.02 0 5.5-2.48 5.5-5.5C16 9.13 14.87 8 13.5 8Z"
      stroke={stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="white" // Filled for active state
    />
  </Svg>
);

export const DiscoverOutlineSvg = ({ width = 23, height = 23, stroke = "#8E8E93" }) => (
  <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22c5.5 0 10-4.5 10-10S17.5 2 12 2 2 6.5 2 12s4.5 10 10 10Z"
      stroke={stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      fill="none" // No fill for inactive state
    />
    <Path
      d="M13.5 8C10.47 8 8 10.48 8 13.5c0 1.37 1.12 2.5 2.5 2.5 3.02 0 5.5-2.48 5.5-5.5C16 9.13 14.87 8 13.5 8Z"
      stroke={stroke}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none" // No fill for inactive state
    />
  </Svg>
);
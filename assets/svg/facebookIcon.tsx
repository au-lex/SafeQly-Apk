// components/icons/SecondCustomIcon.js
import React from 'react';
import { Svg, Defs, Pattern, Use, Image, Rect } from 'react-native-svg';

export const FacebookIconSvg = ({ width = 40, height = 40 }) => (
  <Svg width={width} height={height} viewBox="0 0 40 40" fill="none">
    <Defs>
      <Pattern
        id="pattern0_2_549"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <Use
          href="#image0_2_549"
          transform="scale(0.0111111)"
        />
      </Pattern>
      <Image
        id="image0_2_549"
        width="90"
        height="90"
        preserveAspectRatio="none"
        href="data:image/png;base64,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"
      />
    </Defs>
    <Rect
      width="40"
      height="40"
      fill="url(#pattern0_2_549)"
    />
  </Svg>
);



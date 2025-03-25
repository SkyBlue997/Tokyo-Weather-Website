import React from 'react';
import styled from '@emotion/styled';
import { Season, TimeOfDay } from '../types/weather';
import { SEASON_CONFIG } from '../constants/seasonConfig';

interface TokyoSilhouetteProps {
  season: Season;
  timeOfDay: TimeOfDay;
}

interface SilhouetteContainerProps {
  backgroundColor: string;
  textColor: string;
}

const SilhouetteContainer = styled.div<SilhouetteContainerProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25vh;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
  color: ${props => props.textColor};
`;

const SilhouetteSVG = styled.svg`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  fill: currentColor;
  z-index: 1;
  filter: drop-shadow(0px 5px 15px rgba(0, 0, 0, 0.2));
  transition: all 1s ease-in-out;
`;

// 东京剪影
const TokyoSilhouette: React.FC<TokyoSilhouetteProps> = ({ season, timeOfDay }) => {
  const seasonConfig = SEASON_CONFIG[season];
  const timeVariant = seasonConfig.timeVariants[timeOfDay];
  
  return (
    <SilhouetteContainer 
      backgroundColor={timeVariant.background}
      textColor={timeVariant.textColor}
    >
      <SilhouetteSVG 
        preserveAspectRatio="none" 
        viewBox="0 0 1440 320" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* 东京城市轮廓 */}
        <path 
          opacity="0.9" 
          d="M0,192L48,186.7C96,181,192,171,288,181.3C384,192,480,224,576,218.7C672,213,768,171,864,170.7C960,171,1056,213,1152,224C1248,235,1344,213,1392,202.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
        
        {/* 东京塔 */}
        <path 
          opacity="1" 
          d="M720,100 L690,320 L750,320 L720,100 Z" 
        />
        <path 
          opacity="1" 
          d="M720,80 L705,100 L735,100 L720,80 Z" 
        />
        <path 
          opacity="1" 
          d="M720,40 L715,80 L725,80 L720,40 Z" 
        />
        <path 
          opacity="1" 
          d="M717,25 L723,25 L723,40 L717,40 Z" 
        />
        
        {/* 摩天楼1 */}
        <rect 
          opacity="1" 
          x="400" y="150" 
          width="40" height="170" 
        />
        <rect 
          opacity="0.8" 
          x="440" y="170" 
          width="40" height="150" 
        />
        
        {/* 摩天楼2 */}
        <rect 
          opacity="0.9" 
          x="500" y="140" 
          width="30" height="180" 
        />
        <rect 
          opacity="0.85" 
          x="530" y="160" 
          width="20" height="160" 
        />
        
        {/* 摩天楼3 */}
        <rect 
          opacity="0.95" 
          x="800" y="130" 
          width="50" height="190" 
        />
        <rect 
          opacity="0.9" 
          x="850" y="150" 
          width="30" height="170" 
        />
        
        {/* 摩天楼4 */}
        <rect 
          opacity="0.8" 
          x="900" y="160" 
          width="45" height="160" 
        />
        
        {/* 摩天楼5 */}
        <rect 
          opacity="0.9" 
          x="1000" y="140" 
          width="35" height="180" 
        />
        <rect 
          opacity="0.85" 
          x="1035" y="170" 
          width="25" height="150" 
        />
        
        {/* 浅草寺 */}
        <path 
          opacity="0.9" 
          d="M300,190 L280,190 L280,230 L270,230 L270,320 L330,320 L330,230 L320,230 L320,190 L300,190 Z" 
        />
        <path 
          opacity="0.9" 
          d="M290,170 L310,170 L315,180 L285,180 L290,170 Z" 
        />
        <path 
          opacity="0.9" 
          d="M295,150 L305,150 L310,170 L290,170 L295,150 Z" 
        />
        
        {/* 皇宫屋顶 */}
        <path 
          opacity="0.7" 
          d="M580,200 C580,200 620,180 660,200 L660,220 L580,220 Z" 
        />
      </SilhouetteSVG>
    </SilhouetteContainer>
  );
};

export default TokyoSilhouette; 
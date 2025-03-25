import { useMemo } from 'react';
import { Season, TimeOfDay } from '../../types/weather';
import { SEASON_CONFIG } from '../../constants/seasonConfig';
import CherryBlossom from './CherryBlossom';
import Leaf from './Leaf';
import MapleLeaf from './MapleLeaf';
import Snowflake from './Snowflake';

interface ParticleEffectProps {
  season: Season;
  timeOfDay: TimeOfDay;
}

const ParticleEffect: React.FC<ParticleEffectProps> = ({ season, timeOfDay }) => {
  const seasonConfig = SEASON_CONFIG[season];
  
  // 根据时间段获取粒子颜色
  const particleColor = useMemo(() => {
    return seasonConfig.timeVariants[timeOfDay].particleColor;
  }, [seasonConfig, timeOfDay]);
  
  // 根据季节选择粒子类型
  const renderParticle = () => {
    switch (season) {
      case 'spring':
        return <CherryBlossom color={particleColor} />;
      case 'summer':
        return <Leaf color={particleColor} />;
      case 'autumn':
        return <MapleLeaf color={particleColor} />;
      case 'winter':
        return <Snowflake color={particleColor} />;
      default:
        return null;
    }
  };
  
  return renderParticle();
};

export default ParticleEffect; 
import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { HourForecast } from '../../types/weather';
import { WEATHER_ICONS } from '../../constants/api';
import WeatherIcon from './WeatherIcon';

interface HourlyForecastProps {
  hours: HourForecast[];
  accentColor: string;
}

const Container = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 1.5rem 2rem;
  margin-top: 3rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 280px;
  backdrop-filter: blur(8px);
  width: 100%;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  flex-grow: 1;
`;

const Title = styled.h3`
  margin-top: 0;
  margin-bottom: 16px;
  color: #ffffff;
  font-weight: 600;
`;

const HourlyScrollContainer = styled.div`
  display: flex;
  overflow-x: auto;
  padding-bottom: 10px;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin;
  min-width: 500px;
  width: 100%;
  max-width: 800px;
  padding-right: 10px;
  
  &::-webkit-scrollbar {
    height: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
  }
  
  @media (max-width: 1200px) {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
  }
`;

const HourItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  min-width: 80px;
  width: 80px;
  box-sizing: border-box;
`;

const TimeText = styled.div`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const Temperature = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0.5rem 0;
`;

const InfoText = styled.div`
  font-size: 0.8rem;
  opacity: 0.9;
  text-align: center;
`;

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hours, accentColor }) => {
  console.log('渲染HourlyForecast组件, 小时数:', hours.length);
  
  // 获取当前小时的日期作为key
  const firstHour = hours[0];
  const componentKey = firstHour ? `hourly-${firstHour.time}` : 'hourly-forecast';
  
  // 确保始终显示8个小时项，必要时添加空项
  const displayHours = [...hours];
  if (hours.length < 8) {
    // 创建填充项
    const emptyHours = Array(8 - hours.length).fill(null).map((_, index) => ({
      time: `空-${index}`,
      temp: 0,
      description: '',
      icon: '',
      windSpeed: 0,
      humidity: 0
    }));
    // 根据需要添加到前面或后面
    displayHours.push(...emptyHours);
  } else if (hours.length > 8) {
    // 只显示前8个
    displayHours.length = 8;
  }
  
  return (
    <Container
      key={componentKey}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <Title>小时预报</Title>
      <HourlyScrollContainer>
        {displayHours.map((hour, index) => {
          if (!hour) return <HourItem key={`empty-${index}`} />;
          
          const iconCode = WEATHER_ICONS[hour.icon];
          
          return (
            <HourItem key={`${hour.time}-${index}`}>
              <TimeText>{hour.time}</TimeText>
              {hour.description && (
                <>
                  <WeatherIcon iconCode={iconCode} size={32} color={accentColor} />
                  <Temperature>{hour.temp}°C</Temperature>
                  <InfoText>{hour.description}</InfoText>
                  <InfoText>风速: {hour.windSpeed}m/s</InfoText>
                  <InfoText>湿度: {hour.humidity}%</InfoText>
                </>
              )}
            </HourItem>
          );
        })}
      </HourlyScrollContainer>
    </Container>
  );
};

export default HourlyForecast;
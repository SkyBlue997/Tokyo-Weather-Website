import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { WeatherData } from '../../types/weather';
import { WEATHER_ICONS } from '../../constants/api';
import WeatherIcon from './WeatherIcon';
import { SEASON_CONFIG } from '../../constants/seasonConfig';

interface CurrentWeatherProps {
  weatherData: WeatherData;
  seasonName: string;
  isNight: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 2rem;
  border-radius: 20px;
  backdrop-filter: blur(8px);
  background-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  color: #fff;
  max-width: 400px;
  width: 100%;
  min-width: 400px;
  min-height: 500px;
  box-sizing: border-box;
  height: 100%;
  
  @media (max-width: 768px) {
    min-width: 100%;
  }
`;

const CityName = styled.h1`
  font-size: 2.5rem;
  margin: 0;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const Temperature = styled.div`
  font-size: 5rem;
  font-weight: 300;
  margin: 1rem 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
`;

const Description = styled.div`
  font-size: 1.2rem;
  text-transform: capitalize;
  margin-bottom: 1rem;
  font-weight: 500;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  width: 100%;
  margin-top: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  border-radius: 12px;
  background-color: rgba(255, 255, 255, 0.1);
`;

const InfoLabel = styled.span`
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

const InfoValue = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;

const CurrentWeather: React.FC<CurrentWeatherProps> = ({ weatherData, seasonName, isNight }) => {
  const season = SEASON_CONFIG[seasonName];
  const iconCode = WEATHER_ICONS[weatherData.weather[0].icon];
  const iconColor = season.colors.accent;
  
  return (
    <Container>
      <CityName>{weatherData.name}</CityName>
      <WeatherIcon 
        iconCode={iconCode} 
        size={120} 
        color={iconColor} 
      />
      <Temperature>{Math.round(weatherData.main.temp)}°C</Temperature>
      <Description>{weatherData.weather[0].description}</Description>
      
      <InfoGrid>
        <InfoItem>
          <InfoLabel>体感温度</InfoLabel>
          <InfoValue>{Math.round(weatherData.main.feels_like)}°C</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>湿度</InfoLabel>
          <InfoValue>{weatherData.main.humidity}%</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>风速</InfoLabel>
          <InfoValue>{weatherData.wind.speed} m/s</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>气压</InfoLabel>
          <InfoValue>{weatherData.main.pressure} hPa</InfoValue>
        </InfoItem>
      </InfoGrid>
    </Container>
  );
};

export default CurrentWeather; 
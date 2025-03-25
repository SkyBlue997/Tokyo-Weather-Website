import React from 'react';
import styled from '@emotion/styled';
import { DayForecast } from '../../types/weather';
import { WEATHER_ICONS } from '../../constants/api';
import WeatherIcon from './WeatherIcon';

interface ForecastDayProps {
  forecast: DayForecast;
  isSelected: boolean;
  onClick: (day: DayForecast) => void;
  accentColor: string;
}

interface DayContainerProps {
  isSelected: boolean;
  accentColor: string;
}

const DayContainer = styled.div<DayContainerProps>`
  background-color: ${props => props.isSelected ? `rgba(255, 255, 255, 0.25)` : `rgba(255, 255, 255, 0.1)`};
  border: ${props => props.isSelected ? `2px solid ${props.accentColor}` : '2px solid transparent'};
  border-radius: 16px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100px;
  height: 140px;
  box-sizing: border-box;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const DayName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 0.2rem;
`;

const DayDate = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 0.7rem;
`;

const TemperatureContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 0.5rem;
`;

const MaxTemp = styled.span`
  color: #ff6b6b;
  font-weight: 600;
  font-size: 1rem;
  margin-right: 0.5rem;
`;

const MinTemp = styled.span`
  color: #74c0fc;
  font-weight: 600;
  font-size: 1rem;
`;

const ForecastDay: React.FC<ForecastDayProps> = ({ forecast, isSelected, onClick, accentColor }) => {
  const iconCode = WEATHER_ICONS[forecast.icon];
  
  const handleClick = () => {
    onClick(forecast);
  };
  
  return (
    <DayContainer isSelected={isSelected} onClick={handleClick} accentColor={accentColor}>
      <DayName>{forecast.dayOfWeek}</DayName>
      <DayDate>{new Date(forecast.date).getMonth() + 1}/{new Date(forecast.date).getDate()}</DayDate>
      <WeatherIcon iconCode={iconCode} size={35} color={accentColor} />
      <TemperatureContainer>
        <MaxTemp>{forecast.tempMax}°</MaxTemp>
        <MinTemp>{forecast.tempMin}°</MinTemp>
      </TemperatureContainer>
    </DayContainer>
  );
};

export default ForecastDay;

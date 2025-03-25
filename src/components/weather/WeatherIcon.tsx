import React from 'react';
import styled from '@emotion/styled';

interface WeatherIconProps {
  iconCode: string;
  size?: number;
  color?: string;
  secondary?: string;
}

interface IconContainerProps {
  size: number;
}

const IconContainer = styled.div<IconContainerProps>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// SVG图标库
const weatherIcons: Record<string, (color: string, secondary?: string) => React.ReactNode> = {
  // 晴天
  'clear-day': (color) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="8" fill={color} />
      <path d="M16 3V6" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 26V29" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M29 16L26 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M6 16L3 16" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M25.4853 6.51472L23.364 8.63604" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M8.63605 23.364L6.51473 25.4853" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M25.4853 25.4853L23.364 23.364" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M8.63605 8.63603L6.51473 6.51471" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  
  // 晴夜
  'clear-night': (color) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21.5 15C17.9 15 15 12.1 15 8.5C15 7.5 15.2 6.5 15.6 5.6C15.2 5.6 14.9 5.5 14.5 5.5C9.8 5.5 6 9.3 6 14C6 18.7 9.8 22.5 14.5 22.5C19.2 22.5 23 18.7 23 14C23 13.6 23 13.3 22.9 12.9C22.1 13.3 21.1 13.5 20.1 13.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  
  // 多云白天
  'partly-cloudy-day': (color, secondary = '#ffffff') => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 14C11 10.7 13.7 8 17 8C20.3 8 23 10.7 23 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 3V5" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M25 10L27 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M7 10L9 8" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M22 16H22.6C25.1 16 27 17.9 27 20.4C27 22.9 25.1 24.8 22.6 24.8H10.4C7.9 24.8 6 22.9 6 20.4C6 17.9 7.9 16 10.4 16H11" stroke={secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  
  // 多云夜晚
  'partly-cloudy-night': (color, secondary = '#ffffff') => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16H22.6C25.1 16 27 17.9 27 20.4C27 22.9 25.1 24.8 22.6 24.8H10.4C7.9 24.8 6 22.9 6 20.4C6 17.9 7.9 16 10.4 16H11" stroke={secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M22 10.5C19.5 10.5 17.5 8.5 17.5 6C17.5 5.3 17.7 4.6 17.9 4C17.6 4 17.4 4 17.1 4C14.3 4 12 6.3 12 9.1C12 11.9 14.3 14.2 17.1 14.2C19.9 14.2 22.2 11.9 22.2 9.1C22.2 8.8 22.2 8.6 22.2 8.3C21.6 8.5 20.9 8.7 20.2 8.7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  
  // 阴天
  'cloudy': (color, secondary = '#ffffff') => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M26 18H25.5C23.6 18 22 16.4 22 14.5C22 12.6 23.6 11 25.5 11C27.4 11 29 12.6 29 14.5V15C29 16.7 27.7 18 26 18Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 18.5C7 14.9 9.7 12 13 12C16.3 12 19 14.9 19 18.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19 18H19.6C22.1 18 24 19.9 24 22.4C24 24.9 22.1 26.8 19.6 26.8H7.4C4.9 26.8 3 24.9 3 22.4C3 19.9 4.9 18 7.4 18H8" stroke={secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  
  // 小雨
  'rain': (color, secondary = '#4facfe') => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16H22.6C25.1 16 27 17.9 27 20.4C27 22.9 25.1 24.8 22.6 24.8H10.4C7.9 24.8 6 22.9 6 20.4C6 17.9 7.9 16 10.4 16H11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 14C11 10.7 13.7 8 17 8C20.3 8 23 10.7 23 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M12 26L10 29" stroke={secondary} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 26L15 29" stroke={secondary} strokeWidth="2" strokeLinecap="round" />
      <path d="M22 26L20 29" stroke={secondary} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  
  // 雷暴
  'thunderstorm': (color, secondary = '#ffd60a') => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16H22.6C25.1 16 27 17.9 27 20.4C27 22.9 25.1 24.8 22.6 24.8H10.4C7.9 24.8 6 22.9 6 20.4C6 17.9 7.9 16 10.4 16H11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 14C11 10.7 13.7 8 17 8C20.3 8 23 10.7 23 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M17 25L14 29H19L16 33" stroke={secondary} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  
  // 雪
  'snow': (color, secondary = '#e0fbfc') => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16H22.6C25.1 16 27 17.9 27 20.4C27 22.9 25.1 24.8 22.6 24.8H10.4C7.9 24.8 6 22.9 6 20.4C6 17.9 7.9 16 10.4 16H11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 14C11 10.7 13.7 8 17 8C20.3 8 23 10.7 23 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="27" r="1" fill={secondary} />
      <circle cx="17" cy="29" r="1" fill={secondary} />
      <circle cx="22" cy="27" r="1" fill={secondary} />
    </svg>
  ),
  
  // 雾
  'fog': (color, secondary = '#e0fbfc') => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22 16H22.6C25.1 16 27 17.9 27 20.4C27 22.9 25.1 24.8 22.6 24.8H10.4C7.9 24.8 6 22.9 6 20.4C6 17.9 7.9 16 10.4 16H11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 14C11 10.7 13.7 8 17 8C20.3 8 23 10.7 23 14" stroke={color} strokeWidth="2" strokeLinecap="round" />
      <path d="M6 26H26" stroke={secondary} strokeWidth="2" strokeLinecap="round" />
      <path d="M10 29H22" stroke={secondary} strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
};

const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  iconCode, 
  size = 48, 
  color = '#ff85a2', 
  secondary = '#ffffff' 
}) => {
  const renderIcon = () => {
    const iconRenderer = weatherIcons[iconCode];
    if (iconRenderer) {
      return iconRenderer(color, secondary);
    }
    
    // 如果找不到对应的图标，返回一个默认的云图标
    return weatherIcons['cloudy'](color, secondary);
  };
  
  return (
    <IconContainer size={size}>
      {renderIcon()}
    </IconContainer>
  );
};

export default WeatherIcon; 
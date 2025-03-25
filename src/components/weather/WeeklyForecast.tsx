import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { DayForecast } from '../../types/weather';
import ForecastDay from './ForecastDay';

interface WeeklyForecastProps {
  dailyForecast: DayForecast[];
  selectedDay: DayForecast | null;
  onSelectDay: (day: DayForecast) => void;
  accentColor: string;
}

const Container = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  padding: 1.5rem 4rem 3rem 2rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  width: 100%;
  min-height: 200px;
  box-sizing: border-box;
  overflow-x: auto;
  margin-bottom: 3rem;
`;

const Title = styled.h3`
  font-size: 1.2rem;
  margin: 0 0 1rem 0;
  font-weight: 600;
  color: #fff;
`;

const DaysContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
  width: 100%;
  margin: 0 auto;
  padding: 0;
  
  @media (max-width: 768px) {
    overflow-x: auto;
    justify-content: flex-start;
    padding-bottom: 0.5rem;
    
    &::-webkit-scrollbar {
      height: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.3);
      border-radius: 10px;
    }
  }
`;

// 变化效果的配置
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ 
  dailyForecast, 
  selectedDay, 
  onSelectDay,
  accentColor
}) => {
  // 创建一个包装函数，添加日志
  const handleSelectDay = (day: DayForecast) => {
    console.log('点击了日期:', day.dateString);
    onSelectDay(day);
  };

  return (
    <Container
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Title>5天预报</Title>
      <DaysContainer>
        {dailyForecast.map((day) => (
          <motion.div key={day.dateString} variants={itemVariants}>
            <ForecastDay
              forecast={day}
              isSelected={selectedDay?.dateString === day.dateString}
              onClick={handleSelectDay}
              accentColor={accentColor}
            />
          </motion.div>
        ))}
      </DaysContainer>
    </Container>
  );
};

export default WeeklyForecast;
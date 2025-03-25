import React, { useEffect } from 'react';
import { Global, css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion, AnimatePresence } from 'framer-motion';
import useWeather from './hooks/useWeather';
import { SEASON_CONFIG } from './constants/seasonConfig';
import ParticleEffect from './components/particles/ParticleEffect';
import TokyoSilhouette from './components/TokyoSilhouette';
import CurrentWeather from './components/weather/CurrentWeather';
import WeeklyForecast from './components/weather/WeeklyForecast';
import HourlyForecast from './components/weather/HourlyForecast';
import Loading from './components/ui/Loading';

// 全局样式
const globalStyles = css`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'MapleMono', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
    min-height: 100vh;
    background: #222;
  }
`;

// 字体的定义
const GlobalStyle = styled.div`
  @font-face {
    font-family: 'MapleMono';
    src: url('/MapleMono-NF-CN-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  font-family: 'MapleMono', monospace;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  color: #fff;
  padding: 1rem;
  box-sizing: border-box;
  transition: background 1s ease-in-out;
  position: relative;
  overflow-x: visible;
  
  @media (max-width: 1024px) {
    padding: 0.5rem;
  }
`;

interface AppContainerProps {
  backgroundGradient: string;
}

const AppContainer = styled.div<AppContainerProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${props => props.backgroundGradient};
  transition: background 1.5s ease-in-out;
  z-index: -1;
`;

const ContentContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1200px;
  width: 100%;
  padding-top: 2rem;
  z-index: 2;
  overflow-x: auto;
  margin: 0 auto;
`;

const Header = styled.header`
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin: 0;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0;
  opacity: 0.9;
`;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0;
  overflow-x: auto;
  
  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: stretch;
    flex-wrap: nowrap;
    justify-content: center;
  }
`;

const MainWeatherSection = styled.div`
  flex: 1;
  width: 400px;
  min-width: 400px;
  margin-right: 0;
  margin-left: 2rem;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1024px) {
    width: 100%;
    min-width: 100%;
    margin-right: 0;
    margin-left: 0;
  }
`;

const ForecastSection = styled.div`
  flex: 2;
  width: 100%;
  max-width: 700px;
  min-width: 600px;
  display: flex;
  flex-direction: column;
  
  @media (max-width: 1024px) {
    min-width: 100%;
  }
  
  @media (max-width: 1400px) {
    overflow-x: auto;
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 99, 71, 0.2);
  border: 1px solid rgba(255, 99, 71, 0.5);
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 10px;
  color: white;
  text-align: center;
  width: 100%;
  max-width: 500px;
`;

function App() {
  const { 
    currentWeather, 
    dailyForecast, 
    selectedDay, 
    setSelectedDay, 
    loading, 
    error, 
    refreshData,
    currentSeason,
    timeOfDay
  } = useWeather();
  
  // 检测是否是夜间
  const isNight = timeOfDay === 'night' || timeOfDay === 'evening';
  
  // 根据季节和时间获取对应的样式
  const seasonConfig = SEASON_CONFIG[currentSeason];
  const timeVariant = seasonConfig.timeVariants[timeOfDay];
  
  // 添加调试日志
  useEffect(() => {
    if (currentWeather) {
      console.log('CurrentWeather数据已更新');
    }
    if (selectedDay) {
      console.log('SelectedDay已更新:', selectedDay.dateString);
    }
  }, [currentWeather, selectedDay]);
  
  useEffect(() => {
    document.body.style.overflow = 'auto';
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.boxSizing = 'border-box';
    
    // 创建动态的meta标签
    const metaThemeColor = document.createElement('meta');
    metaThemeColor.name = 'theme-color';
    metaThemeColor.content = seasonConfig.colors.primary;
    document.head.appendChild(metaThemeColor);
    
    return () => {
      document.head.removeChild(metaThemeColor);
    };
  }, [seasonConfig]);
  
  return (
    <>
      <Global styles={globalStyles} />
      <GlobalStyle>
        <AppContainer backgroundGradient={timeVariant.background} />
        
        {/* 季节性粒子效果 */}
        <ParticleEffect season={currentSeason} timeOfDay={timeOfDay} />
        
        {/* 东京城市剪影 */}
        <TokyoSilhouette season={currentSeason} timeOfDay={timeOfDay} />
        
        <ContentContainer
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <Header>
            <Title>东京天气</Title>
            <Subtitle>实时天气 & 未来5天预报</Subtitle>
          </Header>
          
          <AnimatePresence>
            {loading ? (
              <Loading />
            ) : error ? (
              <ErrorMessage>{error}</ErrorMessage>
            ) : null}
          </AnimatePresence>
          
          {!loading && !error && currentWeather && (
            <WeatherContainer>
              <MainWeatherSection>
                <CurrentWeather 
                  weatherData={currentWeather} 
                  seasonName={currentSeason}
                  isNight={isNight}
                />
              </MainWeatherSection>
              
              <ForecastSection>
                <WeeklyForecast 
                  dailyForecast={dailyForecast}
                  selectedDay={selectedDay}
                  onSelectDay={setSelectedDay}
                  accentColor={seasonConfig.colors.accent}
                />
                
                <AnimatePresence mode="wait">
                  {selectedDay && (
                    <HourlyForecast 
                      hours={selectedDay.hourlyData}
                      accentColor={seasonConfig.colors.accent}
                    />
                  )}
                </AnimatePresence>
              </ForecastSection>
            </WeatherContainer>
          )}
        </ContentContainer>
      </GlobalStyle>
    </>
  );
}

export default App;

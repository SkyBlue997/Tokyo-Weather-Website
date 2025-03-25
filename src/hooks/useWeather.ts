import { useState, useEffect } from 'react';
import { 
  getCurrentWeather, 
  getForecast, 
  processForecastData,
  getCurrentSeason,
  getTimeOfDay
} from '../services/weatherService';
import { WeatherData, ForecastData, DayForecast, Season, TimeOfDay } from '../types/weather';
import { UPDATE_INTERVAL } from '../constants/api';

interface UseWeatherReturn {
  currentWeather: WeatherData | null;
  forecast: ForecastData | null;
  dailyForecast: DayForecast[];
  selectedDay: DayForecast | null;
  setSelectedDay: (day: DayForecast | null) => void;
  loading: boolean;
  error: string | null;
  refreshData: () => Promise<void>;
  currentSeason: Season;
  timeOfDay: TimeOfDay;
}

const useWeather = (): UseWeatherReturn => {
  const [currentWeather, setCurrentWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [dailyForecast, setDailyForecast] = useState<DayForecast[]>([]);
  const [selectedDay, setSelectedDay] = useState<DayForecast | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSeason, setCurrentSeason] = useState<Season>(getCurrentSeason());
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>(getTimeOfDay());
  
  // 刷新数据函数
  const refreshData = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      // 并行获取当前天气和预报数据
      const [weatherData, forecastData] = await Promise.all([
        getCurrentWeather(),
        getForecast()
      ]);
      
      setCurrentWeather(weatherData);
      setForecast(forecastData);
      
      // 处理预报数据
      const processedForecast = processForecastData(forecastData);
      setDailyForecast(processedForecast);
      
      // 如果没有选择的日期，默认选择第一天
      if (!selectedDay && processedForecast.length > 0) {
        setSelectedDay(processedForecast[0]);
      } else if (selectedDay && processedForecast.length > 0) {
        // 如果已经选择了一个日期，找到对应的新数据中的相同日期
        const sameDay = processedForecast.find(day => day.dateString === selectedDay.dateString);
        if (sameDay) {
          setSelectedDay(sameDay);
        }
      }
      
      // 更新季节和时间段
      setCurrentSeason(getCurrentSeason());
      setTimeOfDay(getTimeOfDay());
      
      setLoading(false);
    } catch (err) {
      setError('获取天气数据失败，请稍后再试');
      setLoading(false);
      console.error('获取天气数据失败:', err);
    }
  };
  
  // 初始加载和定时刷新
  useEffect(() => {
    refreshData();
    
    // 设置定时刷新
    const interval = setInterval(() => {
      refreshData();
    }, UPDATE_INTERVAL);
    
    // 页面聚焦时刷新数据
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        refreshData();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // 清理
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
  
  // 每小时检查时间段变化
  useEffect(() => {
    const timeChecker = setInterval(() => {
      setTimeOfDay(getTimeOfDay());
    }, 60 * 1000); // 每分钟检查一次
    
    return () => clearInterval(timeChecker);
  }, []);
  
  // 创建一个包装函数，添加日志
  const handleSetSelectedDay = (day: DayForecast | null) => {
    console.log('设置选中日期:', day?.dateString || 'null');
    setSelectedDay(day);
  };
  
  return {
    currentWeather,
    forecast,
    dailyForecast,
    selectedDay,
    setSelectedDay: handleSetSelectedDay, // 使用包装函数替代原始函数
    loading,
    error,
    refreshData,
    currentSeason,
    timeOfDay
  };
};

export default useWeather; 
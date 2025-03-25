import axios from 'axios';
import { 
  BASE_URL, 
  API_KEY, 
  CITY_NAME, 
  UNITS, 
  LANG 
} from '../constants/api';
import { WeatherData, ForecastData, DayForecast, HourForecast } from '../types/weather';
import { format } from 'date-fns';
import { zhCN, ja, enUS } from 'date-fns/locale';

// 获取当前语言的date-fns配置
const getLocale = (lang: string) => {
  switch (lang) {
    case 'zh_cn': return zhCN;
    case 'ja': return ja;
    default: return enUS;
  }
};

// 获取当前天气数据
export const getCurrentWeather = async (): Promise<WeatherData> => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: CITY_NAME,
        appid: API_KEY,
        units: UNITS,
        lang: LANG
      }
    });
    return response.data;
  } catch (error) {
    console.error('获取当前天气失败:', error);
    throw error;
  }
};

// 获取5天/3小时预报数据
export const getForecast = async (): Promise<ForecastData> => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: CITY_NAME,
        appid: API_KEY,
        units: UNITS,
        lang: LANG
      }
    });
    return response.data;
  } catch (error) {
    console.error('获取天气预报失败:', error);
    throw error;
  }
};

// 将API返回的预报数据处理为以天为单位的数据
export const processForecastData = (forecastData: ForecastData, language: string = LANG): DayForecast[] => {
  const locale = getLocale(language);
  
  // 按天分组预报数据
  const forecastsByDay: Record<string, ForecastData['list'][0][]> = {};
  
  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000);
    const dateString = format(date, 'yyyy-MM-dd');
    
    if (!forecastsByDay[dateString]) {
      forecastsByDay[dateString] = [];
    }
    
    forecastsByDay[dateString].push(item);
  });
  
  // 转换为每日预报数据
  return Object.entries(forecastsByDay).map(([dateString, hourlyForecasts]) => {
    const date = new Date(dateString);
    
    // 计算当天最高温和最低温
    let tempMax = -Infinity;
    let tempMin = Infinity;
    
    hourlyForecasts.forEach(item => {
      if (item.main.temp_max > tempMax) tempMax = item.main.temp_max;
      if (item.main.temp_min < tempMin) tempMin = item.main.temp_min;
    });
    
    // 取中午的天气描述作为当天总体描述
    const noonForecast = hourlyForecasts.find(item => 
      item.dt_txt.includes('12:00:00')
    ) || hourlyForecasts[0];
    
    // 处理每小时预报数据
    const hourlyData: HourForecast[] = hourlyForecasts.map(item => ({
      time: format(new Date(item.dt * 1000), 'HH:mm'),
      temp: Math.round(item.main.temp),
      description: item.weather[0].description,
      icon: item.weather[0].icon,
      windSpeed: item.wind.speed,
      humidity: item.main.humidity
    }));
    
    return {
      date,
      dateString,
      dayOfWeek: format(date, 'EEEE', { locale }),
      tempMax: Math.round(tempMax),
      tempMin: Math.round(tempMin),
      description: noonForecast.weather[0].description,
      icon: noonForecast.weather[0].icon,
      humidity: noonForecast.main.humidity,
      windSpeed: noonForecast.wind.speed,
      hourlyData
    };
  });
};

// 获取当前季节
export const getCurrentSeason = (): 'spring' | 'summer' | 'autumn' | 'winter' => {
  const now = new Date();
  const month = now.getMonth();
  
  if (month >= 2 && month <= 4) return 'spring';
  if (month >= 5 && month <= 7) return 'summer';
  if (month >= 8 && month <= 10) return 'autumn';
  return 'winter';
};

// 获取当前时间段
export const getTimeOfDay = (): 'morning' | 'day' | 'evening' | 'night' => {
  const hour = new Date().getHours();
  
  if (hour >= 5 && hour < 8) return 'morning';
  if (hour >= 8 && hour < 16) return 'day';
  if (hour >= 16 && hour < 20) return 'evening';
  return 'night';
}; 
// OpenWeather API相关常量
export const API_KEY = 'KEY'; // 请替换为您的OpenWeather API密钥
export const BASE_URL = 'https://api.openweathermap.org/data/2.5';
export const CITY_NAME = 'Tokyo';
export const CITY_ID = '1850147'; // 东京的城市ID
export const UNITS = 'metric'; // 使用摄氏度
export const LANG = 'zh_cn'; // 默认语言设置

// 天气图标映射
export const WEATHER_ICONS: Record<string, string> = {
  '01d': 'clear-day',
  '01n': 'clear-night',
  '02d': 'partly-cloudy-day',
  '02n': 'partly-cloudy-night',
  '03d': 'cloudy',
  '03n': 'cloudy',
  '04d': 'cloudy',
  '04n': 'cloudy',
  '09d': 'rain',
  '09n': 'rain',
  '10d': 'rain',
  '10n': 'rain',
  '11d': 'thunderstorm',
  '11n': 'thunderstorm',
  '13d': 'snow',
  '13n': 'snow',
  '50d': 'fog',
  '50n': 'fog',
};

// 请求更新间隔（毫秒）
export const UPDATE_INTERVAL = 10 * 60 * 1000; // 10分钟 
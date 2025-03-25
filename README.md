# Tokyo Weather Website

A beautiful and modern Tokyo weather display website with seasonal changes and time-linked effects.

## Features

- **Real-time Weather Data**: Uses OpenWeather API to get real-time weather information for Tokyo
- **Auto-refresh**: Automatically refreshes weather data every 10 minutes
- **5-day Forecast**: Displays weather forecast for the next 5 days
- **Hourly Forecast**: View hourly weather details for each day
- **Seasonal Changes**:
  - Spring: Cherry blossom falling effect
  - Summer: Leaf movement effect
  - Autumn: Maple leaf falling effect
  - Winter: Snowflake effect
- **Time Synchronization**: Automatically changes page tone and background based on different times of day (morning, day, evening, night)
- **City Silhouette**: Displays Tokyo city skyline at the bottom, enhancing immersion
- **Responsive Design**: Adapts to various screen sizes

## Tech Stack

- React + TypeScript
- Vite (build tool)
- Framer Motion (animation effects)
- Emotion (CSS-in-JS)
- Date-fns (date handling)
- Axios (API requests)

## Installation and Usage

1. Clone the repository
```
git clone <repository address>
cd tokyo-weather
```

2. Install dependencies
```
npm install
```

3. Start the development server
```
npm run dev
```

4. Build production version
```
npm run build
```

## API Key

This project uses the OpenWeather API. A test API key is provided by default, but it's recommended that you register your own API key and replace it in the `src/constants/api.ts` file.

## Customization

- Seasonal colors and effect configurations can be modified in `src/constants/seasonConfig.ts`
- Various particle effects can be adjusted in the `src/components/particles` directory
- The city silhouette can be modified in `src/components/TokyoSilhouette.tsx`

## Contributions

Issues and improvement suggestions are welcome!

## License

MIT

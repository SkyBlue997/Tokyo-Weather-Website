import { SeasonData } from '../types/weather';

// 四季配色方案和相关设置
export const SEASON_CONFIG: Record<string, SeasonData> = {
  spring: {
    name: 'spring',
    particleComponent: 'CherryBlossom',
    colors: {
      primary: '#ffb7c5',     // 浅粉色
      secondary: '#ffd1dc',   // 淡粉色
      accent: '#ff85a2',      // 樱花粉
      text: '#4a4a4a',        // 深灰色
      background: '#fff6f6',  // 超淡粉色背景
    },
    timeVariants: {
      morning: {
        background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
        particleColor: '#ffd1dc',
        textColor: '#4a4a4a',
      },
      day: {
        background: 'linear-gradient(120deg, #fdfbfb 0%, #ffd1dc 100%)',
        particleColor: '#ffb7c5',
        textColor: '#4a4a4a',
      },
      evening: {
        background: 'linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)',
        particleColor: '#ffcad4',
        textColor: '#fff',
      },
      night: {
        background: 'linear-gradient(to bottom, #09203f 0%, #537895 100%)',
        particleColor: '#ffc3d4',
        textColor: '#fff',
      },
    },
  },
  
  summer: {
    name: 'summer',
    particleComponent: 'Leaf',
    colors: {
      primary: '#48cae4',     // 明亮的蓝色
      secondary: '#90e0ef',   // 天蓝色
      accent: '#00b4d8',      // 深天蓝
      text: '#03045e',        // 深蓝色文字
      background: '#caf0f8',  // 淡蓝色背景
    },
    timeVariants: {
      morning: {
        background: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
        particleColor: '#90e0ef',
        textColor: '#03045e',
      },
      day: {
        background: 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
        particleColor: '#caf0f8',
        textColor: '#03045e',
      },
      evening: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        particleColor: '#90e0ef',
        textColor: '#fff',
      },
      night: {
        background: 'linear-gradient(to bottom, #1e3c72 0%, #2a5298 100%)',
        particleColor: '#48cae4',
        textColor: '#fff',
      },
    },
  },
  
  autumn: {
    name: 'autumn',
    particleComponent: 'MapleLeaf',
    colors: {
      primary: '#e76f51',     // 红褐色
      secondary: '#f4a261',   // 橙色
      accent: '#e9c46a',      // 琥珀色
      text: '#264653',        // 深青色文字
      background: '#fdf6e3',  // 米色背景
    },
    timeVariants: {
      morning: {
        background: 'linear-gradient(to right, #f6d365 0%, #fda085 100%)',
        particleColor: '#f4a261',
        textColor: '#264653',
      },
      day: {
        background: 'linear-gradient(120deg, #f6d365 0%, #e76f51 100%)',
        particleColor: '#e9c46a',
        textColor: '#264653',
      },
      evening: {
        background: 'linear-gradient(to right, #f83600 0%, #f9d423 100%)',
        particleColor: '#f4a261',
        textColor: '#264653',
      },
      night: {
        background: 'linear-gradient(to bottom, #243949 0%, #517fa4 100%)',
        particleColor: '#e76f51',
        textColor: '#fff',
      },
    },
  },
  
  winter: {
    name: 'winter',
    particleComponent: 'Snowflake',
    colors: {
      primary: '#8ecae6',     // 冰蓝色
      secondary: '#e0fbfc',   // 浅淡蓝色
      accent: '#219ebc',      // 深蓝色
      text: '#023047',        // 深青色文字
      background: '#f8f9fa',  // 冷白色背景
    },
    timeVariants: {
      morning: {
        background: 'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)',
        particleColor: '#e0fbfc',
        textColor: '#023047',
      },
      day: {
        background: 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)',
        particleColor: '#8ecae6',
        textColor: '#023047',
      },
      evening: {
        background: 'linear-gradient(to right, #6a11cb 0%, #2575fc 100%)',
        particleColor: '#e0fbfc',
        textColor: '#fff',
      },
      night: {
        background: 'linear-gradient(to bottom, #0f2027 0%, #203a43 50%, #2c5364 100%)',
        particleColor: '#8ecae6',
        textColor: '#fff',
      },
    },
  },
}; 
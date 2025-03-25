import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

interface SnowflakeProps {
  color?: string;
  count?: number;
}

interface FlakeProps {
  size: number;
  color: string;
  opacity: number;
}

const SnowflakeWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Flake = styled(motion.div)<FlakeProps>`
  position: absolute;
  width: ${(props: FlakeProps) => props.size}px;
  height: ${(props: FlakeProps) => props.size}px;
  border-radius: 50%;
  background-color: ${(props: FlakeProps) => props.color};
  opacity: ${(props: FlakeProps) => props.opacity};
  filter: blur(0.5px);
  box-shadow: 0 0 2px 1px rgba(255, 255, 255, 0.3);
`;

const Snowflake: React.FC<SnowflakeProps> = ({ 
  color = '#ffffff', 
  count = 50
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const flakesRef = useRef<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    xSpeed: number;
    ySpeed: number;
    variation: number;
  }>>([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // 初始化雪花
    flakesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 5 + 2, // 2-7px
      opacity: Math.random() * 0.6 + 0.3, // 0.3-0.9
      xSpeed: Math.random() * 1 - 0.5, // -0.5 to 0.5
      ySpeed: Math.random() * 1 + 0.5, // 0.5 to 1.5
      variation: Math.random() * 0.3 + 0.85, // 0.85 to 1.15 (大小变化)
    }));
    
    // 每帧更新雪花位置
    let animationId: number;
    let lastTime = 0;
    
    const updateFlakes = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // 更新每个雪花的位置
      flakesRef.current = flakesRef.current.map(flake => {
        // 添加随机波动
        const sway = Math.sin(time * 0.001 + flake.id) * 0.3;
        
        let x = flake.x + (flake.xSpeed + sway) * 0.3;
        let y = flake.y + flake.ySpeed * 0.3;
        
        // 如果雪花超出边界，重新从顶部出现
        if (y > height) {
          y = -10;
          x = Math.random() * width;
        }
        
        if (x < -10) x = width;
        if (x > width + 10) x = 0;
        
        const flakeElement = document.getElementById(`snowflake-${flake.id}`);
        if (flakeElement) {
          flakeElement.style.transform = `translate(${x}px, ${y}px) scale(${1 + Math.sin(time * 0.002 + flake.id) * 0.1})`;
        }
        
        return {
          ...flake,
          x,
          y,
        };
      });
      
      animationId = requestAnimationFrame(updateFlakes);
    };
    
    animationId = requestAnimationFrame(updateFlakes);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [count]);
  
  return (
    <SnowflakeWrapper ref={containerRef}>
      {flakesRef.current.map(flake => (
        <Flake
          key={flake.id}
          id={`snowflake-${flake.id}`}
          size={flake.size}
          color={color}
          opacity={flake.opacity}
          initial={{
            x: flake.x,
            y: flake.y,
            scale: flake.variation,
          }}
        />
      ))}
    </SnowflakeWrapper>
  );
};

export default Snowflake; 
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

interface CherryBlossomProps {
  color?: string;
  count?: number;
}

interface PetalProps {
  size: number;
  color: string;
}

const CherryBlossomWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Petal = styled(motion.div)<PetalProps>`
  position: absolute;
  background-color: ${(props: PetalProps) => props.color};
  border-radius: 150% 0 150% 0;
  transform-origin: center;
  filter: blur(0.5px);
  opacity: 0.8;
  width: ${(props: PetalProps) => props.size}px;
  height: ${(props: PetalProps) => props.size}px;
`;

const CherryBlossom: React.FC<CherryBlossomProps> = ({ 
  color = '#ffd1dc', 
  count = 30
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const petalsRef = useRef<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    rotation: number;
    xSpeed: number;
    ySpeed: number;
    rotationSpeed: number;
    variation: number;
  }>>([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();
    
    // 初始化花瓣
    petalsRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 15 + 5, // 5-20px
      rotation: Math.random() * 360,
      xSpeed: Math.random() * 1 - 0.5, // -0.5 to 0.5
      ySpeed: Math.random() * 1 + 0.5, // 0.5 to 1.5
      rotationSpeed: Math.random() * 1 - 0.5, // -0.5 to 0.5
      variation: Math.random() * 0.5 + 0.75, // 0.75 to 1.25 (大小变化)
    }));
    
    // 每帧更新花瓣位置
    let animationId: number;
    let lastTime = 0;
    
    const updatePetals = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // 更新每个花瓣的位置
      petalsRef.current = petalsRef.current.map(petal => {
        // 添加微小随机波动
        const windEffect = Math.sin(time * 0.001 + petal.id) * 0.3;
        
        let x = petal.x + (petal.xSpeed + windEffect) * 0.5;
        let y = petal.y + petal.ySpeed * 0.5;
        let rotation = petal.rotation + petal.rotationSpeed;
        
        // 如果花瓣超出边界，重新从顶部出现
        if (y > height) {
          y = -20;
          x = Math.random() * width;
        }
        
        if (x < -20) x = width;
        if (x > width + 20) x = 0;
        
        const petalElement = document.getElementById(`petal-${petal.id}`);
        if (petalElement) {
          petalElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${1 + Math.sin(time * 0.002 + petal.id) * 0.05})`;
        }
        
        return {
          ...petal,
          x,
          y,
          rotation,
        };
      });
      
      animationId = requestAnimationFrame(updatePetals);
    };
    
    animationId = requestAnimationFrame(updatePetals);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [count]);
  
  return (
    <CherryBlossomWrapper ref={containerRef}>
      {petalsRef.current.map(petal => (
        <Petal
          key={petal.id}
          id={`petal-${petal.id}`}
          size={petal.size}
          color={color}
          initial={{
            x: petal.x,
            y: petal.y,
            rotate: petal.rotation,
            scale: petal.variation,
          }}
        />
      ))}
    </CherryBlossomWrapper>
  );
};

export default CherryBlossom; 
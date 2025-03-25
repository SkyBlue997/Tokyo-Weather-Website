import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

interface LeafParticleProps {
  color?: string;
  count?: number;
}

interface LeafItemProps {
  size: number;
  color: string;
}

const LeafWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

// 夏季树叶效果
const LeafItem = styled(motion.div)<LeafItemProps>`
  position: absolute;
  width: ${(props: LeafItemProps) => props.size}px;
  height: ${(props: LeafItemProps) => props.size}px;
  background-color: transparent;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${(props: LeafItemProps) => props.color};
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M64 96H0c0 123.7 100.3 224 224 224v144c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320C288 196.3 187.7 96 64 96zm384-64c-84.2 0-157.4 46.5-195.7 115.2 27.7 30.2 48.2 66.9 59 107.6C424 243.1 512 147.9 512 32h-64z'/%3E%3C/svg%3E");
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M64 96H0c0 123.7 100.3 224 224 224v144c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320C288 196.3 187.7 96 64 96zm384-64c-84.2 0-157.4 46.5-195.7 115.2 27.7 30.2 48.2 66.9 59 107.6C424 243.1 512 147.9 512 32h-64z'/%3E%3C/svg%3E");
    mask-size: contain;
    -webkit-mask-size: contain;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    opacity: 0.7;
    filter: drop-shadow(0 0 1px rgba(255, 255, 255, 0.3));
  }
`;

const Leaf: React.FC<LeafParticleProps> = ({ 
  color = '#48cae4', 
  count = 15
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leavesRef = useRef<Array<{
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
    
    // 初始化夏季树叶
    leavesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 15 + 8, // 8-23px
      rotation: Math.random() * 360,
      xSpeed: Math.random() * 1.5 - 0.75, // -0.75 to 0.75
      ySpeed: Math.random() * 0.8 + 0.2, // 0.2 to 1.0 (更慢的速度)
      rotationSpeed: Math.random() * 1.5 - 0.75, // -0.75 to 0.75
      variation: Math.random() * 0.4 + 0.8, // 0.8 to 1.2 (大小变化)
    }));
    
    // 每帧更新树叶位置
    let animationId: number;
    let lastTime = 0;
    
    const updateLeaves = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // 更新每个树叶的位置
      leavesRef.current = leavesRef.current.map(leaf => {
        // 添加微风效果
        const gentleWind = Math.sin(time * 0.0008 + leaf.id) * 0.2;
        
        let x = leaf.x + (leaf.xSpeed + gentleWind) * 0.3;
        let y = leaf.y + leaf.ySpeed * 0.3;
        let rotation = leaf.rotation + leaf.rotationSpeed * 0.3;
        
        // 如果树叶超出边界，重新从顶部出现
        if (y > height) {
          y = -20;
          x = Math.random() * width;
        }
        
        if (x < -20) x = width;
        if (x > width + 20) x = 0;
        
        const leafElement = document.getElementById(`summer-leaf-${leaf.id}`);
        if (leafElement) {
          leafElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${1 + Math.sin(time * 0.001 + leaf.id) * 0.05})`;
        }
        
        return {
          ...leaf,
          x,
          y,
          rotation,
        };
      });
      
      animationId = requestAnimationFrame(updateLeaves);
    };
    
    animationId = requestAnimationFrame(updateLeaves);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [count]);
  
  return (
    <LeafWrapper ref={containerRef}>
      {leavesRef.current.map(leaf => (
        <LeafItem
          key={leaf.id}
          id={`summer-leaf-${leaf.id}`}
          size={leaf.size}
          color={color}
          initial={{
            x: leaf.x,
            y: leaf.y,
            rotate: leaf.rotation,
            scale: leaf.variation,
          }}
        />
      ))}
    </LeafWrapper>
  );
};

export default Leaf; 
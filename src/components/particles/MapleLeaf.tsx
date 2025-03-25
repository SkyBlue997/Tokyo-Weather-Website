import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import styled from '@emotion/styled';

interface MapleLeafProps {
  color?: string;
  count?: number;
}

interface LeafProps {
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

// 创建SVG形状的枫叶
const Leaf = styled(motion.div)<LeafProps>`
  position: absolute;
  width: ${(props: LeafProps) => props.size}px;
  height: ${(props: LeafProps) => props.size}px;
  background-color: transparent;
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: ${(props: LeafProps) => props.color};
    mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z'/%3E%3C/svg%3E");
    -webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath d='M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z'/%3E%3C/svg%3E");
    mask-size: contain;
    -webkit-mask-size: contain;
    mask-repeat: no-repeat;
    -webkit-mask-repeat: no-repeat;
    mask-position: center;
    -webkit-mask-position: center;
    opacity: 0.8;
  }
`;

const MapleLeaf: React.FC<MapleLeafProps> = ({ 
  color = '#e76f51', 
  count = 20
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
    
    // 初始化枫叶
    leavesRef.current = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 20 + 10, // 10-30px
      rotation: Math.random() * 360,
      xSpeed: Math.random() * 2 - 1, // -1 to 1
      ySpeed: Math.random() * 1 + 0.5, // 0.5 to 1.5
      rotationSpeed: Math.random() * 2 - 1, // -1 to 1
      variation: Math.random() * 0.5 + 0.75, // 0.75 to 1.25 (大小变化)
    }));
    
    // 每帧更新枫叶位置
    let animationId: number;
    let lastTime = 0;
    
    const updateLeaves = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      // 更新每个枫叶的位置
      leavesRef.current = leavesRef.current.map(leaf => {
        // 添加随机波动
        const windEffect = Math.sin(time * 0.001 + leaf.id) * 0.5;
        const swayEffect = Math.cos(time * 0.002 + leaf.id) * 0.3;
        
        let x = leaf.x + (leaf.xSpeed + windEffect) * 0.5;
        let y = leaf.y + leaf.ySpeed * 0.5;
        let rotation = leaf.rotation + (leaf.rotationSpeed + swayEffect);
        
        // 如果枫叶超出边界，重新从顶部出现
        if (y > height) {
          y = -30;
          x = Math.random() * width;
        }
        
        if (x < -30) x = width;
        if (x > width + 30) x = 0;
        
        const leafElement = document.getElementById(`maple-leaf-${leaf.id}`);
        if (leafElement) {
          leafElement.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg) scale(${1 + Math.sin(time * 0.0015 + leaf.id) * 0.1})`;
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
        <Leaf
          key={leaf.id}
          id={`maple-leaf-${leaf.id}`}
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

export default MapleLeaf;
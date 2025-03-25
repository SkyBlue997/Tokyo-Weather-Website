import React from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30vh;
`;

const SpinnerContainer = styled.div`
  width: 80px;
  height: 80px;
  position: relative;
  margin-bottom: 1.5rem;
`;

const Spinner = styled(motion.div)`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid #fff;
  border-radius: 50%;
  border-color: #fff transparent transparent transparent;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #fff;
  margin: 0;
  text-align: center;
`;

const Loading: React.FC = () => {
  return (
    <LoadingContainer>
      <SpinnerContainer>
        <Spinner
          animate={{ rotate: 360 }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      </SpinnerContainer>
      <LoadingText>正在加载天气数据...</LoadingText>
    </LoadingContainer>
  );
};

export default Loading; 
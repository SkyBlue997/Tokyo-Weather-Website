import React from 'react';
import { Global, css } from '@emotion/react';

const GlobalStyle: React.FC = () => {
  return (
    <Global
      styles={css`
        html, body {
          margin: 0;
          padding: 0;
          overflow-x: auto;
          box-sizing: border-box;
          width: 100%;
          height: 100%;
        }

        * {
          box-sizing: border-box;
        }

        #root {
          width: 100%;
          height: 100%;
          overflow-x: auto;
          display: flex;
          justify-content: center;
        }
      `}
    />
  );
};

export default GlobalStyle; 
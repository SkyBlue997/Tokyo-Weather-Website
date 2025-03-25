import styled from 'styled-components';

const ForecastSection = styled.div`
  flex: 2;
  width: 100%;
  max-width: 700px;
  min-width: 600px;
  
  @media (max-width: 1024px) {
    min-width: 100%;
  }
  
  @media (max-width: 1400px) {
    overflow-x: auto;
  }
`;

// Rest of the code...
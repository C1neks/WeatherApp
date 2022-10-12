import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: #ec9413;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const TopInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 90%;
  margin-top: 2rem;
`;

export const MainInfo = styled.div`
  width: 90%;
  display: flex;
  margin-top: 3rem;
`;

export const WeatherIconWrapper = styled.div`
  width: 50%;
`;

export const WeatherInfo = styled.div`
  width: 50%;
`;

export const WeatherIcon = styled.span`
  margin-left: 6rem;
`;

export const ForecastLocation = styled.p`
  color: white;
  font-size: 1.3rem;
`;

export const TodayForecastDetails = styled.div`
  border-bottom: 1px solid white;
  color: white;
`;

export const ActualTemp = styled.p`
  font-size: 5rem;
  font-weight: 500;
  margin: 0;
`;
export const HighestAndLowest = styled.div`
  display: flex;
  font-size: 1rem;
`;

export const Degree = styled.span`
  font-size: 0.5rem;
  margin-bottom: 10rem;
`;

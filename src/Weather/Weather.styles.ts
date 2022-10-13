import styled from "styled-components";
import { FiSun } from "react-icons/fi";
export const Wrapper = styled.div`
  background: rgb(236, 177, 35);
  background: linear-gradient(
    180deg,
    rgba(236, 177, 35, 1) 30%,
    rgba(236, 121, 4, 1) 100%
  );
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
  color: white;
`;

export const MainInfo = styled.div`
  width: 100%;
  display: flex;
  margin-top: 3rem;
`;

export const WeatherIconWrapper = styled.div`
  width: 50%;
  height: 100%;
`;

export const WeatherInfo = styled.div`
  width: 50%;
`;

export const WeatherIcon = styled.span`
  margin-left: 3rem;
`;

export const ForecastLocation = styled.p`
  color: white;
  font-size: 1.3rem;
  margin-left: 1rem;
`;

export const TodayForecastDetails = styled.div`
  color: white;
  margin-left: 1rem;
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
export const Conditions = styled.p``;

export const FeelsLike = styled.p`
  font-size: 0.6rem;
`;

export const HourForecastWrapper = styled.div`
  display: flex;
  width: 100vw;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
  justify-content: space-between;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

export const HourForecast = styled.div`
  display: flex;
  padding: 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const StyledHours = styled.span`
  font-size: 0.6rem;
  font-weight: lighter;
`;

export const Sun = styled(FiSun)`
  background: #ebb95a;
  border-radius: 20rem;
  padding: 3rem;
`;

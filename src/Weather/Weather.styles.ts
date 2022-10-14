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
  color: white;
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
  font-weight: 400;
  margin: 0;
`;
export const HighestAndLowest = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: 400;
`;

export const Conditions = styled.p`
  margin-top: 3rem;
`;

export const FeelsLike = styled.p`
  font-size: 0.8rem;
`;

export const HourForecastWrapper = styled.div`
  display: flex;
  width: 100vw;
  border-top: 1px solid #d3d3d38c;
  border-bottom: 1px solid #d3d3d38c;
  justify-content: space-between;
  align-items: center;
  margin-top: 3.5rem;
  margin-bottom: 1rem;
`;

export const HourForecast = styled.div`
  display: flex;
  padding: 1.2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
`;

export const StyledHours = styled.span`
  font-size: 0.6rem;

  opacity: 0.7;
`;

export const Sun = styled(FiSun)`
  background: #ebb95a;
  border-radius: 20rem;
  padding: 3rem;
`;

export const MoreDetails = styled.div`
  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  margin-left: 1rem;
`;
export const Details = styled.p`
  width: 50%;
  margin: 0;
`;
export const StyledDegree = styled.span`
  font-size: 1.4rem;
  padding: 1rem 1rem 0rem 1rem;
  font-weight: 500;
`;

export const DetailName = styled.p`
  opacity: 0.6;
`;

export const DetailValue = styled.p`
  font-weight: 500;
`;

export const LaterForecast = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
`;

export const MaxMinForecast = styled.div`
  width: 33%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MaxMinSpan = styled.span`
  padding: 0.5rem;
`;

export const MinSpan = styled.span`
  padding: 0.5rem;
  opacity: 0.6;
`;

export const WeekDayWrapper = styled.span`
  width: 33%;
  margin-left: 1rem;
`;
export const WeekDay = styled.div`
  font-weight: 500;
  letter-spacing: 1px;
`;

export const Precip = styled.span`
  font-size: 0.8rem;
  opacity: 0.7;
`;

export const WeatherForecastIcon = styled.div`
  opacity: 0.8;
`;

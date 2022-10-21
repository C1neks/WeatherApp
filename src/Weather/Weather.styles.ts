import styled from "styled-components";
import { FiSun } from "react-icons/fi";
import { BsCloudRainHeavy } from "react-icons/bs";
import { WiCloud } from "react-icons/wi";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { AiFillCloseCircle, AiOutlineSearch } from "react-icons/ai";
import { TbMoodSad } from "react-icons/tb";

type Props = {
  day: string;
};

type BackgroundIcon = {
  background: string;
};

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

export const WrapperRain = styled.div`
  background: rgb(70, 129, 201);
  background: linear-gradient(
    180deg,
    rgba(70, 129, 201, 1) 30%,
    rgba(47, 81, 165, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: white;
`;

export const WrapperCloud = styled.div`
  background: rgb(179, 195, 210);
  background: linear-gradient(
    180deg,
    rgba(179, 195, 210, 1) 30%,
    rgba(79, 86, 116, 1) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: white;
`;

export const WrapperWithoutLocation = styled.div`
  background: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  color: white;
`;

export const TopInfo = styled.div<BackgroundIcon>`
  display: flex;
  justify-content: space-between;
  align-items: center;

  color: white;
  margin: 2rem 2rem 0rem 2rem;
  width: ${(props) => (props.background === "" ? "" : "90%")};
`;

export const MainInfo = styled.div`
  width: 100%;
  display: flex;
  margin-top: 3rem;
`;

export const WeatherIconWrapper = styled.div`
  width: 50%;
  height: 100%;
  text-align: center;
`;

export const WeatherInfo = styled.div`
  width: 50%;
`;

export const WeatherIcon = styled.span<BackgroundIcon>`
  margin-left: ${(props) => (props.background === "" ? "0rem" : "3rem")};
`;

export const ForecastLocation = styled.p`
  color: white;
  font-size: 1.3rem;
  margin-left: 2rem;

  @media only screen and (min-width: 1024px) {
    text-align: center;
    font-size: 2.3rem;
  }
`;

export const TodayForecastDetails = styled.div`
  color: white;
  margin-left: 2rem;
`;

export const ActualTemp = styled.p`
  font-size: 5rem;
  font-weight: 400;
  margin: 0;

  @media only screen and (min-width: 1024px) {
    text-align: center;
    font-size: 7rem;
  }
`;
export const HighestAndLowest = styled.div`
  display: flex;
  font-size: 1rem;
  font-weight: 400;

  @media only screen and (min-width: 1024px) {
    justify-content: center;
    font-size: 2rem;
  }
`;

export const Conditions = styled.p`
  margin-top: 3rem;
  font-weight: 500;
  @media only screen and (min-width: 1024px) {
    font-size: 2rem;
    text-align: center;
  }
`;

export const FeelsLike = styled.p`
  font-size: 0.9rem;
  opacity: 0.8;
  @media only screen and (min-width: 1024px) {
    font-size: 1.7rem;
    text-align: center;
  }
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
  overflow: auto;
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

  opacity: 0.7;
`;

export const Sun = styled(FiSun)`
  background: #ebb95a;
  border-radius: 20rem;
  padding: 3rem;
`;

export const Rain = styled(BsCloudRainHeavy)`
  background: #47afd0;
  border-radius: 20rem;
  padding: 3rem;
`;

export const Cloud = styled(WiCloud)`
  background: #d5d8e5;
  border-radius: 20rem;
  padding: 3rem;
`;

export const Sad = styled(TbMoodSad)`
  background: transparent;
  border-radius: 20rem;

  opacity: 0.7;
`;

export const MoreDetails = styled.div<Props>`
  background: ${(props) =>
    props.day.includes("rain")
      ? "linear-gradient(\n    180deg,\n    rgba(70, 129, 201, 1) 30%,\n    rgba(47, 81, 165, 1) 100%\n  );"
      : props.day.includes("sun")
      ? "linear-gradient(\n    180deg,\n    rgba(236, 177, 35, 1) 30%,\n    rgba(236, 121, 4, 1) 100%\n  )"
      : props.day.includes("cloud")
      ? "linear-gradient(180deg, rgba(164,179,196,1) 0%, rgba(108,116,150,1) 100%)"
      : "linear-gradient(\n    180deg,\n    rgba(236, 177, 35, 1) 30%,\n    rgba(236, 121, 4, 1) 100%\n  )"};

  width: 100vw;
  display: flex;
  flex-wrap: wrap;
  padding-left: 2rem;
  padding-top: 1rem;
  margin-top: 1rem;
  padding-bottom: 1rem;

  @media only screen and (min-width: 1024px) {
    justify-content: center;
  }
`;
export const Details = styled.p`
  width: 50%;
  margin: 0;
  @media only screen and (min-width: 1024px) {
    width: 26%;
  }
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

  @media only screen and (min-width: 1024px) {
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export const MaxMinForecast = styled.div`
  width: 25%;
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
  margin-left: 2rem;
`;
export const WeekDay = styled.div`
  font-weight: 500;
  letter-spacing: 1px;
`;

export const Precip = styled.span`
  font-size: 0.8rem;
  opacity: 0.7;

  @media only screen and (min-width: 1024px) {
    font-size: 1.1rem;
  }
`;

export const WeatherForecastIcon = styled.div`
  opacity: 0.8;
  margin-right: 1rem;
`;

export const ChevronDown = styled(BiChevronDown)`
  opacity: 0.5;
`;

export const ChevronUp = styled(BiChevronUp)`
  opacity: 0.5;
`;

export const ModalWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Loop = styled(AiOutlineSearch)`
  font-size: 1.5rem;
`;

export const OpenModalButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

export const CloseModalButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
`;

export const Close = styled(AiFillCloseCircle)`
  font-size: 1.5rem;
`;

export const WeekForecastWrapper = styled.div`
  text-align: left;
  @media only screen and (min-width: 1024px) {
    text-align: center;
  }
`;

export const IconPercentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

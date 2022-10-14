import { WeekDay } from "./Weather.styles";

const getWeekDay = (epoch: number) => {
  const result =
    Math.floor((epoch / (24 * 3600)) % 7) === 0 ? (
      <WeekDay>Friday</WeekDay>
    ) : Math.floor((epoch / (24 * 3600)) % 7) === 1 ? (
      <WeekDay>Saturday</WeekDay>
    ) : Math.floor((epoch / (24 * 3600)) % 7) === 2 ? (
      <WeekDay>Sunday</WeekDay>
    ) : Math.floor((epoch / (24 * 3600)) % 7) === 3 ? (
      <WeekDay>Monday</WeekDay>
    ) : Math.floor((epoch / (24 * 3600)) % 7) === 4 ? (
      <WeekDay>Tuesday</WeekDay>
    ) : Math.floor((epoch / (24 * 3600)) % 7) === 5 ? (
      <WeekDay>Wednesday</WeekDay>
    ) : Math.floor((epoch / (24 * 3600)) % 7) === 6 ? (
      <WeekDay>Thursday</WeekDay>
    ) : null;

  return result;
};

export default getWeekDay;

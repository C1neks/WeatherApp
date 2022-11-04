const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";

import Weather from "./Weather";

test("render can't get location text when cannot getCurrent position", async () => {
  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 11.023,
            longitude: -5.7,
          },
        })
      )
    ),
  };
  (global as any).navigator.geolocation = mockGeolocation;

  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Weather />} />
      </Routes>
    </MemoryRouter>
  );

  await screen.findByText(
    "Can't get your location, please use search at the top to enter correct location or try again."
  );
});

test("render weather forecast for Madrid coords", async () => {
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const date = today.toDateString().slice(0, -4);

  const mockGeolocation = {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 40.4,
            longitude: -3.7,
          },
        })
      )
    ),
  };
  (global as any).navigator.geolocation = mockGeolocation;

  render(
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Weather />} />
      </Routes>
    </MemoryRouter>
  );

  await screen.findByText("Madrid, Comunidad de Madrid, España");
  const todayDate = await screen.findByTestId("date");
  expect(todayDate.innerHTML).toEqual(date);
});

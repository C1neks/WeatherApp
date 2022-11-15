export interface ForecastType {
  resolvedAddress: string;
  days: DayType[];
}

export interface DayType {
  datetimeEpoch: number;
  temp: number;
  tempmax: number;
  tempmin: number;
  conditions: string;
  feelslike: number;
  hours: Hour[];
  icon: string;
  sunrise: string;
  sunset: string;
  humidity: number;
  windspeed: number;
  precipprob: number;
  pressure: number;
}

export interface Hour {
  datetime: string;
  temp: number;
}

export interface InputType {
  open: boolean
  onClose: () => void;
  formValues: { location: string };
  handleInputChange: (e: any) => void;
}

export interface ModalType extends InputType {
  open: boolean;
}

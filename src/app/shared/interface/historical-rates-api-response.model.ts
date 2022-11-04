import { Rates } from "./exchange-rates.model";

export interface HistoricalRatesAPIResponse {
  success: boolean;
  timestamp: number;
  historical: boolean;
  base: string;
  date: string;
  rates: Rates;
}


export interface ConvertAPIResponse {
  success: boolean;
  query: Query;
  info: Info;
  date: string;
  result: number;
}

export interface Info {
  timestamp: number;
  rate: number;
}

export interface Query {
  from: string;
  to: string;
  amount: number;
}
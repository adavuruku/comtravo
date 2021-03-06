export interface FlightType {
  flight_db_id: string;
  price: number;
  origin_name: string;
  destination_name: string;
  departure_date_time_utc: Date;
  arrival_date_time_utc: Date;
  flight_number: string;
  duration: number;
}

export interface RoundTripType {
  origin_name: string;
  destination_name: string;
  departure_date_time_utc: Date;
  arrival_date_time_utc: Date;
  flight_number: string;
  duration: number;
}

export interface RoundTripMainType {
  flight_db_id: string;
  price: number;
  slice: any;
}

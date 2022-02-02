import mongoose, { Schema, Model, Document } from 'mongoose';
import { FlightType } from './flight.types';

type FlightDocument = Document & FlightType;

const flightSchema = new Schema(
  {
    flight_db_id: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    price: {
      type: Schema.Types.Number,
      required: true,
    },
    origin_name: {
      type: Schema.Types.String,
      required: true,
    },
    destination_name: {
      type: Schema.Types.String,
      required: true,
    },
    departure_date_time_utc: {
      type: Schema.Types.Date,
      required: true,
    },
    arrival_date_time_utc: {
      type: Schema.Types.Date,
      required: true,
    },
    flight_number: {
      type: Schema.Types.String,
      required: true,
    },
    duration: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  {
    collection: 'flights',
    timestamps: true,
  },
);

const Flight: Model<FlightDocument> = mongoose.model<FlightDocument>(
  'Flight',
  flightSchema,
);

export { Flight, FlightDocument };

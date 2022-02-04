import mongoose, { Schema, Model, Document } from 'mongoose';
import { RoundTripType } from './flight.types';

type RoundTripDocument = Document & RoundTripType;

const roundTripSchema = new Schema(
  {
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
    collection: 'roundtrips',
    timestamps: true,
  },
);

const RoundTrip: Model<RoundTripDocument> = mongoose.model<RoundTripDocument>(
  'RoundTrip',
  roundTripSchema,
);

export { RoundTrip, RoundTripDocument };

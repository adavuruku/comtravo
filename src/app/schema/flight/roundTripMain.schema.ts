import mongoose, { Schema, Model, Document } from 'mongoose';
import { RoundTripMainType } from './flight.types';

type RoundTripMainDocument = Document & RoundTripMainType;

const roundTripMainSchema = new Schema(
  {
    flight_db_id: {
      type: Schema.Types.String,
      required: true,
      unique: true,
    },
    slice: [
      {
        ref: 'RoundTrip',
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    price: {
      type: Schema.Types.Number,
      required: true,
    },
  },
  {
    collection: 'roundtripmain',
    timestamps: true,
  },
);

const RoundTripMain: Model<RoundTripMainDocument> =
  mongoose.model<RoundTripMainDocument>('RoundTripMain', roundTripMainSchema);

export { RoundTripMain, RoundTripMainDocument };

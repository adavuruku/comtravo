import { Request, Response } from 'express';
import { Flight } from '../../schema/flight/flight.schema';

/**
 * @param {Request} req The request objest
 * @param {Response} res The response object
 */
const allFlights = async (req: Request, res: Response) => {
  try {
    const flights = await Flight.find()
      .select('-flight_db_id -createdAt -updatedAt -__v')
      .sort('-createdAt');
    return res.status(200).json({ data: flights, size: flights.length });
  } catch (e) {
    throw Error(e);
  }
};
export { allFlights };

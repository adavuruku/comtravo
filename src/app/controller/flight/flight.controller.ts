import { Router } from 'express';

import {
  allFlights,
  roundTripFlight,
} from '../../service/flight/flight.service';
const router = Router();

router.get('/', allFlights);
router.get('/round-trip', roundTripFlight);
export { router as flightRoute };

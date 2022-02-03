import { Router } from 'express';

import { allFlights } from '../../service/flight/flight.service';
const router = Router();

router.get('/', allFlights);
export { router as flightRoute };

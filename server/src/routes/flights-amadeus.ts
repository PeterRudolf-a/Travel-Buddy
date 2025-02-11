import * as express from 'express';
import { Request, Response, Router } from 'express';
import { searchFlights } from "../services/flightService-amadeus.js";

const router: Router = express.Router();

router.get('/search', async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("🟡 Received flight search request:", req.query);

    const { origin, destination, date } = req.query;

    if (![origin, destination, date].every(Boolean)) {
      console.error("❌ Missing parameters:", { origin, destination, date });
      res.status(400).json({ error: 'Missing required parameters' });
      return; 
    }

    const flights = await searchFlights(origin as string, destination as string, date as string);

    console.log("🟡 API Response from Amadeus:", flights);
    res.json(flights);
  } catch (error) {
    console.error('❌ Error fetching flights:', error);
    res.status(500).json({ error: 'Failed to fetch flight data' });
  }
});

export default router;

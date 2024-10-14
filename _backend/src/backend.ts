import express from 'express';
import bodyParser from 'body-parser';
import {MapLocation} from "../../src/app/model/map-location.model";
import {HardCodedLocationsService} from "../../src/app/data/hard-coded-locations.service";
import {LocationDataAccess} from "./location.data-access";

const app = express();

const PORT = 3000;

// In-memory data store (replace with a real DB in production)
let locations: MapLocation[] = [];
let idCounter = 1;


const apiRouter = express.Router();
const service = new LocationDataAccess();
// Create a new location
apiRouter.post('/locations', (req, res) => {
  const result = service.insert(req.body)
  res.json(result);
  res.status(201).json(location);
});

// Get all locations
apiRouter.get('/locations', async (req, res) => {
  res.json(await service.getData());
});

// Get a single location by ID
apiRouter.get('/locations/:id', async (req, res) => {

  const id = parseInt(req.params.id, 10);
  const location = await service.getById(id)

  if (!location) {
    res.status(404).json({ error: 'Location not found' });
  }

  res.json(location);
});

apiRouter.put('/locations/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await service.update(req.body);
});

apiRouter.delete('/locations/:id', (req, res) => {
  service.delete(req.body);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/api', apiRouter);



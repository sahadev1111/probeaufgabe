import express from 'express';
import bodyParser from 'body-parser';
import {MapLocation} from "../../src/app/model/map-location.model";
import {HardCodedLocationsService} from "../../src/app/data/hard-coded-locations.service";
import {LocationDataAccess} from "./location.data-access";

const app = express();
app.use(bodyParser.json());

const PORT = 3000;
const apiRouter = express.Router();
const service = new LocationDataAccess();

apiRouter.post('/locations', async (req, res) => {
  const result = await service.insert(req.body)
  res.status(201).json(result);
});

apiRouter.get('/locations', async (req, res) => {
  res.json(await service.getData());
});

apiRouter.get('/locations/:id', async (req, res) => {

  const id = parseInt(req.params.id, 10);
  const location = await service.getById(id)

  if (!location) {
    res.status(404).json({error: 'Location not found'});
  }

  res.json(location);
});

apiRouter.put('/locations/:id', async (req, res) => {
  const id = parseInt(req.params.id, 10);
  await service.update(req.body);
  res.status(200);
  res.json(req.body)
});

apiRouter.delete('/locations/:id', (req, res) => {
  service.delete(req.body);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use('/api', apiRouter);



import express, { Router } from 'express';
import eventRoutes from './event-routes';

const app = express();
const routes = Router();

const port = 3000;

app.use(express.json());

routes.use('/events', eventRoutes);

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use(routes);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
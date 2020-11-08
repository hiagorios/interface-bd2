import express, { Router } from 'express';
import eventRoutes from './event-routes';
import cors from 'cors';

const app = express();
const router = Router();

const port = 3000;

app.use(express.json());

const options: cors.CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: 'http://localhost:4200',
  preflightContinue: false,
};

router.use(cors(options));

router.use('/events', eventRoutes);

router.options('*', cors(options));

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.use(router);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
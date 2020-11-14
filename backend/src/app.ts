import express, { Router } from 'express';
import eventoRoutes from './evento-routes';
import cors from 'cors';
import ministranteRoutes from './ministrante-routes';
import usuarioRoutes from './usuario-routes';

const app = express();
app.disable("x-powered-by");
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

router.use('/eventos', eventoRoutes);
router.use('/ministrantes', ministranteRoutes);
router.use('/usuarios', usuarioRoutes);

router.options('*', cors(options));

app.get("/", (req, res) => {
  res.send("Ô de casa")
})

app.use(router);

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
});
import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import { routes } from "./routes/routes";


const server = express();
const port = Number(process.env.PORT);

server.use(routes);
server.use(express.json());


server.listen(port, () => {
  console.log(`Servidor rodando... http://localhost:${port}`);
});
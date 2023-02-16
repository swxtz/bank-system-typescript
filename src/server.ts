import * as dotenv from "dotenv";
dotenv.config();

import express from "express";


const server = express();
const port = Number(process.env.PORT);


server.listen(port, () => {
  console.log(`Servidor rodando... http://localhost:${port}`);
});
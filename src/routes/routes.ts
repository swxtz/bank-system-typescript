import { Request, Response, Router } from "express";

const routes = Router();

routes.get("/", (req:Request, res:Response) => {
  res.json({
    "msg": "ok"
  }).status(200);
});

export { routes };
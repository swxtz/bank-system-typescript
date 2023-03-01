import { Request, Response, Router } from "express";
import { Account } from "../controllers/AccountController";
import { convertStringToNumberInParams } from "../middleware/convertStringToNumberInParams";

const routes = Router();

routes.get("/", (req:Request, res:Response) => {
  res.json({
    "msg": "ok"
  }).status(200);
});

routes.post("/account", Account.create);

routes.get("/balance/:numberAccount", Account.getAmountByAccountNumber);

export { routes };
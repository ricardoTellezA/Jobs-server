import { Router } from "express";
import { AuthController } from "./controllers";

export class AuthRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthController();

    router.post("/register", controller.register);
    router.put("/confirm-email", controller.confirmEmail);
    return router;
  }
}

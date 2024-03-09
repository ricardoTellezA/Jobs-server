import jwt from "jsonwebtoken";
import { envs } from "../../../config/envs";

export class Token {
  private secret = envs.JWT_SECRET;

  generateToken(id: Object): string {
    return jwt.sign({ id }, this.secret, {
      expiresIn: "5d",
    });
  }
}

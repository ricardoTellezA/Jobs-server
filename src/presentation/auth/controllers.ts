import { Request, Response } from "express";
import { UserModel } from "../../data";
import { Hash } from "../../config/plugins/hash";

export class AuthController {
  constructor() {}

  public register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });

      const hash = new Hash(password);

      const hashedPassword = await hash.hash();

      const newUser = await UserModel.create({ name, email, password: hashedPassword });

      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

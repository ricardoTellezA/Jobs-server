import { Request, Response } from "express";
import { UserModel } from "../../data";
import { Hash } from "../../config/plugins/hash";
import { Token } from "../../domain/useCases/token/token";
import { SendEmail } from "../../domain/useCases/email/send-email";

export class AuthController {
  constructor() {}

  public register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) return res.status(400).json({ message: "User already exists" });

      const hash = new Hash(password);

      const hashedPassword = await hash.hash();

      const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
      });

      // ENVIAR EMAIL DE VERIFICACION
      const token = new Token();
      const tokenGenerated = token.generateToken(newUser._id);

      const sendEmail = new SendEmail();

      await sendEmail.sendEmail({
        to: email,
        subject: "Verify your email",
        body: `
          <h1>Verify your email</h1>
          <a href="http://localhost:3000/verify-email/${tokenGenerated}">Click here to verify your email</a>
        `,
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);

      return res.status(500).json({ message: "Internal server error" });
    }
  };

  public confirmEmail = async (req: Request, res: Response) => {
    const { id } = req.body;
    try {
      const user = await UserModel.findByIdAndUpdate(id, {
        isEmailVerified: true,
      });
      if (!user) return res.status(400).json({ message: "User not found" });
      res.status(200).json({ message: "Email verified" });
    } catch (error) {
      console.log(error);

      res.status(500).json({ message: "Internal server error" });
    }
  };
}

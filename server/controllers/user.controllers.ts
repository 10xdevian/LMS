import { Request, Response, NextFunction } from "express";
import ejs from "ejs";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import userModel from "../models/user.models";
import ErrorHandler from "../utils/ErrorHandler";
import {
  IregistrationBody,
  IsActivationToken,
  IUser,
} from "../types/user.type";

import jwt, { Secret } from "jsonwebtoken";
import { ACTIVATION_SECRET, SMTP_PORT } from "../config";
import path from "path";
import sendMail from "../utils/sendMail";

export const registrationUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, email, password } = req.body;
      const isEmailExists = await userModel.findOne({ email });

      if (isEmailExists) {
        return next(new ErrorHandler("Email already exists ", 400));
      }

      const user: IregistrationBody = {
        name,
        email,
        password,
      };

      const activationToken = createActivationToken(user);

      const activationCode = activationToken.activationCode;

      const data = { user: { name: user.name }, activationCode };
      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/activation-mail.ejs"),
        data,
      );
      try {
        await sendMail({
          email: user.email,
          subject: "Activate your account",
          template: "activation-mail.ejs",
          data,
        });

        res.status(201).json({
          success: true,
          message: `Please check your email: ${user.email} to activate your account `,
          activationToken: activationToken.token,
        });
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 400));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  },
);

export const createActivationToken = (user): IsActivationToken => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { user, activationCode },
    ACTIVATION_SECRET as Secret,
    {
      expiresIn: "5m",
    },
  );

  return { token, activationCode };
};

import * as yup from "yup";
import { User } from "../../../entity/User";
import { sign } from "jsonwebtoken";

export const forgotPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(3, "Password must be at least 3 characters")
    .max(255)
});

export const forgotPasswordLockAccount = async (userId: string) => {
  await User.update({ id: userId }, { forgotPasswordLocked: true });
};

export const createForgotPasswordLink = async (userId: string) => {
  const id = sign({ userId }, process.env.EMAIL_TOKEN_SECRET!, {
    expiresIn: "20m"
  });

  return `${process.env.FRONTEND_URL}/user/change-password/${id}`;
};

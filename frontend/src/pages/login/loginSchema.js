import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).required("Please enter your password"),
});

import { z } from "zod";

const changePasswordValidationSchema = z.object({
  body: z.object({
    oldPassword: z.string({
      required_error: "Old Password is required",
    }),
    newPassword: z.string({
      required_error: "New Password is required",
    }),
  }),
});

const authValidations = {
  changePasswordValidationSchema,
};

export default authValidations;

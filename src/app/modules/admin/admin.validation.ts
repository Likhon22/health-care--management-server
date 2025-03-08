import { z } from "zod";

const adminValidationSchema = z.object({
  body: z.object({
    name: z.string().nonempty(),
    email: z.string().email(),
    contactNumber: z.string().nonempty(),
    profilePhoto: z.string().optional(),
  }),
});

const adminValidations = {
  adminValidationSchema,
};

export default adminValidations;

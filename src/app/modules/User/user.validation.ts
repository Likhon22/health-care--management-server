import { Gender } from "@prisma/client";
import { z } from "zod";

const createAdmin = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    admin: z.object({
      name: z.string({
        required_error: "Name is required!",
      }),
      email: z.string({
        required_error: "Email is required!",
      }),
      contactNumber: z.string({
        required_error: "Contact Number is required!",
      }),
    }),
  }),
});
const createDoctor = z.object({
  body: z.object({
    password: z.string({
      required_error: "Password is required",
    }),
    doctor: z.object({
      name: z.string({
        required_error: "Name is required!",
      }),
      email: z.string({
        required_error: "Email is required!",
      }),
      contactNumber: z.string({
        required_error: "Contact Number is required!",
      }),
      address: z.string({
        required_error: "Address is required!",
      }),
      registrationNumber: z.string({
        required_error: "Registration Number is required!",
      }),
      experience: z.number().optional(),
      gender: z.enum([Gender.FEMALE, Gender.FEMALE, Gender.OTHER]),
      appointmentFee: z.number({
        required_error: "Appointment Fee is required!",
      }),
      qualification: z.string({ required_error: "Qualification is required!" }),
      currentWorkingPlace: z.string({
        required_error: "Current Working Place is required!",
      }),
      designation: z.string({ required_error: "Designation is required!" }),
    }),
  }),
});

const userValidations = {
  createAdmin,
  createDoctor,
};

export default userValidations;

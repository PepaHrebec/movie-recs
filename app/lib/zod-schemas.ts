import z from "zod";

export const UserSchema = z.object({
  username: z
    .string()
    .min(4, "Username has to be at least 4 characters long.")
    .max(31, "Username has to be at most 31 characters long.")
    .refine((str) => str.toLowerCase() === str, {
      message: "Username has to be in lower case.",
    }),
  password: z
    .string()
    .min(6, "Password has to be at least 6 characters long.")
    .max(255, "Password has to be at most 255 characters long."),
});

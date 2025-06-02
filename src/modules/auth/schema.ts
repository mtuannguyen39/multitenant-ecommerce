import z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(63, "Username must be less 63 characters")
    .regex(
      /^[a-z0-9][a-z0-9]*[a-z0-9]$/,
      "Username can only contain lowercase letters, number and hyphen. It must start and end with a letter or number"
    )
    .refine(
      (val) => !val.includes("--"),
      "Username cannot contain consecutive hyphen"
    )
    .transform((val) => val.toLowerCase()),
});

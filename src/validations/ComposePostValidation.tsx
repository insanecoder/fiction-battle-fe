import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 2 MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const composePostSchema = z.object({
  content: z
    .string()
    .min(1, "Post cannot be empty")
    .superRefine((val, ctx) => {
      const words = val.trim().split(/\s+/).filter(Boolean);
      if (words.length > 200) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Max 200 words allowed",
        });
      }
    }),

  image: z
    .instanceof(File)
    .optional()
    .nullable()
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      "Image must be smaller than 5MB"
    )
    .refine(
      (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png images are allowed"
    ),
});

export type ComposePostFormValues = z.infer<typeof composePostSchema>;

import * as z from "zod";

// SKU Validator
const skuValidator = z.object({
  sku: z.string().optional(),
  barcode: z.string().optional(),
  quantity: z.coerce
    .number()
    .nonnegative()
    .min(1, { message: "Minimum quantity is required" }),
  stock_visibility: z.boolean(),
  stock_alert: z.coerce.number().nonnegative().optional(),
  old_price: z.coerce.number().nonnegative().optional(),
  price: z.coerce.number().nonnegative().optional(),
  cost: z.coerce.number().nonnegative().optional(),
});

// Variant Validator
const variantValidator = z.object({
  attributes: z
    .array(z.number().min(1, { message: "Attribute option ID is required" }))
    .optional(),
  sku: skuValidator,
  images: z
    .array(z.instanceof(File).refine((file) => file.size > 0, "Invalid File"))
    .optional(),
});

// Product Validator
export const productValidator = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  slug: z.string().min(1, { message: "Slug is required" }),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .optional(),
  brand: z.coerce.number().nullable(),
  categories: z
    .array(z.coerce.number())
    .nonempty({ message: "At least one category is required" }),
  variants: z.array(variantValidator).optional(),
  images: z
    .array(z.instanceof(File).refine((file) => file.size > 0, "Invalid File"))
    .optional(),
  is_visible: z.boolean().optional(),
  is_featured: z.boolean().optional(),
  is_new: z.boolean().optional(),
  published_at: z.string().date().optional(),
  seo_title: z
    .string()
    .max(60, "SEO title must be 60 characters or less")
    .optional(),
  seo_description: z
    .string()
    .max(160, "SEO description must be 160 characters or less")
    .optional(),
});

import { z } from 'zod';
 const productValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string().min(1, "Tags must be non-empty strings")),
  variants: z.array(z.object({
    type: z.string().min(1, "Type is required"),
    value: z.string().min(1, "Value is required")
  })),
  inventory: z.object({
    quantity: z.number().nonnegative("Quantity must be a non-negative number"),
    inStock: z.boolean()
  })
});
export { productValidationSchema };
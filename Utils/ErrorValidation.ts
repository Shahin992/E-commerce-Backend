import { z } from 'zod';
 const productValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().nonnegative("Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  tags: z.array(z.string().min(1, "Tags must be non-empty strings")),
  variants: z.array(z.object({
    type: z.string().min(1, "Type is required"),
    value: z.string().min(1, "Value is required")
  })),
  inventory: z.object({
    quantity: z.number().nonnegative("Quantity must be a positive number"),
    inStock: z.boolean()
  })
});

 const orderValidationSchema = z.object({
  email: z.string().email("Invalid email address"),
  productId: z.string().min(1, "Product ID is required"),
  price: z.number().nonnegative("Price must be a positive number"),
  quantity: z.number().min(1, "Quantity must be at least 1")
});  
export { productValidationSchema ,orderValidationSchema};
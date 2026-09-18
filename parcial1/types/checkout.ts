import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .min(5, "El nombre debe tener al menos 3 caracteres."),
  email: z
    .string()
    .email("Ingresa un correo válido."),
  paymentMethod: z
    .string()
    .min(1, "Debes seleccionar un metodo de pago"),
  terms: z.boolean().refine((val) => val == true, {
    message: "Debes aceptar terminos y condiciones."
  })
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;

export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>;
export type CheckoutFormTouched = Partial<Record<keyof CheckoutFormData, boolean>>;
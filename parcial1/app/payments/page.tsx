"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart } from "@/context/Cart";
import { checkoutSchema } from "@/types/checkout";
import { ProductCart } from "@/components/ProductCart";

type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items, totalItems, clearCart, totalPrice } = useCart();

  const [completedName, setCompletedName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: { fullName: "", email: "", paymentMethod: "", terms: false },
  });

  async function onSubmit(data: CheckoutFormData) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    clearCart();
    reset();
    setCompletedName(data.fullName);
  }

  if (completedName) {
    return (
      <main className="checkout-main checkout-confirmation">
        <h1 className="checkout-title">Pago confirmado</h1>
        <p>Gracias, {completedName}.</p>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="checkout-main checkout-confirmation">
        <h1 className="checkout-title">Tu carrito está vacío</h1>
      </main>
    );
  }

  return (
    <main className="checkout-main">
      <h1 className="checkout-title">Finalizar compra</h1>

      <div className="cart-products">
        {items.map((product) => (
          <ProductCart product={product} key={product.id}></ProductCart>
        ))}
      </div>

      <div className="checkout-totals">
        <p>{totalItems} productos en el carrito</p>
        <p>Total: ${totalPrice}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="checkout-form">
        <div className="form-field">
          <label htmlFor="fullName">Nombre completo</label>
          <input id="fullName" {...register("fullName")} />
          {errors.fullName && <span className="form-error">{errors.fullName.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" type="email" {...register("email")} />
          {errors.email && <span className="form-error">{errors.email.message}</span>}
        </div>

        <div className="form-field">
          <label htmlFor="paymentMethod">Metodo de Pago</label>
          <select id="paymentMethod" {...register("paymentMethod")}>
            <option value="">option</option>
            <option value="visa">visa</option>
            <option value="mastercard">mastercard</option>
          </select>
          {errors.paymentMethod && (
            <span className="form-error">{errors.paymentMethod.message}</span>
          )}
        </div>

        <div>
          <label className="form-checkbox">
            <input type="checkbox" {...register("terms")} />
            <span>Acepto terminos y condiciones</span>
          </label>
          {errors.terms && <span className="form-error">{errors.terms.message}</span>}
        </div>

        <button type="submit" className="checkout-submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Procesando..." : `Pagar $${totalPrice}`}
        </button>
      </form>
    </main>
  );
}

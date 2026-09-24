"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/context/Cart";
import { checkoutSchema, CheckoutFormData } from "@/types/checkout";
import { ProductCart } from "@/components/ProductCart";

export default function CheckoutPage() {
  const { items, totalItems, clearCart, totalPrice } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    getValues,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
  });

  function handleDisabled() {
    return Object.keys(errors).length > 0 || isSubmitting;
  }

  function onSubmit(data: CheckoutFormData) {
    console.log("Datos válidos:", data);
    clearCart();
  }

  if (items.length === 0 && !isSubmitSuccessful) {
    return (
      <main className="p-6 max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold mb-2">Tu carrito está vacío</h1>
      </main>
    );
  }

  if (isSubmitSuccessful) {
    return (
      <main className="p-6 max-w-lg mx-auto text-center">
        <h1 className="text-2xl font-bold mb-2">Pago confirmado</h1>
        <p className="text-gray-600">Gracias, {getValues("fullName")}.</p>
      </main>
    );
  }

  return (
    <main className="p-6 max-w-lg mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Finalizar compra</h1>

      <div className="cart-products">
          {items.map((product) => (<ProductCart product={product} key={product.id}></ProductCart>))}
      </div>

      <div>
        <p className="font-bold">{totalItems} productos en el carrito</p>
        <p className="font-bold">Total: ${totalPrice}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="fullName" className="text-sm font-medium">
            Nombre completo
          </label>
          <input id="fullName" {...register("fullName")} className="border rounded-md px-3 py-2" />
          {errors.fullName && (
            <span className="text-red-600 text-sm">{errors.fullName.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium">
            Correo electrónico
          </label>
          <input id="email" {...register("email")} className="border rounded-md px-3 py-2" />
          {errors.email && (
            <span className="text-red-600 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="cardNumber" className="text-sm font-medium">
            Metodo de Pago
          </label>
          <select id="paymentMethod"
            {...register("paymentMethod")}
            className="border rounded-md px-3 py-2">
              <option value="visa">visa</option>
              <option value="mastercard">mastercard</option>
            </select>
          {errors.paymentMethod && (
            <span className="text-red-600">{errors.paymentMethod.message}</span>
          )}
        </div>

        <div>
          <label><input type="checkbox" {...register("terms")}/>
          <span>Acepto terminos y condiciones</span> {
            errors.terms && (
              <span className="text-red-600">{errors.terms.message}</span>
            )
          }
          </label>
        </div>

        <button type="submit" className="bg-blue-600 text-white rounded-md py-3 font-semibold" disabled={handleDisabled()}>
          Pagar ${totalPrice}
        </button>
      </form>
    </main>
  );
}
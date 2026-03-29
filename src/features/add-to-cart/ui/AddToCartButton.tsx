"use client";

import { useCart } from "@/entities/cart/model/cart-context";
import type { Product } from "@/entities/product/model/types";

type AddToCartButtonProps = {
  product: Product;
};

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const { items, addToCart, removeFromCart, updateItemQuantity } = useCart();
  const cartItem = items.find((item) => item.id === product.id);
  const quantityValue = cartItem?.quantity ?? 1;

  if (!cartItem) {
    return (
      <button
        type='button'
        onClick={() => addToCart(product)}
        className='rounded-md border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black'
      >
        В корзину
      </button>
    );
  }

  return (
    <div className='flex flex-col items-end gap-2'>
      <label className='flex items-center gap-2 text-sm text-zinc-700'>
        <button
          type='button'
          onClick={() => updateItemQuantity(product.id, quantityValue - 1)}
          className='h-8 w-8 rounded-md border border-zinc-300 text-base leading-none transition hover:border-black'
          aria-label='Decrease quantity'
        >
          -
        </button>
        <input
          type='number'
          min={1}
          value={quantityValue}
          onChange={(event) => {
            const nextValue = Number(event.target.value);
            if (Number.isNaN(nextValue)) {
              return;
            }
            updateItemQuantity(product.id, nextValue);
          }}
          className='w-16 rounded-md border border-zinc-300 px-2 py-1 text-center'
        />
        <button
          type='button'
          onClick={() => updateItemQuantity(product.id, quantityValue + 1)}
          className='h-8 w-8 rounded-md border border-zinc-300 text-base leading-none transition hover:border-black'
          aria-label='Increase quantity'
        >
          +
        </button>
      </label>
      <button
        type='button'
        onClick={() => removeFromCart(product.id)}
        className='rounded-md border border-zinc-400 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-black hover:text-black'
      >
        Удалить
      </button>
    </div>
  );
}

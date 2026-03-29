"use client";

import Link from "next/link";
import { useCart } from "@/entities/cart/model/cart-context";
import { formatPrice } from "@/shared/lib/format-price";

export function CartPageContent() {
  const { items, removeFromCart, updateItemQuantity, clearCart, totalPrice } =
    useCart();

  return (
    <section className='w-full space-y-6'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Корзина</h1>
        <Link href='/' className='text-sm font-medium underline'>
          Продолжить покупки
        </Link>
      </div>

      {items.length === 0 ? (
        <div className='border border-zinc-300 bg-zinc-50 p-8 text-center'>
          <p className='text-zinc-600'>Корзина пуста.</p>
        </div>
      ) : (
        <div className='space-y-4'>
          {items.map((item) => (
            <article
              key={item.id}
              className='flex items-center justify-between border border-zinc-300 p-4'
            >
              <div className='space-y-2'>
                <h2 className='text-lg font-semibold'>{item.name}</h2>
                <p className='text-lg text-zinc-600'>
                  {item.quantity} x {formatPrice(item.price)} ₽
                </p>
                <label className='flex items-center gap-2 text-sm text-zinc-700'>
                  <button
                    type='button'
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity - 1)
                    }
                    className='h-8 w-8 rounded border border-zinc-300 text-base leading-none transition hover:border-black'
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <input
                    type='number'
                    min={1}
                    value={item.quantity}
                    onChange={(event) => {
                      const nextValue = Number(event.target.value);
                      if (Number.isNaN(nextValue)) {
                        return;
                      }
                      updateItemQuantity(item.id, nextValue);
                    }}
                    className='w-16 rounded border border-zinc-300 px-2 py-1 text-center'
                  />
                  <button
                    type='button'
                    onClick={() =>
                      updateItemQuantity(item.id, item.quantity + 1)
                    }
                    className='h-8 w-8 rounded border border-zinc-300 text-base leading-none transition hover:border-black'
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </label>
              </div>
              <button
                type='button'
                onClick={() => removeFromCart(item.id)}
                className='rounded border border-zinc-300 px-3 py-2 text-sm transition hover:border-black'
              >
                Удалить
              </button>
            </article>
          ))}

          <div className='space-y-4 border border-zinc-300 bg-zinc-50 p-4'>
            <p className='text-xl font-bold'>
              Всего: {formatPrice(totalPrice)} ₽
            </p>
            <div className='flex items-center gap-3'>
              <button
                type='button'
                onClick={clearCart}
                className='rounded border border-zinc-400 px-4 py-2 text-sm font-medium'
              >
                Очистить корзину
              </button>
              <button
                type='button'
                className='rounded border border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black'
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

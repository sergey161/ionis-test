import type { Product } from "@/entities/product/model/types";
import { AddToCartButton } from "@/features/add-to-cart/ui/AddToCartButton";
import image1 from "@/image/catalog/1.png";
import image2 from "@/image/catalog/2.png";
import image3 from "@/image/catalog/3.png";
import { formatPrice } from "@/shared/lib/format-price";
import Image from "next/image";

type ProductCardProps = {
  product: Product;
  view?: "list" | "grid";
};

function Rating({ value }: { value: number }) {
  return (
    <div className='flex items-center gap-1'>
      <span className='text-sm font-medium text-amber-500'>
        {"★".repeat(value)}
      </span>
      <span className='text-sm text-zinc-300'>{"★".repeat(5 - value)}</span>
      <span className='ml-1 text-xs text-zinc-500'>{value}.0</span>
    </div>
  );
}

const productImageById = {
  "1": image1,
  "2": image2,
  "3": image3,
} as const;

export function ProductCard({ product, view = "list" }: ProductCardProps) {
  const productImage =
    productImageById[product.id as keyof typeof productImageById];

  if (view === "grid") {
    return (
      <article className='group relative flex flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-zinc-300'>
        <div className='relative aspect-square overflow-hidden p-4'>
          {productImage && (
            <Image
              src={productImage}
              alt={product.name}
              fill
              className='object-contain transition-transform duration-300 group-hover:scale-105'
              sizes='(max-width: 768px) 100vw, 33vw'
            />
          )}
          <div className='absolute left-3 top-3'>
            <span className='inline-flex items-center rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur-sm'>
              {product.category}
            </span>
          </div>
        </div>

        <div className='flex flex-1 flex-col gap-3 p-4'>
          <div className='flex-1'>
            <h2 className='line-clamp-2 text-base font-semibold text-zinc-900 transition-colors group-hover:text-blue-600'>
              {product.name}
            </h2>
            <p className='mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-500'>
              {product.description}
            </p>
          </div>

          <div className='flex items-center justify-between pt-3 border-t border-zinc-100'>
            <div className='flex flex-col'>
              <span className='text-lg font-bold text-zinc-900'>
                {formatPrice(product.price)} ₽
              </span>
              <Rating value={product.rating} />
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className='group flex overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-zinc-300'>
      <div className='relative flex w-48 shrink-0 items-center justify-center p-6 sm:w-64'>
        {productImage && (
          <Image
            src={productImage}
            alt={product.name}
            fill
            className='object-contain transition-transform duration-300 group-hover:scale-105'
            sizes='(max-width: 768px) 100vw, 256px'
          />
        )}
      </div>

      <div className='flex flex-1 flex-col justify-between p-5'>
        <div className='flex-1'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex-1'>
              <span className='mb-2 inline-block rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600'>
                {product.category}
              </span>
              <h2 className='text-lg font-semibold text-zinc-900 transition-colors group-hover:text-blue-600'>
                {product.name}
              </h2>
            </div>
            <div className='shrink-0'>
              <span className='inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700'>
                <span className='mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500'></span>
                В наличии
              </span>
            </div>
          </div>
          <p className='mt-3 text-sm leading-relaxed text-zinc-500'>
            {product.description}
          </p>
        </div>

        <div className='mt-4 flex items-center justify-between border-t border-zinc-100 pt-4'>
          <div className='flex items-center gap-6'>
            <div className='flex flex-col'>
              <span className='text-2xl font-bold text-zinc-900'>
                {formatPrice(product.price)} ₽
              </span>
              <Rating value={product.rating} />
            </div>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}

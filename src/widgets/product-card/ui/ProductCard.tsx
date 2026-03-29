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
    <p className='text-2xl tracking-wide text-black'>{`${"★".repeat(
      value
    )}${"☆".repeat(5 - value)}`}</p>
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
      <article className='flex h-full flex-col gap-3 bg-zinc-100 p-3 rounded-md'>
        <div className='relative h-31 bg-white rounded-md'>
          {productImage && (
            <Image
              src={productImage}
              alt={product.name}
              fill
              className='object-contain object-center p-2'
              sizes='(max-width: 768px) 100vw, 33vw'
            />
          )}
        </div>
        <div className='space-y-2'>
          <p className='inline-block rounded-sm border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-600'>
            {product.category}
          </p>
          <h2 className='text-lg font-semibold text-black'>{product.name}</h2>
          <p className='line-clamp-2 text-sm text-zinc-600'>
            {product.description}
          </p>
        </div>
        <div className='mt-auto space-y-3'>
          <Rating value={product.rating} />
          <div className='flex items-center justify-between gap-3'>
            <span className='text-xl font-bold'>
              {formatPrice(product.price)} ₽
            </span>
            <AddToCartButton product={product} />
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className='grid gap-4 bg-zinc-100 rounded-md p-3 md:grid-cols-[284px_1fr_180px]'>
      <div className='relative h-71 bg-white rounded-md'>
        {productImage && (
          <Image
            src={productImage}
            alt={product.name}
            fill
            className='object-contain object-center p-4'
            sizes='(max-width: 768px) 100vw, 284px'
          />
        )}
      </div>
      <div className='space-y-4 flex flex-col justify-between'>
        <div className='space-y-2'>
          <p className='inline-block rounded-sm border border-zinc-300 bg-white px-3 py-1 text-xs text-zinc-600'>
            {product.category}
          </p>
          <h2 className='text-xl font-semibold text-black'>{product.name}</h2>
          <p className='text-sm text-zinc-600'>{product.description}</p>
        </div>
        <div className='flex items-center justify-between gap-4'>
          <Rating value={product.rating} />
          <span className='text-2xl font-bold'>
            {formatPrice(product.price)} ₽
          </span>
        </div>
      </div>
      <div className='flex flex-col items-end justify-between gap-3'>
        <div className='w-24 rounded-sm border border-zinc-300 bg-white px-3 py-2 text-center text-xs text-zinc-700'>
          В наличии
        </div>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}

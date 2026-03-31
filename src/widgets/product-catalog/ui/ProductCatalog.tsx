"use client";

import { useProductCatalog } from "./ProductCatalogContext";
import { ProductCatalogFilters } from "./ProductCatalogFilters";
import { ProductCatalogViewToggle } from "./ProductCatalogViewToggle";
import { ProductCard } from "@/widgets/product-card/ui/ProductCard";

export function ProductCatalog() {
  const { filteredProducts, viewMode } = useProductCatalog();

  return (
    <div className='flex w-full flex-col gap-8 lg:flex-row'>
      <ProductCatalogFilters />
      <section className='flex-1 space-y-4'>
        <div className='flex items-center justify-end bg-white px-4 py-3'>
          <ProductCatalogViewToggle />
        </div>
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3"
              : "space-y-4"
          }
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} view={viewMode} />
          ))}
          {filteredProducts?.length === 0 && (
            <div className='flex items-center justify-center'>
              <h6 className='font-bold text-zinc-600'>Товары не найдены</h6>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

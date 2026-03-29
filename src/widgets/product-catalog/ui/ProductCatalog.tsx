"use client";

import { useMemo, useState } from "react";
import { products } from "@/entities/product/model/products";
import gridIcon from "@/image/grid.svg";
import listIcon from "@/image/list.svg";
import { ProductCard } from "@/widgets/product-card/ui/ProductCard";

const filters = ["Для офиса", "Кабели", "Светильники", "Аксессуары"];
type ViewMode = "grid" | "list";

function getIconSrc(icon: string | { src: string }) {
  return typeof icon === "string" ? icon : icon.src;
}

export function ProductCatalog() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  const filteredProducts = useMemo(() => {
    if (selectedFilters.length === 0) {
      return products;
    }

    return products.filter((product) =>
      selectedFilters.includes(product.category)
    );
  }, [selectedFilters]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter]
    );
  };

  return (
    <div className='flex w-full flex-col gap-8 lg:flex-row'>
      <aside className='w-full bg-white p-4 lg:w-64'>
        <h2 className='mb-4 text-lg font-semibold'>Фильтр</h2>
        <div className='space-y-3'>
          {filters.map((filter) => (
            <label
              key={filter}
              className='flex items-center gap-3 text-sm text-zinc-700'
            >
              <input
                type='checkbox'
                className='h-5 w-5 border-zinc-400'
                checked={selectedFilters.includes(filter)}
                onChange={() => toggleFilter(filter)}
              />
              {filter}
            </label>
          ))}
        </div>
      </aside>
      <section className='flex-1 space-y-4'>
        <div className='flex items-center justify-end bg-white px-4 py-3'>
          <div className='flex items-center gap-2'>
            <button
              type='button'
              aria-label='Grid view'
              onClick={() => setViewMode("grid")}
              className='flex h-9 w-9 items-center justify-center rounded border border-zinc-300 bg-white'
            >
              <span
                className='h-5 w-5'
                style={{
                  backgroundColor: viewMode === "grid" ? "#000000" : "#D2D2D2",
                  WebkitMaskImage: `url(${getIconSrc(gridIcon)})`,
                  maskImage: `url(${getIconSrc(gridIcon)})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            </button>
            <button
              type='button'
              aria-label='List view'
              onClick={() => setViewMode("list")}
              className='flex h-9 w-9 items-center justify-center rounded border border-zinc-300 bg-white'
            >
              <span
                className='h-5 w-5'
                style={{
                  backgroundColor: viewMode === "list" ? "#000000" : "#D2D2D2",
                  WebkitMaskImage: `url(${getIconSrc(listIcon)})`,
                  maskImage: `url(${getIconSrc(listIcon)})`,
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                  WebkitMaskPosition: "center",
                  maskPosition: "center",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                }}
              />
            </button>
          </div>
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

"use client";

import { useProductCatalog } from "./ProductCatalogContext";

const filters = ["Для офиса", "Кабели", "Светильники", "Аксессуары"];

export function ProductCatalogFilters() {
  const { selectedFilters, toggleFilter } = useProductCatalog();

  return (
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
  );
}

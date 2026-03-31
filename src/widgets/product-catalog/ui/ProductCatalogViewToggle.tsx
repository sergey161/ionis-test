"use client";

import { useProductCatalog } from "./ProductCatalogContext";
import gridIcon from "@/image/grid.svg";
import listIcon from "@/image/list.svg";

function getIconSrc(icon: string | { src: string }) {
  return typeof icon === "string" ? icon : icon.src;
}

export function ProductCatalogViewToggle() {
  const { viewMode, setViewMode } = useProductCatalog();

  return (
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
  );
}

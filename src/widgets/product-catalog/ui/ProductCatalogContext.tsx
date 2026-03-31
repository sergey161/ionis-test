"use client";

import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/entities/product/model/products";

type ViewMode = "grid" | "list";

interface ProductCatalogContextType {
  selectedFilters: string[];
  viewMode: ViewMode;
  filteredProducts: typeof products;
  toggleFilter: (filter: string) => void;
  setViewMode: (mode: ViewMode) => void;
}

const ProductCatalogContext = createContext<ProductCatalogContextType | null>(
  null,
);

export function ProductCatalogProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [selectedFilters, setSelectedFilters] = useState<string[]>(() => {
    const filterParams = searchParams.getAll("filter");
    return filterParams.length > 0 ? filterParams : [];
  });

  const [viewMode, setViewModeState] = useState<ViewMode>(() => {
    const modeParam = searchParams.get("view");
    return modeParam === "grid" || modeParam === "list" ? modeParam : "list";
  });

  useEffect(() => {
    const params = new URLSearchParams();

    selectedFilters.forEach((filter) => params.append("filter", filter));
    params.set("view", viewMode);

    const newUrl = window.location.pathname + "?" + params.toString();
    const currentUrl = window.location.pathname + window.location.search;

    if (currentUrl !== newUrl) {
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [selectedFilters, viewMode, router]);

  const toggleFilter = useCallback((filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((item) => item !== filter)
        : [...prevFilters, filter],
    );
  }, []);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedFilters.length === 0) {
      return products;
    }
    return products.filter((product) =>
      selectedFilters.includes(product.category),
    );
  }, [selectedFilters]);

  return (
    <ProductCatalogContext.Provider
      value={{
        selectedFilters,
        viewMode,
        filteredProducts,
        toggleFilter,
        setViewMode,
      }}
    >
      {children}
    </ProductCatalogContext.Provider>
  );
}

export function useProductCatalog() {
  const context = useContext(ProductCatalogContext);
  if (!context) {
    throw new Error(
      "useProductCatalog must be used within ProductCatalogProvider",
    );
  }
  return context;
}

import { Suspense } from "react";
import { ProductCatalogProvider } from "@/widgets/product-catalog/ui/ProductCatalogContext";
import { ProductCatalog } from "@/widgets/product-catalog/ui/ProductCatalog";

export default function Home() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <ProductCatalogProvider>
        <ProductCatalog />
      </ProductCatalogProvider>
    </Suspense>
  );
}

import type { Product } from "@/domain/entities/product";
import ProductCard from "./product-card";

interface ProductGridProps {
  products: Product[];
  quantities: Record<string, number>;
  lowStockThreshold: number;
  onAdd: (product: Product) => void;
}

const ProductGrid = ({
  products,
  quantities,
  lowStockThreshold,
  onAdd,
}: ProductGridProps) => {
  if (!products.length) {
    return (
      <p className="py-16 text-center text-sm text-gray-light">
        No se encontraron productos.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          quantityInCart={quantities[product.id] ?? 0}
          lowStockThreshold={lowStockThreshold}
          onAdd={onAdd}
        />
      ))}
    </div>
  );
};

export default ProductGrid;

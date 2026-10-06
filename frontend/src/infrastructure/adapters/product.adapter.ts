import { Product } from "@/domain/entities/product.entity";
import { IProductRepository } from "@/domain/ports/product.repository.port";

export class ProductHttpAdapter implements IProductRepository {
  async getAll(): Promise<Product[]> {
    const res = await fetch("/api/products");
    const data = await res.json();
    return data;
  }
}

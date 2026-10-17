import { Product } from "../entities/product";

export interface IProductRepository {
  getAll(): Promise<Product[]>;
}

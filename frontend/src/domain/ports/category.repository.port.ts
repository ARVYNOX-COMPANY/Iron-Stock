import { Category } from "../entities/categories";

export interface ICategoryRepository {
  getAll(): Promise<Category[]>;
}

import { Category } from "../entities/categories.entity";

export interface ICategoryRepository {
  getAll(): Promise<Category[]>;
}

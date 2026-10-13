import { GetCategoriesUseCase } from "@/application/use-cases/get-categories.use-case";
import { CategoryHttpAdapter } from "../adapters/category.adapter";

const categoryRepository = new CategoryHttpAdapter();

export const getAllCategoriesUseCase = new GetCategoriesUseCase(
  categoryRepository,
);

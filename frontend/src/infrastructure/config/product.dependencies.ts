import { GetProductsUseCase } from "@/application/use-cases/get-products.use-case";
import { ProductHttpAdapter } from "../adapters/product.adapter";

const productRepository = new ProductHttpAdapter();

export const getAllProductsUseCase = new GetProductsUseCase(productRepository);

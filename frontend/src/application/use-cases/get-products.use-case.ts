import { IProductRepository } from "@/domain/ports/product.repository.port";

export class GetProductsUseCase {
  constructor(private productRepo: IProductRepository) {}

  async execute() {
    return this.productRepo.getAll();
  }
}

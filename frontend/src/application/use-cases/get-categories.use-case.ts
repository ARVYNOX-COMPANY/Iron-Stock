import { ICategoryRepository } from "@/domain/ports/category.repository.port";

export class GetCategoriesUseCase {
  constructor(private categoryRepo: ICategoryRepository) {}

  async execute() {
    return this.categoryRepo.getAll();
  }
}

import { Category } from "@/domain/entities/categories";
import { ICategoryRepository } from "@/domain/ports/category.repository.port";

export class CategoryHttpAdapter implements ICategoryRepository {
  async getAll(): Promise<Category[]> {
    return [
      {
        name: "Todos",
        id: "1",
      },
      {
        name: "Herramientas",
        id: "2",
      },
      {
        name: "Pinturas",
        id: "3",
      },
      {
        name: "Electricidad",
        id: "4",
      },
    ];
  }
}

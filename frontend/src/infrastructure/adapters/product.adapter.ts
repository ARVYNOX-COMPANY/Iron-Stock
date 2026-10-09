import { Product } from "@/domain/entities/product.entity";
import { IProductRepository } from "@/domain/ports/product.repository.port";

export class ProductHttpAdapter implements IProductRepository {
  async getAll(): Promise<Product[]> {
    const listProducts = [
      {
        name: "Test",
        code: "TESTCODE",
        price: 400,
        img: "https://cdn.phototourl.com/member/2026-10-08-eda41fe2-5729-4470-b29d-72dbb37218c9.webp",
        id: 1,
      },
      {
        name: "Test",
        code: "TESTCODE",
        price: 400,
        img: "https://cdn.phototourl.com/member/2026-10-08-eda41fe2-5729-4470-b29d-72dbb37218c9.webp",
        id: 2,
      },
      {
        name: "Test",
        code: "TESTCODE",
        price: 400,
        img: "https://cdn.phototourl.com/member/2026-10-08-eda41fe2-5729-4470-b29d-72dbb37218c9.webp",
        id: 3,
      },
      {
        name: "Test",
        code: "TESTCODE",
        price: 400,
        img: "https://cdn.phototourl.com/member/2026-10-08-eda41fe2-5729-4470-b29d-72dbb37218c9.webp",
        id: 4,
      },
      {
        name: "Test",
        code: "TESTCODE",
        price: 400,
        img: "https://cdn.phototourl.com/member/2026-10-08-eda41fe2-5729-4470-b29d-72dbb37218c9.webp",
        id: 5,
      },
    ];

    return listProducts;
  }
}

import { Product } from "@/domain/entities/product.entity";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";

const ProductItem = ({ name, code, price, img }: Product) => {
  return (
    <div className="border-solid border-2 border-gray p-8">
      <Image src={img} alt={name} />

      <p className="text-primary">{name}</p>
      <p>CÓDIGO: {code}</p>

      <div className="flex items-center justify-between">
        <p>{price}</p>

        <button className="bg-button-primary">
          <IoMdAdd />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;

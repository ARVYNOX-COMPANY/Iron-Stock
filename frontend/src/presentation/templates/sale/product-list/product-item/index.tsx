import { Product } from "@/domain/entities/product.entity";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";

const ProductItem = ({ name, code, price, img }: Product) => {
  return (
    <div className="border border-gray-light/30 rounded-lg p-4 bg-white/5 hover:bg-white/10 transition-colors">
      <Image
        width={200}
        height={200}
        src={img}
        alt={name}
        className="rounded-md"
      />

      <p className="font-[27px] text-primary py-2">{name}</p>
      <p className="text-[12px] text-gray-light">CÓDIGO: {code}</p>

      <div className="flex items-center justify-between gap-3 mt-6">
        <p className="font-semibold">S/ {price}</p>
        <button
          className="bg-button-primary p-1.5 rounded hover:bg-blue-700 cursor-pointer transition-colors"
          aria-label="Agregar al carrito"
        >
          <IoMdAdd size={18} color="white" />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;

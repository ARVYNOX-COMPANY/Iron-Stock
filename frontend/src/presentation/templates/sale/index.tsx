import Search from "@/presentation/components/search";
import Charge from "./charge";
import ProductList from "./product-list";

const SalesTemplate = () => {
  return (
    <section className="px-10">
      <div className="my-6 border-b-[#9CA3AF] py-2">
        <Search placeholder="Buscar productor por nombre" />
      </div>

      <div className="flex">
        <ProductList />
        <Charge />
      </div>
    </section>
  );
};

export default SalesTemplate;

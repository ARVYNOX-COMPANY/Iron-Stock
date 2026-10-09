import ProductItem from "./product-item";

const ProductList = () => {
  return (
    <section>
      {listProducts.map((item) => {
        return <ProductItem key={item.id} {...item} />;
      })}
    </section>
  );
};

export default ProductList;

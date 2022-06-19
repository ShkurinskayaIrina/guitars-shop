import { Guitars } from '../../types/guitars';
import ProductCard  from '../product-card/product-card';

type Props = {
  catalog: Guitars,
};

function ProductList({catalog}:Props): JSX.Element {
  return (
    <div className="cards catalog__cards" data-testid="catalog__cards">
      {catalog.map((product) => (
        <ProductCard key={product.id} guitar={product}/>
      ))}
    </div>
  );
}

export default ProductList;

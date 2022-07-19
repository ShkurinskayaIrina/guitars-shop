import { Link } from 'react-router-dom';
import { Guitar } from '../../types/guitars';
import { getNumGuitar } from '../../utils/utils';
import { useEffect } from 'react';
import { store } from '../../store/index';
import { fetchComments } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import RatingBlock from '../../components/rating-block/rating-block';

type Props = {
  guitar: Guitar;
}

function ProductCard({guitar}: Props): JSX.Element {
  const {id, previewImg, name, type, rating, price } = guitar;
  const numGuitar = getNumGuitar(previewImg);
  const  nameGuitar = `${name} ${type[0].toUpperCase()}${type.substring(1)}`;

  const dispatch = useAppDispatch();
  useEffect(() => {
    store.dispatch(fetchComments(id));
  }, [id, dispatch]);

  return (
    <div className="product-card">
      <img src={`/img/content/catalog-product-${numGuitar}.jpg`}
        srcSet={`/img/content/catalog-product-${numGuitar}@2x.jpg 2x`}
        width="75" height="190" alt={nameGuitar}
      />
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <RatingBlock width='12' height='11' id={id} rating={rating} isReview={false}/>
        </div>
        <p className="product-card__title">{nameGuitar}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {price===undefined? '' : price.toLocaleString()} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <Link className="button button--mini" to={`/catalog/guitar/${id}`}>Подробнее
        </Link>
        <a className="button button--red button--mini button--add-to-cart" href="/">Купить
        </a>
      </div>
    </div>
  );
}

export default ProductCard;

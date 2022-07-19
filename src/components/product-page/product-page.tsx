import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import { store } from '../../store/index';
import { fetchGuitar } from '../../store/api-actions';
import { getGuitarCurrent } from '../../store/guitars-data/selector';
import { useAppSelector } from '../../hooks';
import { getNumGuitar } from '../../utils/utils';

import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import GuitarTabs from '../guitar-tabs/guitar-tabs';
import ReviewsList from '../reviews-list/reviews-list';
import RatingBlock from '../rating-block/rating-block';
import Footer from '../footer/footer';
import Preloader from '../preloader/preloader';

function ProductPage (): JSX.Element {
  const { id } = useParams();

  useEffect(() => {
    store.dispatch(fetchGuitar(Number(id)));
  }, [id]);

  const guitarCurrent = useAppSelector(getGuitarCurrent);
  const { name, previewImg,  price, rating } = guitarCurrent;
  const numGuitar = getNumGuitar(previewImg);

  if (Object.keys(guitarCurrent).length === 0) {
    return <Preloader />;
  }

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger" data-testid="name">{name}</h1>
          <Breadcrumbs nameGuitar={name}/>
          <div className="product-container">
            <img className="product-container__img"
              src={`/img/content/catalog-product-${numGuitar}.jpg`}
              srcSet={`/img/content/catalog-product-${numGuitar}@2x.jpg 2x}`}
              width="90" height="235" alt=""
            />
            <div className="product-container__info-wrapper">
              <h2 className="product-container__title title title--big title--uppercase">{name}</h2>
              <div className="rate product-container__rating">
                <RatingBlock id={Number(id)} width="14" height="14" rating={rating} isReview={false}/>
              </div>
              <GuitarTabs guitar = {guitarCurrent}/>
            </div>
            <div className="product-container__price-wrapper">
              <p className="product-container__price-info product-container__price-info--title">Цена:</p>
              <p className="product-container__price-info product-container__price-info--value">{price===undefined? '' : price.toLocaleString()} ₽</p>
              <a className="button button--red button--big product-container__button" href="/">Добавить в корзину</a>
            </div>
          </div>
          <ReviewsList guitarId={id} guitarName={name}/>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default ProductPage;

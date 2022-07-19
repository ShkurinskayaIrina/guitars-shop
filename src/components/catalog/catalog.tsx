import { useParams } from 'react-router-dom';

import Filter from '../filter/filter';
import Sort from '../sort/sort';
import ProductList from '../product-list/product-list';
import Pagination from '../pagination/pagination';
import Preloader from '../preloader/preloader';

import { getCatalog } from '../../store/guitars-data/selector';
import { getFilterPrice, getFilterTypes,
  getFilter4Strings, getFilter6Strings, getFilter7Strings, getFilter12Strings,
  getSortType, getSortOrder } from '../../store/guitars-process/selector';
import { useAppSelector } from '../../hooks';
import { GUITAR_COUNT_SHOWN, SortType, SortOrder } from '../../consts';
import { Guitar } from '../../types/guitars';

function Catalog(): JSX.Element {

  const guitarsCatalog = useAppSelector(getCatalog);
  const guitarsFilterPrice = useAppSelector(getFilterPrice);

  const guitarsFilterType:{[key: string]: boolean} = useAppSelector(getFilterTypes);

  const guitarsFilter4Strings = useAppSelector(getFilter4Strings);
  const guitarsFilter6Strings = useAppSelector(getFilter6Strings);
  const guitarsFilter7Strings = useAppSelector(getFilter7Strings);
  const guitarsFilter12Strings = useAppSelector(getFilter12Strings);

  const guitarsSortType = useAppSelector(getSortType);
  const guitarsSortOrder = useAppSelector(getSortOrder);

  const {pageNumber = 1} = useParams<{pageNumber: string}>();

  if (guitarsCatalog.length === 0) {
    return <Preloader />;
  }

  const filterByPrice = (el:Guitar) => {
    if (guitarsFilterPrice !== undefined) {
      if (el.price >= Number(guitarsFilterPrice.priceMin) &&
      (Number(guitarsFilterPrice.priceMax) === 0 || el.price <= guitarsFilterPrice.priceMax)) {
        return el;
      }
    }
  };

  const filterByType = (guitar: Guitar) => {
    if (guitarsFilterType.acoustic === false &&
      guitarsFilterType.electric === false &&
      guitarsFilterType.ukulele === false) {
      return guitar;
    }
    if (guitarsFilterType[guitar.type] === true) {
      return guitar;
    }
  };

  const filterByCountStrings = (guitar: Guitar) => {
    if (guitarsFilter4Strings === false &&
      guitarsFilter6Strings === false &&
      guitarsFilter7Strings === false &&
      guitarsFilter12Strings === false) {
      return guitar;
    }

    if (guitarsFilter4Strings && guitar.stringCount===4) {
      return guitar;
    }
    if (guitarsFilter6Strings && guitar.stringCount===6) {
      return guitar;
    }
    if (guitarsFilter7Strings && guitar.stringCount===7) {
      return guitar;
    }
    if (guitarsFilter12Strings && guitar.stringCount===12) {
      return guitar;
    }
  };

  const guitarsCatalogFiltered = guitarsCatalog
    .filter(filterByPrice)
    .filter(filterByType)
    .filter(filterByCountStrings);

  const pagesCount = Math.ceil(guitarsCatalogFiltered.length/GUITAR_COUNT_SHOWN);

  let guitarsCatalogSort = guitarsCatalogFiltered;

  if (guitarsSortType !== SortType.Popularity) {
    if (guitarsSortOrder === SortOrder.Up) {
      guitarsCatalogSort = guitarsCatalogFiltered.slice(0).sort((prev, next) => prev.price - next.price);
    }
    if (guitarsSortOrder === SortOrder.Down) {
      guitarsCatalogSort = guitarsCatalogFiltered.slice(0).sort((prev, next) => next.price - prev.price);
    }
  } else {
    if (guitarsSortOrder === SortOrder.Up) {
      guitarsCatalogSort = guitarsCatalogFiltered.slice(0).sort((prev, next) => prev.rating - next.rating);
    }
    if ( guitarsSortOrder === SortOrder.Down) {
      guitarsCatalogSort = guitarsCatalogFiltered.slice(0).sort((prev, next) => next.rating - prev.rating);
    }
  }

  const guitarsForRender = guitarsCatalogSort.slice(GUITAR_COUNT_SHOWN*(Number(pageNumber)-1),
    GUITAR_COUNT_SHOWN*(Number(pageNumber)-1)+GUITAR_COUNT_SHOWN);

  return (
    <div className="catalog" data-testid="catalog">
      <Filter />
      <Sort />
      <ProductList catalog={guitarsForRender} />
      <Pagination pagesCount={pagesCount} pageCurrent={Number(pageNumber)} />
    </div>
  );
}

export default Catalog;

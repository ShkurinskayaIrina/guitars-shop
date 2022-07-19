import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { store } from '../../store/index';
import { fetchCatalogGuitars } from '../../store/api-actions';
import { AppRoute } from '../../consts';
import MainPage from '../main-page/main-page';
import ProductPage from '../product-page/product-page';
import NotFoundPage from '../not-found-page/not-found-page';

function App(): JSX.Element {
  useEffect(() => {
    store.dispatch(fetchCatalogGuitars());
  }, []);


  return (
    <Routes>
      <Route path={AppRoute.Root} element={<MainPage />} />
      <Route path={AppRoute.CatalogPage} element={<MainPage />}/>
      <Route path={AppRoute.ProductPage} element={<ProductPage />}/>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>

  );
}

export default App;

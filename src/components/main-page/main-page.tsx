import { useParams } from 'react-router-dom';

import Header from '../header/header';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import Catalog from '../catalog/catalog';
import Footer from '../footer/footer';
import NotFoundPage from '../not-found-page/not-found-page';
import Preloader from '../preloader/preloader';

import { getCatalog } from '../../store/guitars-data/selector';
import { useAppSelector } from '../../hooks';

import { GUITAR_COUNT_SHOWN } from '../../consts';

function MainPage(): JSX.Element {
  const { pageNumber } = useParams();
  const guitarsCatalog = useAppSelector(getCatalog);
  const pagesCount = Math.ceil(guitarsCatalog.length/GUITAR_COUNT_SHOWN);

  if (guitarsCatalog.length === 0) {
    return <Preloader />;
  }

  if (Number(pageNumber) > pagesCount) {
    return <NotFoundPage/>;
  }

  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">Каталог гитар</h1>
          <Breadcrumbs />
          <Catalog />
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default MainPage;

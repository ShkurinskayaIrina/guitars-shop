import { Link } from 'react-router-dom';

import Header from '../header/header';
import Footer from '../footer/footer';

import { AppRoute } from '../../consts';

function NotFoundPage(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className="page-content">
        <div className="container">
          <h1 className="page-content__title title title--bigger">404 :( Такой страницы не существует</h1>
          <ul className="breadcrumbs page-content__breadcrumbs">
            <li className="breadcrumbs__item">
              <Link  className="link" to={AppRoute.Root}>Главная</Link>
            </li>
            <li className="breadcrumbs__item">
              <Link  className="link" to="/">Несуществующая страница</Link>
            </li>
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default NotFoundPage;

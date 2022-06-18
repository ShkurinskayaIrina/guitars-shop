import { Link } from 'react-router-dom';
import { AppRoute } from '../../consts';

type Props = {
  nameGuitar?: string,
}
function Breadcrumbs({nameGuitar}: Props): JSX.Element {
  return (
    <ul className="breadcrumbs page-content__breadcrumbs">
      <li className="breadcrumbs__item">
        <Link className="link" to={AppRoute.Root}>Главная</Link>
      </li>
      <li className="breadcrumbs__item">
        <Link className="link" to={'/catalog/1'}>Каталог</Link>
      </li>
      {
        nameGuitar &&
      <li className="breadcrumbs__item">
        <Link className="link" to='/'>{nameGuitar}</Link>
      </li>
      }
    </ul>
  );
}

export default Breadcrumbs;

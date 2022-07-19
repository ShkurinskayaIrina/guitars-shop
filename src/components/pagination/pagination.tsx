import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { choosePage } from '../../store/guitars-process/guitars-process';

type Props = {
  pageCurrent: number,
  pagesCount: number,
};

function Pagination({pagesCount, pageCurrent}:Props): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  return (
    <div className="pagination page-content__pagination">
      <ul className="pagination__list">
        {pageCurrent>1 &&
        <li className="pagination__page pagination__page--prev" id="prev"
          onClick = {() => {dispatch(choosePage(pageCurrent-1));}}
        >
          <Link className="link pagination__page-link"
            to={`/catalog/${pageCurrent-1}/${location.search}`}
          >Назад
          </Link>
        </li>}
        {[...Array(pagesCount)].map((_,index) => {
          const keyValue = index+1;
          return (
            <Fragment key={keyValue}>
              <li className={keyValue===pageCurrent? 'pagination__page pagination__page--active' : 'pagination__page'}
                onClick = {() => {dispatch(choosePage(keyValue));}}
              >
                <Link className="link pagination__page-link"
                  to={`/catalog/${keyValue}/${location.search}`}
                >{keyValue}
                </Link>
              </li>
            </Fragment>
          );
        })}
        {pageCurrent<pagesCount &&
        <li className="pagination__page pagination__page--next" id="next"
          onClick = {() => {dispatch(choosePage(pageCurrent+1));}}
        >
          <Link className="link pagination__page-link"
            to={`/catalog/${pageCurrent+1}/${location.search}`}
          >Далее
          </Link>
        </li>}
      </ul>
    </div>
  );
}

export default Pagination;

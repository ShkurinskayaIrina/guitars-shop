import { useSearchParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { updateSortType, updateSortOrder } from '../../store/guitars-process/guitars-process';
import { useAppDispatch } from '../../hooks';
import { SortType, SortOrder } from '../../consts';

function Sort(): JSX.Element {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [sortTypeChecked, setSortTypeChecked] = useState(SortType.Original);
  const [sortOrderChecked, setSortOrderChecked] = useState(SortOrder.Original);

  const getChangeSortTypeChecked = () => {
    if (sortTypeChecked===SortType.Original) {
      setSortTypeChecked(SortType.Price);
    }
  };

  const getChangeSortOrderChecked = () => {
    if (sortOrderChecked === SortOrder.Original) {
      setSortOrderChecked(SortOrder.Up);
      return;
    }
    setSortOrderChecked(SortOrder.Down);
  };

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      if (searchParams.has('sort')) {
        setSortTypeChecked(SortType[searchParams.get('sort') as SortType]);
      }

      if (searchParams.has('order')) {
        setSortOrderChecked(SortOrder[searchParams.get('order') as SortOrder]);
      }
      return () => {
        isMounted.current = false;
      };
    }
    dispatch(updateSortType(sortTypeChecked));
    dispatch(updateSortOrder(sortOrderChecked));
  }, [dispatch, searchParams, sortOrderChecked, sortTypeChecked]);

  useEffect(() => {
    if (sortTypeChecked !== SortType.Original) {
      searchParams.set('sort', sortTypeChecked);
      setSearchParams(searchParams);
      setSortTypeChecked(sortTypeChecked);
    }

    if (sortOrderChecked !== SortOrder.Original) {
      searchParams.set('order', sortOrderChecked);
      setSearchParams(searchParams);
      setSortOrderChecked(sortOrderChecked);
    }
    dispatch(updateSortType(sortTypeChecked));
    dispatch(updateSortOrder(sortOrderChecked));
  }, [dispatch, searchParams, setSearchParams, sortOrderChecked, sortTypeChecked]);

  return (
    <div className="catalog-sort">
      <h2 className="catalog-sort__title">Сортировать:</h2>
      <div className="catalog-sort__type">
        <button className={`catalog-sort__type-button
            ${sortTypeChecked===SortType.Price ? 'catalog-sort__type-button--active' : ''}`}
        aria-label="по цене"
        onClick={()=> {
          setSortTypeChecked(SortType.Price);
          getChangeSortOrderChecked();
        }}
        >по цене
        </button>
        <button className={`catalog-sort__type-button
          ${sortTypeChecked===SortType.Popularity ? 'catalog-sort__type-button--active' : ''}`}
        aria-label="по популярности"
        onClick={()=> {
          setSortTypeChecked(SortType.Popularity);
          getChangeSortOrderChecked();
        }}
        >по популярности
        </button>
      </div>
      <div className="catalog-sort__order">
        <button className={`catalog-sort__order-button catalog-sort__order-button--up
          ${sortOrderChecked===SortOrder.Up ? 'catalog-sort__order-button--active' : ''}`}
        aria-label="По возрастанию"
        onClick={()=> {
          setSortOrderChecked(SortOrder.Up);
          getChangeSortTypeChecked();
        }}
        >
        </button>
        <button className={`catalog-sort__order-button catalog-sort__order-button--down
          ${sortOrderChecked===SortOrder.Down ? 'catalog-sort__order-button--active' : ''}`}
        aria-label="По убыванию"
        onClick={()=> {
          setSortOrderChecked(SortOrder.Down);
          getChangeSortTypeChecked();
        }}
        >
        </button>
      </div>
    </div>
  );
}

export default Sort;

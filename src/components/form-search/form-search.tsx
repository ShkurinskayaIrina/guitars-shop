import { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getCatalog } from '../../store/guitars-data/selector';
import { Guitar, Guitars } from '../../types/guitars';

function FormSearch(): JSX.Element {
  const guitarsCatalog = useAppSelector(getCatalog);

  const [isHideSelectItem, setIsHideSelectItem] = useState(true);
  const [formSearch, setFormSearch] = useState('');
  const [formSearchItems, setFormSearchItems] = useState<Guitars>([]);

  const fieldChangeHandle = function(evt:ChangeEvent<HTMLInputElement>) {
    const searchData = evt.target.value;
    setFormSearch(searchData);
    if (searchData.length!==0) {
      setIsHideSelectItem(false);
    } else {
      setIsHideSelectItem(true);
    }

    const filteredItems = guitarsCatalog.filter((item) => item.name.toLowerCase().includes(searchData.toLowerCase())===true);
    setFormSearchItems(filteredItems);

  };

  const onResetButtonClick = () => {
    setFormSearch('');
    setIsHideSelectItem(true);
  };

  function FormSearchSelectItem(guitar:Guitar) {
    const {id, name} = guitar;
    return (
      <Link className="button button--mini" to={`/catalog/guitar/${id}`}
        onClick={onResetButtonClick}
      >
        <li className="form-search__select-item" tabIndex={0}>{name}</li>
      </Link>
    );
  }

  return (
    <div className="form-search">
      <form className="form-search__form" id="form-search">
        <button className="form-search__submit" type="submit">
          <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
            <use xlinkHref="#icon-search"></use>
          </svg><span className="visually-hidden">Начать поиск</span>
        </button>
        <input className="form-search__input" id="search" type="text" autoComplete="off" placeholder="что вы ищите?"
          value={formSearch}
          onChange={fieldChangeHandle}
        />
        <label className="visually-hidden" htmlFor="search">Поиск</label>
      </form>
      <ul className={`form-search__select-list ${isHideSelectItem===true ? 'hidden' : 'list-opened'}`}>
        {formSearchItems.map((item) => (
          FormSearchSelectItem(item)
        ))}
      </ul>
      <button className="form-search__reset " type="reset" form="form-search"
        onClick={onResetButtonClick}
      >
        <svg className="form-search__icon" width="14" height="15" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg><span className="visually-hidden" data-testid="search-close">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default FormSearch;

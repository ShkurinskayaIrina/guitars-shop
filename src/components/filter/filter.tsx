import { useSearchParams } from 'react-router-dom';
import { useState, useRef, useEffect, ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getGuitarsPriceRange } from '../../store/guitars-data/selector';
import { updateFilterPrice, updateFilterTypes,
  updateFilter4Strings, updateFilter6Strings, updateFilter7Strings, updateFilter12Strings } from '../../store/guitars-process/guitars-process';

const guitarStrings :{[key: string]: string[]} = {
  'acoustic': ['6-strings', '7-strings', '12-strings'],
  'electric': ['4-strings', '6-strings', '7-strings'],
  'ukulele': ['4-strings'],
};

function Filter():JSX.Element {
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const guitarsPriceRange = useAppSelector(getGuitarsPriceRange);

  const [filterPrice, setFilterPrice] = useState({
    priceMin: '',
    priceMax: '',
  });

  const [filterType, setFilterType] = useState<{[key: string]: boolean} >({
    acoustic: false,
    electric: false,
    ukulele: false,
  });

  const [filterStringsDisabled, setFilterStringsDisabled] = useState({
    '4-strings': false,
    '6-strings': false,
    '7-strings': false,
    '12-strings': false,
  });

  const [filter4StringsChecked, setFilter4StringsChecked] = useState(false);
  const [filter6StringsChecked, setFilter6StringsChecked] = useState(false);
  const [filter7StringsChecked, setFilter7StringsChecked] = useState(false);
  const [filter12StringsChecked, setFilter12StringsChecked] = useState(false);

  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      let priceMinRange = '';
      let priceMaxRange = '';
      let isAcousticChecked = false;
      let isElectricChecked = false;
      let isUkuleleChecked = false;

      let is4StringsChecked = false;
      let is6StringsChecked = false;
      let is7StringsChecked = false;
      let is12StringsChecked = false;

      if (searchParams.has('priceMin')) {
        priceMinRange = searchParams.get('priceMin') as string;
      }

      if (searchParams.has('priceMax')) {
        priceMaxRange = searchParams.get('priceMax') as string;
      }

      if (searchParams.has('type1')) {
        isAcousticChecked = true;
      }

      if (searchParams.has('type2')) {
        isElectricChecked = true;
      }

      if (searchParams.has('type3')) {
        isUkuleleChecked = true;
      }

      if (searchParams.has('strings4')) {
        is4StringsChecked = true;
      }

      if (searchParams.has('strings6')) {
        is6StringsChecked = true;
      }

      if (searchParams.has('strings7')) {
        is7StringsChecked = true;
      }

      if (searchParams.has('strings12')) {
        is12StringsChecked = true;
      }

      setFilterPrice({
        'priceMin': priceMinRange,
        'priceMax': priceMaxRange,
      });

      setFilterType({
        acoustic: isAcousticChecked,
        electric: isElectricChecked,
        ukulele: isUkuleleChecked,
      });

      setFilter4StringsChecked(is4StringsChecked);
      setFilter6StringsChecked(is6StringsChecked);
      setFilter7StringsChecked(is7StringsChecked);
      setFilter12StringsChecked(is12StringsChecked);

      return () => {
        isMounted.current = false;
      };
    }

    dispatch(updateFilterPrice(filterPrice));
    dispatch(updateFilterTypes(filterType));
    dispatch(updateFilter4Strings(filter4StringsChecked));
    dispatch(updateFilter6Strings(filter6StringsChecked));
    dispatch(updateFilter7Strings(filter7StringsChecked));
    dispatch(updateFilter12Strings(filter12StringsChecked));

  }, [dispatch, filter12StringsChecked, filter4StringsChecked, filter6StringsChecked, filter7StringsChecked, filterPrice, filterType, searchParams]);

  useEffect(() => {
    const filterStringsItems: string[] = [];

    let is4StringsDisabled = false;
    let is6StringsDisabled = false;
    let is7StringsDisabled = false;
    let is12StringsDisabled = false;

    Object.keys(filterType).forEach((el)=>{
      if ( filterType[el] ) {
        guitarStrings[el].forEach((item) => {
          if (!filterStringsItems.includes(item)) {
            filterStringsItems.push(item);
          }
        });
      }
    });

    if (filterStringsItems.length > 0) {
      if (!filterStringsItems.includes('4-strings')) {
        is4StringsDisabled = true;
        if (filter4StringsChecked) {
          setFilter4StringsChecked(false);
          searchParams.delete('strings4');
          setSearchParams(searchParams);
        }
      }
      if (!filterStringsItems.includes('6-strings')) {
        is6StringsDisabled = true;
        if (filter6StringsChecked) {
          setFilter6StringsChecked(false);
          searchParams.delete('strings6');
          setSearchParams(searchParams);
        }
      }
      if (!filterStringsItems.includes('7-strings')) {
        is7StringsDisabled = true;
        if (filter7StringsChecked) {
          setFilter7StringsChecked(false);
          searchParams.delete('strings7');
          setSearchParams(searchParams);
        }
      }
      if (!filterStringsItems.includes('12-strings')) {
        is12StringsDisabled = true;
        if (filter12StringsChecked) {
          setFilter12StringsChecked(false);
          searchParams.delete('strings12');
          setSearchParams(searchParams);
        }
      }
    }

    setFilterStringsDisabled ({
      '4-strings': is4StringsDisabled,
      '6-strings': is6StringsDisabled,
      '7-strings': is7StringsDisabled,
      '12-strings': is12StringsDisabled,
    });
    dispatch(updateFilterPrice(filterPrice));
    dispatch(updateFilterTypes(filterType));
    dispatch(updateFilter4Strings(filter4StringsChecked));
    dispatch(updateFilter6Strings(filter6StringsChecked));
    dispatch(updateFilter7Strings(filter7StringsChecked));
    dispatch(updateFilter12Strings(filter12StringsChecked));
  },[dispatch, filter12StringsChecked, filter4StringsChecked, filter6StringsChecked, filter7StringsChecked, filterPrice, filterType, searchParams, setSearchParams]);


  const fieldPriceChangeHandle = (evt: ChangeEvent<HTMLInputElement>) => {
    const {id, value} = evt.target;
    setFilterPrice({...filterPrice, [id]: value});
  };

  const handleMinPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;
    if ( Number(value) !== 0 ) {
      if ( Number(value) < guitarsPriceRange.priceMin ) {
        setFilterPrice({...filterPrice, 'priceMin': guitarsPriceRange.priceMin.toString()});
        searchParams.set('priceMin', guitarsPriceRange.priceMin.toString());
        setSearchParams(searchParams);
        return;
      }

      if ( Number(value) > guitarsPriceRange.priceMax ) {
        setFilterPrice({...filterPrice, 'priceMin': guitarsPriceRange.priceMax.toString()});
        searchParams.set('priceMin', guitarsPriceRange.priceMax.toString());
        setSearchParams(searchParams);
        return;
      }

      if ( Number(value) > Number(filterPrice.priceMax) && Number(filterPrice.priceMax) !== 0) {
        setFilterPrice({...filterPrice, 'priceMin': filterPrice.priceMax});
        searchParams.set('priceMin', filterPrice.priceMax);
        setSearchParams(searchParams);
        return;
      }
      setFilterPrice({...filterPrice, 'priceMin': value});
      searchParams.set('priceMin', value);
      setSearchParams(searchParams);
    } else {
      setFilterPrice({...filterPrice, 'priceMin': '0'});
      searchParams.delete('priceMin');
      setSearchParams(searchParams);
    }
  };

  const handleMaxPriceBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const {value} = evt.target;

    if (Number(value) !== 0) {
      if (Number(value) < Number(filterPrice.priceMin)) {
        setFilterPrice({...filterPrice, 'priceMax': filterPrice.priceMin.toString()});
        searchParams.set('priceMax', filterPrice.priceMin.toString());
        setSearchParams(searchParams);
        return;
      }

      if (Number(value) > Number(filterPrice.priceMax)) {
        setFilterPrice({...filterPrice, 'priceMax': filterPrice.priceMax.toString()});
        searchParams.set('priceMax', filterPrice.priceMax.toString());
        setSearchParams(searchParams);
        return;
      }

      if ( Number(value) < Number(filterPrice.priceMin) && Number(filterPrice.priceMin) !== 0) {
        setFilterPrice({...filterPrice, 'priceMax': filterPrice.priceMin});
        searchParams.set('priceMax', filterPrice.priceMin);
        setSearchParams(searchParams);
        return;
      }
      setFilterPrice({...filterPrice, 'priceMax': value.toString()});
      searchParams.set('priceMax', value.toString());
      setSearchParams(searchParams);
    } else {
      setFilterPrice({...filterPrice, 'priceMax': '0'});
      searchParams.delete('priceMax');
      setSearchParams(searchParams);
    }
  };

  const radioChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = evt.target;
    const filterTypeTitle = evt.target.dataset.filterType as string;

    setFilterType({...filterType, [name]: checked});

    if (checked) {
      searchParams.append(filterTypeTitle, name);
      setSearchParams(searchParams);
      return;
    }
    searchParams.delete(filterTypeTitle);
    setSearchParams(searchParams);
  };

  const onResetClick = () => {
    setFilterPrice({
      priceMin: '',
      priceMax: '',
    });

    setFilterType({
      acoustic: false,
      electric: false,
      ukulele: false,
    });

    setFilter4StringsChecked(false);
    setFilter6StringsChecked(false);
    setFilter7StringsChecked(false);
    setFilter12StringsChecked(false);

    searchParams.delete('priceMin');
    searchParams.delete('priceMax');
    searchParams.delete('type1');
    searchParams.delete('type2');
    searchParams.delete('type3');
    searchParams.delete('strings4');
    searchParams.delete('strings6');
    searchParams.delete('strings7');
    searchParams.delete('strings12');
    setSearchParams(searchParams);

    dispatch(updateFilter4Strings(filter4StringsChecked));
    dispatch(updateFilter6Strings(filter6StringsChecked));
    dispatch(updateFilter7Strings(filter7StringsChecked));
    dispatch(updateFilter12Strings(filter12StringsChecked));
  };

  const onChangeStrings = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = evt.target;
    const filterStringsTitle = evt.target.dataset.filterStrings as string;
    if (checked) {
      searchParams.append(filterStringsTitle, name);
      setSearchParams(searchParams);
    } else {
      searchParams.delete(filterStringsTitle);
      setSearchParams(searchParams);
    }
  };

  return (
    <form className="catalog-filter">
      <h2 className="title title--bigger catalog-filter__title">Фильтр</h2>
      <fieldset className="catalog-filter__block" data-testid="price">
        <legend className="catalog-filter__block-title">Цена, ₽</legend>
        <div className="catalog-filter__price-range">
          <div className="form-input">
            <label className="visually-hidden">Минимальная цена</label>
            <input type="number"  id="priceMin" name="от"
              value={filterPrice.priceMin==='0' ? '' : filterPrice.priceMin}
              placeholder={guitarsPriceRange.priceMin.toLocaleString()}
              onChange={fieldPriceChangeHandle}
              onBlur={handleMinPriceBlur}
            />
          </div>
          <div className="form-input">
            <label className="visually-hidden">Максимальная цена</label>
            <input type="number"   id="priceMax" name="до"
              value={filterPrice.priceMax==='0' ? '' : filterPrice.priceMax}
              placeholder={guitarsPriceRange.priceMax.toLocaleString()}
              onChange={fieldPriceChangeHandle}
              onBlur={handleMaxPriceBlur}
            />
          </div>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block" data-testid="type">
        <legend className="catalog-filter__block-title">Тип гитар</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="acoustic" name="acoustic"
            onChange={radioChangeHandler}
            checked={filterType.acoustic}
            data-filter-type="type1"
          />
          <label htmlFor="acoustic">Акустические гитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="electric" name="electric"
            onChange={radioChangeHandler}
            checked={filterType.electric}
            data-filter-type="type2"
          />
          <label htmlFor="electric">Электрогитары</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="ukulele" name="ukulele"
            onChange={radioChangeHandler}
            checked={filterType.ukulele}
            data-filter-type="type3"
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>
      </fieldset>
      <fieldset className="catalog-filter__block" data-testid="strings-count">
        <legend className="catalog-filter__block-title">Количество струн</legend>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="4-strings" name="4-strings"
            disabled={filterStringsDisabled['4-strings']}
            onChange={(evt) => {
              setFilter4StringsChecked(evt.target.checked);
              onChangeStrings(evt);
            }}
            checked={filter4StringsChecked}
            data-filter-strings="strings4"
          />
          <label htmlFor="4-strings">4</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="6-strings" name="6-strings"
            disabled={filterStringsDisabled['6-strings']}
            onChange={(evt) => {
              setFilter6StringsChecked(evt.target.checked);
              onChangeStrings(evt);
            }}
            checked={filter6StringsChecked}
            data-filter-strings="strings6"
          />
          <label htmlFor="6-strings">6</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="7-strings" name="7-strings"
            disabled={filterStringsDisabled['7-strings']}
            onChange={(evt) => {
              setFilter7StringsChecked(evt.target.checked);
              onChangeStrings(evt);
            }}
            checked={filter7StringsChecked}
            data-filter-strings="strings7"
          />
          <label htmlFor="7-strings">7</label>
        </div>
        <div className="form-checkbox catalog-filter__block-item">
          <input className="visually-hidden" type="checkbox" id="12-strings" name="12-strings"
            disabled={filterStringsDisabled['12-strings']}
            onChange={(evt) => {
              setFilter12StringsChecked(evt.target.checked);
              onChangeStrings(evt);
            }}
            checked={filter12StringsChecked}
            data-filter-strings="strings12"
          />
          <label htmlFor="12-strings">12</label>
        </div>
      </fieldset>
      <button className="catalog-filter__reset-btn button button--black-border button--medium" type="reset"
        onClick={onResetClick}
      >Очистить
      </button>
    </form>
  );
}

export default Filter;

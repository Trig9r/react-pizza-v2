import debounce from 'lodash.debounce';
import React from 'react';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';

export const Search: React.FC = () => {
  const [value, setValue] = React.useState('');
  const dispatch = useDispatch();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const updateSearchValue = React.useCallback(
    debounce((str: string) => {
      dispatch(setSearchValue(str));
    }, 300),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <svg className={styles.icon} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <title />
        <g id="search">
          <path d="M29.71,28.29l-6.5-6.5-.07,0a12,12,0,1,0-1.39,1.39s0,.05,0,.07l6.5,6.5a1,1,0,0,0,1.42,0A1,1,0,0,0,29.71,28.29ZM14,24A10,10,0,1,1,24,14,10,10,0,0,1,14,24Z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className={styles.clearIcon}
          fill="none"
          height="20"
          viewBox="0 0 20 20"
          width="20"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.99994 2C6.206 1.99982 6.39106 2.12607 6.46607 2.31799L9.96631 11.2738C10.0668 11.531 9.93982 11.821 9.68262 11.9215C9.42542 12.022 9.13544 11.895 9.03491 11.6378L8.00516 9.00305H4.00814L2.96614 11.6827C2.86607 11.9401 2.5763 12.0676 2.31893 11.9675C2.06156 11.8675 1.93405 11.5777 2.03413 11.3203L5.53436 2.31879C5.60904 2.12675 5.79389 2.00018 5.99994 2ZM6.00156 3.87659L4.39699 8.00305H7.61432L6.00156 3.87659ZM11.5002 2C11.7764 2 12.0002 2.22386 12.0002 2.5V6.02297H12.0038C12.2292 5.61729 12.538 5.29951 12.9301 5.06962C13.3268 4.83974 13.7708 4.72479 14.2621 4.72479C15.1501 4.72479 15.8668 5.0561 16.4122 5.71871C16.9576 6.38132 17.2303 7.26254 17.2303 8.36239C17.2303 8.50371 17.2258 8.64142 17.2169 8.77551L17.1732 8.73175C16.8422 8.40076 16.4416 8.18217 16.0186 8.07574C15.9798 7.4114 15.8022 6.87364 15.4859 6.46245C15.1253 5.99367 14.634 5.75928 14.0119 5.75928C13.4124 5.75928 12.9211 6.00043 12.538 6.48274C12.2467 6.85028 12.0675 7.30585 12.0002 7.84944V8.87809C12.0532 9.30828 12.1756 9.68305 12.3675 10.0024L11.0002 11.3696V2.5C11.0002 2.22386 11.2241 2 11.5002 2ZM9.4391 16.4658C8.85345 15.8802 8.85404 14.93 9.44041 14.3437L14.3439 9.44016C14.9303 8.85379 15.8804 8.8532 16.466 9.43885L18.5614 11.5342C19.147 12.1198 19.1465 13.07 18.5601 13.6563L14.2164 18H16.7473C17.0235 18 17.2473 18.2239 17.2473 18.5C17.2473 18.7761 17.0235 19 16.7473 19H12.6553V18.9988C12.2515 19.0151 11.8425 18.8692 11.5344 18.5611L9.4391 16.4658ZM15.051 10.1473L11.4528 13.7455L14.2547 16.5475L17.853 12.9492C18.0496 12.7526 18.0486 12.4356 17.8543 12.2413L15.7589 10.146C15.5646 9.95166 15.2477 9.9506 15.051 10.1473ZM13.5476 17.2546L10.7457 14.4526L10.1475 15.0508C9.95084 15.2474 9.9519 15.5644 10.1462 15.7587L12.2415 17.854C12.4359 18.0483 12.7528 18.0494 12.9495 17.8527L13.5476 17.2546Z"
            fill="#212121"
          />
        </svg>
      )}
    </div>
  );
};

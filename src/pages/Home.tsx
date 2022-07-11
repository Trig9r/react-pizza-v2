/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Categories, Sort, Skeleton, PizzaBlock, Pagination, list } from '../components';

import { allCategories } from '../components/Categories';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/filter/slice';
import { fetchPizzas } from '../redux/pizza/asyncActions';
import { FilterSliceState } from '../redux/filter/types';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);
  const [order, setOrder] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setCategoryId(idx));
  }, []);

  const onClickChangeOrder = () => setOrder(!order);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const orderBy = order ? 'asc' : 'desc';
    const category = categoryId > 0 ? String(categoryId) : '';
    const search = searchValue;

    dispatch(
      fetchPizzas({
        sortBy,
        order: orderBy,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage, order]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const paramSort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort: paramSort,
        } as FilterSliceState),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage, order]);

  // Парсим параметры при первом рендере
  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
  //     const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);
  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sort: sort || sortList[0],
  //       }),
  //     );
  //   }
  //   isMounted.current = true;
  // }, []);

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories selectedId={categoryId} onChangeCategory={onChangeCategory} />
        <Sort value={sort} order={order} onClickOrder={onClickChangeOrder} />
      </div>
      <h2 className="content__title">{allCategories[categoryId]}</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка 😕</h2>
          <p>К сожалению, не удалось получить питсы. Попробуйте повторить попытку позже.</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;

//Функция для определения города по ip пользователя
// function getUserCity() {
//   return new Promise((resolve, reject) => {
//     fetch('https://api.ipify.org?format=json')
//       .then((res) => res.json())
//       .then(({ ip }) => {
//         fetch(
//           `https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ip}&token=3ae01bacc93c77630c604e3b30e15860c6741abb`,
//         )
//           .then((res) => res.json())
//           .then((json) => {
//             if (
//               {}.hasOwnProperty.call(json, 'family') &&
//               json.family.toLowerCase().indexOf('err')
//             ) {
//               return reject(json);
//             }
//             const {
//               location: {
//                 data: { city },
//               },
//             } = json;
//             resolve({ city, ip });
//           });
//       });
//   });
// }

// getUserCity()
//   .then(({ city, ip }) => {
//     console.log(city, ip);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { SearchContex } from '../App';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { list } from '../components/Sort';
import { allCategories } from '../components/Categories';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sortItem, currentPage } = useSelector((state) => state.filter);

  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [order, setOrder] = React.useState(false);

  const { searchValue } = React.useContext(SearchContex);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortItem.sortProperty;
  const orderBy = order ? 'asc' : 'desc';
  const search = searchValue ? `&search=${searchValue}` : '';

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, id) => <Skeleton key={id} />);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = async () => {
    setIsLoading(true);

    // axios
    //   .get(
    //     `https://62a381b15bd3609cee6b5708.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderBy}${search}`,
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => setIsLoading(false));

    try {
      const res = await axios.get(
        `https://62a381b15bd3609cee6b5708.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderBy}${search}`,
      );
      setItems(res.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      alert('Ошибка при получении пицц');
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortItem,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortItem, currentPage]);

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortItem.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [category, sortBy, orderBy, search, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories selectedId={categoryId} onClickCategory={onClickCategory} />
        <Sort order={order} onClickOrder={() => setOrder(!order)} />
      </div>
      <h2 className="content__title">{allCategories[categoryId]}</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
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

import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';

const Home = ({ searchValue }) => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [categoryId, setCategoryId] = React.useState(0);
  const [sortItem, setSortItem] = React.useState({ name: 'популярности', sortProperty: 'rating' });
  const [order, setOrder] = React.useState(false);
  const [currentPage, setCurrentPage] = React.useState(1);

  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const sortBy = sortItem.sortProperty;
  const orderBy = order ? 'asc' : 'desc';
  const search = searchValue ? `&search=${searchValue}` : '';

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(8)].map((_, id) => <Skeleton key={id} />);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(
      `https://62a381b15bd3609cee6b5708.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${orderBy}${search}`,
    )
      .then((res) => res.json())
      .then((json) => {
        setItems(json);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [category, sortBy, orderBy, search, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories selectedId={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort
          selectedSort={sortItem}
          onClickSort={(id) => setSortItem(id)}
          order={order}
          onClickOrder={() => setOrder(!order)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};

export default Home;

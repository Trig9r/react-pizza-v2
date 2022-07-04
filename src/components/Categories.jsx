import React from 'react';

export const allCategories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

function Categories({ selectedId, onClickCategory }) {
  return (
    <div className="categories">
      <ul>
        {allCategories.map((item, id) => {
          return (
            <li
              key={id}
              onClick={() => onClickCategory(id)}
              className={id === selectedId ? 'active' : ''}>
              {item}
            </li>
          );
        })}
        {/* <li className="active">Все</li>
        <li>Мясные</li>
        <li>Вегетарианская</li>
        <li>Гриль</li>
        <li>Острые</li>
        <li>Закрытые</li> */}
      </ul>
    </div>
  );
}

export default Categories;

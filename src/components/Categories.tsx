import React from 'react';

export const allCategories = ['Все', 'Мясные', 'Вегетарианские', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  selectedId: number;
  onChangeCategory: (id: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ selectedId, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {allCategories.map((item, id) => {
            return (
              <li
                key={id}
                onClick={() => onChangeCategory(id)}
                className={id === selectedId ? 'active' : ''}>
                {item}
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);

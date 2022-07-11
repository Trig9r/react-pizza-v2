import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchPizza = async () => {
    try {
      const { data } = await axios.get(`https://62a381b15bd3609cee6b5708.mockapi.io/items/${id}`);
      setPizza(data);
    } catch (err) {
      alert('Не удалось загрузить пиццу');
      navigate('/');
    }
  };

  React.useEffect(() => {
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza imageUrl" />
      <h2>{pizza.name}</h2>

      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;

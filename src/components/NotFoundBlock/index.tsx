import React from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = () => (
  <div className={styles.root}>
    <h1>Ничего не найдено по вашему запросу :(</h1>
    <p className={styles.discription}>
      К сожалению, данная страница отсутствует в нашем интернет-магазине
    </p>
  </div>
);

import { CartItem } from '../redux/cart/types';

export const calcTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, currentObj) => sum + currentObj.price * currentObj.count, 0);
};

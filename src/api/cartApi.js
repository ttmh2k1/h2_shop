import * as request from '~/utils/request';
import { endpoints } from '~/utils/request';
//import cookies from 'react-cookies';

export const getCart = async () => {
  try {
    const res = await request.get(endpoints['cart'], {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    return res.data;
  } catch (e) {}
};

export const countCart = async () => {
  try {
    const res = await request.get(endpoints['cart'] + '/quantity', {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    return res.data;
  } catch (e) {}
};

export const addToCart = async (id, quantity) => {
  try {
    const res = await request.post(
      endpoints['cart'] + '/' + id,
      {
        quantity: quantity,
      },

      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      },
    );
    return res.success;
  } catch (e) {}
};

export const removeCart = async (id) => {
  try {
    const res = await request.rqdelete(endpoints['cart'] + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        accept: '*/*',
      },
    });
    return res.success;
  } catch (e) {}
};

export const updateCart = async (id, quantity) => {
  try {
    const res = await request.put(
      endpoints['cart'] + '/' + id,
      {
        quantity: quantity,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          accept: '*/*',
        },
      },
    );
    return res.success;
  } catch (e) {}
};

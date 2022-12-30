import * as request from '~/utils/request';
import { endpoints } from '~/utils/request';

export const getProduct = async (obj = {}) => {
  try {
    const res = await request.get(endpoints['getProduct'], {
      params: {
        ...obj,
      },
    });
    return res.data;
  } catch (e) {
    return false;
  }
};

export const getBestSeller = async () => {
  try {
    const res = await request.get(endpoints['getBestSeller']);
    return res.data;
  } catch (e) {
    return false;
  }
};

export const getOnSale = async () => {
  try {
    const res = await request.get(endpoints['onSale']);
    return res.data;
  } catch (e) {
    return false;
  }
};

export const getBestView = async () => {
  try {
    const res = await request.get(endpoints['getBestView']);
    return res.data;
  } catch (e) {
    return false;
  }
};

export const getNewArrival = async () => {
  try {
    const res = await request.get(endpoints['getNewArrival']);
    return res.data;
  } catch (e) {
    return false;
  }
};

export const getProductById = async (id) => {
  try {
    const res = await request.get(endpoints['getProduct'] + '/' + id);
    return res.data;
  } catch (e) {
    return false;
  }
};

export const getProductReview = async (id) => {
  try {
    const res = await request.get('product/' + id + '/review');
    return res.data;
  } catch (e) {
    return false;
  }
};

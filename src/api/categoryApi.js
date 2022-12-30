import * as request from '~/utils/request';
import { endpoints } from '~/utils/request';

export const getCategories = async () => {
  try {
    const res = await request.get(endpoints['getCategories'], {});
    return res.data;
  } catch (e) {
    return false;
  }
};

export const getCategoryById = async (id) => {
  try {
    const res = await request.get(endpoints['getCategories'] + '/' + id, {});
    return res.data;
  } catch (e) {
    return false;
  }
};

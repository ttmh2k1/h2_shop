import * as request from '~/utils/request';
import { endpoints } from '~/utils/request';

export const getNotify = async () => {
  try {
    const res = await request.get(endpoints['notify'], {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });
    return res.data;
  } catch (e) {}
};

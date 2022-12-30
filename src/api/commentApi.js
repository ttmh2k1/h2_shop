import * as request from '~/utils/request';
import { endpoints } from '~/utils/request';

export const postComment = async (data) => {
  try {
    let res = await request.post(endpoints['comment'], data, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
        'Content-Type': 'multipart/form-data',
      },
    });

    return res.data;
  } catch (e) {
    return false;
  }
};

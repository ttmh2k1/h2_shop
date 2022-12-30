import * as request from '~/utils/request';
import { endpoints } from '~/utils/request';
//import cookies from 'react-cookies';

export const getAddress = async () => {
  try {
    const res = await request.get(endpoints['address'], {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    return res.data;
  } catch (e) {}
};

export const getAddressById = async (id) => {
  try {
    const res = await request.get(endpoints['address'] + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    return res.data;
  } catch (e) {}
};

export const addAddress = async (obj = {}) => {
  try {
    const res = await request.post(endpoints['address'], obj, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    return res.data;
  } catch (e) {}
};

export const updateAddress = async (id, obj = {}) => {
  try {
    const res = await request.put(endpoints['address'] + '/' + id, obj, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    return res.data;
  } catch (e) {}
};

export const deleteAddress = async (id) => {
  try {
    const res = await request.rqdelete(endpoints['address'] + '/' + id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    return res.success;
  } catch (e) {}
};

export const getAllCity = async () => {
  try {
    const res = await request.get(endpoints['sourceAddress']);

    return res.data;
  } catch (e) {}
};

export const getDistrictOfCity = async (id) => {
  try {
    const res = await request.get(
      endpoints['sourceAddress'] + '/province-city/' + id,
    );

    return res.data;
  } catch (e) {}
};

export const getWardOfDistrict = async (id) => {
  try {
    const res = await request.get(
      endpoints['sourceAddress'] + '/district/' + id,
    );

    return res.data;
  } catch (e) {}
};

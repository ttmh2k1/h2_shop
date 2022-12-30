import * as request from '~/utils/request';
// import request from '~/utils/request';
import { endpoints } from '~/utils/request';
//import cookies from 'react-cookies';

export const currentUser = async () => {
  try {
    const res = await request.get(endpoints['getUser'], {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    });

    return res.data;
  } catch (e) {}
};

export const currentEmailOTP = async () => {
  try {
    const res = await request.post(
      endpoints['currentEmailOTP'],
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      },
    );
    return res.success;
  } catch (e) {}
};

export const currentPhoneOTP = async () => {
  try {
    const res = await request.post(
      endpoints['currentPhoneOTP'],
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      },
    );
    return res.success;
  } catch (e) {}
};

export const login = async (username, password) => {
  try {
    let res = await request.post(endpoints['login'], {
      loginKey: username,
      password: password,
    });

    return res;
  } catch (e) {
    return false;
  }
};

export const register = async (fullname, username, password, email, gender) => {
  try {
    let res = await request.post(
      endpoints['register'],
      {
        fullname: fullname,
        username: username,
        password: password,
        email: email,
        gender: gender,
      },
      {
        headers: {
          Accept: '*/*',
          'Content-Type': 'application/json; charset=utf8',
        },
      },
    );

    return res.success;
  } catch (e) {
    return false;
  }
};

export const emailOTP = async (email) => {
  try {
    let res = await request.post(
      endpoints['emailOTP'],
      {
        email: email,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return res.success;
  } catch (e) {
    return false;
  }
};
export const phoneOTP = async (phone) => {
  try {
    let res = await request.post(
      endpoints['phoneOTP'],
      {
        phoneNumber: phone,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );
    return res.success;
  } catch (e) {
    return false;
  }
};

export const resetPassword = async (email, phone, newPassword, otp) => {
  try {
    let res = await request.post(
      endpoints['resetPassword'],
      {
        email: email,
        phone: phone,
        newPassword: newPassword,
        otp: otp,
      },
      {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json',
        },
      },
    );

    return res.success;
  } catch (e) {
    return false;
  }
};

export const updateProfile = async (data) => {
  try {
    let res = await request.put(endpoints['updateProfile'], data, {
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

export const changePassword = async (newPassword, oldPassword, otp) => {
  try {
    let res = await request.put(
      endpoints['updateProfile'] + '/password',
      {
        newPassword: newPassword,
        oldPassword: oldPassword,
        otp: otp,
      },
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      },
    );

    return res.success;
  } catch (e) {
    return false;
  }
};

export const confirmPhone = async (otp) => {
  try {
    let res = await request.post(
      endpoints['updateProfile'] + '/phone-confirm',
      {
        otp: otp,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),

          'Content-Type': 'application/json',
        },
      },
    );

    return res.data;
  } catch (e) {
    return false;
  }
};

export const confirmEmail = async (otp) => {
  try {
    let res = await request.post(
      endpoints['updateProfile'] + '/email-confirm',
      {
        otp: otp,
      },
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),

          'Content-Type': 'application/json',
        },
      },
    );
    return res.data;
  } catch (e) {
    return false;
  }
};

import React from 'react';
import Button from '~/components/Button';
import Radio from '~/components/Radio';
import Phone from '~/commons/assets/phone.png';
import Mail from '~/commons/assets/mail.png';
import { useNavigate } from 'react-router-dom';
import { logout } from '~/ActionCreators/UserCreator';
import Input from '~/components/Input';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as userAPI from '~/api/userApi';
import classNames from 'classnames/bind';
import styles from './ChangePassword.module.scss';
import swal from 'sweetalert';
//import cookies from 'react-cookies';

const cx = classNames.bind(styles);

function ChangePasswordComponent() {
  const user = useSelector((state) => state.user.user);
  const email = user.email;
  const phone = user.phone;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    {
      id: 1,
      name: 'OTP to phone number ' + phone,
      image: Phone,
    },
    {
      id: 2,
      name: 'OTP to email ' + email,
      image: Mail,
    },
  ];
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [select, setSelect] = useState(0);
  const [otp, setOtp] = useState('');

  const sendOTP = async (e) => {
    e.preventDefault();
    const emailOTP = async () => {
      const result = await userAPI.emailOTP(email);

      if (result) {
        swal('OTP was sended!', 'Let submit OTP code!', 'success');
      } else {
        swal('Connect failed!', 'Please try again!', 'error');
      }
    };
    const phoneOTP = async () => {
      const result = await userAPI.phoneOTP(phone);

      if (result) {
        swal('OTP was sended!', 'Let submit OTP code!', 'success');
      } else {
        swal('Connect failed!', 'Please try again!', 'error');
      }
    };

    if (select === 0) {
      phoneOTP();
    } else {
      emailOTP();
    }
  };
  const changePassword = async () => {
    const result = await userAPI.changePassword(newPassword, oldPassword, otp);

    return result;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if ((user.password && oldPassword === user.password) || !user.password) {
      if (confirm === newPassword && newPassword.length > 7) {
        if (changePassword()) {
          swal('Change password successful!', 'Please login again', 'success');
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          dispatch(logout());

          navigate('/login');
        } else {
          swal('Change password failed!', 'Please try again', 'error');
        }
      } else {
        swal(
          'Password no match!',
          'NOTE: PASSWORD AT LEAST 8 CHARACTER',
          'error',
        );
      }
    } else {
      swal('Old password is incorrect!', 'Please try again', 'error');
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('title')}>
          <span>Change Password</span>
        </div>
        <div className={cx('content')}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={cx('form-item')}>
              <span className={cx('label')}>Old password</span>
              {user.password ? (
                <Input
                  type="password"
                  className={cx('input')}
                  placeholder="Old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              ) : (
                <span>You don't have password, don't need!</span>
              )}
            </div>
            <div className={cx('form-item')}>
              <span className={cx('label')}>New password</span>
              <Input
                type="password"
                className={cx('input')}
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className={cx('form-item')}>
              <span className={cx('label')}>Confirm password</span>
              <Input
                type="password"
                className={cx('input')}
                placeholder="Confirm password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            <div className={cx('verify')}>
              {options.map((item, index) => {
                return (
                  <div key={index}>
                    <Radio
                      obj={item}
                      checked={select === index}
                      onChange={() => setSelect(index)}
                      className={cx('radio')}
                    />
                  </div>
                );
              })}

              <div className={cx('OTP')}>
                <Input
                  type="text"
                  placeholder="OTP code"
                  className={cx('input')}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
                <Button
                  primary
                  children={'SEND OTP'}
                  className={cx('btn')}
                  onClick={(e) => sendOTP(e)}
                />
              </div>
            </div>
            <div className={cx('save')}>
              <Button primary children={'SAVE'} className={cx('btn-save')} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordComponent;

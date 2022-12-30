import React from 'react';
import Button from '~/components/Button';
import Input from '~/components/Input';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import cookies from 'react-cookies';
import { login } from '~/ActionCreators/UserCreator';
import * as userAPI from '~/api/userApi';
import classNames from 'classnames/bind';
import styles from './Email.module.scss';
import swal from 'sweetalert';

const cx = classNames.bind(styles);

function EmailComponent() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState(user.email);

  const [otp, setOtp] = useState('');

  const confirmEmail = async () => {
    const result = await userAPI.confirmEmail(otp);

    if (result) {
      swal('Successful!!', '', 'success');
      localStorage.removeItem('user');

      localStorage.setItem('user', result);

      dispatch(login(result));
      //navigate(0);
    } else {
      swal('Failed!!', '', 'error');
    }
  };

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
    emailOTP();
  };

  useEffect(() => {
    if (!user.email) {
      swal("Don't have email", 'please submit that!', 'warning');
      navigate('/email');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmEmail();
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('title')}>
          <span>Email Confirm</span>
        </div>
        <div className={cx('content')}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className={cx('form-item')}>
              <span className={cx('label')}>Email</span>
              <div className={cx('value')}>
                {' '}
                <span>{email}</span>
              </div>
            </div>
            {user.emailConfirmed ? (
              <div className={cx('notify')}>
                {' '}
                <span>Email was confirmed</span>
              </div>
            ) : (
              <div>
                <div className={cx('verify')}>
                  <div className={cx('OTP')}>
                    <Input
                      type="text"
                      placeholder="OTP code"
                      className={cx('input')}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
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
                  <Button
                    primary
                    children={'CONFIRM'}
                    className={cx('btn-save')}
                  />
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmailComponent;

import Form from '~/Layout/components/Form';
import Input from '~/components/Input';
import Radio from '~/components/Radio';
import Button from '~/components/Button';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Verify.module.scss';

import { verify } from '~/ActionCreators/UserCreator';
import { useNavigate } from 'react-router-dom';
//import cookies from 'react-cookies';
import * as userAPI from '~/api/userApi';
import swal from 'sweetalert';

const cx = classNames.bind(styles);

function VerifyComponent() {
  const email = useSelector((state) => state.user.email);
  const phone = useSelector((state) => state.user.phone);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!email && !phone) {
      swal('Please submit your phone or email!', 'Clicked ok!', 'warning');
      navigate('/forgot-password');
    }
  }, []);

  let options = [];
  if (email) {
    options = [
      ...options,
      {
        id: 1,
        name: 'OTP to email ' + email,
      },
    ];
  }

  if (phone) {
    options = [
      ...options,
      {
        id: 2,
        name: 'OTP to number ' + phone,
      },
    ];
  }

  const [select, setSelect] = useState(options[0].id);
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

      return result;
    };
    const phoneOTP = async () => {
      const result = await userAPI.phoneOTP(phone);

      if (result) {
        swal('OTP was sended!', 'Let submit OTP code!', 'success');
      } else {
        swal('Connect failed!', 'Please try again!', 'error');
      }
    };

    if (select === 1) {
      emailOTP();
    } else {
      phoneOTP();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('otp', otp);
    dispatch(verify(otp));
    navigate('/reset-password');
  };

  const goBack = (e) => {
    e.preventDefault();
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    navigate('/login');
  };
  return (
    <Form
      title="Verify"
      height="35rem"
      titleSize="3.2rem"
      onSubmit={(e) => handleSubmit(e)}
    >
      <div className={cx('content')}>
        {options.map((item, index) => {
          return (
            <div key={index}>
              <Radio
                obj={item}
                checked={select === item.id}
                onChange={() => setSelect(item.id)}
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
            required={true}
            maxLength={6}
          />
          <Button
            primary
            children={'SEND OTP'}
            className={cx('btn')}
            onClick={(e) => sendOTP(e)}
          />
        </div>

        <div className={cx('bottom')}>
          <Button primary children="SUBMIT" rounded large />
          <div
            style={{ with: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              text
              onClick={(e) => goBack(e)}
              children="Go back to sign in"
              style={{ color: '#000' }}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}

export default VerifyComponent;

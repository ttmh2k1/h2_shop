import Form from '~/Layout/components/Form';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { useState } from 'react';
import * as userAPI from '~/api/userApi';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const cx = classNames.bind(styles);

function RegisterComponent() {
  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('MALE');
  const navigate = useNavigate();

  const register = async (e) => {
    e.preventDefault();

    const registerUser = async () => {
      const result = await userAPI.register(
        fullname,
        username,
        password,
        email,
        gender,
      );

      if (result) {
        swal('Register Successful!', 'Go to Login', 'success');
        navigate('/login');
      } else {
        swal('Failed Register!', 'Try a again', 'error');
      }
    };

    if (confirm === password) {
      registerUser();
    } else {
      swal('Confirm password fail!', 'Try a again', 'error');
    }
  };

  return (
    <Form title="SIGN UP" height="58rem" onSubmit={(e) => register(e)}>
      <div className={cx('wrapper')}>
        <Input
          type="text"
          placeholder="Fullname"
          value={fullname}
          className={cx('input')}
          onChange={(e) => setFullname(e.target.value)}
          required={true}
          maxLength={45}
        />
        <Input
          type="text"
          placeholder="Username"
          value={username}
          className={cx('input')}
          onChange={(e) => setUsername(e.target.value)}
          required={true}
          maxLength={45}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          className={cx('input')}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          maxLength={40}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          className={cx('input')}
          onChange={(e) => setConfirm(e.target.value)}
          required={true}
          maxLength={40}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          className={cx('input')}
          onChange={(e) => setEmail(e.target.value)}
          required={true}
          maxLength={50}
        />

        <div className={cx('radio-gender')}>
          <span className={cx('title')}>Gender</span>
          <div className={cx('radio-item')}>
            <input
              type="radio"
              name="gender"
              value="MALE"
              checked={gender === 'MALE' && 'checked'}
              onChange={(e) => setGender(e.target.value)}
            />
            <span>Male</span>
          </div>
          <div className={cx('radio-item')}>
            <input
              type="radio"
              name="gender"
              value="FEMALE"
              checked={gender === 'FEMALE' && 'checked'}
              onChange={(e) => setGender(e.target.value)}
            />
            <span>Female</span>
          </div>
        </div>

        <div className={cx('bottom')}>
          <Button
            primary
            children="SIGN UP"
            rounded
            large
            className={cx('btn-sign-up')}
          />
          <div className={cx('sign-in')}>
            <Button
              text
              href="/login"
              children="Have a account? Sign in"
              style={{ color: '#000' }}
              className={cx('btn-sign-in')}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}

export default RegisterComponent;

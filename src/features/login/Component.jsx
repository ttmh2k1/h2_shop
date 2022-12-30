import { useState, useEffect } from 'react';
import { login as loginAction } from '~/ActionCreators/UserCreator';
//import cookies from 'react-cookies';
import Form from '~/Layout/components/Form';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import * as userAPI from '~/api/userApi';
import swal from 'sweetalert';

const cx = classNames.bind(styles);

function LoginComponent() {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get('token');

  const getUser = async () => {
    const result = await userAPI.currentUser();
    if (result) {
      swal('Login Success!', 'Click oke!', 'success');
      localStorage.setItem('user', result);
      dispatch(loginAction({ user: result, token: token }));
    } else {
      swal('Failed Login!', 'Try again!', 'error');
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      getUser();
      swal('Login Success!', 'Click oke!', 'success');
      navigate('/');
    }
    return () => {};
  }, []);

  const login = async (e) => {
    e.preventDefault();

    const result = await userAPI.login(username, password);
    if (result) {
      swal('Login Success!', 'Click oke!', 'success');
      localStorage.setItem('token', result.token);
      localStorage.setItem('user', result.userInfo);

      dispatch(loginAction({ user: result.userInfo, token: result.token }));
      navigate('/');
    } else {
      swal('Failed Login!', 'Try again!', 'error');
    }
  };

  return (
    <Form title="SIGN IN" height="46rem" onSubmit={(e) => login(e)}>
      <div className={cx('content')}>
        <Input
          type="text"
          placeholder="Username, or phone, or email"
          value={username}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          required={true}
          maxLength={45}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required={true}
          maxLength={40}
        />
        <div className={cx('under-content')}>
          <div className={cx('checkbox')}>
            <input type="checkbox" /> <span>Remember account</span>
          </div>
          <Button
            text
            href="/forgot-password"
            children="Forgot password"
            style={{ color: '#000' }}
            className={cx('btn-forgot')}
          />
        </div>
        <div className={cx('btn')}>
          <Button
            primary
            children="SIGN IN"
            rounded
            large
            // onClick={(e) => login(e)}
          />
          <div className={cx('sign-up')}>
            <Button
              text
              href="/register"
              children="Create a account? Sign up"
              style={{ color: '#000' }}
            />
          </div>

          <Button
            primary
            href="http://localhost:8080/oauth2/authorization/google"
            children="SIGN IN WITH GOOGLE"
            leftIcon={
              <FontAwesomeIcon
                icon={faGooglePlusG}
                className={cx('icon-google')}
              />
            }
            className={cx('btn-google')}
            large
          />
        </div>
      </div>
    </Form>
  );
}

export default LoginComponent;

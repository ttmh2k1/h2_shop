import { useState } from 'react';
import Form from '~/Layout/components/Form';
import Input from '~/components/Input';
import Button from '~/components/Button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { resetPassword } from '~/ActionCreators/UserCreator';
import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import swal from 'sweetalert';
//import cookies from 'react-cookies';

const cx = classNames.bind(styles);

function ForgotComponent() {
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email || phone) {
      localStorage.setItem('email', email);
      localStorage.setItem('phone', phone);
      dispatch(resetPassword(email, phone));
      navigate('/verify');
    } else {
      swal(
        'Email and Phone is empty!',
        'Please enter email or phone',
        'warning',
      );
    }
  };

  return (
    <Form
      title="FORGOT PASSWORD"
      height="34rem"
      titleSize="3.2rem"
      onSubmit={(e) => handleSubmit(e)}
      className={cx('form')}
    >
      <div
        className={cx('form-content')}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.2rem',
          marginTop: '2rem',
        }}
      >
        <Input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={cx('input')}
          maxLength={10}
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={cx('input')}
          maxLength={45}
        />

        <div style={{ marginTop: '2rem' }} className={cx('bottom')}>
          <Button primary children="VERIFY" rounded large />
          <div
            style={{ with: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Button
              text
              href="/login"
              children="Go back to sign in"
              style={{ color: '#000' }}
            />
          </div>
        </div>
      </div>
    </Form>
  );
}

export default ForgotComponent;

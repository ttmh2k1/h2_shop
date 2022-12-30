import Form from '~/Layout/components/Form';
import Input from '~/components/Input';
import Button from '~/components/Button';
//import cookies from 'react-cookies';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as userAPI from '~/api/userApi';
import swal from 'sweetalert';

function ResetPasswordComponent() {
  const navigate = useNavigate();
  const email = useSelector((state) => state.user.email);
  const phone = useSelector((state) => state.user.phone);
  const otp = useSelector((state) => state.user.otp);

  useEffect(() => {
    if (!otp) {
      swal('Please submit OTP', 'Clicked ok!', 'warning');
      navigate('/verify');
    }
  }, []);

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const resetPassword = (e) => {
    e.preventDefault();

    const reset = async () => {
      const result = await userAPI.resetPassword(email, phone, password, otp);

      localStorage.removeItem('email', email);
      localStorage.removeItem('phone', phone);
      localStorage.removeItem('otp', otp);

      if (result) {
        swal('Reset password successful!', 'Go to Login', 'success');
        navigate('/login');
      } else {
        swal('Failed!', 'Try again', 'error');
      }
    };

    if (password === confirm) {
      reset();
    } else {
      swal("Password doesn't match!", 'Please try again!', 'error');
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    localStorage.removeItem('email');
    localStorage.removeItem('phone');
    localStorage.removeItem('otp');
    navigate('/login');
  };
  return (
    <Form
      title="RESET PASSWORD"
      height="34rem"
      titleSize="3.2rem"
      onSubmit={(e) => resetPassword(e)}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.6rem',
          marginTop: '2rem',
        }}
      >
        <Input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={true}
          maxLength={45}
        />
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required={true}
          maxLength={45}
        />

        <div style={{ marginTop: '2rem' }}>
          <Button primary children="SAVE" rounded large />
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

export default ResetPasswordComponent;

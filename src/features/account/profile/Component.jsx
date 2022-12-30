import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  update as upadateUSer,
  logout as logoutUser,
} from '~/ActionCreators/UserCreator';
import Button from '~/components/Button';
import Input from '~/components/Input';
import * as userAPI from '~/api/userApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import DefaultAvatar from '~/commons/assets/default-avt.png';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import swal from 'sweetalert';
//import cookies from 'react-cookies';

const cx = classNames.bind(styles);

function ProfileComponent() {
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullname, setFullname] = useState(user.fullname);
  const [username, setUsername] = useState(user.username);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [gender, setGender] = useState(user.gender);
  const [birthday, setBirthday] = useState(
    user.dob ? user.dob.split(' ')[0] : '2022-01-01',
  );
  const [avatar, setAvatar] = useState(user.avatar);
  const [avatarFile, setAvatarFile] = useState();
  const [otp, setOtp] = useState('');

  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editPhone, setEditPhone] = useState(false);

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);

    setAvatar(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      avatar && URL.revokeObjectURL(avatar);
    };
  }, [avatar]);

  useEffect(() => {
    setFullname(user.fullname);
    setUsername(user.username);
    setPhone(user.phone);
    setEmail(user.email);
    setGender(user.gender);
    setBirthday(user.dob ? user.dob.split(' ')[0] : '2022-01-01');
    setAvatar(user.avatar);
  }, [user]);

  const sendOTP = async (e) => {
    e.preventDefault();
    const emailOTP = async () => {
      const result = await userAPI.currentEmailOTP();

      if (result) {
        swal('OTP was sended!', 'Let submit OTP code!', 'success');
      } else {
        swal('Connect email failed!', 'Please try again!', 'error');
      }
    };
    const phoneOTP = async () => {
      const result = await userAPI.currentPhoneOTP();

      if (result) {
        swal('OTP was sended!', 'Let submit OTP code!', 'success');
      } else {
        swal('Connect phone failed!', 'Please try again!', 'error');
      }
    };

    if (editEmail && email !== user.email) {
      phoneOTP();
    } else if (editPhone && phone !== user.phone) {
      emailOTP();
    } else {
      swal(
        "Can't send OTP when you don't update email or phone",
        'You can change profile without OTP!',
        'warning',
      );
    }
  };

  const updateProfile = (e) => {
    e.preventDefault();

    const update = async () => {
      const obj = {
        fullname: fullname,
        username: username,
        email: email !== user.email ? email : null,
        phone: phone !== user.phone ? phone : null,
        gender: gender,
        dob: birthday,
        otp: otp,
      };
      const json = JSON.stringify(obj);
      const blob = new Blob([json], {
        type: 'application/json',
      });
      const data = new FormData();
      data.append('info', blob);
      if (avatarFile) {
        data.append('avatar', avatarFile);
      }
      // data.append("avatar", avatar); // file avatar nếu có k thì k có dòng này

      const result = await userAPI.updateProfile(data);

      if (result) {
        if (user.username === username) {
          localStorage.removeItem('user');

          const userRs = { ...result };

          localStorage.setItem('user', userRs);

          dispatch(upadateUSer(userRs));
          swal('Change profile successful!!', '', 'success');
          setEditUsername(false);
          setEditPhone(false);
          setEditEmail(false);
        } else {
          dispatch(logoutUser());
          swal(
            'Change profile successful!!',
            'Your username is changed, please login again!',
            'success',
          );
          localStorage.clear();
          navigate('/login');
        }
        // navigate(0);
      } else {
        swal('Failed!!', '', 'error');
      }
    };

    update();
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('title')}>
          <span>Individual Information</span>
        </div>
        <div className={cx('content')}>
          <div className={cx('avatar', 'left')}>
            <img src={avatar ? avatar : DefaultAvatar} alt="" />
            <div className={cx('upload')}>
              <input type="file" onChange={handlePreviewAvatar} />
            </div>
          </div>
          <div className={cx('profile')}>
            <form onSubmit={(e) => updateProfile(e)}>
              <div className={cx('form-item')}>
                <span className={cx('label')}>Username</span>
                {editUsername ? (
                  <Input
                    type={'text'}
                    placeholder={'Username'}
                    className={cx('input')}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  <span className={cx('username')}>{username}</span>
                )}
                {/* {!editUsername && (
                  <FontAwesomeIcon
                    icon={faPen}
                    className={cx('icon')}
                    onClick={() => setEditUsername(true)}
                  />
                )} */}
              </div>
              <div className={cx('form-item')}>
                <span className={cx('label')}>Full name</span>
                <Input
                  type={'text'}
                  placeholder={'Full name'}
                  className={cx('input')}
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  maxLength={45}
                />
              </div>
              <div className={cx('form-item')}>
                <span className={cx('label')}>Email</span>
                {editEmail ? (
                  <Input
                    type={'email'}
                    placeholder={'Email'}
                    className={cx('input')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    maxLength={50}
                  />
                ) : (
                  <span className={cx('username')}>{email}</span>
                )}
                {!editEmail && (
                  <FontAwesomeIcon
                    icon={faPen}
                    className={cx('icon')}
                    onClick={() =>
                      setEditEmail(() => {
                        if (!phone) {
                          swal(
                            "Can't change Email!",
                            'Please add a phone!',
                            'warning',
                          );
                          return false;
                        } else if (editPhone) {
                          swal(
                            "Can't change Email!",
                            'Only change email or phone!',
                            'warning',
                          );
                          return false;
                        }
                        return true;
                      })
                    }
                  />
                )}
              </div>
              <div className={cx('form-item')}>
                <span className={cx('label')}>Phone number</span>
                {editPhone ? (
                  <Input
                    value={phone ? phone : ''}
                    onChange={(e) => setPhone(e.target.value)}
                    type={'text'}
                    placeholder={'Phone number'}
                    className={cx('input')}
                    maxLength={10}
                  />
                ) : (
                  <span className={cx('username')}>{phone}</span>
                )}
                {!editPhone && (
                  <FontAwesomeIcon
                    icon={faPen}
                    className={cx('icon')}
                    onClick={() =>
                      setEditPhone(() => {
                        if (editEmail === true) {
                          swal(
                            "Can't change Phone!",
                            'Only change email or phone!',
                            'warning',
                          );
                          return false;
                        }

                        return true;
                      })
                    }
                  />
                )}
              </div>
              <div className={cx('form-item')}>
                <span className={cx('label')}>Gender</span>
                <div className={cx('radio-gender')}>
                  <input
                    name={'gender'}
                    id={'male'}
                    value={'MALE'}
                    type={'radio'}
                    checked={gender === 'MALE' && true}
                    onChange={(e) => setGender(e.target.value)}
                    className={cx('input')}
                  />
                  <span className={cx('radio-label')}>Male</span>
                </div>
                <div className={cx('radio-gender')}>
                  <input
                    name={'gender'}
                    id={'female'}
                    value={'FEMALE'}
                    type={'radio'}
                    checked={gender === 'FEMALE' && true}
                    onChange={(e) => setGender(e.target.value)}
                    className={cx('input')}
                  />
                  <span className={cx('radio-label')}>Female</span>
                </div>
              </div>
              <div className={cx('form-item')}>
                <span className={cx('label')}>Birthday</span>
                <Input
                  type={'date'}
                  value={birthday ? birthday : '2001-01-01'}
                  onChange={(e) => setBirthday(e.target.value)}
                  className={cx('input')}
                />
              </div>

              {(editPhone || editEmail) && (
                <div className={cx('verify')}>
                  <Input
                    type="text"
                    placeholder="OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className={cx('input')}
                    maxLength={6}
                  />
                  <Button
                    className={cx('btn')}
                    onClick={(e) => sendOTP(e)}
                    primary
                    children="SEND OTP"
                  />
                </div>
              )}

              <div className={cx('save')}>
                <Button primary children={'SAVE'} className={cx('btn-save')} />
              </div>
            </form>
          </div>
          <div className={cx('avatar', 'right')}>
            <img src={avatar ? avatar : DefaultAvatar} alt="" />
            <div className={cx('upload')}>
              <input type="file" onChange={handlePreviewAvatar} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;

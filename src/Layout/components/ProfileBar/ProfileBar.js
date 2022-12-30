import { useState } from 'react';
import { Link } from 'react-router-dom';
import DefaultAvatar from '~/commons/assets/default-avt.png';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faFileText,
  faMessage,
} from '@fortawesome/free-regular-svg-icons';

import classNames from 'classnames/bind';
import styles from './ProfileBar.module.scss';

const cx = classNames.bind(styles);

function ProfileBar() {
  const [state, setState] = useState(false);
  const user = useSelector((state) => state.user.user);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('account')}>
          <img
            className={cx('avt')}
            src={user.avatar ? user.avatar : DefaultAvatar}
            alt=""
          />
          <span className={cx('user-name')}>{user.fullname}</span>
        </div>
        <div className={cx('content')}>
          <ul className={cx('list-active')}>
            <li
              className={cx('active-item', 'sub-item')}
              style={{ height: state ? '22rem' : '3rem' }}
            >
              <FontAwesomeIcon
                icon={faAddressCard}
                className={cx('icon')}
                onClick={() => setState(!state)}
              />
              <div className={cx('account-active')}>
                <span
                  className={cx('active-name')}
                  onClick={() => setState(!state)}
                >
                  Account
                </span>
                <div className={cx('profile-list-active')}>
                  <Link to="/profile">
                    <span className={cx('active-name', 'active-sub')}>
                      Profile
                    </span>
                  </Link>
                  <Link to="/phone">
                    <span className={cx('active-name', 'active-sub')}>
                      Phone
                    </span>
                  </Link>
                  <Link to="/email">
                    <span className={cx('active-name', 'active-sub')}>
                      Email
                    </span>
                  </Link>
                  <Link to="/address">
                    <span className={cx('active-name', 'active-sub')}>
                      Address
                    </span>
                  </Link>
                  <Link to="/change-password">
                    <span className={cx('active-name', 'active-sub')}>
                      Change Password
                    </span>
                  </Link>
                </div>
              </div>
            </li>
            <li>
              <Link to="/history-order" className={cx('active-item')}>
                <FontAwesomeIcon icon={faFileText} className={cx('icon')} />
                <span className={cx('active-name')}>History Order</span>
              </Link>
            </li>
            <li>
              <Link to="/notify" className={cx('active-item')}>
                <FontAwesomeIcon icon={faMessage} className={cx('icon')} />
                <span className={cx('active-name')}>Notify</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ProfileBar;

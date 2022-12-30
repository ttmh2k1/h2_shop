import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCount } from '~/ActionCreators/CartCreator';
import { update } from '~/ActionCreators/UserCreator';
import logo from '~/commons/assets/logo.png';
import { Link } from 'react-router-dom';
import AccountMenu from './AccountMenu';
import Button from '~/components/Button';
import Input from '~/components/Input';
import DefaultAvatar from '~/commons/assets/default-avt.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faCartShopping,
  faBell,
} from '@fortawesome/free-solid-svg-icons';
import '~/styles/grid/grid.css';
import * as cartAPI from '~/api/cartApi';
import * as userAPI from '~/api/userApi';
import classNames from 'classnames/bind';
import styles from './HeaderTop.module.scss';

const cx = classNames.bind(styles);

function HeaderTop() {
  const dispatch = useDispatch();

  const [state, setState] = useState(false);
  const [text, setText] = useState('');
  const count = useSelector((state) => state.cart.count);
  const account = useSelector((state) => state.user.user);

  const countCart = async () => {
    const result = await cartAPI.countCart();
    if (result) {
      dispatch(updateCount(result));
    }
  };

  const getUser = async () => {
    if (localStorage.getItem('token')) {
      const user = await userAPI.currentUser();
      if (user) {
        dispatch(update(user));
      }
    }
  };

  useEffect(() => {
    countCart();
    getUser();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <Link to="/" className={cx('logo')}>
          <img src={logo} alt="" />
        </Link>
        <div className={cx('search')}>
          <form action="/search" method="">
            <Input
              type="text"
              name="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Search product"
              className={cx('input-search')}
            />
            <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon')} />
          </form>
        </div>
        <div className={cx('account')}>
          <Link to={'/cart'} className={cx('cart')}>
            <FontAwesomeIcon
              icon={faCartShopping}
              className={cx('icon-cart')}
            />
            {count > 0 && (
              <div className={cx('border')}>
                <span className={cx('count')}> {count}</span>
              </div>
            )}
          </Link>
          <Link to={'/notify'}>
            <FontAwesomeIcon icon={faBell} className={cx('icon-bell')} />
          </Link>
          {account ? (
            <div
              className={cx('log-in-active')}
              onClick={() => {
                setState(!state);
              }}
            >
              <img
                src={account.avatar ? account.avatar : DefaultAvatar}
                alt=""
                className={cx('avatar')}
              />

              <AccountMenu className={state ? cx('menu') : cx('menu-hidden')} />
            </div>
          ) : (
            <div className={cx('log-in')}>
              <Button
                href="/login"
                text={true}
                children="SIGN IN"
                className={cx('sign-in')}
              ></Button>
              <Button
                href="/register"
                rounded
                primary
                children="SIGN UP"
                className={cx('sign-up')}
              ></Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;

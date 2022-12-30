import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateShowModal } from '~/ActionCreators/DisplayCreator';
import Header from '~/Layout/components/Header';
import Footer from '~/Layout/components/Footer';
import ProfileBar from '~/Layout/components/ProfileBar';
import ProfileBarFixed from '~/Layout/components/ProfileBarFixed';
import classNames from 'classnames/bind';
import styles from './AccountLayout.module.scss';

const cx = classNames.bind(styles);

function AccountLayout({ children }) {
  const showModal = useSelector((state) => state.display.showModal);
  const dispatch = useDispatch();

  useEffect(() => {
    const html = document.querySelector('html');
    html.style.overflow = showModal ? 'hidden' : 'auto';
  }, [showModal]);

  return (
    <div className={cx('wrapper')}>
      <div
        onClick={() => {
          dispatch(updateShowModal(false));
        }}
        className={showModal ? cx('blur') : cx('blur', 'hidden')}
      ></div>
      <div className={cx('header')}>
        <Header />
      </div>

      <div className={cx('container')}>
        <div className={cx('profile-menu')}>
          <ProfileBar />
        </div>
        <div className={cx('profile-menu-fixed')}>
          <ProfileBarFixed />
        </div>
        <div className={cx('content')}> {children}</div>
      </div>

      <div className={cx('footer')}>
        <Footer />
      </div>
    </div>
  );
}

export default AccountLayout;

import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import HeaderTop from './HeaderTop';
import Navbar from './Navbar';

const cx = classNames.bind(styles);
const Header = () => {
  return (
    <div className={cx('wrapper')}>
      <HeaderTop />
      <Navbar />
    </div>
  );
};

export default Header;

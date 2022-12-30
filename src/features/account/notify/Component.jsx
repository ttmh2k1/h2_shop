import React from 'react';
import ListNotify from '~/Layout/components/ListNotify';
import classNames from 'classnames/bind';
import styles from './Notify.module.scss';

const cx = classNames.bind(styles);

function NotifyComponent() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <ListNotify />
      </div>
    </div>
  );
}

export default NotifyComponent;

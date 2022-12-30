import React from 'react';
import classNames from 'classnames/bind';
import styles from './FormPayment.module.scss';
const cx = classNames.bind(styles);
const FormPayment = ({
  title = 'Title Name',
  titleSize = '1.8rem',
  width,
  height,
  children,
  onSubmit,
}) => {
  return (
    <form
      className={cx('form')}
      style={{
        width: width,
        height: height,
      }}
      onSubmit={onSubmit}
    >
      <h2
        className={cx('title')}
        style={{
          fontSize: titleSize,
        }}
      >
        {title}
      </h2>
      <div className={cx('content')}>{children}</div>
    </form>
  );
};

export default FormPayment;

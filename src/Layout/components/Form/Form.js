import React from 'react';
import classNames from 'classnames/bind';
import styles from './Form.module.scss';
const cx = classNames.bind(styles);
const Form = ({
  title = 'Title Name',
  titleSize = '4rem',
  width = '42rem',
  height = '48rem',
  children,
  onSubmit,
  className,
}) => {
  const classes = cx('form', {
    [className]: className,
  });
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <form
          className={classes}
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
      </div>
    </div>
  );
};

export default Form;

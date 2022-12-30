import React from 'react';
import { Link } from 'react-router-dom';
import './Subnav.module.scss';
import classNames from 'classnames/bind';
import styles from './Subnav.module.scss';

const cx = classNames.bind(styles);

function SubNavbar({ state, className }) {
  const classes = cx('wrapper', {
    [className]: className,
  });
  return (
    <div className={classes}>
      <ul className={state.isShow ? cx('nav-sub') : cx('sub-nav-hidden')}>
        {state.list && state.list.map((category, index) => {
          return (
            <ul className={cx('categories')} key={index}>
              <Link
                className={cx('category-name')}
                to={state.href + '/' + category.id + '/0/0'}
              >
                {category.name}
              </Link>
              {category.listCategory.map((item, index) => {
                return (
                  <li className={cx('category')} key={index}>
                    <Link
                      className={cx('category-name')}
                      to={state.href + '/' + item.id + '/0/0'}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        })}
      </ul>
    </div>
  );
}

export default SubNavbar;

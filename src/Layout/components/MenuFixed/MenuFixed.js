import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './MenuFixed.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function MenuFixed({ categories, id = 0, href = '/', filter }) {
  const listFilter = [
    { name: 'Date', point: 8, desc: true },
    { name: 'Sell', point: 4, desc: true },
    { name: 'Price low down', point: 1, desc: true },
    { name: 'Price high up', point: 1, desc: false },
  ];

  const [active, setActive] = useState(id);
  const [activeFilter, setActiveFilter] = useState(filter);

  const [menu, setMenu] = useState(true);
  const menuRef = useRef();

  return (
    <div className={cx('wrapper')}>
      <div className={cx('menu-bar')}>
        <div className={cx('icon-plus')}>
          <FontAwesomeIcon
            icon={faPlus}
            onClick={() => {
              if (menu) {
                menuRef.current.style.transform = 'translateX(0)';
                menuRef.current.style.boxShadow =
                  '0 16px 24px rgba(0, 0, 0, 0.3), 0 6px 8px rgba(0, 0, 0, 0.2)';
              } else {
                menuRef.current.style.transform = 'translateX(-100%)';
                menuRef.current.style.boxShadow = 'none';
              }

              setMenu(!menu);
            }}
            className={cx('icon')}
          />
        </div>
      </div>
      <div className={cx('container')} ref={menuRef}>
        <div className={cx('categories')}>
          <div className={cx('title')}>
            <span>Categories</span>
          </div>
          <ul className={cx('list-categories')}>
            {categories.map((category, index) => {
              return (
                <div
                  key={index}
                  className={
                    active === category.id
                      ? cx('category', 'active')
                      : cx('category')
                  }
                  onClick={() => setActive(index)}
                >
                  <Link to={href + '/' + category.id + '/0/0'}>
                    <li>{category.name}</li>
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
        <div className={cx('filters')}>
          <div className={cx('title')}>
            <span>Filter</span>
          </div>
          <ul className={cx('list-filter')}>
            {listFilter.map((filter, index) => {
              return (
                <div
                  key={index}
                  className={
                    activeFilter.point === filter.point &&
                    activeFilter.desc === filter.desc
                      ? cx('filter', 'active')
                      : cx('filter')
                  }
                >
                  <Link
                    to={
                      href + '/' + id + '/' + filter.point + '/' + filter.desc
                    }
                  >
                    <li>{filter.name}</li>
                  </Link>
                </div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MenuFixed;

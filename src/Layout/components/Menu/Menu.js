import { useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Menu.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Menu({ categories, id = 0, href = '/', filter }) {
  const listFilter = [
    { name: 'Date', point: 8, desc: true },
    { name: 'Sell', point: 4, desc: true },
    { name: 'Price low down', point: 1, desc: true },
    { name: 'Price high up', point: 1, desc: false },
  ];

  const [active, setActive] = useState(id);
  const [activeFilter, setActiveFilter] = useState(filter);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
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

export default Menu;

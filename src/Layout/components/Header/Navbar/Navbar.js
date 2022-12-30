import { useState, memo, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Subnav from './Subnav';
import * as categoryAPI from '~/api/categoryApi';
import classNames from 'classnames/bind';
import styles from './Navbar.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Navbar() {
  const listItems = [
    {
      name: 'Home',
      href: '/',
    },
    {
      name: 'Men',
      href: '/men/1/0/0',
    },
    {
      name: 'Women',
      href: '/women/1/0/0',
    },
    {
      name: 'Other',
      href: '/other/1/0/0',
    },
    {
      name: 'Sale',
      href: '/sale',
    },
    {
      name: 'New Arrival',
      href: '/new-arrival',
    },
    {
      name: 'Best Seller',
      href: '/best-seller',
    },
  ];

  const menuBar = useRef();

  const [listCategories, setListCategories] = useState();
  const [showMenu, setShowMenu] = useState(true);

  const [state, setState] = useState({
    subnavMen: false,
    subnavWomen: false,
    subnavOther: false,
  });

  const getCategories = async () => {
    const result = await categoryAPI.getCategories();
    console.log('result', result)
    setListCategories(() => {
      const list = result.map((item) => {
        return item.children.map((category) => {
          console.log('children 1', category.children)
          return {
            id: category.id,
            name: category.name,
            listCategory: category.children ? category.children.map((child) => {
              return { id: child.id, name: child.name };
            }) : [],
          };
        });
      });
      return list;
    });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleHover = (index) => {
    if (index === 1) {
      return setState({
        ...state,
        subnavMen: true,
      });
    } else if (index === 2) {
      return setState({
        ...state,
        subnavWomen: true,
      });
    }
    if (index === 3) {
      return setState({
        ...state,
        subnavOther: true,
      });
    }

    return setState({
      subnavMen: false,

      subnavWomen: false,

      subnavOther: false,
    });
  };

  const handleUnHover = (index) => {
    if (index === 1 || index === 2 || index === 3) {
      return setState({
        subnavMen: false,

        subnavWomen: false,

        subnavOther: false,
      });
    }

    return () => {};
  };

  return (
    <div onMouseOut={() => handleUnHover(1)} className={cx('wrapper')}>
      <div className={cx('menu')}>
        <FontAwesomeIcon
          icon={faBars}
          className={cx('menu-icon')}
          onClick={() => {
            if (showMenu) {
              menuBar.current.style.display = 'flex';
              setTimeout(() => {
                menuBar.current.style.transform = 'translateX(0)';
                menuBar.current.style.opacity = '1';
                menuBar.current.style.zIndex = '6';
              }, 100);
            } else {
              menuBar.current.style.transform = 'translateX(2%)';
              menuBar.current.style.opacity = '0';
              menuBar.current.style.zIndex = '-1';
              setTimeout(() => {
                menuBar.current.style.display = 'none';
              }, 300);
            }
            setShowMenu(!showMenu);
          }}
        />
      </div>
      <div className={cx('menu-bar')} ref={menuBar}>
        {listItems.map((item, index) => {
          return (
            <div className={cx('menu-item')} key={index}>
              <Link to={item.href}>{item.name}</Link>
            </div>
          );
        })}
      </div>
      <nav className={cx('nav')}>
        <ul className={cx('navbar')}>
          {listItems.map((item, index) => {
            return (
              <div
                key={index}
                className={cx('items')}
                onMouseOver={() => handleHover(index)}
              >
                <li key={index} className={cx('item')}>
                  <Link to={item.href}>{item.name}</Link>

                  <div className={cx('subnav')}>
                    {listCategories && index === 1 && (
                      <Subnav
                        state={{
                          isShow: state.subnavMen,
                          list: listCategories[0],
                          href: '/men',
                        }}
                      ></Subnav>
                    )}
                  </div>
                  <div className={cx('subnav')}>
                    {listCategories && index === 2 && (
                      <Subnav
                        state={{
                          isShow: state.subnavWomen,
                          list: listCategories[1],
                          href: '/women',
                        }}
                      ></Subnav>
                    )}
                  </div>
                  <div className={cx('subnav')}>
                    {listCategories && index === 3 && (
                      <Subnav
                        state={{
                          isShow: state.subnavOther,
                          list: listCategories[2],
                          href: '/other',
                        }}
                      ></Subnav>
                    )}
                  </div>
                </li>
              </div>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default memo(Navbar);

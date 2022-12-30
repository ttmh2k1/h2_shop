import { useState, useRef } from 'react';
import ProductItem from '../ProductItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';
import styles from './ListProduct.module.scss';

const cx = classNames.bind(styles);

function ListProduct({ listProduct = [] }) {
  const [state, setState] = useState(0);
  const productRef = useRef();
  const sourceSize = listProduct.length;
  const doubleProduct = [...listProduct, ...listProduct];

  let productListFormat = [listProduct[state]];
  if (state === 0) {
    productListFormat = [
      listProduct[sourceSize - 1],
      ...productListFormat,
      ...listProduct.slice(state + 1, state + 5),
    ];
  } else if (state === sourceSize - 1) {
    productListFormat = [
      listProduct[state - 1],
      ...productListFormat,
      listProduct[0],
      ...doubleProduct.slice(state + 2, state + 5),
    ];
  } else {
    productListFormat = [
      doubleProduct[state - 1],
      ...productListFormat,
      ...doubleProduct.slice(state + 1, state + 5),
    ];
  }

  const handleClickNext = () => {
    productRef.current.style.transition = 'transform 0.3s';
    productRef.current.style.transform = `translateX(-60rem) translateX(0px)`;
    nextProduct();
  };

  const nextProduct = () => {
    setTimeout(() => {
      setState((prev) => {
        if (prev < sourceSize - 1) {
          return prev + 1;
        } else {
          return 0;
        }
      });
      productRef.current.style.transition = 'transform 0s';
      productRef.current.style.transform = `translateX(-30rem) translateX(0px)`;
    }, 300);
  };

  const handleClickBack = () => {
    productRef.current.style.transition = 'transform 0.3s';
    productRef.current.style.transform = `translateX(0) translateX(0px)`;
    prevProduct();
  };

  const prevProduct = () => {
    setTimeout(() => {
      setState((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return sourceSize - 1;
        }
      });
      productRef.current.style.transition = 'transform 0s';
      productRef.current.style.transform = `translateX(-30rem) translateX(0px)`;
    }, 300);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')} ref={productRef}>
          {productListFormat.map((product, index) => {
            return (
              <div key={index} className={cx('product')}>
                <ProductItem product={product} />
              </div>
            );
          })}
        </div>

        <div className={cx('selection')}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={handleClickBack}
            className={cx('navigate-icon', 'icon-prev')}
          />

          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={handleClickNext}
            className={cx('navigate-icon', 'icon-next')}
          />
        </div>
      </div>
    </div>
  );
}

export default ListProduct;

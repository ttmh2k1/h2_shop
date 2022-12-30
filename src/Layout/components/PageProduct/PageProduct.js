import classNames from 'classnames/bind';
import styles from './PageProduct.module.scss';
import ProductSession from './ProductSession';
import { useState } from 'react';

const cx = classNames.bind(styles);

function PageProduct({ listProduct, className, pagesize = 6 }) {
  const [state, setState] = useState(0);
  const PAGE_SIZE = pagesize;
  const pageCount = listProduct.length / PAGE_SIZE;

  const handleClickNext = () => {
    if (state < pageCount - 1) {
      return setState((prev) => prev + 1);
    } else {
      return setState(0);
    }
  };

  const handleClickBack = () => {
    if (state > 0) {
      return setState((prev) => prev - 1);
    } else {
      return setState(pageCount);
    }
  };

  const classes = cx('content', {
    [className]: className,
  });
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx(classes)}>
          <ProductSession
            listProduct={listProduct.slice(
              state * PAGE_SIZE,
              state * PAGE_SIZE + PAGE_SIZE,
            )}
          />
        </div>
        <div className={cx('pagination')}>
          {state > 0 && (
            <div className={cx('page-btn')}>
              <span className={cx('icon')} onClick={handleClickBack}>
                {'<'}
              </span>
              <span onClick={handleClickBack}>{state}</span>
            </div>
          )}
          <span className={cx('active')}>{state + 1}</span>
          {state < pageCount - 1 && (
            <div className={cx('page-btn')}>
              <span onClick={handleClickNext}>{state + 2}</span>
              <span className={cx('icon')} onClick={handleClickNext}>
                {' '}
                {'>'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageProduct;

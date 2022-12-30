import { useState, useEffect } from 'react';
import OrderItem from './OrderItem';
import classNames from 'classnames/bind';
import styles from './ListOrder.module.scss';

const cx = classNames.bind(styles);
const ListOrder = ({ listOrder }) => {
  const [pageState, setPageState] = useState(0);
  const PAGE_SIZE = 3;
  const pageCount = listOrder.length / PAGE_SIZE;

  const handleClickNext = () => {
    if (pageState < pageCount - 1) {
      return setPageState((prev) => prev + 1);
    } else {
      return setPageState(0);
    }
  };

  const handleClickBack = () => {
    if (pageState > 0) {
      return setPageState((prev) => prev - 1);
    } else {
      return setPageState(pageCount);
    }
  };

  useEffect(() => {
    setPageState(0);
  }, [listOrder]);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {listOrder
          .slice(pageState * PAGE_SIZE, pageState * PAGE_SIZE + PAGE_SIZE)
          .map((item, index) => {
            console.log('pageState ', pageState);
            console.log(
              'list :',
              listOrder.slice(
                pageState * PAGE_SIZE,
                pageState * PAGE_SIZE + PAGE_SIZE,
              ),
            );
            return (
              <div className={cx('order')} key={item.id}>
                <OrderItem item={item} />
              </div>
            );
          })}
        <div className={cx('pagination')}>
          <div className={cx('list-btn')}>
            {pageState > 0 && (
              <div className={cx('page-btn')}>
                <span className={cx('icon')} onClick={handleClickBack}>
                  {'<'}
                </span>
                <span onClick={handleClickBack}>{pageState}</span>
              </div>
            )}
            <span className={cx('active')}>{pageState + 1}</span>
            {pageState < pageCount - 1 && (
              <div className={cx('page-btn')}>
                <span onClick={handleClickNext}>{pageState + 2}</span>
                <span className={cx('icon')} onClick={handleClickNext}>
                  {' '}
                  {'>'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOrder;

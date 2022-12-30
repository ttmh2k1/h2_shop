import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrder } from '~/ActionCreators/UserCreator';
import * as orderAPI from '~/api/orderApi';
import ListOrder from '~/Layout/components/ListOrder';
import classNames from 'classnames/bind';
import styles from './OrderHistory.module.scss';

const cx = classNames.bind(styles);

function OrderHistoryComponent() {
  const listOrder = useSelector((state) => state.user.listOrder);

  const [listOrderFilter, setListOrderFilter] = useState(listOrder);

  const dispatch = useDispatch();

  const getListOrder = async () => {
    const result = await orderAPI.getOrder();

    if (result) {
      dispatch(updateOrder(result.reverse()));
    }
  };

  useEffect(() => {
    getListOrder();
  }, []);

  useEffect(() => {
    setListOrderFilter(listOrder);
  }, [listOrder]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('menu')}>
          <ul className={cx('list-option')}>
            <li
              className={cx('option')}
              onClick={() => setListOrderFilter(listOrder)}
            >
              All
            </li>
            <li
              className={cx('option')}
              onClick={() =>
                setListOrderFilter(
                  listOrder.filter(
                    (item) => item.status === 'WAIT_FOR_CONFIRM',
                  ),
                )
              }
            >
              Confirming
            </li>
            <li
              className={cx('option')}
              onClick={() =>
                setListOrderFilter(
                  listOrder.filter(
                    (item) => item.status === 'WAIT_FOR_PAYMENT',
                  ),
                )
              }
            >
              Paying
            </li>
            <li
              className={cx('option')}
              onClick={() =>
                setListOrderFilter(
                  listOrder.filter((item) => item.status === 'WAIT_FOR_SEND'),
                )
              }
            >
              Sending
            </li>
            <li
              className={cx('option')}
              onClick={() =>
                setListOrderFilter(
                  listOrder.filter((item) => item.status === 'DELIVERING'),
                )
              }
            >
              Delivering
            </li>
            <li
              className={cx('option')}
              onClick={() =>
                setListOrderFilter(
                  listOrder.filter((item) => item.status === 'DELIVERED'),
                )
              }
            >
              Delivered
            </li>
            <li
              className={cx('option')}
              onClick={() =>
                setListOrderFilter(
                  listOrder.filter((item) => item.status === 'COMPLETED'),
                )
              }
            >
              Completed
            </li>
            <li
              className={cx('option')}
              onClick={() =>
                setListOrderFilter(
                  listOrder.filter((item) => item.status === 'CANCELLED'),
                )
              }
            >
              Cancelled
            </li>
          </ul>
        </div>

        <div className={cx('content')}>
          <ListOrder listOrder={listOrderFilter} />
        </div>
      </div>
    </div>
  );
}

export default OrderHistoryComponent;

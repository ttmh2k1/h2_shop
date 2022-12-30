import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateOrder } from '~/ActionCreators/UserCreator';
import { updateShowModal } from '~/ActionCreators/DisplayCreator';
import * as orderAPI from '~/api/orderApi';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import Momo from '~/commons/assets/momo.png';
import Paypal from '~/commons/assets/paypal.png';
import swal from 'sweetalert';
import Radio from '~/components/Radio';
import AddComment from '~/Layout/components/ProductDetails/Comment/AddComment';
import classNames from 'classnames/bind';
import styles from './OderItem.module.scss';
const cx = classNames.bind(styles);

function OrderItem({ item }) {
  const commas = (str) => {
    return str.replace(/.(?=(?:.{3})+$)/g, '$&.');
  };

  const listOrder = useSelector((state) => state.user.listOrder);
  const showModal = useSelector((state) => state.display.showModal);
  const [formPay, setFormPay] = useState(false);
  const [formComment, setFormComment] = useState(false);
  const [state, setState] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('ONLINE_PAYMENT_MOMO');
  const dispatch = useDispatch();

  const shipments = [
    {
      id: 'payment',
      name: 'MoMo',
      image: Momo,
      key: 'ONLINE_PAYMENT_MOMO',
    },
    // {
    //   id: 'payment',
    //   name: 'Paypal',
    //   image: Paypal,
    //   key: 'ONLINE_PAYMENT_PAYPAL',
    // },
  ];

  const payment = (key) => {
    switch (key) {
      case 'ONLINE_PAYMENT_MOMO':
        return 'MOMO';
      case 'ONLINE_PAYMENT_PAYPAL':
        return 'PAYPAL';
      default:
        return 'COD';
    }
  };

  const status = (key) => {
    switch (key) {
      case 'WAIT_FOR_PAYMENT':
        return 'Paying';
      case 'WAIT_FOR_CONFIRM':
        return 'Confirming';
      case 'WAIT_FOR_SEND':
        return 'Sending';
      case 'DELIVERING':
        return 'Delivering';
      case 'DELIVERED':
        return 'Delivered';
      case 'COMPLETED':
        return 'Completed';
      default:
        return 'Cancel';
    }
  };

  const createPayment = async (id) => {
    const result = await orderAPI.createPayment(id);
  };

  const updateOrder = async (id) => {
    const result = await orderAPI.updateOrder(id, {
      newPaymentMethod: paymentMethod,
    });

    if (result) {
      createPayment(id);
    }
  };

  const cancelOrder = async (id) => {
    const result = await orderAPI.cancelOrder(id);
    if (result) {
      swal('Your order was canceled!', '', 'success');
      dispatch(
        updateOrder(
          listOrder.map((order) =>
            order.id === item.id
              ? {
                  ...order,
                  status: 'CANCELLED',
                }
              : order,
          ),
        ),
      );
    } else {
      swal("Can't cancel your order", 'Please try again', 'error');
    }
  };

  const handleCancel = (id) => {
    swal({
      title: 'Do you want to cancel this order??',
      text: 'Let confirm your decision!!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        cancelOrder(id);
      } else {
        swal('Your order is safe!');
      }
    });
  };

  const handlePayment = () => {
    if (paymentMethod === item.paymentMethod) {
      createPayment(item.id);
    } else {
      updateOrder(item.id);
    }
  };

  useEffect(() => {
    setPaymentMethod(
      item.paymentMethod ? item.paymentMethod : 'ONLINE_PAYMENT_MOMO',
    );
  }, [item]);

  useEffect(() => {
    if (!showModal) {
      setFormPay(showModal);
      setFormComment(showModal);
    }
  }, [showModal]);

  return (
    <div className={cx('wrapper')}>
      {
        <div className={cx('container')}>
          <div className={cx('top')}>
            <div className={cx('code')}>
              <FontAwesomeIcon className={cx('icon')} icon={faFile} />
              <span className={cx('id-order')}>Order: {item.id} </span>
              <span className={cx('date-order')}>
                {'(' + item.createTime + ')'}
              </span>
            </div>
            <span className={cx('status')}>{status(item.status)}</span>
          </div>

          <div
            className={cx('content')}
            style={{ height: state && item.orderDetails.length * 11 + 'rem' }}
          >
            {item.orderDetails.map((product, index) => {
              return (
                <div className={cx('content-order')} key={index}>
                  <div className={cx('product')}>
                    <img src={product.productVariation.product.avatar} alt="" />
                  </div>
                  <div className={cx('product-details')}>
                    <span className={cx('name')}>
                      {product.productVariation.product.name
                        .split(' ')
                        .filter((order, index) => index < 4)
                        .join(' ')}
                    </span>
                    <span className={cx('color')}>
                      {product.productVariation.tier
                        ? product.productVariation.tier
                        : 'Variation'}
                      {':   '}
                      {product.productVariation.variationName}
                    </span>
                    <span className={cx('quantity')}>x{product.quantity}</span>
                  </div>
                  <div className={cx('product-price')}>
                    <div className={cx('price')}>
                      <span
                        className={
                          product.productVariation.discount > 0
                            ? cx('old-price')
                            : cx('')
                        }
                      >
                        {commas(product.productVariation.price + '')}
                        VND
                      </span>
                      {product.productVariation.discount > 0 && (
                        <span className={cx('sale-price')}>
                          {commas(product.unitPrice * product.quantity + '')}{' '}
                          VND
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={cx('total')}>
            <span className={cx('label')}>Total:</span>
            <span className={cx('value')}>
              {commas(item.payPrice + '')} VND
            </span>
          </div>
          <div className={cx('bottom')}>
            <div className={cx('sub-detail')}>
              <span>Note: {item.note}</span>
              <span>Payment: {payment(item.paymentMethod)}</span>
            </div>
            <div className={cx('action')}>
              {status(item.status) === 'Paying' && (
                <Button
                  primary
                  className={cx('btn-order')}
                  children="Pay"
                  onClick={() => {
                    setFormPay(true);
                    dispatch(updateShowModal(true));
                  }}
                />
              )}

              {(status(item.status) === 'Paying' ||
                status(item.status) === 'Confirming' ||
                status(item.status) === 'Sending') && (
                <Button
                  primary
                  children="Cancel"
                  className={cx('btn-order')}
                  onClick={() => handleCancel(item.id)}
                />
              )}
              {status(item.status) === 'Delivered' && (
                <Button
                  primary
                  children="Comment"
                  className={cx('btn-order')}
                  onClick={() => {
                    setFormComment(true);
                    dispatch(updateShowModal(true));
                  }}
                />
              )}
              {formComment && showModal && (
                <div className={cx('form-comment')}>
                  <AddComment
                    listProduct={item.orderDetails}
                    orderId={item.id}
                  />
                </div>
              )}

              {formPay && showModal && (
                <div className={cx('form-pay')}>
                  <div className={cx('form-title')}>
                    Payment for Order : {item.id}
                  </div>
                  {shipments.map((item, index) => {
                    return (
                      <div key={index}>
                        <Radio
                          obj={item}
                          checked={paymentMethod === item.key}
                          onChange={() => setPaymentMethod(item.key)}
                          className={cx('form-radio')}
                        />
                      </div>
                    );
                  })}
                  <span className={cx('form-notify')}>
                    Please choose your payment method!
                  </span>
                  <Button
                    children="Pay"
                    primary
                    className={cx('btn-form')}
                    onClick={() => handlePayment()}
                  />
                </div>
              )}

              <Button
                outline
                children={state ? 'Close details' : 'More details'}
                className={cx('btn-see')}
                onClick={() => setState(!state)}
                disabled={item.orderDetails.length < 2 && true}
                style={{ marginLeft: '1rem' }}
              />
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default OrderItem;

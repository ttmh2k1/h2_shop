import * as cartAPI from '~/api/cartApi';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCart as update,
  updateCount,
} from '~/ActionCreators/CartCreator';
import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CartItem.module.scss';
import swal from 'sweetalert';

const cx = classNames.bind(styles);
function CartItem({ product = {}, indexList }) {
  const commas = (str) => {
    return str.replace(/.(?=(?:.{3})+$)/g, '$&.');
  };
  const cart = useSelector((state) => state.cart.cart);
  const count = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();

  const updateCart = async (id, quantity) => {
    const result = await cartAPI.updateCart(id, quantity);
    return result;
  };

  const [quantity, setQuantity] = useState(product.quantity);

  const changeQuantity = (quantity) => {
    if (updateCart(product.productVariation.id, quantity)) {
      dispatch(updateCount(count - (product.quantity - quantity)));
      dispatch(
        update(
          cart.map((item, index) =>
            index === indexList ? { ...item, quantity: quantity } : item,
          ),
        ),
      );
      setQuantity(quantity);
    } else {
      swal('Error!!', "Can't update cart!", 'error');
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('image')}>
          <img src={product.productDetail.avatar} alt="" />
          <div className={cx('count')}>
            <span>{quantity}</span>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('name')}>
            {product.productDetail.name
              .split(' ')
              .filter((item, index) => index < 4)
              .join(' ')}
          </div>
          <div className={cx('color')}>
            <span className={cx('title-color')}>
              {product.productVariation.variationName
                .split(' ')
                .filter((item, index) => index < 6)
                .join(' ')}
            </span>
          </div>
          <div className={cx('quantity')}>
            <div className={cx('quantity-btn')}>
              <button
                className={cx('btn', 'btn-left')}
                onClick={() => changeQuantity(quantity > 1 ? quantity - 1 : 1)}
              >
                {'-'}
              </button>
              <span>{quantity}</span>
              <button
                className={cx('btn', 'btn-right')}
                onClick={() =>
                  changeQuantity(
                    quantity < product.productVariation.availableQuantity
                      ? quantity + 1
                      : product.productVariation.availableQuantity,
                  )
                }
              >
                {'+'}
              </button>
            </div>
          </div>
        </div>

        <div className={cx('price')}>
          <span
            className={
              product.productVariation.discount > 0 ? cx('old-price') : cx('')
            }
          >
            {commas(
              (product.productVariation.price * quantity).toFixed(0) + '',
            )}{' '}
            VND
          </span>
          {product.productVariation.discount > 0 && (
            <span className={cx('sale-price')}>
              {commas(
                (
                  product.productVariation.price *
                  ((100 - product.productVariation.discount) / 100) *
                  quantity
                ).toFixed(0) + '',
              )}{' '}
              VND
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartItem;

import Button from '~/components/Button';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCount } from '~/ActionCreators/CartCreator';
import mainReducer from '~/redux/RootReducer';
import * as cartAPI from '~/api/cartApi';
import swal from 'sweetalert';
import classNames from 'classnames/bind';
import styles from './DescriptsProduct.module.scss';

const cx = classNames.bind(styles);

function DescriptsProduct({ product = {} }) {
  const dispatch = useDispatch();

  const commas = (str) => {
    return str.replace(/.(?=(?:.{3})+$)/g, '$&.');
  };

  const countCart = async () => {
    const result = await cartAPI.countCart();
    if (result) {
      dispatch(updateCount(result));
    }
  };

  const addProduct = async (id, quantity) => {
    const result = await cartAPI.addToCart(id, quantity);
    if (result) {
      swal('Product was added to cart!', 'You can see that!', 'success');
      countCart();
    } else {
      swal("Can't add product to cart!", 'You can see that!', 'error');
    }
  };

  const buyProduct = async (id, quantity) => {
    const result = await cartAPI.addToCart(id, quantity);

    if (result) {
      swal('Product was added to cart!', 'You can see that!', 'success');
      countCart();
      // window.location.reload();
      // //navigate(0);
    } else {
      swal("Can't add product to cart!", 'You can see that!', 'error');
    }
  };

  const navigate = useNavigate();

  const addToCart = (e) => {
    e.preventDefault();

    if (state.key < 0) {
      swal("Don't have variation", 'Please select a variation', 'warning');
    } else {
      addProduct(state.id, 1);
    }
  };

  const buyNow = (e) => {
    e.preventDefault();
    if (state.key < 0) {
      swal("Don't have variation", 'Please select a variation', 'warning');
    } else {
      buyProduct(state.id, 1);
    }
  };

  const [state, setState] = useState({
    key: -1,
    id: -1,
  });
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('product')}>
            <div className={cx('product-details')}>
              <span className={cx('product-name')}>
                {product.name
                  .split(' ')
                  .filter((item, index) => index < 10)
                  .join(' ') + '.'}
              </span>
              {product.onSale > 0 ? (
                <div className={cx('onSale')}>
                  <span className={cx('label')}>
                    On Sale {product.onSale}%:{' '}
                  </span>
                  <span className={cx('old-price')}>
                    {commas(
                      (
                        (product.minPrice * 100) /
                        (100 - product.onSale)
                      ).toFixed(0) + '',
                    )}{' '}
                    VND
                  </span>
                </div>
              ) : (
                <div></div>
              )}
              <div className={cx('price')}>
                {state.key > -1 ? (
                  <span>
                    {commas(
                      (
                        product.variations[state.key].price *
                        (1 - product.onSale / 100)
                      ).toFixed(0) + '',
                    ) + ' VND'}
                  </span>
                ) : (
                  <div className={cx('price-normal')}>
                    <span className={cx('min-price')}>
                      {commas(product.minPrice + '')} VND
                    </span>

                    {product.maxPrice !== product.minPrice && (
                      <div className={cx('product-max-price')}>
                        <span> - </span>
                        <span className={cx('max-price')}>
                          {commas(product.maxPrice + '')} VND
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className={cx('variations')}>
              <span className={cx('label')}>
                {product.tierVariations ? product.tierVariations : 'Variations'}
                :
                {state > -1 &&
                  '  ' +
                  product.variations[state.key].variationName
                    .split(' ')
                    .filter((item, index) => index < 5)
                    .join(' ')}
              </span>
              <div className={cx('options')}>
                {product.variations.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={
                        state.key === index
                          ? cx('varia-item', 'active')
                          : cx('varia-item')
                      }
                      onClick={() =>
                        setState(
                          state.key === index
                            ? {
                              key: -1,
                              id: -1,
                            }
                            : { key: index, id: item.id },
                        )
                      }
                    >
                      <span>{item.variationName}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className={cx('description')}>
            <span className={cx('product-description')}>
              {product.description}
            </span>
          </div>
          <div className={cx('action')}>
            <Button
              primary
              children={'Add To Cart'}
              className={cx('btn')}
              onClick={(e) => addToCart(e)}
            />

            {/* <Button
              primary
              children={'Buy Now'}
              className={cx('btn')}
              onClick={(e) => buyNow(e)}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DescriptsProduct;

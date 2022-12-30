import ListProduct from '~/Layout/components/ListProduct';
import ProductSession from '~/Layout/components/PageProduct/ProductSession';
import * as productAPI from '~/api/productApi';

import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function HomeComponent() {
  const [onSale, setOnSale] = useState([]);
  const [bestSeller, setBestSeller] = useState([]);
  const [newArrival, setNewArrival] = useState([]);

  const getOnSale = async () => {
    const result = await productAPI.getOnSale();

    setOnSale(result);
  };
  const getBestSeller = async () => {
    const result = await productAPI.getBestSeller();

    setBestSeller(result);
  };
  const getNewArrival = async () => {
    const result = await productAPI.getNewArrival();
    setNewArrival(result);
  };

  useEffect(() => {
    getOnSale();
    getBestSeller();
    getNewArrival();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('on-sale')}>
            <h1 className={cx('title')}>ON SALE</h1>
            <div className={cx('list-product')}>
              {onSale.length > 0 && <ListProduct listProduct={onSale} />}
            </div>
            <div className={cx('page-product')}>
              {onSale.length > 0 && (
                <ProductSession listProduct={onSale.slice(0, 4)} />
              )}
            </div>
          </div>
          <div className={cx('best-seller')}>
            <h1 className={cx('title')}>BEST SELLER</h1>
            <div className={cx('list-product')}>
              {bestSeller.length > 0 && (
                <ListProduct listProduct={bestSeller} />
              )}
            </div>
            <div className={cx('page-product')}>
              {bestSeller.length > 0 && (
                <ProductSession listProduct={bestSeller.slice(0, 4)} />
              )}
            </div>
          </div>
          <div className={cx('new-arrival')}>
            <h1 className={cx('title')}>NEW ARRIVAL</h1>
            <div className={cx('list-product')}>
              {newArrival.length > 0 && (
                <ListProduct listProduct={newArrival} />
              )}
            </div>
            <div className={cx('page-product')}>
              {newArrival.length > 0 && (
                <ProductSession listProduct={newArrival.slice(0, 4)} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeComponent;

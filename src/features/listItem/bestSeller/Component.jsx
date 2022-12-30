import { useState, useEffect } from 'react';
import * as productAPI from '~/api/productApi';
import classNames from 'classnames/bind';
import styles from './BestSeller.module.scss';
import PageProduct from '~/Layout/components/PageProduct';

const cx = classNames.bind(styles);

function BestSellerComponent() {
  const [bestSeller, setBestSeller] = useState([]);

  const getBestSeller = async () => {
    const result = await productAPI.getBestSeller();

    setBestSeller(result);
  };

  useEffect(() => {
    getBestSeller();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {bestSeller.length > 0 && (
          <PageProduct
            pagesize={8}
            listProduct={bestSeller}
            className={cx('content')}
          />
        )}
      </div>
    </div>
  );
}

export default BestSellerComponent;

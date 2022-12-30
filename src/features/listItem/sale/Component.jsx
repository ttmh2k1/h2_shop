import { useState, useEffect } from 'react';
import * as productAPI from '~/api/productApi';
import classNames from 'classnames/bind';
import styles from './Sale.module.scss';
import PageProduct from '~/Layout/components/PageProduct';

const cx = classNames.bind(styles);

function SaleComponent() {
  const [Sale, setSale] = useState([]);

  const getOnSale = async () => {
    const result = await productAPI.getOnSale();

    setSale(result);
  };

  useEffect(() => {
    getOnSale();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {Sale.length > 0 && (
          <PageProduct
            pagesize={8}
            listProduct={Sale}
            className={cx('content')}
          />
        )}
      </div>
    </div>
  );
}

export default SaleComponent;

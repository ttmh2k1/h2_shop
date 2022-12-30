import { useState, useEffect } from 'react';
import * as productAPI from '~/api/productApi';
import classNames from 'classnames/bind';
import styles from './NewArrival.module.scss';
import PageProduct from '~/Layout/components/PageProduct';

const cx = classNames.bind(styles);

function NewArrivalComponent() {
  const [newArrival, setNewArrival] = useState([]);

  const getNewArrival = async () => {
    const result = await productAPI.getNewArrival();

    setNewArrival(result);
  };

  useEffect(() => {
    getNewArrival();
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {newArrival.length > 0 && (
          <PageProduct
            pagesize={8}
            listProduct={newArrival}
            className={cx('content')}
          />
        )}
      </div>
    </div>
  );
}

export default NewArrivalComponent;

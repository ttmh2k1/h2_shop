import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import * as productAPI from '~/api/productApi';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import PageProduct from '~/Layout/components/PageProduct';
import swal from 'sweetalert';

const cx = classNames.bind(styles);

function SearchComponent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [listSearch, setListSearch] = useState([]);
  const navigate = useNavigate();
  const text = searchParams.get('text');

  const searchProduct = async () => {
    const result = await productAPI.getProduct({
      searchName: text,
      searchDescription: text,
      size: 30,
    });

    setListSearch(result);
  };

  useEffect(() => {
    if (text) {
      searchProduct();
    } else {
      swal(
        'NO TEXT WAS SUBMITTED',
        'Please enter the name or description of product!',
        'warning',
      );
    }
  }, []);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {listSearch.length > 0 ? (
          <PageProduct
            pagesize={8}
            listProduct={listSearch}
            className={cx('content')}
          />
        ) : (
          <div className={cx('notify')}>
            <div className={cx('border')}>
              <FontAwesomeIcon
                icon={faExclamationTriangle}
                className={cx('icon')}
              />
              <span className={cx('title')}>
                CAN'T FIND THE PRODUCT MATCH THAT!!!
              </span>
              <span className={cx('notify-content')}>
                Please search by other name or description of product. Or you
                can go to another side such as HOME, WOMEN, MEN.
              </span>
              <span className={cx('thank')}>THANK YOU!</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchComponent;

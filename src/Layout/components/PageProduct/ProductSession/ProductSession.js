import classNames from 'classnames/bind';
import styles from './ProductSession.module.scss';
import ProductItem from '~/Layout/components/ProductItem';

const cx = classNames.bind(styles);

function ProductSession({ listProduct = [] }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {listProduct.map((product, index) => {
          return (
            <div className={cx('item')} key={index}>
              <ProductItem product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ProductSession;

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as productAPI from '~/api/productApi';
import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import ProductDetails from '~/Layout/components/ProductDetails';
import ListProduct from '~/Layout/components/ListProduct';

const cx = classNames.bind(styles);

function ProductDetailsComponent() {
  const { id } = useParams();
  const [bestSeller, setBestSeller] = useState([]);
  const [sameProduct, setSameProduct] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [product, setProduct] = useState();

  const getBestSeller = async () => {
    const result = await productAPI.getBestSeller();

    setBestSeller(result);
  };

  const getSameProduct = async () => {
    const result = await productAPI.getProduct({
      idCategory: product.category.id,
    });

    setSameProduct(result);
  };

  const getProductById = async () => {
    const result = await productAPI.getProductById(id);
    setProduct(result);
  };

  const getProductReview = async () => {
    const result = await productAPI.getProductReview(id);
    setReviews(result);
  };

  useEffect(() => {
    getProductById();
    getBestSeller();
    getProductReview();
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product) {
      getSameProduct();
    }
  }, [product]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {product && reviews && (
          <ProductDetails product={product} reviews={reviews} />
        )}
        <div className={cx('sub-product')}>
          <div className={cx('new-arrival')}>
            <h1 className={cx('title')}>SAME PRODUCT</h1>
            {sameProduct.length > 0 && (
              <ListProduct listProduct={sameProduct} />
            )}
          </div>
          <div className={cx('best-seller')}>
            <h1 className={cx('title')}>BEST SELLER</h1>
            {bestSeller.length > 0 && <ListProduct listProduct={bestSeller} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsComponent;

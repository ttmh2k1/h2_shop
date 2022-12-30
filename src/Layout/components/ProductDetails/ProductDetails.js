import classNames from 'classnames/bind';
import styles from './ProductDetails.module.scss';
import ProductDetailsImage from './ProductDetailsImage';
import DescriptsProduct from './DescriptsProduct';
import RatingReviews from './RatingReviews';
import Comment from './Comment';

const cx = classNames.bind(styles);

function ProductDetails({ product, reviews }) {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('list-image')}>
            <ProductDetailsImage listImages={product.images.slice(0, 4)} />
          </div>

          <div className={cx('descripts-product')}>
            <DescriptsProduct
              product={{
                id: product.id,
                name: product.name,
                minPrice: product.minPrice,
                maxPrice: product.maxPrice,
                variations: product.variations,
                description: product.description.slice(0, 1000) + '.',
                tierVariations: product.tierVariations[0],
                onSale: product.maxDiscount,
              }}
            />
          </div>
        </div>

        <div className={cx('evaluate')}>
          <div className={cx('rating-reviews')}>
            <RatingReviews
              rating={product.averageRating}
              totalRating={product.totalRatingTimes}
              listRating={
                product.totalRatingTimes > 0
                  ? [
                      (product.rating5 / product.totalRatingTimes) * 100,
                      (product.rating4 / product.totalRatingTimes) * 100,
                      (product.rating3 / product.totalRatingTimes) * 100,
                      (product.rating2 / product.totalRatingTimes) * 100,
                      (product.rating1 / product.totalRatingTimes) * 100,
                    ]
                  : [0, 0, 0, 0, 0]
              }
            />
          </div>

          <div className={cx('comment')}>
            <Comment listComment={reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

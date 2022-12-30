import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ProductDetailsImage.module.scss';

const cx = classNames.bind(styles);

function ProductDetailsImage({ listImages }) {
  const [state, setState] = useState(0);
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('sub-image', 'left')}>
            {listImages.map((image, index) => {
              return (
                <img
                  onMouseOver={() => {
                    setState(index);
                  }}
                  key={index}
                  src={image.url}
                  alt=""
                  className={cx('sub-image-item')}
                />
              );
            })}
          </div>
          <div className={cx('thumbnail')}>
            <img
              src={listImages[state].url}
              alt=""
              className={cx('thumbnail-image')}
            />
          </div>
          <div className={cx('sub-image', 'right')}>
            {listImages.map((image, index) => {
              return (
                <img
                  onMouseOver={() => {
                    setState(index);
                  }}
                  key={index}
                  src={image.url}
                  alt=""
                  className={cx('sub-image-item')}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsImage;

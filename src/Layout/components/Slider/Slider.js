import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCount } from '~/ActionCreators/CartCreator';
import * as productAPI from '~/api/productApi';
import * as cartAPI from '~/api/cartApi';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import swal from 'sweetalert';

const cx = classNames.bind(styles);

function SliderBar() {
  const imageRef = useRef();

  const [state, setState] = useState(0);
  const [sourcePhoto, setSourcePhoto] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getNewArrival = async () => {
    const result = await productAPI.getNewArrival();
    setSourcePhoto(result.slice(3, 7));
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

  const addToCart = (id) => {
    addProduct(id, 1);
  };

  useEffect(() => {
    getNewArrival();
  }, []);

  let photos = [];

  if (sourcePhoto.length > 0) {
    const sourceSize = sourcePhoto.length;
    photos = [sourcePhoto[state]];
    if (state === 0) {
      photos.push(sourcePhoto[state + 1]);
      photos.unshift(sourcePhoto[sourceSize - 1]);
    } else if (state === sourceSize - 1) {
      photos.push(sourcePhoto[0]);
      photos.unshift(sourcePhoto[state - 1]);
    } else {
      photos.push(sourcePhoto[state + 1]);
      photos.unshift(sourcePhoto[state - 1]);
    }
  }

  const sizeList = photos.length;
  const handleClickNext = () => {
    imageRef.current.style.transition = 'transform 0.3s';
    imageRef.current.style.transform = `translateX(-${100}%)`;
    nextSlide();
  };

  const nextSlide = () => {
    setTimeout(() => {
      setState((prev) => {
        if (prev < sizeList) {
          return prev + 1;
        } else {
          return 0;
        }
      });

      imageRef.current.style.transition = 'transform 0s';
      imageRef.current.style.transform = `translateX(0%)`;
    }, 300);
  };

  const handleClickBack = () => {
    imageRef.current.style.transition = 'transform 0.3s';
    imageRef.current.style.transform = `translateX(${100}%)`;

    prevSlide();
  };

  const prevSlide = () => {
    setTimeout(() => {
      setState((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          return sizeList;
        }
      });
      imageRef.current.style.transition = 'transform 0s';
      imageRef.current.style.transform = `translateX(0%)`;
    }, 300);
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('slider')}>
        <div
          className={cx('slider-content')}
          ref={imageRef}
          style={{ transform: 'none' }}
        >
          {photos.length > 0 &&
            photos.map((photo, index) => {
              return (
                <div
                  key={index}
                  style={{ left: (index - 1) * 100 + '%' }}
                  className={cx('slider-item')}
                >
                  <div className={cx('item-details')}>
                    <h4>New Arrival</h4>
                    <h2>
                      {photo.name
                        .split(' ')
                        .filter((item, index) => index < 4)
                        .join(' ')}
                    </h2>
                    <div className={cx('slider-product-description')}>
                      <span>{photo.description.slice(0, 200) + '...'}</span>
                    </div>
                  </div>
                  <div className={cx('slider-product-layer')}></div>
                  <img
                    src={photo.avatar}
                    alt=""
                    className={cx('slider-image')}
                  />

                  <div className={cx('slider-product-button')}>
                    <Button
                      outline
                      rounded
                      children="Explore"
                      className={cx('btn', 'btn-explore')}
                      to={'/product-details/' + photo.id}
                    ></Button>
                    <Button
                      primary
                      rounded
                      children="Buy Now"
                      className={cx('btn', 'btn-buy-now')}
                      to="/cart"
                      onClick={() => addToCart(photo.id)}
                    ></Button>
                  </div>
                </div>
              );
            })}
        </div>

        <div className={cx('slider-selection')}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            onClick={handleClickBack}
            className={cx('slider-navigate-icon', 'slider-icon-prev')}
          />

          <FontAwesomeIcon
            icon={faChevronRight}
            onClick={handleClickNext}
            className={cx('slider-navigate-icon', 'slider-icon-next')}
          />
        </div>
      </div>
    </div>
  );
}

export default SliderBar;

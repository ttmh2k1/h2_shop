import { useState } from 'react';
import * as commentAPI from '~/api/commentApi';
import * as orderAPI from '~/api/orderApi';
import { useDispatch } from 'react-redux';
import { updateOrder } from '~/ActionCreators/UserCreator';
import { updateShowModal } from '~/ActionCreators/DisplayCreator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar as faStarSolid,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './AddComment.module.scss';
import swal from 'sweetalert';

const cx = classNames.bind(styles);

function AddComment({ listProduct = [], orderId }) {
  const star = [0, 1, 2, 3, 4];
  const [check, setCheck] = useState(false);
  const [starState, setStarState] = useState(-1);
  const [commentContent, setCommentContent] = useState('');
  const [hoverImg, setHoverImg] = useState(false);
  const [productSelected, setProductSelected] = useState(
    listProduct.find((item, index) => index === 0).productVariation.id,
  );
  const [subProduct, setSubProduct] = useState(false);
  const dispatch = useDispatch();

  const postComment = async () => {
    const obj = {
      idOrder: orderId,
      idProductVariation: productSelected,

      point: starState + 1,
      content: commentContent,
    };
    const json = JSON.stringify(obj);
    const blob = new Blob([json], {
      type: 'application/json',
    });
    const data = new FormData();
    data.append('data', blob);

    const result = await commentAPI.postComment(data);

    if (result) {
      swal(
        'Your comment is posted!',
        'Thank you for your feedback!',
        'success',
      );
      dispatch(updateShowModal(false));
      const newListOrder = await orderAPI.getOrder();
      if (newListOrder) {
        dispatch(updateOrder(newListOrder));
      }
    } else {
      swal('Have one error!', 'Please try again!', 'error');
    }
  };

  const handlePost = () => {
    postComment();
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('rating')}>
            <div
              className={cx('product')}
              onMouseOver={() => setHoverImg(true)}
              onMouseLeave={() => setHoverImg(false)}
            >
              <img
                src={
                  listProduct.find(
                    (item) => item.productVariation.id === productSelected,
                  ).productVariation.product.avatar
                }
                alt=""
                className={cx('product-image')}
              />
              {listProduct.length > 1 && (
                <div
                  className={hoverImg ? cx('change-product') : cx('hidden')}
                  onClick={() => setSubProduct(!subProduct)}
                >
                  <FontAwesomeIcon icon={faPencil} className={cx('icon')} />
                </div>
              )}
              {listProduct.length > 1 && (
                <div className={subProduct ? cx('list-product') : cx('hidden')}>
                  {listProduct.map((item) => {
                    return (
                      !item.reviewed && (
                        <div
                          className={cx('item')}
                          key={item.productVariation.id}
                          onClick={() => {
                            setProductSelected(item.productVariation.id);
                            setSubProduct(false);
                          }}
                        >
                          <img
                            src={item.productVariation.product.avatar}
                            alt=""
                          />
                          <div className={cx('product-details')}>
                            <span>
                              {item.productVariation.product.name
                                .split(' ')
                                .filter((item, index) => index < 4)
                                .join(' ')}
                            </span>
                            <span className={cx('variation')}>
                              {item.productVariation.tier} {': '}
                              {item.productVariation.variationName}
                            </span>
                          </div>
                        </div>
                      )
                    );
                  })}
                </div>
              )}
            </div>
            <div className={cx('star')}>
              {star.map((item) => {
                return (
                  <FontAwesomeIcon
                    key={item}
                    icon={item <= starState ? faStarSolid : faStar}
                    onMouseOver={() => {
                      setCheck(false);
                      setStarState(item);
                    }}
                    onMouseOut={() => {
                      return !check && setStarState(-1);
                    }}
                    onClick={() => setCheck(true)}
                    className={cx('icon-star')}
                  />
                );
              })}
            </div>
          </div>
          <div className={cx('comment')}>
            <div className={cx('write-comment')}>
              <textarea
                className={cx('comment-input')}
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                placeholder={'Write comment for this product...'}
              ></textarea>
            </div>
            <div className={cx('post-comment')}>
              <Button
                primary
                rounded
                children={'POST'}
                className={cx('btn')}
                onClick={() => handlePost()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddComment;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './CommentItem.module.scss';

const cx = classNames.bind(styles);

function CommentItem({ comment }) {
  const star = [
    {
      key: 0,
      class: 'un-active',
    },
    {
      key: 0,
      class: 'un-active',
    },
    {
      key: 0,
      class: 'un-active',
    },
    {
      key: 0,
      class: 'un-active',
    },
    {
      key: 0,
      class: 'un-active',
    },
  ];
  let i = 0;

  while (comment.point - i > 0) {
    star[i].key = 1;
    star[i].class = 'active';

    i++;
  }
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <img className={cx('img-avatar')} src={comment.buyerAvatar} alt="" />
          <div className={cx('comment-details')}>
            <span className={cx('customer-name')}>{comment.buyerUsername}</span>
            <span className={cx('date')}>{comment.time}</span>
            <div className={cx('rating-star')}>
              {star.map((item, index) => {
                return (
                  <FontAwesomeIcon
                    key={index}
                    icon={item.key === 0 ? faStar : faStarSolid}
                    className={cx(item.class)}
                  />
                );
              })}
            </div>
            <span className={cx('comment')}>{comment.content}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;

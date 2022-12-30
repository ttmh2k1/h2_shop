import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStarHalfStroke,
  faStar as faStarSolid,
} from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import classNames from 'classnames/bind';
import styles from './RatingReviews.module.scss';

const cx = classNames.bind(styles);

function RatingReviews({
  rating = 4.5,
  totalRating = 19192841,
  listRating = [50, 30, 10, 8, 20],
}) {
  const commas = (str) => {
    return str.replace(/.(?=(?:.{3})+$)/g, '$&.');
  };
  // key = 0: star un active
  // key = 1: full star active
  // key = 2: half star active
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

  while (rating - i > 0) {
    if (rating - i > 0.5) {
      star[i].key = 1;
      star[i].class = 'active';
    } else {
      star[i].key = 2;
      star[i].class = 'half-active';
    }

    i++;
  }

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          <div className={cx('rating-statistic')}>
            <span className={cx('title')}>RATING & REVIEWS</span>
            <span className={cx('rating')}>{rating.toFixed(1)}</span>
            <div className={cx('star')}>
              {star.map((item, index) => {
                return (
                  <FontAwesomeIcon
                    key={index}
                    icon={
                      item.key === 0
                        ? faStar
                        : item.key === 1
                        ? faStarSolid
                        : faStarHalfStroke
                    }
                    className={cx(item.class)}
                  />
                );
              })}
            </div>
            <span className={cx('statistic')}>
              Base on {commas(totalRating + '')} rating
            </span>
          </div>

          <div className={cx('rating-row')}>
            {listRating.map((item, index) => {
              return (
                <div className={cx('row')} key={index}>
                  <span className={cx('row-title')}> {5 - index} Star</span>
                  <div className={cx('row-item')}>
                    <div
                      className={cx('percent')}
                      style={{
                        width: item * (50 / 100) + 'rem',
                        borderTopRightRadius: item < 100 && 0,
                        borderBottomRightRadius: item < 100 && 0,
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RatingReviews;

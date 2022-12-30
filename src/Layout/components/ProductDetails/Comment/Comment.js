import CommentItem from './CommentItem';
import AddComment from './AddComment';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './Comment.module.scss';
const cx = classNames.bind(styles);

function Comment({ listComment = [] }) {
  const [pageState, setPageState] = useState(0);
  const [commentState, setCommentState] = useState(false);
  const PAGE_SIZE = 6;
  const pageCount = listComment.length / PAGE_SIZE;
  console.log(listComment);

  const handleClickNext = () => {
    if (pageState < pageCount - 1) {
      return setPageState((prev) => prev + 1);
    } else {
      return setPageState(0);
    }
  };

  const handleClickBack = () => {
    if (pageState > 0) {
      return setPageState((prev) => prev - 1);
    } else {
      return setPageState(pageCount);
    }
  };
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('content')}>
          {listComment.length > 0 ? (
            <div className={cx('list-comment')}>
              {listComment
                .slice(pageState * PAGE_SIZE, pageState * PAGE_SIZE + PAGE_SIZE)
                .map((comment, index) => {
                  return (
                    <div className={cx('comment')} key={index}>
                      <CommentItem comment={comment} />
                    </div>
                  );
                })}
              <div className={cx('pagination')}>
                <div className={cx('list-btn')}>
                  {pageState > 0 && (
                    <div className={cx('page-btn')}>
                      <span className={cx('icon')} onClick={handleClickBack}>
                        {'<'}
                      </span>
                      <span onClick={handleClickBack}>{pageState}</span>
                    </div>
                  )}
                  <span className={cx('active')}>{pageState + 1}</span>
                  {pageState < pageCount - 1 && (
                    <div className={cx('page-btn')}>
                      <span onClick={handleClickNext}>{pageState + 2}</span>
                      <span className={cx('icon')} onClick={handleClickNext}>
                        {' '}
                        {'>'}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={cx('notify')}>
              <span>Nobody make a comment for that</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;

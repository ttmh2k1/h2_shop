import React from 'react';
import classNames from 'classnames/bind';
import styles from './ListNotify.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
const ListNotify = ({
  listNotify = [
    {
      title: 'Notify 1',
      content:
        'lkhlasfh lkash fkash kfahsf kash fkas fjas fkja fakl fnmsn alsjda lsflaks hfas fasnf alsjf alkf asmfnas ,fnalsfj alsk asndklansf ,asmnf ,asnf sa,nfas nf,sa f,sanf asnf saflasjfaslfj asnfsanfsanfasljf',
      date: '12-11-2022',
      time: '11:25',
    },
    {
      title: 'Notify 2',
      content:
        'lkhlasfh lkash fkash kfahsf kash fkas fjas fkja fakl fnmsn alsjda lsflaks hfas fasnf alsjf alkf asmfnas ,fnalsfj alsk asndklansf ,asmnf ,asnf sa,nfas nf,sa f,sanf asnf saflasjfaslfj asnfsanfsanfasljf',
      date: '12-11-2022',
      time: '11:25',
    },
    {
      title: 'Notify 3',
      content:
        'lkhlasfh lkash fkash kfahsf kash fkas fjas fkja fakl fnmsn alsjda lsflaks hfas fasnf alsjf alkf asmfnas ,fnalsfj alsk asndklansf ,asmnf ,asnf sa,nfas nf,sa f,sanf asnf saflasjfaslfj asnfsanfsanfasljf',
      date: '12-11-2022',
      time: '11:25',
    },
    {
      title: 'Notify 4',
      content:
        'lkhlasfh lkash fkash kfahsf kash fkas fjas fkja fakl fnmsn alsjda lsflaks hfas fasnf alsjf alkf asmfnas ,fnalsfj alsk asndklansf ,asmnf ,asnf sa,nfas nf,sa f,sanf asnf saflasjfaslfj asnfsanfsanfasljf',
      date: '12-11-2022',
      time: '11:25',
    },
    {
      title: 'Notify 5',
      content:
        'lkhlasfh lkash fkash kfahsf kash fkas fjas fkja fakl fnmsn alsjda lsflaks hfas fasnf alsjf alkf asmfnas ,fnalsfj alsk asndklansf ,asmnf ,asnf sa,nfas nf,sa f,sanf asnf saflasjfaslfj asnfsanfsanfasljf',
      date: '12-11-2022',
      time: '11:25',
    },
    {
      title: 'Notify 6',
      content:
        'lkhlasfh lkash fkash kfahsf kash fkas fjas fkja fakl fnmsn alsjda lsflaks hfas fasnf alsjf alkf asmfnas ,fnalsfj alsk asndklansf ,asmnf ,asnf sa,nfas nf,sa f,sanf asnf saflasjfaslfj asnfsanfsanfasljf',
      date: '12-11-2022',
      time: '11:25',
    },
    {
      title: 'Notify 7',
      content:
        'lkhlasfh lkash fkash kfahsf kash fkas fjas fkja fakl fnmsn alsjda lsflaks hfas fasnf alsjf alkf asmfnas ,fnalsfj alsk asndklansf ,asmnf ,asnf sa,nfas nf,sa f,sanf asnf saflasjfaslfj asnfsanfsanfasljf',
      date: '12-11-2022',
      time: '11:25',
    },
  ],
}) => {
  const [pageState, setPageState] = useState(0);

  const PAGE_SIZE = 6;
  const pageCount = listNotify.length / PAGE_SIZE;

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
        {listNotify
          .slice(pageState * PAGE_SIZE, pageState * PAGE_SIZE + PAGE_SIZE)
          .map((item, index) => {
            return (
              <div className={cx('notify')} key={index}>
                <div className={cx('title-notify')}>
                  <FontAwesomeIcon icon={faBell} className={cx('icon')} />
                  <span className={cx('title')}>{item.title}</span>
                </div>
                <div className={cx('date-time')}>
                  <span className={cx('date')}>{item.date}</span>
                  <span className={cx('time')}>{item.time}</span>
                </div>
                <span className={cx('details')}>{item.content}</span>
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
    </div>
  );
};

export default ListNotify;

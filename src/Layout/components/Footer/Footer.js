import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <div className={cx('address')}>
          <ul className={cx('list-address')}>
            <li className={cx('address-item')}>
              1 Võ Văn Ngân, Thủ Đức, TP Hồ Chí Minh
            </li>
            <li className={cx('address-item')}>
              1 Võ Văn Ngân, Thủ Đức, TP Hồ Chí Minh
            </li>
            <li className={cx('address-item')}>
              1 Võ Văn Ngân, Thủ Đức, TP Hồ Chí Minh
            </li>
            <li className={cx('address-item')}>
              1 Võ Văn Ngân, Thủ Đức, TP Hồ Chí Minh
            </li>
            <li className={cx('address-item')}>
              1 Võ Văn Ngân, Thủ Đức, TP Hồ Chí Minh
            </li>
          </ul>
        </div>
        <div className={cx('contacts')}>
          <ul className={cx('list-contacts')}>
            <li className={cx('contact-item')}>
              Email: 19110386@student.hcmute.edu.vn
            </li>
            <li className={cx('contact-item')}>
              Email: 19110386@student.hcmute.edu.vn
            </li>
            <li className={cx('contact-item')}>
              Email: 19110386@student.hcmute.edu.vn
            </li>
            <li className={cx('contact-item')}>
              Email: 19110386@student.hcmute.edu.vn
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Footer;

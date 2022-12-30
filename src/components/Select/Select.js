import classNames from 'classnames/bind';
import styles from './Select.module.scss';

const cx = classNames.bind(styles);
function Select({ options = [], select, onChange, className }) {
  const classes = cx('select', {
    [className]: className,
  });

  return (
    <div className={classes}>
      <select className={cx('slt')} value={select} onChange={onChange}>
        {options.map((item, index) => {
          return (
            <option className={cx('opt')} key={index} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;

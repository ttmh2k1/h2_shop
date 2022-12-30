import classNames from 'classnames/bind';
import styles from './Radio.module.scss';

const cx = classNames.bind(styles);

function Radio({ obj, onChange, checked, className }) {
  const classes = cx('radio', {
    [className]: className,
  });

  return (
    <div className={cx('wrapper')}>
      <div key={obj.id} className={classes}>
        <input
          type="radio"
          name={obj.id}
          checked={checked}
          onChange={onChange}
          value={obj.key}
        />
        {obj.image && <img src={obj.image} alt="" />}
        <span key={obj.id}>{obj.name}</span>
      </div>
    </div>
  );
}

export default Radio;

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCart, updateCount } from '~/ActionCreators/CartCreator';
import { updateAddress } from '~/ActionCreators/UserCreator';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import AddressForm from '~/Layout/components/ListAddress/AddressForm';
import * as orderAPI from '~/api/orderApi';
import * as addressAPI from '~/api/addressApi';
import swal from 'sweetalert';
import Radio from '~/components/Radio';
import Input from '~/components/Input';
import Select from '~/components/Select';
import Button from '~/components/Button';
import FormPayment from '~/Layout/components/FormPayment';
import ListCartItem from '~/Layout/components/ListCartItem';
import Momo from '~/commons/assets/momo.png';
import Paypal from '~/commons/assets/paypal.png';
import COD from '~/commons/assets/cod.png';
import * as cartAPI from '~/api/cartApi';
import classNames from 'classnames/bind';
import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function CartComponent() {
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const listAddress = useSelector((state) => state.user.address);

  const [newAddress, setNewAddress] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [note, setNote] = useState('');
  const [payment, setPayment] = useState('OFFLINE_CASH_ON_DELIVERY');
  const [address, setAddress] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get('success');

  const shipments = [
    {
      id: 'payment',

      name: 'COD',
      image: COD,
      key: 'OFFLINE_CASH_ON_DELIVERY',
    },
    {
      id: 'payment',

      name: 'MoMo',
      image: Momo,
      key: 'ONLINE_PAYMENT_MOMO',
    },
    // {
    //   id: 'payment',

    //   name: 'Paypal',
    //   image: Paypal,
    //   key: 'ONLINE_PAYMENT_PAYPAL',
    // },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getListAddress();
    getCart();
    if (user.defaultAddress) {
      setAddress(user.defaultAddress.id);
      setEmail(user.email);
      setName(user.defaultAddress.receiverName);
      setPhone(user.defaultAddress.receiverPhone);
    }
  }, [user]);

  useEffect(() => {
    setNewAddress(false);
    if (user.defaultAddress) {
      changeAddress(user.defaultAddress.id);
    }
  }, [listAddress]);

  useEffect(() => {
    if (success) {
      if (success === 'true') {
        swal('Success!', '', 'success');
        dispatch(updateCount(0));
        dispatch(updateCart([]));
        navigate('/history-order');
      } else {
        swal('Failed!', '', 'Failed');
      }
    }
  }, []);

  const getListAddress = async () => {
    const result = await addressAPI.getAddress();

    if (result) {
      dispatch(updateAddress(result));
    }
  };

  const getCart = async () => {
    const result = await cartAPI.getCart();
    if (result) {
      dispatch(updateCart(result));
    }
  };

  const addOrderByCart = async () => {
    const idProductVariations = cart.map((item) => item.productVariation.id);

    const result = await orderAPI.addOrderByCart({
      note: note,
      idAddress: address,
      paymentMethod: payment,
      idProductVariations: idProductVariations,
    });

    if (result) {
      if (result.payUrl) {
        window.location.href = result.payUrl;
      } else {
        swal('Success!', '', 'success');
        navigate('/history-order');
        dispatch(updateCount(0));
        dispatch(updateCart([]));
      }
    } else {
      swal('Failed!', '', 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length > 0) {
      addOrderByCart();
    } else {
      swal('Have no item!', 'Please choose item!', 'warning');
    }
  };

  const changeAddress = (index) => {
    setAddress(index);

    const selectAddress = listAddress.find(
      (item) => item.id === parseInt(index),
    );
    if (selectAddress) {
      setName(selectAddress.receiverName);
      setPhone(selectAddress.receiverPhone);
    }
  };

  return (
    <div className={cx('wrapper')}>
      <div className={cx('cart-details', 'left')}>
        <ListCartItem />
      </div>
      <div className={cx('new-address')}>
        <span className={cx('children-btn')}>New address</span>
        <Button
          className={cx('btn-new')}
          children=""
          text={true}
          rightIcon={
            <FontAwesomeIcon icon={faCirclePlus} className={cx('icon-plus')} />
          }
          onClick={() => {
            setNewAddress(!newAddress);
          }}
        />

        <div
          className={newAddress ? cx('background') : cx('background-hidden')}
          onClick={() => {
            setNewAddress(!newAddress);
          }}
        ></div>
        <div
          className={newAddress ? cx('create-address') : cx('address-hidden')}
        >
          <AddressForm title="NEW ADDRESS" />
        </div>
      </div>
      <div className={cx('form')}>
        <FormPayment
          title="SHIPPING INFORMATION"
          height="auto"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className={cx('form-content')}>
            <div>
              <Input
                type="text"
                placeholder="Your name..."
                className={cx('input', 'name-input', 'payment-input')}
                value={name}
                onChange={(e) => setName(e.target.value)}
                readOnly={true}
              />
              <Input
                type="text"
                placeholder="Your phone..."
                className={cx('input', 'phone-input', 'payment-input')}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                readOnly={true}
              />
            </div>
            <Input
              type="email"
              placeholder="Your email..."
              className={cx('input', 'payment-input')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              readOnly={true}
            />

            <div className={cx('address-option')}>
              <Select
                options={
                  listAddress
                    ? listAddress.map((item) => {
                        const id = 'addres';
                        const value = item.id;
                        const label =
                          item.addressDetail +
                          ', ' +
                          item.addressWard.name +
                          ', ' +
                          item.addressWard.district.name +
                          ', ' +
                          item.addressWard.district.provinceCity.name;
                        return {
                          id: id,
                          value: value,
                          label: label,
                          name: item.receiverName,
                          phone: item.receiverPhone,
                        };
                      })
                    : []
                }
                className={cx('select')}
                select={address}
                onChange={(e) => {
                  changeAddress(e.target.value);
                }}
              />
            </div>

            <Input
              type="text"
              placeholder="Your note..."
              className={cx('input', 'payment-input')}
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className={cx('sub-title')}>PAYMENT METHOD</div>
            {shipments.map((item, index) => {
              return (
                <div key={index}>
                  <Radio
                    obj={item}
                    checked={payment === item.key}
                    onChange={() => setPayment(item.key)}
                  />
                </div>
              );
            })}
            <div className={cx('btn')}>
              <Button
                primary
                children="PAY"
                rounded
                className={cx('pay-btn')}
              />
            </div>
          </div>
        </FormPayment>
      </div>

      <div className={cx('cart-details', 'right')}>
        <ListCartItem />
      </div>
    </div>
  );
}

export default CartComponent;

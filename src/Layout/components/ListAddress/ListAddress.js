import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  update as updateUser,
  updateAddress,
} from '~/ActionCreators/UserCreator';
import * as addressAPI from '~/api/addressApi';
import Button from '~/components/Button';
import AddressForm from './AddressForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import swal from 'sweetalert';
import classNames from 'classnames/bind';
import styles from './ListAddress.module.scss';

const cx = classNames.bind(styles);
const ListAddress = () => {
  const listAddress = useSelector((state) => state.user.address);
  const user = useSelector((state) => state.user.user);

  const [addressEdit, setAddressEdit] = useState(false);
  const [addressId, setAddressId] = useState(-1);

  const dispatch = useDispatch();

  const deleteItem = async (key) => {
    const result = await addressAPI.deleteAddress(key);

    if (result) {
      swal('Delete successful!', '', 'success');
      dispatch(updateAddress(listAddress.filter((item) => item.id != key)));
    } else {
      swal('Failed!', '', 'error');
    }
  };

  const deleteAddress = async (key) => {
    swal({
      title: 'Do you want to remove this address??',
      text: 'Let confirm your decision!!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteItem(key);
      } else {
        swal('Your address is safe!');
      }
    });
  };

  const defaultAddress = async (address) => {
    const result = await addressAPI.updateAddress(address.id, {
      idAddressWard: address.addressWard.id,
      addressDetail: address.addressDetail,
      receiverName: address.receiverName,
      receiverPhone: address.receiverPhone,
      isDefault: true,
    });
    if (result) {
      swal('Change successful!', '', 'success');
      dispatch(
        updateUser({
          ...user,
          defaultAddress: listAddress.find((item) => item.id === address.id),
        }),
      );
    } else {
      swal('Failed!', '', 'error');
    }
  };

  useEffect(() => {
    setAddressEdit(false);
  }, [listAddress]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        {listAddress.length > 0 &&
          listAddress.reverse().map((address) => {
            return (
              address && (
                <div className={cx('address-item')} key={address.id}>
                  <div className={cx('address-content')}>
                    <div className={cx('top')}>
                      <span className={cx('address')}>
                        {address.addressDetail}
                      </span>
                      {address.id === user.defaultAddress.id && (
                        <span className={cx('default')}>Default</span>
                      )}
                    </div>
                    <div className={cx('address-details')}>
                      <span className={cx('detail')}>
                        {address.addressWard.name + ','}
                      </span>
                      <span className={cx('detail')}>
                        {address.addressWard.district.name + ','}
                      </span>
                      <span className={cx('detail')}>
                        {address.addressWard.district.provinceCity.name}
                      </span>
                    </div>
                    <div className={cx('customer-info')}>
                      <span className={cx('name')}>
                        {address.receiverName + '   '}
                      </span>
                      <span className={cx('phone')}>
                        {address.receiverPhone}
                      </span>
                    </div>
                  </div>
                  <div className={cx('action')}>
                    <div className={cx('icon-action')}>
                      <FontAwesomeIcon
                        icon={faEdit}
                        className={cx('icon')}
                        onClick={() => {
                          setAddressEdit(!addressEdit);
                          setAddressId(address.id);
                        }}
                      />
                      <FontAwesomeIcon
                        icon={faTrash}
                        className={
                          address.id === user.defaultAddress.id
                            ? cx('icon', 'disabled')
                            : cx('icon')
                        }
                        onClick={() => {
                          if (address.id !== user.defaultAddress.id) {
                            deleteAddress(address.id);
                          }
                        }}
                      />
                      <div
                        className={
                          addressEdit
                            ? cx('background')
                            : cx('background-hidden')
                        }
                        onClick={() => {
                          setAddressEdit(!addressEdit);
                          setAddressId(-1);
                        }}
                      ></div>
                      <div
                        className={
                          addressEdit && address.id === addressId
                            ? cx('create-address')
                            : cx('address-hidden')
                        }
                        key={address.id}
                      >
                        <AddressForm
                          title="EDIT ADDRESS"
                          addressEdit={address}
                          edit={true}
                        />
                      </div>
                    </div>
                    <Button
                      outline
                      children={'SET DEFAULT'}
                      className={cx('btn')}
                      disabled={address.id === user.defaultAddress.id && true}
                      onClick={() => defaultAddress(address)}
                    />
                  </div>
                </div>
              )
            );
          })}
      </div>
    </div>
  );
};

export default ListAddress;

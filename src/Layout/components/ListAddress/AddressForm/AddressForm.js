import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { update, updateAddress } from '~/ActionCreators/UserCreator';
import * as addressAPI from '~/api/addressApi';
import * as userAPI from '~/api/userApi';
import Select from '~/components/Select';
import Button from '~/components/Button';
import Input from '~/components/Input';
import classNames from 'classnames/bind';
import styles from './AddressForm.module.scss';
//import cookies from 'react-cookies';
import swal from 'sweetalert';

const cx = classNames.bind(styles);
const AddressForm = ({ title = '', edit = false, addressEdit }) => {
  const [options, setOptions] = useState({
    City: [{ value: 0, label: 'City' }],
    District: [{ value: 0, label: 'District' }],
    Ward: [{ value: 0, label: 'Ward' }],
  });

  const listAddress = useSelector((state) => state.user.address);
  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [city, setCity] = useState(0);
  const [district, setDistrict] = useState(0);
  const [ward, setWard] = useState(0);
  const [addressDetail, setAddressDetail] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const isDefault = true;

  const getAllCity = async () => {
    const result = await addressAPI.getAllCity();

    if (result) {
      setOptions({
        ...options,
        City: [
          // ...options.City,
          { value: 0, label: 'City' },
          ...result.map((city) => {
            return { value: city.id, label: city.name };
          }),
        ],
      });
    }

    if (edit) {
      if (addressEdit) {
        console.log('get list city ', options);
        console.log(
          'id city ',
          addressEdit.addressWard.district.provinceCity.id,
        );
        setCity(addressEdit.addressWard.district.provinceCity.id);
        setFullname(addressEdit.receiverName);
      }
    }
  };

  const getDistrictOfCity = async (id) => {
    const result = await addressAPI.getDistrictOfCity(id);
    if (result) {
      setOptions({
        ...options,
        District: [
          { value: 0, label: 'District' },
          ...result.districts.map((district) => {
            return { value: district.id, label: district.name };
          }),
        ],
        Ward: [{ value: 0, label: 'Ward' }],
      });
    }

    if (edit) {
      if (addressEdit) {
        console.log('get list district ', options);
        console.log('id district ', addressEdit.addressWard.district.id);
        setDistrict(addressEdit.addressWard.district.id);
        setPhone(addressEdit.receiverPhone);
      }
    }
  };

  const getWardOfDistrict = async (id) => {
    const result = await addressAPI.getWardOfDistrict(id);
    if (result) {
      setOptions({
        ...options,
        Ward: [
          { value: 0, label: 'Ward' },
          ...result.wards.map((ward) => {
            return { value: ward.id, label: ward.name };
          }),
        ],
      });
    }

    if (edit) {
      if (addressEdit) {
        console.log('get list ward ', options);
        console.log('id ward ', addressEdit.addressWard.id);
        setWard(addressEdit.addressWard.id);
        setAddressDetail(addressEdit.addressDetail);
      }
    }
  };

  const getCurrentUser = async () => {
    const result = await userAPI.currentUser();
    if (result) {
      localStorage.removeItem('user');
      localStorage.setItem('user', result);
      dispatch(update(result));
      // navigate(0);
    }
  };

  const addAddress = async () => {
    const result = await addressAPI.addAddress({
      idAddressWard: ward,
      addressDetail: addressDetail,
      receiverName: fullname,
      receiverPhone: phone,
      isDefault: isDefault,
    });

    if (result) {
      swal('Created new Address!', '', 'success');

      dispatch(updateAddress([...listAddress, result]));

      setPhone('');
      setFullname('');
      setAddressDetail('');
      setCity(0);
      setDistrict(0);
      setWard(0);
      getCurrentUser();

      // navigate('/address');
    } else swal('Failed!', '', 'error');
  };

  const editAddress = async () => {
    const result = await addressAPI.updateAddress(addressEdit.id, {
      idAddressWard: ward,
      addressDetail: addressDetail,
      receiverName: fullname,
      receiverPhone: phone,
      isDefault: addressEdit.id === user.defaultAddress.id,
    });

    if (result) {
      swal('Edit Address successfully!', '', 'success');

      dispatch(
        updateAddress(
          listAddress.map((item) =>
            item.id === addressEdit.id ? result : item,
          ),
        ),
      );
    } else swal('Failed!', '', 'error');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      editAddress();
    } else {
      addAddress();
    }
  };

  useEffect(() => {
    getAllCity();
  }, []);

  useEffect(() => {
    if (options.City.length > 1) {
      getDistrictOfCity(city);
    }
  }, [city]);

  useEffect(() => {
    if (options.District.length > 1) {
      getWardOfDistrict(district);
    }
  }, [district]);

  return (
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <form className={cx('content')} onSubmit={(e) => handleSubmit(e)}>
          <div className={cx('title')}>
            <span>{title}</span>
          </div>
          <div className={cx('select-row')}>
            <Select
              options={options.City}
              className={cx('select')}
              select={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Select
              options={options.District}
              className={cx('select')}
              select={district}
              onChange={(e) => setDistrict(e.target.value)}
            />
            <Select
              options={options.Ward}
              className={cx('select')}
              select={ward}
              onChange={(e) => setWard(e.target.value)}
            />
          </div>
          <div className={cx('address')}>
            <Input
              type="text"
              placeholder={'Address details'}
              value={addressDetail}
              onChange={(e) => setAddressDetail(e.target.value)}
              required={true}
            />
          </div>
          <div className={cx('name')}>
            <Input
              type="text"
              placeholder={'Full name'}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              maxLength={45}
            />
          </div>
          <div className={cx('phone')}>
            <Input
              type="text"
              placeholder={'Phone number'}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              maxLength={10}
              required={true}
            />
          </div>

          <div className={cx('save')}>
            <Button primary children={'Add'} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/AuthAction';
import Spinner from '../../components/Spinner';

const DoctorSignup = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo, success, loading } = userLogin;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    type: '',
    location: '',
    hospital: '',
  });

  const { name, email, phone, gender, type, location } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      register(
        name,
        Number(phone),
        gender,
        email,
        '',
        location,
        '',
        type,
        'Doctor'
      )
    );
    try {
    } catch (e) {
      setError(e.message);
    }
  };

  const updateState = (name) => (e) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  useEffect(() => {
    if (userInfo?.account && success) {
      navigate(`/dashboard/${userInfo.role}`);
    }
  }, [navigate, success, userInfo]);

  return (
    <div className='container p-5' style={{ maxWidth: '500px' }}>
      <h3 className='text-center'>{error}</h3>
      {loading && <Spinner />}
      <h3 className='text-center mb-3'>Doctor Signup</h3>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control'
          id='name'
          placeholder='name'
          onChange={updateState('name')}
        />
        <label html='name'>Full Name</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='email'
          className='form-control'
          id='email'
          placeholder='xx@x.com'
          onChange={updateState('email')}
        />
        <label html='email'>Email address</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='tel'
          className='form-control'
          id='phone'
          placeholder='9956895623'
          onChange={updateState('phone')}
        />
        <label html='phone'>Phone</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control'
          id='type'
          placeholder='Designation'
          onChange={updateState('type')}
        />
        <label html='dob'>Designation</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control'
          id='location'
          placeholder='location'
          onChange={updateState('location')}
        />
        <label html='location'>Location</label>
      </div>

      <button className='btn btn-outline-success' onClick={onSubmit}>
        Signup
      </button>
    </div>
  );
};

export default DoctorSignup;

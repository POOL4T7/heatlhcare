import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/AuthAction';
import Spinner from '../../components/Spinner';

const PatientSignup = () => {
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
    bloodGroup: '',
    location: '',
    dob: '',
  });

  const { name, email, phone, gender, bloodGroup, location, dob } = formData;
  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      register(
        name,
        Number(phone),
        gender,
        email,
        bloodGroup,
        location,
        dob,
        '',
        'Patient'
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
      <h3 className='text-center mb-3'>Signup form</h3>
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
          type='date'
          className='form-control'
          id='dob'
          placeholder='12/07/1999'
          onChange={updateState('dob')}
        />
        <label html='dob'>DOB</label>
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
      <div className='row mb-3'>
        <div className='col-sm-12 col-md-6 mb-3'>
          <select
            className='form-select'
            aria-label='Default select example'
            onChange={updateState('dob')}
          >
            <option value=''>Blood Group</option>
            <option value='A+'>A+</option>
            <option value='A-'>A-</option>
            <option value='B+'>B+</option>
            <option value='B-'>B-</option>
            <option value='AB+'>AB+</option>
            <option value='AB-'>AB-</option>
            <option value='O+'>O+</option>
            <option value='O-'>O-</option>
          </select>
        </div>
        <div className='col-sm-12 col-md-6'>
          <select
            className='form-select'
            aria-label='Default select example'
            onChange={updateState('gender')}
          >
            <option value=''>Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
            <option value='other'>Other</option>
          </select>
        </div>
      </div>
      <button className='btn btn-outline-success' onClick={onSubmit}>
        Signup
      </button>
    </div>
  );
};

export default PatientSignup;

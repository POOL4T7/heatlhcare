import React, { useState } from 'react';
import HealthABI from '../abis/HealthCare.json';

const Signup = () => {
  const [error, setError] = useState('');
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className='container p-5' style={{ maxWidth: '500px' }}>
      <h3 className='text-center mb-3'>Signup form</h3>
      <div className='form-floating mb-3'>
        <input
          type='text'
          className='form-control'
          id='name'
          placeholder='name'
        />
        <label html='name'>Full Name</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='email'
          className='form-control'
          id='email'
          placeholder='xx@x.com'
        />
        <label html='email'>Email address</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='tel'
          className='form-control'
          id='phone'
          placeholder='9956895623'
        />
        <label html='phone'>Phone</label>
      </div>
      <div className='form-floating mb-3'>
        <input
          type='date'
          className='form-control'
          id='dob'
          placeholder='9956895623'
        />
        <label html='dob'>DOB</label>
      </div>
      <button type='submit' className='btn btn-outline-success'>
        Signup
      </button>
    </div>
  );
};

export default Signup;

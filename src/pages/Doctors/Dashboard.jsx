import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
// import { reportsData } from '../../data/reportsData';
import { getDoctorProfileDetails } from '../../actions/UserAction';

const DoctorDashboard = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user, msg } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
    } else if (!user.name && !user.email) {
      dispatch(getDoctorProfileDetails());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, user, userInfo]);

  return (
    <>
      <h3 className='text-center'>{msg}</h3>
      {loading && <Spinner />}
      <div className='card'>
        <div className='card-body pb-0'>
          <ul className='list-group list-group-flush mb-4'>
            <li className='list-group-item border-0'>
              <i className='fas fa-signature'></i> {userInfo?.account}
            </li>
            <li className='list-group-item border-0'>
              <i className='far fa-user-circle'></i>
              {user?.name}
            </li>
            <li className='list-group-item border-0'>
              <i className='fab fa-critical-role'></i>
              Doctor ({user.type})
            </li>
            <li className='list-group-item border-0'>
              <span className='far fa-envelope'></span> {user?.email}
            </li>
            <li className='list-group-item border-0'>
              <span className='far fa-phone'></span> {user?.phone}
            </li>
            <li className='list-group-item border-0'>
              <i className='fas fa-clinic-medical'></i> {user?.hospital}
            </li>

            <li className='list-group-item border-0'>
              <i className='fas fa-map-marker-alt'></i>
              {user?.location}
            </li>
          </ul>
        </div>
      </div>
      <h1 className='text-center p-5'>Patient History</h1>
    </>
  );
};

export default DoctorDashboard;

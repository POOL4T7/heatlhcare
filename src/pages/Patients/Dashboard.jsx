import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfileDetails } from '../../actions/UserAction';
import History from '../../components/Patient/History';
import Spinner from '../../components/Spinner';
import { reportsData } from '../../data/reportsData';

const Dashboard = () => {
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
      dispatch(getUserProfileDetails());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, user, userInfo]);

  return (
    <>
      <h3 className='text-center'>{msg}</h3>
      {loading && <Spinner />}
      <div class='card'>
        <div class='card-body pb-0'>
          <ul class='list-group list-group-flush mb-4'>
            <li class='list-group-item border-0'>
              <i class='fas fa-signature'></i> {userInfo?.account}
            </li>
            <li class='list-group-item border-0'>
              <i class='far fa-user-circle'></i>
              {user.name}
            </li>
            <li class='list-group-item border-0'>
              <i class='fab fa-critical-role'></i>
              Patient
            </li>
            <li class='list-group-item border-0'>
              <span class='far fa-envelope'></span> {user.email}
            </li>
            <li class='list-group-item border-0'>
              <i class='fas fa-tint'></i>
              {user.bloodGroup}
            </li>
            <li class='list-group-item border-0'>
              <span class='far fa-id-badge'></span>
              {user.dob}
            </li>
            <li class='list-group-item border-0'>
              <i class='fas fa-map-marker-alt'></i>
              {user.permanentAddress}
            </li>
          </ul>
        </div>
      </div>
      <h1 className='text-center p-5'>Medical History</h1>
      <History reports={reportsData} />
    </>
  );
};

export default Dashboard;

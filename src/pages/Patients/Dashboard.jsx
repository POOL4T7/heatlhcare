import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUserProfileDetails } from '../../actions/UserAction';

const Dashboard = () => {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    gender: '',
    bloodGroup: '',
    location: '',
    dob: '',
    history: [],
  });
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, user } = userDetails;

  useEffect(() => {
    if (!userInfo) {
      navigate('/register');
    } else if (!user.name && !user.email) {
      dispatch(getUserProfileDetails());
    } else {
      setProfile({
        ...profile,
        name: user.name,
        email: user.name,
        phone: user.phone,
        gender: user.gender,
        bloodGroup: user.bloodGroup,
        location: user.location,
        dob: user.dob,
        history: user.history,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, navigate, user, userInfo]);

  return (
    <>
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
              <span class='far fa-id-badge'></span>
              {user.bloodGroup}
            </li>
            <li class='list-group-item border-0'>
              <span class='far fa-id-badge'></span>
              {user.permanentAddress}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

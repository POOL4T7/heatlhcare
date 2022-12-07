import { Link } from 'react-router-dom';
import { login, logout } from '../actions/AuthAction';
import { useDispatch, useSelector } from 'react-redux';

const Navbar = ({ setError }) => {
  let dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const loginHandler = async () => {
    try {
      await dispatch(login());
    } catch (e) {
      setError(e.message);
    }
  };

  const logoutHandler = () => {
    try {
      dispatch(logout());
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-light bg-light '>
        <div className='container'>
          <Link className='navbar-brand me-2' to='/'>
            <img
              src='https://mdbcdn.b-cdn.net/img/logo/mdb-transaprent-noshadows.webp'
              height='16'
              alt='HealthCare'
              loading='lazy'
              style={{ marginTop: '-1px' }}
            />
          </Link>

          <button
            className='navbar-toggler'
            type='button'
            data-mdb-toggle='collapse'
            data-mdb-target='#navbarButtonsExample'
            aria-controls='navbarButtonsExample'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <i className='fas fa-bars'></i>
          </button>

          <div className='collapse navbar-collapse' id='navbarButtonsExample'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                {userInfo?.role && (
                  <Link
                    className='nav-link'
                    to={`/dashboard/${userInfo?.role}`}
                  >
                    Dashboard
                  </Link>
                )}
              </li>
            </ul>

            <div className='d-flex '>
              {userInfo?.account ? (
                <>
                  {/* <button className='btn btn-dark px-3 me-3'>
                    <i className='fas fa-wallet'>
                      {' '}
                      {userInfo.name.substr(0, 1)}{' '}
                    </i>
                  </button> */}

                  <div className='dropdown'>
                    <button
                      className='btn btn-primary dropdown-toggle'
                      type='button'
                      id='dropdownMenu2'
                      data-mdb-toggle='dropdown'
                      aria-expanded='false'
                    >
                      <i className='fas fa-wallet'>
                        {' '}
                        {userInfo.name.substr(0, 1)}{' '}
                      </i>
                    </button>
                    <ul
                      className='dropdown-menu'
                      aria-labelledby='dropdownMenu2'
                    >
                      <li>
                        <Link
                          to={`/dashboard/${userInfo.role}`}
                          className='dropdown-item'
                          type='button'
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          className='dropdown-item'
                          type='button'
                          onClick={logoutHandler}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <button
                    type='button'
                    className='btn btn-primary px-3 me-2'
                    onClick={loginHandler}
                  >
                    Login
                  </button>
                  <Link to='/register' className='btn btn-link me-3'>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      {/* <nav classNameName='navbar navbar-expand-lg navbar-light bg-light'>
        <div classNameName='container'>
          <a classNameName='navbar-brand' href='/'>
            HP
          </a>
          <button
            classNameName='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span classNameName='navbar-toggler-icon'></span>
          </button>
          <div classNameName='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul classNameName='navbar-nav me-auto mb-2 mb-lg-0'>
              <li classNameName='nav-item'>
                <a classNameName='nav-link active' aria-current='page' href='/'>
                  Home
                </a>
              </li>
            </ul>
            <div classNameName='d-flex'>
              {userInfo?.account ? (
                <>
                  <button classNameName='btn btn-outline-primary mx-1'>
                    {userInfo.name.substr(0, 1)}
                  </button>
                  <button
                    classNameName='btn btn-outline-danger mx-1'
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    classNameName='btn btn-outline-success mx-1'
                    onClick={connectWallet}
                  >
                    Login
                  </button>
                  <Link classNameName='btn btn-outline-success mx-1' to='/register'>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav> */}
    </>
  );
};

export default Navbar;

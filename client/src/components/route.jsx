import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import { api_url } from '../utils/constant';
// make put tit route
// this is centralize route for authentication and this route work same as middleware.
const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(false);
  const Navigate = useNavigate();
  //   const location = useLocation();
  //   console.log(location);
  useEffect(() => {
    axios
      .get(`${api_url}/auth/isAuth`, {
        headers: {
          Authorization: `jwt ${localStorage.getItem('authtoken')}`,
        },
      })
      .then((res) => {
        setIsAuth(true);
      })
      .catch((err) => {
        Navigate('/');
      });
  }, []);
  return isAuth ? (
    <Outlet />
  ) : (
    <div className='h-100 d-flex justify-content-center align-items-center'>
      <Spinner />
    </div>
  );
};
export default ProtectedRoute;

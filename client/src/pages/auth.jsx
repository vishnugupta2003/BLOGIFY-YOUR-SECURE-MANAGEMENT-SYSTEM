import { useEffect, useState } from 'react';
import '../App.css';
import Login from '../components/login';
import Signup from '../components/signup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api_url } from '../utils/constant';
import { Spinner } from 'reactstrap';
export default function Auth() {
  const [action, setAction] = useState('');
  const registerLink = () => {
    document.title = 'Register';
    setAction(' active');
  };
  const loginLink = () => {
    document.title = 'Login';
    setAction('');
  };
  const Navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(true);
  useEffect(() => {
    axios
      .get(`${api_url}/auth/isAuth`, {
        headers: {
          Authorization: `jwt ${localStorage.getItem('authtoken')}`,
        },
      })
      .then((res) => {
        Navigate('/home');
      })
      .catch((err) => {
        setIsAuth(false);
      });
  }, []);
  return !isAuth ? (
    <div>
      {action === '' ? (
        <Login action={action} registerLink={registerLink} />
      ) : (
        <Signup action={action} loginLink={loginLink} />
      )}
    </div>
  ) : (
    <div className='h-100 d-flex justify-content-center align-items-center'>
      <Spinner />
    </div>
  );
}

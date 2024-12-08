import React, { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Spinner } from 'reactstrap';
import { api_url } from '../utils/constant';
export default function login(props) {
  const { action, registerLink } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({ username: '', password: '' });

  const onValueChange = (field) => (event) => {
    setValues({ ...values, [field]: event.target.value });
  };

  const onLoginClick = () => {
    // fetch method response always execute in then block even status code 400 and 500 series and catch block always execute on wrong api.
    // but axios method 200 series status code in then block and another series in catch block so
    // fetch all conditions execute in then block and status code does not go in catch block but axios handle status code in catch block.
    // we can configure all default things in axios like default url, headers, method, timeout etc. but in fetch no configuration.
    // fetch is inbuilt api of browser that only work on frontend but axios is a library that work on frontend and backend both(in node.js).
    // fetch('http://localhost:4000/api/auth/login', {
    //   method: 'POST',
    //   body: JSON.stringify(values),
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     notify(res.status);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    if (values.username.length === 0 || values.password.length === 0) {
      return toast.error('Please fill all fields');
    }
    setIsLoading(true);
    axios
      .post(`${api_url}/auth/login`, values)
      .then((res) => {
        toast.success(res?.data?.status);
        setIsLoading(false);
        const { user, token } = res.data;
        localStorage.setItem('authtoken', token);
        localStorage.setItem('user', JSON.stringify(user));
        // sessionStorage.setItem('authtoken', token);
        // sessionStorage.setItem('user', JSON.stringify(user));

        // redirect to home page
        window.location.href = '/home'; // oldMethod for navigation
      })
      .catch((err) => {
        toast.error(err?.response?.data?.status || 'something went wrong');
        setIsLoading(false);
      });
  };
  return (
    <div className='main-containers'>
      <div className={`wrapper${action}`}>
        <div className='form-box login'>
          <form>
            <h1>Login</h1>
            <div className='input-box'>
              <input
                type='text'
                onChange={onValueChange('username')}
                placeholder='Username'
                required
              />
              <FaUser className='icon' />
            </div>
            <div className='input-box'>
              <input
                type='password'
                onChange={onValueChange('password')}
                placeholder='password'
                required
              />
              <FaLock className='icon' />
            </div>
            <div className='remember-forgot'>
              <label>
                <input type='checkbox' required />
                Remeber me
              </label>
              <a href='#'>forgot password</a>
            </div>

            <button
              color='primary'
              type='button'
              onClick={onLoginClick}
              value='login'
            >
              {isLoading && (
                <div>
                  <Spinner size='sm' />
                </div>
              )}
              {!isLoading && <span>Login</span>}
            </button>

            <div className='register-link'>
              <p>
                Don't have an account?{' '}
                <a href='#' onClick={registerLink}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
// local storage holds data permanently.
// session storage hold data temporary until tab is closed.
// useLocation hook give the all information of current page like query, params ,data etc.
// useNavigate is navigate the page to given path.

import React from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
export default function Signup(props) {
  const { action, loginLink } = props;
  return (
    <div className='main-containers'>
      <div className={`wrapper${action}`}>
        <div className='form-box register'>
          <form action=' '>
            <h1>Register</h1>
            <div className='input-box'>
              <input type='text' placeholder='Username' required />
              <FaUser className='icon' />
            </div>
            <div className='input-box'>
              <input type='email' placeholder='Email' required />
              <FaEnvelope className='icon' />
            </div>
            <div className='input-box'>
              <input type='password' placeholder='password' required />
              <FaLock className='icon' />
            </div>
            <div className='remember-forgot'>
              <label>
                <input type='checkbox' />I agree to the terms & conditions
              </label>
            </div>
            <button type='submit' value='Register'>
              Register
            </button>
            <div className='register-link'>
              <p>
                Already have an account?{' '}
                <a href='#' onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

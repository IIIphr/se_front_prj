import './Signup.css';
import Navbar from './Navbar';
import { Fragment } from 'react';

function Signup() {
  return (
    <Fragment>
      <Navbar />
      <div className='signup_root'>
        <h1 className='rtl'>ثبت نام</h1>
      </div>
    </Fragment>
  );
}

export default Signup;

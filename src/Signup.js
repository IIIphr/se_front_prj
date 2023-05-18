import { Link } from 'react-router-dom';
import './Signup.css';
import Navbar from './Navbar';
import { Fragment } from 'react';

function Signup() {
  return (
    <Fragment>
      <Navbar />
      <div className='login_root'>
        <h1>ثبت نام</h1>
        <Link to='/'>صفحه‌ی اصلی</Link>
      </div>
    </Fragment>
  );
}

export default Signup;

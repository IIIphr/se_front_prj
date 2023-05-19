import './Success.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function Success() {
  return (
    <Fragment>
      <Navbar />
      <div className='success_root'>
        <h1 className='rtl'>پرداخت موفقیت آمیز بود!</h1>
        <Link className='rtl' to='/'>بازگشت به صفحه‌ی اصلی</Link>
      </div>
    </Fragment>
  );
}

export default Success;

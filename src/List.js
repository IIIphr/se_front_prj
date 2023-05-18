import { Fragment } from 'react';
import './List.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

function List() {
  return (
    <Fragment>
      <Navbar />
      <div className='list_root'>
        <h1>لیست کدها</h1>
        <Link to='/'>صفحه‌ی اصلی</Link>
      </div>
    </Fragment>
  );
}

export default List;

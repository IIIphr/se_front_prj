import './List.css';
import { Link } from 'react-router-dom';

function List() {
  return (
    <div className='list_root'>
      <h1>لیست کدها</h1>
      <Link to='/'>صفحه‌ی اصلی</Link>
    </div>
  );
}

export default List;

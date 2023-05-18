import { Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  return (
    <div className='login_root'>
      <h1>ثبت نام</h1>
      <Link to='/'>صفحه‌ی اصلی</Link>
    </div>
  );
}

export default Signup;

import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { change_f_name, change_type } from './userSlice';
import { useEffect, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

function Profile() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.user_f_name);
  const user_type = useSelector((state) => state.user.user_type);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['user_type']);

  useEffect(() => {
    if(user_type == null){
      if(cookies.user_type !== "undefined" && cookies.user_type){
        navigate('/login');
      }
    }
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className='profile_root'>
        <h1 className='rtl'>پروفایل {name}</h1>
        <button onClick={() => {
          dispatch(change_f_name(""));
          dispatch(change_type(null));
          removeCookie('user_f_name');
          removeCookie('user_type');
          navigate('/');
        }}>خروج</button>
        <Link to='/add_coupun'>فروش کد</Link>
      </div>
    </Fragment>
  );
}

export default Profile;

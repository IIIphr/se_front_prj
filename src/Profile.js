import './Profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { change_f_name, change_type, change_uni_id } from './userSlice';
import { useEffect, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

function Profile() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.user_f_name);
  const user_type = useSelector((state) => state.user.user_type);
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies(['user_type', 'user_type', 'user_uni_id', 'user_credit']);

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
        <button className='ui_btn' onClick={() => {
          dispatch(change_f_name(""));
          dispatch(change_type(null));
          dispatch(change_uni_id(-1));
          removeCookie('user_f_name');
          removeCookie('user_type');
          removeCookie('user_uni_id');
          navigate('/');
        }}>خروج</button>
        <p>موجودی: {cookies.user_credit}</p>
        <Link to='/add_coupun'>فروش کد</Link>
      </div>
    </Fragment>
  );
}

export default Profile;

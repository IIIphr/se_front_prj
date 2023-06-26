import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Fragment, useEffect } from 'react';
import { change_f_name, change_stu_id, change_type, change_uni_id } from './userSlice';
import { Link } from 'react-router-dom';
import Navbarr from './Navbarr';

function App() {
  const name = useSelector((state) => state.user.user_f_name);
  const user_type = useSelector((state) => state.user.user_type);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user_f_name', 'user_type', 'user_uni_id', 'user_stu_id']);

  useEffect(() => {
    if(user_type == null){
      if(cookies.user_type !== "undefined" && cookies.user_type){
        dispatch(change_f_name(cookies.user_f_name));
        dispatch(change_type(cookies.user_type));
        dispatch(change_uni_id(cookies.user_uni_id));
        dispatch(change_stu_id(cookies.user_stu_id));
      }
    }
  }, []);

  return (
    <Fragment>
      <Navbarr />
      <div className='app_root'>
        <h1 className='rtl'>به سامانه‌ی تبادل کد فراموشی خوش آمدید</h1>
        {user_type != null ? 
        <Link className='rtl' to='/list'>لیست کدها</Link>:
        <p className='rtl'>برای دیدن کدها باید وارد شوید!</p>}
      </div>
    </Fragment>
  );
}

export default App;

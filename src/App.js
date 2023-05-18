import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Fragment, useEffect } from 'react';
import { change_f_name, change_type } from './userSlice';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  const name = useSelector((state) => state.user.user_f_name);
  const user_type = useSelector((state) => state.user.user_type);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies(['user_f_name']);

  useEffect(() => {
    if(user_type == null){
      if(cookies.user_type !== "undefined" && cookies.user_type){
        dispatch(change_f_name(cookies.user_f_name));
        dispatch(change_type(cookies.user_type));
      }
    }
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className='app_root'>
        <h1>به سامانه‌ی تبادل کد فراموشی خوش آمدید</h1>
        <Link to='/list'>لیست کدها</Link>
      </div>
    </Fragment>
  );
}

export default App;

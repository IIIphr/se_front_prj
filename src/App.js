import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Fragment, useEffect } from 'react';
import { change_f_name } from './userSlice';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  const name = useSelector((state) => state.user.user_f_name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies] = useCookies(['user_f_name']);

  useEffect(() => {
    if(cookies.user_f_name !== "undefined" && cookies.user_f_name){
      dispatch(change_f_name(cookies.user_f_name));
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

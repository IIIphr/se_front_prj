import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { change_name } from './userSlice';
import { useNavigate } from 'react-router-dom';

function App() {
  const name = useSelector((state) => state.user.user_name);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user_name']);

  useEffect(() => {
    if(cookies.user_name != "undefined" && cookies.user_name){
      dispatch(change_name(cookies.user_name));
      navigate('/');
    }
  }, []);

  return (
    <div className='app_root'>
      <h1>به سامانه‌ی تبادل کد فراموشی خوش آمدید</h1>
      <p>سلام {name}!</p>
      <a href='/login'>ورود به حساب</a>
      <a href='/list'>لیست کدها</a>
    </div>
  );
}

export default App;

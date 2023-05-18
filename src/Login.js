import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { change_name } from './userSlice';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}

function Login() {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.user_name);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user_name']);

  useEffect(() => {
    if(cookies.user_name != "undefined" && cookies.user_name){
      dispatch(change_name(cookies.user_name));
      navigate('/login');
    }
  }, []);

  return (
    <div className='login_root'>
      <h1>ورود</h1>
      <p>سلام {name}!</p>
      <input type='text' id='name_input' value={input} onInput={e => setInput(e.target.value)}></input>
      <button onClick={() => {
        dispatch(change_name(input));
        setCookie('user_name', input, { path: '/', expires: addMonths(new Date(), 1) });
      }}>تغییر نام</button>
      <button onClick={() => {
        dispatch(change_name(""));
        removeCookie('user_name');
      }}>خروج</button>
      <a href='/signup'>ثبت نام</a>
      <a href='/'>صفحه‌ی اصلی</a>
    </div>
  );
}

export default Login;

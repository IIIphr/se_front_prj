import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { change_f_name, change_type } from './userSlice';
import { useState, useEffect, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

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
  const name = useSelector((state) => state.user.user_f_name);
  const user_type = useSelector((state) => state.user.user_type);
  const [input, setInput] = useState('');
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['user_f_name']);

  useEffect(() => {
    if(user_type == null){
      if(cookies.user_type !== "undefined" && cookies.user_type){
        dispatch(change_f_name(cookies.user_f_name));
        dispatch(change_type(cookies.user_type));
        navigate('/');
      }
    }
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className='login_root'>
        <h1>ورود</h1>
        <input type='text' id='name_input' value={input} onInput={e => setInput(e.target.value)}></input>
        <button onClick={() => {
          dispatch(change_f_name(input));
          dispatch(change_type("user"));
          setCookie('user_f_name', input, { path: '/', expires: addMonths(new Date(), 1) });
          setCookie('user_type', "user", { path: '/', expires: addMonths(new Date(), 1) });
          navigate('/');
        }}>ورود</button>
        <Link to='/signup'>ثبت نام</Link>
        <Link to='/'>صفحه‌ی اصلی</Link>
      </div>
    </Fragment>
  );
}

export default Login;

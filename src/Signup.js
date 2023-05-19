import './Signup.css';
import { useDispatch, useSelector } from 'react-redux';
import { change_f_name, change_type, change_uni_id } from './userSlice';
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

function Signup() {
  const dispatch = useDispatch();
  const user_type = useSelector((state) => state.user.user_type);
  const [name_input, set_name_input] = useState('');
  const [uni_input, set_uni_input] = useState(-1);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user_f_name', 'user_type', 'user_uni_id']);

  useEffect(() => {
    if(user_type == null){
      if(cookies.user_type !== "undefined" && cookies.user_type){
        dispatch(change_f_name(cookies.user_f_name));
        dispatch(change_type(cookies.user_type));
        dispatch(change_uni_id(cookies.user_uni_id));
        navigate('/profile');
      }
    }
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className='signup_root'>
        <h1 className='rtl'>ثبت نام</h1>
        <p className='rtl'>نام</p>
        <input className='rtl' type='text' id='name_input' value={name_input} onInput={e => set_name_input(e.target.value)}></input>
        <p className='rtl'>دانشگاه</p>
        <input type='number' id='uni_input' value={uni_input} onInput={e => set_uni_input(e.target.value)}></input>
        <button className='ui_btn' onClick={() => {
          dispatch(change_f_name(name_input));
          dispatch(change_type("user"));
          dispatch(change_uni_id(uni_input));
          setCookie('user_f_name', name_input, { path: '/', expires: addMonths(new Date(), 1) });
          setCookie('user_uni_id', uni_input, { path: '/', expires: addMonths(new Date(), 1) });
          setCookie('user_type', "user", { path: '/', expires: addMonths(new Date(), 1) });
          navigate('/');
        }}>ثبت نام</button>
        <Link to='/login'>ورود</Link>
      </div>
    </Fragment>
  );
}

export default Signup;

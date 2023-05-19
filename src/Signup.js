import './Signup.css';
import { useDispatch, useSelector } from 'react-redux';
import { change_credit, change_f_name, change_l_name, change_stu_id, change_type, change_uni_id } from './userSlice';
import { useState, useEffect, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';
import { RotatingLines } from 'react-loader-spinner';

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
  const [is_loading, set_loading] = useState(0);
  const [name_input, set_name_input] = useState('');
  const [last_name_input, set_last_name_input] = useState('');
  const [password_input, set_password_input] = useState('');
  const [uni_input, set_uni_input] = useState(-1);
  const [id_input, set_id_input] = useState(-1);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user_f_name', 'user_type', 'user_uni_id', 'user_stu_id']);

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
        <p className='rtl'>نام خانوادگی</p>
        <input className='rtl' type='text' id='last_name_input' value={last_name_input} onInput={e => set_last_name_input(e.target.value)}></input>
        <p className='rtl'>دانشگاه</p>
        <input type='number' id='uni_input' value={uni_input} onInput={e => set_uni_input(e.target.value)}></input>
        <p className='rtl'>شماره‌ی دانشجویی</p>
        <input type='text' id='id_input' value={id_input} onInput={e => set_id_input(e.target.value)}></input>
        <p className='rtl'>رمز</p>
        <input type='text' id='password_input' value={password_input} onInput={e => set_password_input(e.target.value)}></input>
        {is_loading == 0 ?
        <button className='ui_btn' onClick={() => {
          set_loading(1); 
          fetch("http://localhost:4000/api/signup",
          {
            method: "POST",
            body: JSON.stringify({
              "studentid": id_input,
              "firstname": name_input,
              "lastname": last_name_input,
              "universityid": uni_input,
              "password": password_input, 
              "currentmoney": 0
            })
          })
            .then(res => res.json())
            .then((result) => {
              dispatch(change_f_name(name_input));
              dispatch(change_type("user"));
              dispatch(change_uni_id(uni_input));
              dispatch(change_credit(0));
              dispatch(change_l_name(last_name_input));
              dispatch(change_stu_id(id_input));
              setCookie('user_f_name', name_input, { path: '/', expires: addMonths(new Date(), 1) });
              setCookie('user_uni_id', uni_input, { path: '/', expires: addMonths(new Date(), 1) });
              setCookie('user_stu_id', id_input, { path: '/', expires: addMonths(new Date(), 1) });
              setCookie('user_type', "user", { path: '/', expires: addMonths(new Date(), 1) });
              navigate('/');
            });
        }}>ثبت نام</button> :
        <RotatingLines
          strokeColor="black"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true}
        />}
        <Link to='/login'>ورود</Link>
      </div>
    </Fragment>
  );
}

export default Signup;

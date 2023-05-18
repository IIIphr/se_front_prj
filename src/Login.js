import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { change_name } from './userSlice';
import { useState } from 'react';

function Login(props) {
  const dispatch = useDispatch();
  const name = useSelector((state) => state.user.user_name);
  const [input, setInput] = useState('');

  return (
    <div className='login_root'>
      <h1>ورود</h1>
      <p>سلام {name}!</p>
      <input type='text' id='name_input' value={input} onInput={e => setInput(e.target.value)}></input>
      <button onClick={() => dispatch(change_name(input))}>تغییر نام</button>
      <a href='/signup'>ثبت نام</a>
      <a href='/'>صفحه‌ی اصلی</a>
    </div>
  );
}

export default Login;

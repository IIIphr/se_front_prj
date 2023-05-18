import './App.css';
import { useSelector } from 'react-redux';

function App() {
  const name = useSelector((state) => state.user.user_name);

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

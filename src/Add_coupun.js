import './Add_coupun.css';
import { useSelector } from 'react-redux';
import { useEffect, Fragment, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

function Add_coupun() {
  const [coupun_code, set_coupun_code] = useState('');
  const [coupun_price, set_coupun_price] = useState(1000);
  const user_type = useSelector((state) => state.user.user_type);
  const navigate = useNavigate();
  const [cookies] = useCookies(['user_type']);

  useEffect(() => {
    if(user_type == null){
      if(cookies.user_type !== "undefined" && cookies.user_type){
        navigate('/login');
      }
    }
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className='add_coupun_root'>
        <h1 className='rtl'>فروش کد</h1>
        <p className='rtl'>کد فراموشی:</p>
        <input type='text' id='code_input' value={coupun_code} onInput={e => set_coupun_code(e.target.value)}></input>
        <p className='rtl'>قیمت:</p>
        <input type='number' id='price_input' value={coupun_price} onInput={e => set_coupun_price(e.target.value)}></input>
        <button className='ui_btn' onClick={() => console.log("Submitted: "+coupun_code+"-"+coupun_price)}>ثبت کد</button>
      </div>
    </Fragment>
  );
}

export default Add_coupun;

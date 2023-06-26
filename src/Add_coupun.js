import './Add_coupun.css';
import { useSelector } from 'react-redux';
import { useEffect, Fragment, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Navbarr from './Navbarr';
import { RotatingLines } from 'react-loader-spinner';

function Add_coupun() {
  const [coupun_code, set_coupun_code] = useState('');
  const [canteen_code, set_canteen_code] = useState('');
  const [name_input, set_name_input] = useState('');
  const [is_loading, set_loading] = useState(0);
  const [coupun_price, set_coupun_price] = useState(1000);
  const user_type = useSelector((state) => state.user.user_type);
  const navigate = useNavigate();
  const [cookies] = useCookies(['user_type', 'user_uni_id', 'user_stu_id']);

  useEffect(() => {
    if(user_type == null){
      if(cookies.user_type !== "undefined" && cookies.user_type){
        navigate('/login');
      }
    }
  }, []);

  return (
    <Fragment>
      <Navbarr />
      <div className='add_coupun_root'>
        <h1 className='rtl'>فروش کد</h1>
        <p className='rtl'>کد فراموشی:</p>
        <input type='text' id='code_input' value={coupun_code} onInput={e => set_coupun_code(e.target.value)}></input>
        <p className='rtl'>سلف:</p>
        <input type='text' id='canteen_input' value={canteen_code} onInput={e => set_canteen_code(e.target.value)}></input>
        <p className='rtl'>نام غذا:</p>
        <input type='text' id='name_input' value={name_input} onInput={e => set_name_input(e.target.value)}></input>
        <p className='rtl'>قیمت:</p>
        <input type='number' id='price_input' value={coupun_price} onInput={e => set_coupun_price(e.target.value)}></input>
        {is_loading == 0 ?
        <button className='ui_btn' onClick={() => {
          console.log(JSON.stringify({
            "_id": -1,
            "price": coupun_price,
            "studentid": cookies.user_stu_id,
            "universityid": cookies.user_uni_id,
            "canteenid": canteen_code,
            "code": coupun_code,
            "foodname": name_input
          }));
          set_loading(1); 
          fetch("http://localhost:4000/api/sell",
          {
            method: "POST",
            body: JSON.stringify({
              "_id": -1,
              "price": Number(coupun_price),
              "studentid": cookies.user_stu_id,
              "universityid": cookies.user_uni_id,
              "canteenid": canteen_code,
              "code": coupun_code,
              "foodname": name_input
            })
          })
            .then((result) => {
              navigate('/');
            });
        }}>ثبت کد</button> :
        <RotatingLines
          strokeColor="black"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={true}
        />}
      </div>
    </Fragment>
  );
}

export default Add_coupun;

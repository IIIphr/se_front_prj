import './Add_coupun.css';
import { useSelector } from 'react-redux';
import { useEffect, Fragment, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import Navbarr from './Navbarr';
import { RotatingLines } from 'react-loader-spinner';
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { change_credit, change_f_name, change_l_name, change_stu_id, change_type, change_uni_id } from "./userSlice";
import Spinner from "react-bootstrap/Spinner";

// for adding coupun
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
    if (user_type == null) {
      if (cookies.user_type !== "undefined" && cookies.user_type) {
        navigate('/login');
      }
    }
  }, []);

  return (

    // <Fragment>
    //   <Navbarr />
    //   <div className='add_coupun_root'>
    //     <h1 className='rtl'>فروش کد</h1>
    //     <p className='rtl'>کد فراموشی:</p>
    //     <input type='text' id='code_input' value={coupun_code} onInput={e => set_coupun_code(e.target.value)}></input>
    //     <p className='rtl'>سلف:</p>
    //     <input type='text' id='canteen_input' value={canteen_code} onInput={e => set_canteen_code(e.target.value)}></input>
    //     <p className='rtl'>نام غذا:</p>
    //     <input type='text' id='name_input' value={name_input} onInput={e => set_name_input(e.target.value)}></input>
    //     <p className='rtl'>قیمت:</p>
    //     <input type='number' id='price_input' value={coupun_price} onInput={e => set_coupun_price(e.target.value)}></input>
    //     {is_loading == 0 ?
    //     <button className='btn btn-outline-dark text-center rtl' onClick={() => {
    //       console.log(JSON.stringify({
    //         "_id": -1,
    //         "price": coupun_price,
    //         "studentid": cookies.user_stu_id,
    //         "universityid": cookies.user_uni_id,
    //         "canteenid": canteen_code,
    //         "code": coupun_code,
    //         "foodname": name_input
    //       }));
    //       set_loading(1);
    //       fetch("http://localhost:4000/api/sell",
    //       {
    //         method: "POST",
    //         body: JSON.stringify({
    //           "_id": -1,
    //           "price": Number(coupun_price),
    //           "studentid": cookies.user_stu_id,
    //           "universityid": cookies.user_uni_id,
    //           "canteenid": canteen_code,
    //           "code": coupun_code,
    //           "foodname": name_input
    //         })
    //       })
    //         .then((result) => {
    //           navigate('/');
    //         });
    //     }}>ثبت کد</button> :
    //     <RotatingLines
    //       strokeColor="black"
    //       strokeWidth="5"
    //       animationDuration="0.75"
    //       width="50"
    //       visible={true}
    //     />}
    //   </div>
    // </Fragment>
    <Fragment>
      <Navbarr />
      <Container className=' d-flex flex-column justify-content-center align-items-center min-vh-75'>
        <h3>فروش کد</h3>

        <Form className='d-flex flex-column justify-content-evenly align-items-center min-vh-50'>
          <Form.Group dir='rtl'>
            <Form.Label >کد فراموشی:</Form.Label>
            <Form.Control dir='ltr' type="text" value={coupun_code} onInput={e => set_coupun_code(e.target.value)} />
          </Form.Group>

          <Form.Group dir='rtl'>
            <Form.Label dir='rtl'>سلف:</Form.Label>
            <Form.Control dir='ltr' type="text" value={canteen_code} onInput={e => set_canteen_code(e.target.value)} />

          </Form.Group>

          <Form.Group dir='rtl'>
            <Form.Label dir='rtl'>نام غذا:</Form.Label>
            <Form.Control dir='ltr' type="text" value={name_input} onInput={e => set_name_input(e.target.value)} />
          </Form.Group>
          <Form.Group dir='rtl'>
            <Form.Label dir='rtl'>قیمت:</Form.Label>
            <Form.Control dir='ltr' type="number" value={coupun_price} onInput={e => set_coupun_price(e.target.value)} />
          </Form.Group>
          {is_loading == 0 ?
            <button className='btn btn-outline-dark text-center rtl w-100' onClick={() => {
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
            <button className='btn btn-outline-dark text-center rtl w-100' disabled>
              <Spinner animation='border' size='sm' />
            </button>}
        </Form>
      </Container>
    </Fragment>
  );
}

export default Add_coupun;

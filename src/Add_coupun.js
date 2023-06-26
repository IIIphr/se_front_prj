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
import Card from "react-bootstrap/Card";
import ReactDOM from 'react-dom';

// for adding coupun
function Add_coupun() {
  const [coupun_code, set_coupun_code] = useState('');
  const [canteen_code, set_canteen_code] = useState('');
  const [name_input, set_name_input] = useState('');
  const [is_loading, set_loading] = useState(0);
  const [coupun_price, set_coupun_price] = useState(1000);
  const user_type = useSelector((state) => state.user.user_type);
  const [validated, set_validated] = useState(false);
  const [focused, set_focused] = useState(false);
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
    <Fragment>
      <Navbarr />
      <Container className='d-flex flex-column justify-content-center align-items-center min-vh-75'>
        <Card bg='dark' text='light' className='min-vw-90 d-flex flex-column text-center p-3 m-3'>
          <Card.Body className='d-flex flex-column justify-content-evenly align-items-center min-vh-75 min-vw-75'>
            <h3>فروش کد</h3>
            <Form noValidate validated={validated} className='d-flex flex-column justify-content-evenly align-items-center min-vh-50 text-dark'>
              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="کد فراموشی">
                  <Form.Control
                    required
                    ref={r => { if (r && !focused) { ReactDOM.findDOMNode(r).focus(); set_focused(true); } }}
                    dir='ltr'
                    onChange={e => set_coupun_code(e.target.value)}
                    type="text"
                    placeholder="کد فراموشی" />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="سلف">
                  <Form.Control
                    required
                    dir='ltr'
                    onChange={e => set_canteen_code(e.target.value)}
                    type="text"
                    placeholder="سلف" />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="غذا">
                  <Form.Control
                    required
                    dir='ltr'
                    onChange={e => set_name_input(e.target.value)}
                    type="text"
                    placeholder="غذا" />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="قیمت">
                  <Form.Control
                    required
                    dir='ltr'
                    onChange={e => set_coupun_price(e.target.value)}
                    type="number"
                    placeholder="قیمت" />
                </FloatingLabel>
              </Form.Group>

              {is_loading == 0 ?
                <button className='btn btn-outline-light text-center rtl w-100' onClick={() => {
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
                <button className='btn btn-outline-light text-center rtl w-100' disabled>
                  <Spinner animation='border' size='sm' />
                </button>}
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}

export default Add_coupun;

import './Profile.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, Fragment, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Navbarr from './Navbarr';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Spinner from 'react-bootstrap/Spinner';
import Toast from 'react-bootstrap/Toast';
import { change_credit, change_f_name, change_l_name, change_password } from './userSlice';
import { ToastContainer } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}

function Profile() {
  const name = useSelector((state) => state.user.user_f_name);
  const l_name = useSelector((state) => state.user.user_l_name);
  const user_type = useSelector((state) => state.user.user_type);
  const user_id = useSelector((state) => state.user.user_id);
  const user_stu_id = useSelector((state) => state.user.user_stu_id);
  const user_uni_id = useSelector((state) => state.user.user_uni_id);
  const user_password = useSelector((state) => state.user.user_password);
  const user_credit = useSelector((state) => state.user.user_credit);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated_f, set_validated_f] = useState(false);
  const [validated_l, set_validated_l] = useState(false);
  const [validated_p, set_validated_p] = useState(false);
  const [f_name_input, set_f_name_input] = useState(name);
  const [l_name_input, set_l_name_input] = useState(l_name);
  const [password_input, set_password_input] = useState(user_password);
  const [cookies, setCookie] = useCookies(['user_type', 'user_f_name']);
  const [is_loading_f, set_loading_f] = useState(0);
  const [is_loading_l, set_loading_l] = useState(0);
  const [is_loading_p, set_loading_p] = useState(0);
  const [show_tf, set_show_tf] = useState(false);
  const [show_tl, set_show_tl] = useState(false);
  const [show_tp, set_show_tp] = useState(false);
  const [show_tm, set_show_tm] = useState(false);
  const [popup, set_popup] = useState(false);
  const [money, set_money] = useState(0);

  const handle_money = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/update-money",
      {
        method: "POST",
        body: JSON.stringify({
          "user": {
            "_id": null,
            "studentid": user_stu_id,
            "firstname": null,
            "lastname": null,
            "universityid": user_uni_id,
            "password": user_password,
            "currentmoney": null,
            "coupons": []
          },
          "money": Number(money)
        })
      })
      .then(() => {
        dispatch(change_credit(user_credit + parseInt(money)));
        set_popup(false);
        set_show_tm(true);
      });
  };

  useEffect(() => {
    if (user_type == null) {
      if (cookies.user_type !== "undefined" && cookies.user_type) {
        navigate('/login');
      }
    }
  }, [user_type, cookies.user_type]);

  return (
    <Fragment>
      <Navbarr />
      <Modal
        show={popup}
        onHide={() => { set_popup(false) }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>افزایش موجودی</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handle_money}>
            <Form.Group>
              <FloatingLabel dir='rtl' className='custom-class' label="مبلغ به ریال">
                <Form.Control
                  dir='ltr'
                  onChange={e => set_money(e.target.value)}
                  defaultValue={money}
                  type='number'
                  placeholder="مبلغ به ریال" />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { set_popup(false) }}>
            بستن
          </Button>
          <Button variant="primary" onClick={handle_money}>پرداخت</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer className='p-3' position='bottom-center' style={{ zIndex: 5 }}>
        <Toast onClose={() => set_show_tf(false)} show={show_tf} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">تغییر</strong>
          </Toast.Header>
          <Toast.Body>نام شما تغییر کرد</Toast.Body>
        </Toast>
        <Toast onClose={() => set_show_tl(false)} show={show_tl} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">تغییر</strong>
          </Toast.Header>
          <Toast.Body>نام خانوادگی شما تغییر کرد</Toast.Body>
        </Toast>
        <Toast onClose={() => set_show_tp(false)} show={show_tp} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">تغییر</strong>
          </Toast.Header>
          <Toast.Body>رمز شما تغییر کرد</Toast.Body>
        </Toast>
        <Toast onClose={() => set_show_tm(false)} show={show_tm} delay={3000} autohide>
          <Toast.Header>
            <strong className="me-auto">تغییر</strong>
          </Toast.Header>
          <Toast.Body>موجودی شما تغییر کرد</Toast.Body>
        </Toast>
      </ToastContainer>
      <Container className='d-flex flex-column justify-content-center align-items-center min-vh-75'>
        <Card bg='dark' text='light' className='min-vw-90 d-flex flex-column text-center p-3 m-3'>
          <Card.Body className='d-flex flex-column justify-content-between align-items-center min-vh-75 min-vw-75'>
            <h3 className='text-center rtl mb-5'>پروفایل {name}</h3>
            <Form noValidate validated={validated_f} className='min-w-350px w-30 d-flex flex-row-reverse justify-content-between align-items-center text-dark'>
              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="نام">
                  <Form.Control
                    required
                    dir='rtl'
                    onChange={e => set_f_name_input(e.target.value)}
                    type="text"
                    defaultValue={name}
                    placeholder="نام" />
                </FloatingLabel>
              </Form.Group>

              {is_loading_f == 0 ?
                <button className='btn btn-outline-light text-center rtl h-100 w-30' onClick={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  if (form.checkValidity() === false) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                  else {
                    set_validated_f(true);
                    set_loading_f(1);
                    fetch("http://localhost:4000/api/user",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          "studentid": user_stu_id,
                          "universityid": user_uni_id,
                          "firstname": f_name_input,
                          "lastname": l_name,
                          "password": user_password
                        })
                      })
                      .then(() => {
                        dispatch(change_f_name(f_name_input));
                        setCookie('user_f_name', f_name_input, { path: '/', expires: addMonths(new Date(), 1) });
                        set_loading_f(0);
                        set_show_tf(true);
                      });
                  }
                }}>تغییر</button> :
                <button className='btn btn-outline-light text-center rtl w-30' disabled>
                  <Spinner animation='border' size='sm' />
                </button>}
            </Form>
            <Form noValidate validated={validated_l} className='min-w-350px w-30 d-flex flex-row-reverse justify-content-between align-items-center text-dark'>
              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="نام خانوادگی">
                  <Form.Control
                    required
                    dir='rtl'
                    onChange={e => set_l_name_input(e.target.value)}
                    defaultValue={l_name}
                    type="text"
                    placeholder="نام خانوادگی" />
                </FloatingLabel>
              </Form.Group>

              {is_loading_l == 0 ?
                <button className='btn btn-outline-light text-center rtl w-30' onClick={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  if (form.checkValidity() === false) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                  else {
                    set_validated_l(true);
                    set_loading_l(1);
                    fetch("http://localhost:4000/api/user",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          "studentid": user_stu_id,
                          "universityid": user_uni_id,
                          "firstname": name,
                          "lastname": l_name_input,
                          "password": user_password
                        })
                      })
                      .then(() => {
                        dispatch(change_l_name(l_name_input));
                        setCookie('user_l_name', l_name_input, { path: '/', expires: addMonths(new Date(), 1) });
                        set_loading_l(0);
                        set_show_tl(true);
                      });
                  }
                }}>تغییر</button> :
                <button className='btn btn-outline-light text-center rtl w-30' disabled>
                  <Spinner animation='border' size='sm' />
                </button>}
            </Form>
            <Form noValidate validated={validated_p} className='min-w-350px w-30 d-flex flex-row-reverse justify-content-between align-items-center text-dark'>
              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="رمز">
                  <Form.Control
                    required
                    dir='ltr'
                    onChange={e => set_password_input(e.target.value)}
                    type="password"
                    defaultValue={user_password}
                    placeholder="نام" />
                </FloatingLabel>
              </Form.Group>

              {is_loading_p == 0 ?
                <button className='btn btn-outline-light text-center rtl h-100 w-30' onClick={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  if (form.checkValidity() === false) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                  else {
                    set_validated_p(true);
                    set_loading_p(1);
                    fetch("http://localhost:4000/api/user",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          "studentid": user_stu_id,
                          "universityid": user_uni_id,
                          "firstname": name,
                          "lastname": l_name,
                          "password": password_input
                        })
                      })
                      .then(() => {
                        dispatch(change_password(password_input));
                        setCookie('user_password', password_input, { path: '/', expires: addMonths(new Date(), 1) });
                        set_loading_p(0);
                        set_show_tp(true);
                      });
                  }
                }}>تغییر</button> :
                <button className='btn btn-outline-light text-center rtl w-30' disabled>
                  <Spinner animation='border' size='sm' />
                </button>}
            </Form>
            <Link className='btn btn-outline-light text-center rtl' to='/history'>تاریخچه‌ی خرید</Link>
            <button className='btn btn-outline-light text-center rtl' onClick={() => {
              set_popup(true);
            }}>افزایش موجودی</button>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}

export default Profile;

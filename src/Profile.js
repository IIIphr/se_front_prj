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
import { change_f_name, change_l_name } from './userSlice';
import { ToastContainer } from 'react-bootstrap';

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
  const user_password = useSelector((state) => state.user.user_password);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [validated_f, set_validated_f] = useState(false);
  const [validated_l, set_validated_l] = useState(false);
  const [f_name_input, set_f_name_input] = useState(name);
  const [l_name_input, set_l_name_input] = useState(l_name);
  const [cookies, setCookie] = useCookies(['user_type', 'user_f_name']);
  const [is_loading_f, set_loading_f] = useState(0);
  const [is_loading_l, set_loading_l] = useState(0);
  const [show_tf, set_show_tf] = useState(false);
  const [show_tl, set_show_tl] = useState(false);

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
      </ToastContainer>
      <Container className='d-flex flex-column justify-content-center align-items-center min-vh-75'>
        <Card bg='dark' text='light' className='d-flex flex-column text-center p-3 m-3'>
          <Card.Body className='d-flex flex-column justify-content-between align-items-center min-vh-75 min-vw-75'>
            <h3 className='text-center rtl mb-5'>پروفایل {name}</h3>
            <Form noValidate validated={validated_f} className='min-w-350px w-30 d-flex flex-row-reverse justify-content-between align-items-center min-vh-25 text-dark'>
              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="نام">
                  <Form.Control
                    required
                    dir='rtl'
                    onChange={e => set_f_name_input(e.target.value)}
                    type="text"
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
                          "_id": user_id,
                          "firstname": f_name_input,
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
            <Form noValidate validated={validated_l} className='min-w-350px w-30 d-flex flex-row-reverse justify-content-between align-items-center min-vh-25 text-dark'>
              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="نام خانوادگی">
                  <Form.Control
                    required
                    dir='rtl'
                    onChange={e => set_l_name_input(e.target.value)}
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
                    //fetch
                    dispatch(change_l_name(l_name_input));
                    set_loading_l(0);
                    set_show_tl(true);
                  }
                }}>تغییر</button> :
                <button className='btn btn-outline-light text-center rtl w-30' disabled>
                  <Spinner animation='border' size='sm' />
                </button>}
            </Form>
            <Link className='btn btn-outline-light text-center rtl' to='/history'>تاریخچه‌ی خرید</Link>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}

export default Profile;

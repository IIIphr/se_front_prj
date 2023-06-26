import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { change_credit, change_f_name, change_id, change_l_name, change_password, change_stu_id, change_type, change_uni_id } from './userSlice';
import { useState, useEffect, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Navbarr from './Navbarr';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card';
import ReactDOM from 'react-dom';

function addMonths(date, months) {
  var d = date.getDate();
  date.setMonth(date.getMonth() + +months);
  if (date.getDate() != d) {
    date.setDate(0);
  }
  return date;
}

function Login() {
  const dispatch = useDispatch();
  const user_type = useSelector((state) => state.user.user_type);
  const [id_input, set_id_input] = useState('');
  const [focused, set_focused] = useState(false);
  const [password_input, set_password_input] = useState('');
  const [is_loading, set_loading] = useState(0);
  const [uni_input, set_uni_input] = useState(0);
  const [validated, set_validated] = useState(false);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user_id', 'user_f_name', 'user_type', 'user_uni_id', 'user_stu_id', 'user_password', 'user_l_name', 'user_credit']);

  useEffect(() => {
    if (user_type == null) {
      if (cookies.user_type !== "undefined" && cookies.user_type) {
        dispatch(change_f_name(cookies.user_f_name));
        dispatch(change_l_name(cookies.user_l_name));
        dispatch(change_credit(cookies.user_credit));
        dispatch(change_type(cookies.user_type));
        dispatch(change_uni_id(cookies.user_uni_id));
        dispatch(change_password(cookies.user_password));
        dispatch(change_stu_id(cookies.user_stu_id));
        dispatch(change_id(cookies.user_id));
        navigate('/profile');
      }
    }
  }, [user_type, cookies.user_type]);

  return (
    <Fragment>
      <Navbarr />
      <Container className='d-flex flex-column justify-content-center align-items-center min-vh-75'>
        <Card bg='dark' text='light' className='min-vw-90 d-flex flex-column text-center p-3 m-3'>
          <Card.Body className='d-flex flex-column justify-content-evenly align-items-center min-vh-75 min-vw-75'>
            <h3>ورود</h3>
            <Form noValidate validated={validated} className='d-flex flex-column justify-content-evenly align-items-center min-vh-50 text-dark'>
              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="شماره‌ی دانشجویی‌">
                  <Form.Control
                    required
                    ref={r => { if (r && !focused) { ReactDOM.findDOMNode(r).focus(); set_focused(true); } }}
                    dir='ltr'
                    onChange={e => set_id_input(e.target.value)}
                    type="text"
                    placeholder="شماره‌ی دانشجویی" />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="دانشگاه">
                  <Form.Control
                    required
                    dir='ltr'
                    onChange={e => set_uni_input(e.target.value)}
                    type="text"
                    placeholder="دانشگاه" />
                </FloatingLabel>
              </Form.Group>

              <Form.Group>
                <FloatingLabel dir='rtl' className='custom-class' label="رمز">
                  <Form.Control
                    required
                    dir='ltr'
                    onChange={e => set_password_input(e.target.value)}
                    type="password"
                    placeholder="رمز" />
                </FloatingLabel>
              </Form.Group>

              {is_loading == 0 ?
                <button className='btn btn-outline-light text-center rtl w-100' onClick={(e) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  if (form.checkValidity() === false) {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                  else {
                    set_validated(true);
                    set_loading(1);
                    fetch("http://localhost:4000/api/login",
                      {
                        method: "POST",
                        body: JSON.stringify({
                          "studentid": id_input,
                          "universityid": uni_input,
                          "password": password_input
                        })
                      })
                      .then(res => res.json())
                      .then((result) => {
                        if (result.stat == undefined) {
                          dispatch(change_f_name(result.firstname));
                          dispatch(change_type("user"));
                          dispatch(change_uni_id(uni_input));
                          dispatch(change_credit(result.currentmoney));
                          dispatch(change_l_name(result.lastname));
                          dispatch(change_password(password_input));
                          dispatch(change_stu_id(id_input));
                          dispatch(change_id(result._id));
                          setCookie('user_f_name', result.firstname, { path: '/', expires: addMonths(new Date(), 1) });
                          setCookie('user_l_name', result.lastname, { path: '/', expires: addMonths(new Date(), 1) });
                          setCookie('user_uni_id', uni_input, { path: '/', expires: addMonths(new Date(), 1) });
                          setCookie('user_stu_id', id_input, { path: '/', expires: addMonths(new Date(), 1) });
                          setCookie('user_password', password_input, { path: '/', expires: addMonths(new Date(), 1) });
                          setCookie('user_type', "user", { path: '/', expires: addMonths(new Date(), 1) });
                          setCookie('user_id', result._id, { path: '/', expires: addMonths(new Date(), 1) });
                          setCookie('user_credit', result.currentmoney, { path: '/', expires: addMonths(new Date(), 1) });
                          navigate('/profile');
                        }
                        else {
                          set_loading(0);
                        }
                      });
                  }
                }}>ورود</button> :
                <button className='btn btn-outline-light text-center rtl w-100' disabled>
                  <Spinner animation='border' size='sm' />
                </button>}

              <Link className='btn btn-outline-light text-center rtl w-100' to='/signup'>ثبت نام</Link>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}

export default Login;

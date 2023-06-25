import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { change_credit, change_f_name, change_l_name, change_stu_id, change_type, change_uni_id } from './userSlice';
import { useState, useEffect, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Navbarr from './Navbarr';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

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
  const [password_input, set_password_input] = useState('');
  const [is_loading, set_loading] = useState(0);
  const [uni_input, set_uni_input] = useState(0);
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['user_f_name', 'user_type', 'user_uni_id', 'user_stu_id']);

  useEffect(() => {
    if (user_type == null) {
      if (cookies.user_type !== "undefined" && cookies.user_type) {
        dispatch(change_f_name(cookies.user_f_name));
        dispatch(change_type(cookies.user_type));
        dispatch(change_uni_id(cookies.user_uni_id));
        navigate('/profile');
      }
    }
  }, []);

  return (
    <Fragment>
      <Navbarr />
      <Container className='d-flex flex-column justify-content-center align-items-center min-vh-75'>
        <Card bg='dark' text='light' className='d-flex flex-column text-center p-3 m-3'>
          <Card.Title>ورود</Card.Title>
          <Card.Body className='d-flex flex-column justify-content-evenly align-items-center min-vh-50'>
            شماره‌ی دانشجویی
            <input type='number' id='id_input' value={id_input} onInput={e => set_id_input(e.target.value)}></input>
            دانشگاه
            <input type='number' id='uni_input' value={uni_input} onInput={e => set_uni_input(e.target.value)}></input>
            رمز
            <input type='text' id='password_input' value={password_input} onInput={e => set_password_input(e.target.value)}></input>
            {is_loading == 0 ?
              <button className='btn btn-outline-light text-center rtl w-100' onClick={() => {
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
                      dispatch(change_stu_id(id_input));
                      setCookie('user_f_name', result.firstname, { path: '/', expires: addMonths(new Date(), 1) });
                      setCookie('user_uni_id', uni_input, { path: '/', expires: addMonths(new Date(), 1) });
                      setCookie('user_stu_id', id_input, { path: '/', expires: addMonths(new Date(), 1) });
                      setCookie('user_type', "user", { path: '/', expires: addMonths(new Date(), 1) });
                      navigate('/profile');
                    }
                    else {
                      set_loading(0);
                    }
                  });
              }}>ورود</button> :
              <button className='btn btn-outline-light text-center rtl w-100' disabled>
                <Spinner animation='border' size='sm'/>
              </button>}
            <Link className='btn btn-outline-light text-center rtl w-100' to='/signup'>ثبت نام</Link>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}

export default Login;

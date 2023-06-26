import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Fragment, useEffect } from 'react';
import { change_f_name, change_stu_id, change_type, change_uni_id } from './userSlice';
import { Link } from 'react-router-dom';
import Navbarr from './Navbarr';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function App() {
  const name = useSelector((state) => state.user.user_f_name);
  const user_type = useSelector((state) => state.user.user_type);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user_f_name', 'user_type', 'user_uni_id', 'user_stu_id']);

  useEffect(() => {
    if (user_type == null) {
      if (cookies.user_type !== "undefined" && cookies.user_type) {
        dispatch(change_f_name(cookies.user_f_name));
        dispatch(change_type(cookies.user_type));
        dispatch(change_uni_id(cookies.user_uni_id));
        dispatch(change_stu_id(cookies.user_stu_id));
      }
    }
  }, []);

  return (
    <Fragment>
      <Navbarr />
      <Container className='d-flex flex-column justify-content-center align-items-center min-vh-75'>
        <Card bg='dark' text='light' className='min-vw-90 d-flex flex-column text-center p-3 m-3'>
          <Card.Body className='d-flex flex-column justify-content-evenly align-items-center min-vh-75 min-vw-75'>
            <h1 className='rtl'>به سامانه‌ی تبادل کد فراموشی خوش آمدید</h1>
            {user_type != null ?
              <Link className='btn btn-outline-light text-center rtl' to='/list'>لیست کدها</Link> :
              <p className='rtl'>برای دیدن کدها باید وارد شوید!</p>}
          </Card.Body>
        </Card>
      </Container>
    </Fragment >
  );
}

export default App;

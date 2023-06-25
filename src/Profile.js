import './Profile.css';
import { useSelector } from 'react-redux';
import { useEffect, Fragment } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, Link } from 'react-router-dom';
import Navbarr from './Navbarr';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function Profile() {
  const name = useSelector((state) => state.user.user_f_name);
  const user_type = useSelector((state) => state.user.user_type);
  const navigate = useNavigate();
  const [cookies] = useCookies(['user_type']);

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
        <Card bg='dark' text='light' className='d-flex flex-column text-center p-3 m-3'>
          <Card.Body className='d-flex flex-column justify-content-between align-items-center min-vh-75 min-vw-75'>
            <h3 className='text-center rtl mb-5'>پروفایل {name}</h3>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}

export default Profile;

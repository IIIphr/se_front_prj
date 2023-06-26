import './Success.css';
import { Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbarr from './Navbarr';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';

function Success() {
  const { state } = useLocation();
  return (
    <Fragment>
      <Navbarr />
      <Container className='d-flex flex-column justify-content-center align-items-center min-vh-75'>
        <Card bg='dark' text='light' className='min-vw-90 d-flex flex-column text-center p-3 m-3'>
          <Card.Body className='d-flex flex-column justify-content-evenly align-items-center min-vh-75 min-vw-75'>
            <h3 className='text-center rtl mb-5'>پرداخت موفقیت آمیز بود!</h3>
            <p>کد شما: {state}</p>
            <Link className='btn btn-outline-light text-center rtl' to='/'>بازگشت به صفحه‌ی اصلی</Link>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}

export default Success;

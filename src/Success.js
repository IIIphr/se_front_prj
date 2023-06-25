import './Success.css';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Navbarr from './Navbarr';
import Card from 'react-bootstrap/Card';
import { Container } from 'react-bootstrap';

function Success() {
  return (
    <Fragment>
      <Navbarr />
      <Container className='d-flex flex-column justify-content-center align-items-center min-vh-75'>
        <Card bg='dark' text='light' className='d-flex flex-column text-center p-3 m-3'>
          {/* <Card.Title className='text-center rtl my-5'>پرداخت موفقیت آمیز بود!</Card.Title> */}
          <Card.Body>
          <h3 className='text-center rtl mb-5'>پرداخت موفقیت آمیز بود!</h3>
            <Link className='btn btn-outline-light text-center rtl' to='/'>بازگشت به صفحه‌ی اصلی</Link>
          </Card.Body>
        </Card>
      </Container>
    </Fragment>
  );
}

export default Success;

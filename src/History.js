import { Fragment, useEffect, useState } from 'react';
import './History.css';
import Navbarr from './Navbarr';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { change_type, change_uni_id, change_f_name, change_stu_id } from './userSlice';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

function History() {
  const user_type = useSelector((state) => state.user.user_type);
  const stu_id = useSelector((state) => state.user.user_stu_id);
  const uni_id = useSelector((state) => state.user.user_uni_id);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user_f_name', 'user_type', 'user_uni_id', 'user_stu_id']);
  const navigate = useNavigate();
  const [is_loading, set_loading] = useState(0);
  const [popup, set_popup] = useState(false);
  const [report_text, set_report_text] = useState('');
  const [data, set_data] = useState([]);

  useEffect(() => {
    if (user_type == null) {
      if (cookies.user_type !== "undefined" && cookies.user_type) {
        dispatch(change_f_name(cookies.user_f_name));
        dispatch(change_type(cookies.user_type));
        dispatch(change_uni_id(cookies.user_uni_id));
        dispatch(change_stu_id(cookies.user_stu_id));
      }
      else {
        navigate('/login');
      }
    }
    else {
      fetch("http://localhost:4000/api/history",
        {
          method: "POST",
          body: JSON.stringify({
            "studentid": stu_id,
            "universityid": uni_id
          })
        })
        .then(res => res.json())
        .then((result) => {
          set_data(result.coupons);
          set_loading(1);
        });
    }
  }, []);

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
          <Modal.Title>گزارش تخلف</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <FloatingLabel dir='rtl' className='custom-class' label="متن گزارش">
                <Form.Control
                  dir='rtl'
                  onChange={e => set_report_text(e.target.value)}
                  defaultValue={report_text}
                  as="textarea"
                  className='w-100'
                  placeholder="متنی بنویسید..." />
              </FloatingLabel>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { set_popup(false) }}>
            بستن
          </Button>
          <Button variant="danger">ثبت گزارش</Button>
        </Modal.Footer>
      </Modal>
      <Container className='d-flex flex-column justify-content-center align-items-center min-vh-75'>
        <Card bg='dark' text='light' className='min-vw-90 d-flex flex-column text-center p-3 m-3'>
          <Card.Body className='d-flex flex-column justify-content-evenly align-items-center min-vh-75 min-vw-75'>
            <h1 className='rtl'>لیست کدها</h1>
            {is_loading == 0 ?
              <Spinner /> :
              <Accordion className='w-100' defaultActiveKey="0">
                {(data || []).map((record, index) => {
                  return <Accordion.Item key={index} eventKey={"" + index}>
                    <Accordion.Header>
                      <p>نام غذا: {record.foodname}</p>
                      <pre> - </pre>
                      <p>قیمت: {record.price} ریال</p>
                    </Accordion.Header>
                    <Accordion.Body className='d-flex flex-row-reverse justify-content-evenly align-items-center flex-wrap'>
                      <p>فروشنده: {record.studentid}</p>
                      <pre> - </pre>
                      <p>کد فراموشی: {record.code}</p>
                      <pre> - </pre>
                      <p>سلف: {record.canteenid}</p>
                      <pre> - </pre>
                      <button className='btn btn-danger text-center rtl' onClick={() => {
                        set_popup(true);
                      }}>تخلف</button>
                    </Accordion.Body>
                  </Accordion.Item>;
                })}
              </Accordion>
            }
          </Card.Body>
        </Card>
      </Container>
      {/* <div className='list_root'>
        <h1 className='rtl'>لیست کدها</h1>
        <div className='history_container'>
          {is_loading == 0 ?
            <Spinner animation='border' size='lg' /> :
            <Fragment>
              <div className='history_header'>
                <p>کد فراموشی</p>
                <p>غذا</p>
                <p>سلف</p>
                <p>فروشنده</p>
                <p>قیمت</p>
              </div>
              {(data || []).map(record => {
                return <div key={record._id} className='history_entry'>
                  <p>{record.code}</p>
                  <p>{record.foodname}</p>
                  <p>{record.canteenid}</p>
                  <p>{record.studentid}</p>
                  <p>{record.price}</p>
                </div>;
              })}
            </Fragment>
          }
        </div>
      </div> */}
    </Fragment>
  );
}

export default History;

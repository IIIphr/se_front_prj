import './Navbarr.css';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Fragment, useEffect, useState } from 'react';
import { change_f_name, change_type, change_uni_id, change_credit, change_password, change_stu_id } from './userSlice';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Spinner from 'react-bootstrap/Spinner';

function Navbarr() {
    const user_f_name = useSelector((state) => state.user.user_f_name);
    const user_stu_id = useSelector((state) => state.user.user_stu_id);
    const user_type = useSelector((state) => state.user.user_type);
    const user_uni_id = useSelector((state) => state.user.user_uni_id);
    const user_password = useSelector((state) => state.user.user_password);
    const user_credit = useSelector((state) => state.user.user_credit);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [is_loading, set_loading] = useState(0);
    const [cookies, removeCookie] = useCookies(['user_f_name', 'user_type', 'user_uni_id', 'user_password', 'user_stu_id']);

    useEffect(() => {
        if (user_type == null) {
            if (cookies.user_type !== "undefined" && cookies.user_type) {
                dispatch(change_f_name(cookies.user_f_name));
                dispatch(change_type(cookies.user_type));
                dispatch(change_uni_id(cookies.user_uni_id));
                dispatch(change_password(cookies.user_password));
                dispatch(change_stu_id(cookies.user_stu_id));
            }
        }
        else {
            fetch("http://localhost:4000/api/money",
                {
                    method: "POST",
                    body: JSON.stringify({
                        "studentid": user_stu_id,
                        "password": user_password
                    })
                })
                .then(res => res.json())
                .then((result) => {
                    dispatch(change_credit(result.currentmoney));
                    set_loading(1);
                });
        }
    }, []);

    return (
        <Navbar sticky='top' expand="lg" bg="dark" data-bs-theme="dark" dir='rtl'>
            <Navbar.Brand><Link className='navbar_unlink' to='/'>سامانه‌ی تبادل کد فراموشی</Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Offcanvas data-bs-theme="dark" className='rtl'>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        منو
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="justify-content-around align-items-center flex-grow-1 pe-3">
                        {user_type == null ?
                            <Link className='navbar_unlink my-3' to='/login'>ورود</Link> :
                            <Fragment>
                                <Link className='navbar_unlink my-2' to='/profile'>سلام {user_f_name}!</Link>
                                <p className='my-2'>دانشگاه {user_uni_id}</p>
                                {is_loading == 0 ?
                                    <Spinner className='my-2' animation='border' size='sm' /> :
                                    <p className='my-2'>موجودی: {user_credit} ریال</p>
                                }
                                <Link className='navbar_unlink my-2' to='/add_coupun'>فروش کد</Link>
                                <button className='btn btn-outline-light text-center rtl my-2' onClick={() => {
                                    dispatch(change_f_name(""));
                                    dispatch(change_type(null));
                                    dispatch(change_uni_id(-1));
                                    dispatch(change_stu_id(-1));
                                    dispatch(change_password(null));
                                    removeCookie('user_f_name');
                                    removeCookie('user_type');
                                    removeCookie('user_uni_id');
                                    removeCookie('user_stu_id');
                                    removeCookie('user_password');
                                    navigate('/');
                                }}>خروج</button>
                            </Fragment>}
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>
        </Navbar>
    );
}

export default Navbarr;
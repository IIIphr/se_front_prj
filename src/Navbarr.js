import './Navbarr.css';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { Fragment, useEffect } from 'react';
import { change_f_name, change_type, change_uni_id } from './userSlice';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Navbarr() {
    const user_f_name = useSelector((state) => state.user.user_f_name);
    const user_type = useSelector((state) => state.user.user_type);
    const user_uni_id = useSelector((state) => state.user.user_uni_id);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies(['user_f_name', 'user_type', 'user_uni_id']);

    useEffect(() => {
        if (user_type == null) {
            if (cookies.user_type !== "undefined" && cookies.user_type) {
                dispatch(change_f_name(cookies.user_f_name));
                dispatch(change_type(cookies.user_type));
                dispatch(change_uni_id(cookies.user_uni_id));
            }
        }
    }, []);

    return (
        <Navbar sticky='top' expand="lg" bg="dark" data-bs-theme="dark" dir='rtl'>
            <Container>
                <Navbar.Brand><Link className='navbar_unlink' to='/'>سامانه‌ی تبادل کد فراموشی</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Offcanvas data-bs-theme="dark" className='rtl'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            منو
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        {user_type == null ?
                            <Link className='navbar_unlink' to='/login'>ورود</Link> :
                            <Fragment>
                                <Link className='navbar_unlink' to='/profile'>سلام {user_f_name}! - دانشگاه {user_uni_id} - موجودی: 0 ریال</Link>
                                <Link className='navbar_unlink' to='/add_coupun'>فروش کد</Link>
                                <button className='btn btn-outline-light text-center rtl' onClick={() => {
                                    dispatch(change_f_name(""));
                                    dispatch(change_type(null));
                                    dispatch(change_uni_id(-1));
                                    removeCookie('user_f_name');
                                    removeCookie('user_type');
                                    removeCookie('user_uni_id');
                                    navigate('/');
                                }}>خروج</button>
                            </Fragment>}
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Navbarr;
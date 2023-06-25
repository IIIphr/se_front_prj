import './Navbarr.css';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { change_f_name, change_type, change_uni_id } from './userSlice';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Navbarr() {
    const user_f_name = useSelector((state) => state.user.user_f_name);
    const user_type = useSelector((state) => state.user.user_type);
    const user_uni_id = useSelector((state) => state.user.user_uni_id);
    const dispatch = useDispatch();
    const [cookies] = useCookies(['user_f_name', 'user_type', 'user_uni_id']);

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
        <Navbar sticky='top' expand="lg" className="bg-body-tertiary" data-bs-theme="dark" dir='rtl'>
            <Container>
                <Navbar.Brand><Link className='navbar_unlink' to='/'>سامانه‌ی تبادل کد فراموشی</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user_type == null ?
                    <Link className='navbar_unlink' to='/login'>ورود</Link> :
                    <Link className='navbar_unlink' to='/profile'>سلام {user_f_name}! - دانشگاه {user_uni_id}</Link>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Navbarr;
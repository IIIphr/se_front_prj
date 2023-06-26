import { Fragment, useEffect, useState } from 'react';
import './History.css';
import Navbarr from './Navbarr';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { change_type, change_uni_id, change_f_name, change_stu_id } from './userSlice';
import { useNavigate, Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

function History() {
  const user_type = useSelector((state) => state.user.user_type);
  const stu_id = useSelector((state) => state.user.user_stu_id);
  const uni_id = useSelector((state) => state.user.user_uni_id);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user_f_name', 'user_type', 'user_uni_id', 'user_stu_id']);
  const navigate = useNavigate();
  const [is_loading, set_loading] = useState(0);
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
          console.log(result.coupons);
          set_data(result.coupons);
          set_loading(1);
        });
    }
  }, []);

  return (
    <Fragment>
      <Navbarr />
      <div className='list_root'>
        <h1 className='rtl'>لیست کدها</h1>
        <div className='coupun_container'>
          {is_loading == 0 ?
            <Spinner animation='border' size='lg' /> :
            (data || []).map(record => {
              return <div key={record._id} className='coupun_entry'>
                <p>{record.code}</p>
                <p>{record.foodname}</p>
                <p>{record.canteenid}</p>
                <p>{record.studentid}</p>
                <p>{record.price}</p>
              </div>;
            })
          }
        </div>
      </div>
    </Fragment>
  );
}

export default History;

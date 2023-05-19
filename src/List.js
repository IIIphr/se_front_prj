import { Fragment, useEffect } from 'react';
import './List.css';
import Navbar from './Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { change_type, change_uni_id, change_f_name } from './userSlice';
import { useNavigate } from 'react-router-dom';

function List() {
  const user_type = useSelector((state) => state.user.user_type);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user_f_name', 'user_type', 'user_uni_id']);
  const navigate = useNavigate();

  useEffect(() => {
    if(user_type == null){
      if(cookies.user_type !== "undefined" && cookies.user_type){
        dispatch(change_f_name(cookies.user_f_name));
        dispatch(change_type(cookies.user_type));
        dispatch(change_uni_id(cookies.user_uni_id));
      }
      else{
        navigate('/');
      }
    }
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className='list_root'>
        <h1 className='rtl'>لیست کدها</h1>
      </div>
    </Fragment>
  );
}

export default List;

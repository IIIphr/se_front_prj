import { Fragment, useEffect, useState } from 'react';
import './List.css';
import Navbarr from './Navbarr';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import { change_type, change_uni_id, change_f_name, change_stu_id } from './userSlice';
import { useNavigate, Link } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

function List() {
  const user_type = useSelector((state) => state.user.user_type);
  const dispatch = useDispatch();
  const [cookies] = useCookies(['user_f_name', 'user_type', 'user_uni_id', 'user_stu_id']);
  const navigate = useNavigate();
  const [is_loading, set_loading] = useState(0);
  const [data, set_data] = useState([]);

  useEffect(() => {
    if(user_type == null){
      if(cookies.user_type !== "undefined" && cookies.user_type){
        dispatch(change_f_name(cookies.user_f_name));
        dispatch(change_type(cookies.user_type));
        dispatch(change_uni_id(cookies.user_uni_id));
        dispatch(change_stu_id(cookies.user_stu_id));
      }
      else{
        navigate('/login');
      }
    }
    else{
      fetch("http://localhost:4000/api/codes",
      {
        method: "POST",
        body: JSON.stringify({
          "canteenid": "1",
          "universityid": cookies.user_uni_id
        })
      })
        .then(res => res.json())
        .then((result) => {
          set_data(result);
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
          <RotatingLines
            strokeColor="black"
            strokeWidth="5"
            animationDuration="0.75"
            width="50"
            visible={true}
          /> :
          (data || []).map(record => {
            return  <div key={record._id} className='coupun_entry'>
                      <p>{record.foodname}</p>
                      <p>{record.studentid}</p>
                      <p>{record.price}</p>
                      <button className='ui_btn' onClick={() => {
                        set_loading(0);
                        fetch("http://localhost:4000/api/buy",
                        {
                          method: "POST",
                          body: JSON.stringify({
                            "_id": record._id,
                            "buyersid": cookies.user_stu_id,
                            "buyeruid": cookies.user_uni_id
                          })
                        })
                          .then(res => res.json())
                          .then((result) => {
                            if(result.stat == 'FOUND'){
                              navigate('/success');
                            }
                            else{
                              navigate('/list');
                            }
                          });
                      }}>buy</button>
                    </div>;
          })
          }
        </div>
      </div>
    </Fragment>
  );
}

export default List;

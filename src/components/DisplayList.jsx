import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { removeItem } from '../redux/todoSlice';

function DisplayList() {
    const displaylist = useSelector(state=>state.todoReducer)
    const dispatch = useDispatch();
    console.log('==todo==');
    console.log(displaylist);
    const handleDelete = (id) => {
      console.log("Removing item with id:", id); // Debugging
      dispatch(removeItem(id));
  };
    
  return (
    <>
    <Row>
        <Col md={4}></Col>
        <Col md={4}>
        <div className='border border-black shadow-lg rounded-5 mt-4 p-4' style={{width:'100%',height:'auto'}}>
            <h1 className='text-center'>What to do Today?</h1>
            <div className='d-flex justify-content-center align-items-center border border-dark p-4 my-3' style={{height:'auto'}}>
              <div className='d-flex flex-column'>
              {displaylist.length > 0 ? (
    displaylist.map((item,index) => (
        <div key={item.id} className="d-flex align-items-center">
            <i 
                onClick={() => handleDelete(item.id)} 
                className="fa-solid fa-x text-danger mb-1 me-2" 
                style={{ cursor: 'pointer' }}
            ></i>
            <h6>{index+1}. {item.text}</h6> 
        </div>
    ))
) : (
    <p>Do Something good today...</p>
)}
              </div>
            
               
            </div>
        </div>
        </Col>
        <Col md={4}></Col>

    </Row>
    </>
  )
}

export default DisplayList
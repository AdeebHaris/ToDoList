import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addtoTodoList } from "../redux/todoSlice";
import { v4 as uuidv4 } from 'uuid';

function AddToDo() {
    const todolist = useSelector(state=>state.todoReducer)
    const dispatch = useDispatch();
    const [todoItem,setTodoItem] = useState("")
    const handleAdd = (e)=>{
        e.preventDefault();
        dispatch(addtoTodoList({ id: uuidv4(), text: todoItem }));
        setTodoItem("")
    }
   
  return (
    <>
      <Row className="mt-4">
        <Col md={4}></Col>
        <Col md={4} >
        <div className="d-flex justify-content-evenly align-items-center">
        <input
                        onChange={(e) => setTodoItem(e.target.value)}
                        value={todoItem}
                        type="text"
                        placeholder="Enter Today's Goals"
                        className="form-control shadow"
                        style={{ width: '500px' }}
                    />
            
            <Button onClick={handleAdd} className="btn btn-info ms-2 shadow" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }} >ADD</Button>
       </div>
        </Col>
        <Col md={4}></Col>
      </Row>
    </>
  );
}

export default AddToDo;

import { useState } from "react";
import { Button, Col, Row, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTodo, setSelectedDate } from "../redux/todoSlice"; // Updated import
import { v4 as uuidv4 } from 'uuid';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function AddToDo() {
    const dispatch = useDispatch();
    const [todoItem, setTodoItem] = useState("");
    const [date, setDate] = useState(new Date());
    const [showCalendar, setShowCalendar] = useState(false);

    const handleAdd = (e) => {
        e.preventDefault();
        if (todoItem.trim()) {
            const todoDate = date.toISOString();
            dispatch(addTodo({ id: uuidv4(), text: todoItem, date: todoDate }));
            dispatch(setSelectedDate(todoDate));
            setTodoItem("");
            setShowCalendar(false);
        }
    };

    const onChange = (newDate) => {
        setDate(newDate);
        dispatch(setSelectedDate(newDate.toISOString()));
        setShowCalendar(false);
    };

    const handleCancel = () => {
        setShowCalendar(false);
        setDate(new Date());
    };

    return (
        <>
            <Row className="mt-4">
                <Col md={4}></Col>
                <Col md={4}>
                    <div className="d-flex justify-content-evenly align-items-center">
                        <input
                            onChange={(e) => setTodoItem(e.target.value)}
                            value={todoItem}
                            type="text"
                            placeholder="Enter Today's Goals"
                            className="form-control shadow"
                            style={{ width: '500px' }}
                        />
                        <Button
    style={{
        backgroundColor: '#4D869C',
        borderRadius: '20px', 
        padding: '5px 10px', 
        fontSize: '0.9rem' 
    }}
    onClick={() => setShowCalendar(true)}
    className="ms-2"
>
    <i className="fa-regular fa-calendar"></i>
</Button>

<Button
    onClick={handleAdd}
    className="btn ms-2 shadow"
    style={{
        backgroundColor: '#4D869C',
        padding: '10px 20px', // Smaller size
        fontSize: '0.9rem' // Slightly smaller font size
    }}
>
    ADD
</Button>

                    </div>
                </Col>
                <Col md={4}></Col>
            </Row>
            <Modal show={showCalendar} onHide={() => setShowCalendar(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Select a Date</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Calendar onChange={onChange} value={date} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default AddToDo;


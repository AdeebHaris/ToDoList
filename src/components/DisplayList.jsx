import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { completeTodo, removeItem } from '../redux/todoSlice';

function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`; // Format as day-month-year
}

function DisplayList() {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos.items);
    const selectedDate = useSelector(state => state.todos.selectedDate);
    const completedTodos = useSelector(state => state.todos.completedItems);
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this item?");
        if (confirmDelete) {
            dispatch(removeItem(id));
        }
    };
    const handleComplete = (id) => {
        dispatch(completeTodo(id)); // Dispatch completeTodo action
    };

    const filteredTodos = todos.filter(todo => {
        return selectedDate && new Date(todo.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString();
    });
    const filteredCompletedTodos = completedTodos.filter(todo => {
        return selectedDate && new Date(todo.date).toLocaleDateString() === new Date(selectedDate).toLocaleDateString();
    });

    // Group tasks by date
    const groupedTodos = filteredTodos.reduce((acc, todo) => {
        const dateKey = formatDate(todo.date);
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(todo);
        return acc;
    }, {});
    const groupedCompletedTodos = filteredCompletedTodos.reduce((acc, todo) => {
        const dateKey = formatDate(todo.date);
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(todo);
        return acc;
    }, {});

    return (
        <Row>
            <Col md={4}></Col>
            <Col md={4}>
                {Object.keys(groupedTodos).length > 0 ? (
                    Object.keys(groupedTodos).map(date => (
                        <div key={date} className='border border-black shadow-lg rounded-5 mt-4 p-4'>
                            <h1 className='text-center'>
                                Tasks for <span style={{color:'#4D869C'}}>{date}</span> 
                            </h1>
                            <div className='d-flex flex-column'>
                                {groupedTodos[date].map((item, index) => (
                                     <button
                                     className="d-flex align-items-center justify-content-between w-100 btn btn-light border-0 mt-1"
                                     style={{ cursor: 'pointer' }}
                                      // Handle delete on button click
                                 >
                                     <h6 className="mt-2" style={{ flexGrow: 1 }}>{item.text}</h6>
                                     <i onClick={() => handleComplete(item.id)} className="fa-solid fa-check text-success mt-1 ms-2 fa-xl"></i>
                                     <i onClick={() => handleDelete(item.id)} className="fa-solid fa-x text-danger mt-1 ms-4 fa-xl"></i>
                                 </button>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tasks for {selectedDate ? formatDate(selectedDate) : 'this date.'}</p>
                )}
                {Object.keys(groupedCompletedTodos).length > 0 && (
                    <div className='border border-black shadow-lg rounded-5 mt-4 p-4'>
                        <div className='d-flex flex-column'>
                            {Object.keys(groupedCompletedTodos).map(date => (
                                <div key={date}>
                                    <h3 className='text-center'>
                                        Completed Tasks
                                    </h3>
                                    {groupedCompletedTodos[date].map(item => (
                                         <button
                                         className="d-flex align-items-center justify-content-between w-100 btn btn-light border-0 mt-1"
        
                                         
                                     >
                                         <h6 key={item.id} className="mt-2" style={{ flexGrow: 1,textDecoration: 'line-through' }}>
                                            {item.text}
                                        </h6>
                                         
                                     </button>
                                        
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </Col>
            <Col md={4}></Col>
        </Row>
    );
}

export default DisplayList;

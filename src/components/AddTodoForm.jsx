import React, { useState } from 'react';
import Client from '../services/api';

function AddTodoForm() {
    const [todo, setTodo] = useState({
        category: '', // Default type
        name: '',
        picture: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodo({
            ...todo,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await Client.post('/todos', todo); 
            console.log('Todo Added:', response.data);
            // Optionally reset the form or handle success (e.g., display a message or redirect)
        } catch (error) {
            console.error('Failed to add Todo:', error);

        }
    };

    return (
        <div className="container mt-5">
            <h2>Add New Todo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">Category</label>
                    <select id="category" name="category" className="form-select" value={todo.category} onChange={handleChange}>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Activity">Activity</option>
                        <option value="Destination">Destination</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name="name" value={todo.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="picture" className="form-label">Insert Image URL</label>
                    <input type="text" className="form-control" id="picture" name="picture" value={todo.picture} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" rows="3" value={todo.description} onChange={handleChange}></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add Todo</button>
            </form>
        </div>
    );
}

export default AddTodoForm;

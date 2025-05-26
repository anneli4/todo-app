import React, { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;

function App() {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState("");

    useEffect(() => {
        axios.get(API).then(res => setTodos(res.data));
    }, []);

    const addTodo = async () => {
        const res = await axios.post(API, { text });
        setTodos([...todos, res.data]);
        setText("");
    };

    const deleteTodo = async (id) => {
        await axios.delete(`${API}/${id}`);
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div style={{ margin: "2rem" }}>
            <h1>ToDo App</h1>
            <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Lisa uus ülesanne"
            />
            <button onClick={addTodo}>Lisa</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {todo.text} <button onClick={() => deleteTodo(todo.id)}>Kustuta</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
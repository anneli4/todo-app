import React, { useEffect, useState } from "react";
import axios from "axios";

// API URL, kus asub teie backend
const API = process.env.REACT_APP_API_URL;

function App() {
    const [todos, setTodos] = useState([]);  // Kõik ülesanded
    const [text, setText] = useState("");    // Uue ülesande tekst

    // Laadige ülesanded backendist
    useEffect(() => {
        axios
            .get(API)
            .then((res) => setTodos(res.data))
            .catch((err) => console.error("Error loading todos:", err));
    }, []); // Täidetakse ainult üks kord, kui komponent laeb

    // Lisa uus ülesanne
    const addTodo = async () => {
        if (text.trim() === "") return; // Väldi tühi sisend

        try {
            const res = await axios.post(API, { text });
            setTodos([...todos, res.data]);  // Lisa uus ülesanne
            setText("");  // Puhasta sisend
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    // Kustuta ülesanne
    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${API}/${id}`);
            setTodos(todos.filter((todo) => todo.id !== id)); // Eemalda kustutatud ülesanne
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    return (
        <div style={{ margin: "2rem" }}>
            <h1>ToDo App</h1>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}  // Sisendi muutmine
                placeholder="Lisa uus ülesanne"
            />
            <button onClick={addTodo}>Lisa</button>
            <ul>
                {todos.length === 0 ? (
                    <li>Ülesanded puuduvad!</li>
                ) : (
                    todos.map((todo) => (
                        <li key={todo.id}>
                            {todo.text}{" "}
                            <button onClick={() => deleteTodo(todo.id)}>
                                Kustuta
                            </button>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default App;
import { useEffect, useState } from "react";
import "./styles.css";
import { NewTodoForm } from "./NewTodoForm";
import { TodoList } from "./TodoList";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  function getTodos() {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data.todos);
      });
  }

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    // send POST request to dummy json
    fetch("https://dummyjson.com/todos/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        todo: `${title}`,
        completed: false,
        userId: 5,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos((currentTodos) => {
          return [
            ...currentTodos,
            { id: data.id, todo: data.todo, completed: data.completed },
          ];
        });
      });
  }

  function toggleTodo(id, completed) {
    // send a PUT request to dummyJSON
    fetch(`https://dummyjson.com/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: completed }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    setTodos((currentTodos) => {
      // toggle the completed property in the state array
      // map through the currentTodos array and replace the todo with the updated one with the same id, but with the toggled completed property.
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          console.log(todo);
          return { ...todo, completed: completed };
        }

        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      // send a DELETE request to dummyJSON
      fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => console.log(data));

      // remove the todo from the state array
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }
  console.log(todos);

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      <button onClick={getTodos}>Obtenir tous les todos</button>
    </>
  );
}

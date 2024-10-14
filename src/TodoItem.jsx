export function TodoItem({ id, title, completed, toggleTodo, deleteTodo }) {
  return (
    <li key={id} style={{ listStyle: "none" }}>
      {/* Le htmfFor et le id permettent de lier le label et la checkbox */}
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => toggleTodo(id, !completed)}
        />
        {title}
      </label>
      <button onClick={() => deleteTodo(id)} className="btn btn-danger">
        Delete
      </button>
    </li>
  );
}

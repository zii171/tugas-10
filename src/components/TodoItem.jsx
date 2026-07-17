const PRIORITY_STYLE = {
  low: { label: 'Low', color: '#28a745' },
  medium: { label: 'Medium', color: '#ffc107' },
  high: { label: 'High', color: '#dc3545' },
};

function TodoItem({ todo, onToggle, onDelete, busyId }) {
  const isBusy = busyId === todo.id;
  const priority = PRIORITY_STYLE[todo.priority] || PRIORITY_STYLE.low;

  return (
    <div style={styles.item}>
      <div style={styles.top}>
        <label style={styles.left}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo)}
            disabled={isBusy}
          />
          <span
            style={{
              ...styles.title,
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '#888' : '#000',
            }}
          >
            {todo.title}
          </span>
        </label>

        <button
          onClick={() => onDelete(todo.id)}
          style={styles.deleteBtn}
          disabled={isBusy}
        >
          {isBusy ? 'Loading...' : 'Hapus'}
        </button>
      </div>

      {todo.description && <p style={styles.description}>{todo.description}</p>}

      <div style={styles.meta}>
        <span style={{ ...styles.badge, color: priority.color }}>{priority.label}</span>
        {todo.dueDate && (
          <span style={styles.dueDate}>Due Date: {todo.dueDate}</span>
        )}
      </div>
    </div>
  );
}

const styles = {
  item: {
    padding: '12px 16px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginBottom: '8px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  },
  top: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  left: { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' },
  title: { fontSize: '16px' },
  description: { fontSize: '13px', color: '#555', margin: '6px 0 0 26px' },
  meta: { display: 'flex', gap: '12px', marginTop: '8px', marginLeft: '26px' },
  badge: { fontSize: '13px', fontWeight: 'bold' },
  dueDate: { fontSize: '13px', color: '#555' },
  deleteBtn: {
    padding: '6px 12px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
  },
};

export default TodoItem;
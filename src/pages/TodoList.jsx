import { useState, useEffect, useCallback } from 'react';
import api from '../api/axiosInstance';
import TodoForm from '../components/TodoForm';
import TodoItem from '../components/TodoItem';
import TodoFilter from '../components/TodoFilter';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  const [submitting, setSubmitting] = useState(false);
  const [addError, setAddError] = useState(null);

  const [busyId, setBusyId] = useState(null);
  const [actionError, setActionError] = useState(null);

  const fetchTodos = useCallback(async (currentFilter) => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (currentFilter === 'active') params.completed = 'false';
      if (currentFilter === 'completed') params.completed = 'true';

      const response = await api.get('/api/v1/todos', { params });
      setTodos(response.data);
    } catch (err) {
      console.error('Error fetching todos:', err);
      setError(err.response?.data?.message || 'Gagal mengambil data todo');
      setTodos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTodos(filter);
  }, [fetchTodos, filter]);

  const handleAdd = async (payload) => {
    try {
      setSubmitting(true);
      setAddError(null);
      const response = await api.post('/api/v1/todos', payload);
      setTodos((prev) => [...prev, response.data]);
      return true;
    } catch (err) {
      console.error('Error adding todo:', err);
      setAddError(err.response?.data?.message || 'Gagal menambah todo');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (todo) => {
    try {
      setBusyId(todo.id);
      setActionError(null);
      const response = await api.put(`/api/v1/todos/${todo.id}`, {
        completed: !todo.completed,
      });
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? response.data : t)),
      );
    } catch (err) {
      console.error('Error updating todo:', err);
      setActionError(err.response?.data?.message || 'Gagal mengubah status todo');
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async (id) => {
    try {
      setBusyId(id);
      setActionError(null);
      await api.delete(`/api/v1/todos/${id}`);
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      console.error('Error deleting todo:', err);
      setActionError(err.response?.data?.message || 'Gagal menghapus todo');
    } finally {
      setBusyId(null);
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading todos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorContainer}>
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchTodos} style={styles.retryButton}>
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>Todo List</h1>
      <p>Total todo: {todos.length}</p>

      <TodoForm onAdd={handleAdd} submitting={submitting} />
      {addError && <p style={styles.inlineError}>{addError}</p>}

      <TodoFilter current={filter} onChange={setFilter} />
      {actionError && <p style={styles.inlineError}>{actionError}</p>}

      <button onClick={() => fetchTodos(filter)} style={styles.refreshButton}>
        Refresh
      </button>

      {todos.length === 0 ? (
        <p style={styles.noResults}>Tidak ada todo untuk filter ini.</p>
      ) : (
        <div style={styles.list}>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onDelete={handleDelete}
              busyId={busyId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  errorContainer: { textAlign: 'center', padding: '40px' },
  retryButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  refreshButton: {
    padding: '10px 18px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    marginBottom: '16px',
  },
  list: { marginTop: '10px' },
  noResults: { textAlign: 'center', padding: '40px', color: '#888' },
  inlineError: { color: '#dc3545', fontSize: '14px' },
};

const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default TodoList;
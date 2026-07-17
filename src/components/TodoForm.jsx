import { useState } from 'react';

const PRIORITIES = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
];

function TodoForm({ onAdd, submitting }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [dueDate, setDueDate] = useState('');
  const [localError, setLocalError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim().length === 0) {
      setLocalError('Judul todo tidak boleh kosong');
      return;
    }
    setLocalError(null);

    const payload = {
      title: title.trim(),
      ...(description.trim() && { description: description.trim() }),
      priority,
      ...(dueDate && { dueDate }),
    };

    const success = await onAdd(payload);
    if (success) {
      setTitle('');
      setDescription('');
      setPriority('low');
      setDueDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        type="text"
        placeholder="Judul todo..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
        disabled={submitting}
      />
      <input
        type="text"
        placeholder="Deskripsi (opsional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        style={styles.input}
        disabled={submitting}
      />
      <div style={styles.row}>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          style={styles.select}
          disabled={submitting}
        >
          {PRIORITIES.map((p) => (
            <option key={p.value} value={p.value}>
              {p.label}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={styles.dateInput}
          disabled={submitting}
        />

        <button type="submit" style={styles.button} disabled={submitting}>
          {submitting ? 'Menyimpan...' : 'Tambah'}
        </button>
      </div>

      {localError && <p style={styles.error}>{localError}</p>}
    </form>
  );
}

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '10px' },
  row: { display: 'flex', gap: '10px', flexWrap: 'wrap' },
  input: {
    padding: '10px 14px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '15px',
  },
  select: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
  },
  dateInput: {
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '14px',
  },
  button: {
    padding: '10px 18px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '15px',
    marginLeft: 'auto',
  },
  error: { color: '#dc3545', margin: 0, fontSize: '13px' },
};

export default TodoForm;
const FILTERS = [
  { key: 'all', label: 'Semua' },
  { key: 'active', label: 'Aktif' },
  { key: 'completed', label: 'Selesai' },
];

function TodoFilter({ current, onChange }) {
  return (
    <div style={styles.wrapper}>
      {FILTERS.map((f) => (
        <button
          key={f.key}
          onClick={() => onChange(f.key)}
          style={{
            ...styles.btn,
            backgroundColor: current === f.key ? '#007bff' : '#e9ecef',
            color: current === f.key ? '#fff' : '#333',
          }}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

const styles = {
  wrapper: { display: 'flex', gap: '8px', margin: '14px 0' },
  btn: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default TodoFilter;

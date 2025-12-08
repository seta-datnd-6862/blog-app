export const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: '20px'
    }}>
      <div className="spinner"></div>
      {message && <p style={{ color: 'var(--text-secondary)' }}>{message}</p>}
    </div>
  );
};

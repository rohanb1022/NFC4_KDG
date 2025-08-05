import React from 'react';

const InstitutionSignup = () => {
  return (
    <form style={styles.form}>
      <input style={styles.input} placeholder="institution name" />
      <input style={styles.input} placeholder="email" />
      <input style={styles.input} type="password" placeholder="password" />
      <button style={styles.submitBtn}>Submit</button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid white',
    backgroundColor: 'transparent',
    color: '#fff',
  },
  submitBtn: {
    padding: '10px',
    backgroundColor: 'white',
    color: '#000',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default InstitutionSignup;

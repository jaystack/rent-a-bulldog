import React from 'react'

const styles = {
  footer: {
    display: 'flex' as 'flex',
    justifyContent: 'center' as 'center',
    alignItems: 'center' as 'center',
    flexDirection: 'column' as 'column',
    padding: '40px 0',
    backgroundColor: '#ffffff',
    color: '#4b4c4d',
  },

  list: {
    padding: 0,
    listStyle: 'none' as 'none',
    textAlign: 'center' as 'center',
    fontSize: 18,
    lineHeight: 1.6,
    marginBottom: 0,
  }
};

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <ul style={styles.list}>
        <li><a href="#">Home</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Terms</a></li>
        <li><a href="#">Privacy Policy</a></li>
      </ul>
      <p>Company Name © 2021</p>
    </footer>
  )
}

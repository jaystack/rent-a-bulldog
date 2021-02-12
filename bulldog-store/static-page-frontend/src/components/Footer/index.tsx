import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Instagram, Twitter, Facebook } from '@material-ui/icons';

const styles = makeStyles((_) => ({
  footer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '40px 0',
    backgroundColor: '#ffffff',
    color: '#4b4c4d',
  },
  social: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '> a': {
      fontSize: 24,
      width: 40,
      height: 40,
      lineHeight: 40,
      display: 'inline-block',
      textAlign: 'center',
      borderRadius: '50%',
      border: '1px solid #ccc',
      margin: '0 8px',
      color: 'inherit',
      opacity: '0.75'
    }
  },
  list: {
    padding: 0,
    listStyle: 'none',
    textAlign: 'center',
    fontSize: 18,
    lineHeight: 1.6,
    marginBottom: 0,
    'li': {
      padding: '0 10px',
    },
    'ul a': {
      color: 'inherit',
      textDecoration: 'none',
      opacity: '0.8'
    },
  }
}));

export default function Footer() {
  const classes = styles();
  return (
    <footer className={classes.footer}>
      <div className={classes.social}>
        <a href="#">
          <Instagram fontSize='large' />
        </a>
        <a href="#">
          <Twitter fontSize='large' />
        </a>
        <a href="#">
          <Facebook fontSize='large' />
        </a>
      </div>
      <ul className={classes.list}>
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

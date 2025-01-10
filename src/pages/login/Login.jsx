import React from 'react';
import styles from './Login.module.css';

const Login = () => {
  return (
    <div className={styles.loginWrapper}>
      <div className={styles.container}>
        <form className={styles.formContainer}>
          <div>
            <label htmlFor="email">Email: </label>
            <input type="email" id="email" name="email" />
          </div>
          <div>
            <label htmlFor="password">Password: </label>
            <input type="password" id="password" name="password" />
          </div>
          <button className={styles.loginButton}>Login</button>     
        </form>
      </div>
      <div className={styles.secret}>
        <input type='text' className={styles.secretInput} />
      </div>
    </div>
  )
}

export default Login;


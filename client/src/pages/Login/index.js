import { useContext, useState, useRef } from 'react';
import { Navigate, Link } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import fire from '../../utils/firebase';

import "./styles.css";

export default function Login() {
  const [isAuthenticated, setAuthentication] = useContext(AuthContext);
  const [isButtonDisabled, setButtonState] = useState(false);
  const emailRef = useRef('');
  const passwordRef = useRef('');

  async function login(event) {
    event.preventDefault();
    setButtonState(true);

    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;
    try {
      await fire.auth().signInWithEmailAndPassword(email, password);
      setAuthentication(true);
      
    } catch (error) {
      let message = '';
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'There is no account associated with this email address.';
          break;
        case 'auth/wrong-password':
          message = 'Wrong password. Try again.';
          break;
        default:
          message = error.message;
      }
      console.log(message);
      passwordRef.current.value = '';
      setButtonState(false);
    }
  }

  if (isAuthenticated === null) return null;
  if (isAuthenticated === true) return <Navigate to='/' />;
  return (
    <section>
      <div className='sign-in-container'>
        <div>
          <h2>Sign in</h2>
          <form onSubmit={login}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoCapitalize="off"
              autoComplete="email"
              spellCheck="false"
              autoFocus
              required
              ref={emailRef}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              required
              ref={passwordRef}
            />
            <button disabled={isButtonDisabled}>Login</button>
          </form>
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
        </div>
      </div>
    </section>
  );
}
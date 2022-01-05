import { useContext, useState, useRef } from 'react';
import { Link, Navigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import fire from '../../utils/firebase';

export default function Signup() {
  const [isAuthenticated, setAuthentication] = useContext(AuthContext);
  const [isButtonDisabled, setButtonState] = useState(false);
  const nameRef = useRef('');
  const emailRef = useRef('');
  const passwordRef = useRef('');

  async function signup(event) {
    event.preventDefault();
    setButtonState(true);

    const name = nameRef.current.value.trim();
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value;

    try {
      const { user } = await fire.auth().createUserWithEmailAndPassword(email, password);
      user.updateProfile({ displayName: name });
      await fire.auth().signInWithEmailAndPassword(email, password); // Force auth.currentUser to update
      setAuthentication(true);
    } catch (error) {
      passwordRef.current.value = '';
      setButtonState(false);
    }
  }

  if (isAuthenticated === null) return null;
  if (isAuthenticated === true) return <Navigate to='/' />
  return (
    <section>
      <div>
        <div>
          <h2>Create Account</h2>
          <form onSubmit={signup}>
            <label htmlFor="name">Full name</label>
            <input
              type="text"
              id="name"
              name="name"
              maxLength="32"
              autoComplete="name"
              spellCheck="false"
              autoFocus
              required
              ref={nameRef}
            />
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              name="email"
              autoCapitalize="off"
              autoComplete="email"
              spellCheck="false"
              required
              ref={emailRef}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="6+ characters"
              minLength="6"
              maxLength="100"
              autoComplete="new-password"
              required
              ref={passwordRef}
            />
            <button disabled={isButtonDisabled}>Create Account</button>
          </form>
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </section>
  );
}
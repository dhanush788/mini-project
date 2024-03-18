import React, { useState } from 'react';
import handleSignUp from './Fsignup';

function SignUpForm() {
  const [username, setUsername] = useState('');

  const handleSignUpClick = () => {
    handleSignUp(username , false);
  };

  return (
    <div>
      <h2>WebAuthn Signup</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="button" onClick={handleSignUpClick}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;

import React, { useState } from 'react';
import handleSignIn from './Fsignin';

function SignInForm() {
  const [username, setUsername] = useState('');
  const existingCredentialId = 'UVq7OcE6fyOCFw7z3XEirL4bER5TNqwS0VeP1nWdgHk'; 

  // const handleSignIn = async () => {
  //   try {
  //     // Simulate server response with authentication options
  //     console.log(existingCredentialId, "existingCredentialId")
  //     const authenticationOptions = {
  //       publicKey: {
  //         challenge: generateRandomArray(32), // Generate a random challenge
  //         allowCredentials: [
  //           {
  //             type: 'public-key',
  //             id: existingCredentialId // Use the ID of the existing credential
  //           }
  //         ],
  //         timeout: 60000,
  //         userVerification: 'preferred'
  //       }
  //     };

  //     // Use the WebAuthn API to authenticate the user
  //     const credential = await navigator.credentials.get({
  //       publicKey: authenticationOptions.publicKey
  //     });

  //     // Simulate sending authentication data to server (since there's no server in this example)

  //     // Optionally, redirect user to a success page
  //     window.location.href = '/success';
  //   } catch (error) {
  //     console.error('Error during sign-in:', error);
  //     // Handle error gracefully
  //   }
  // };

  // Function to generate a random Uint8Array
  // const generateRandomArray = (length) => {
  //   const array = new Uint8Array(length);
  //   window.crypto.getRandomValues(array);
  //   return array;
  // };

  const handleSignInClick = () => {
    handleSignIn(username)
  }

  return (
    <div>
      <h2>WebAuthn Sign In</h2>
      <form>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="button" onClick={handleSignInClick}>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;

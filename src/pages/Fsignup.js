

async function handleSignUp(username, platform) {
  try {
    const challenge = Uint8Array.from(
      "UZSL85T9AFC", c => c.charCodeAt(0));

    const registrationOptions = {
      publicKey: {
        challenge: challenge,
        rp: {
          name: 'Example Corp'
        },
        user: {
          id: Uint8Array.from(
            "UZSL85T9AFC", c => c.charCodeAt(0)),
          name: username,
          displayName: username,
        },
        pubKeyCredParams: [
          {
            type: 'public-key',
            alg: -7
          },
          {
            type: 'public-key',
            alg: -257
          }
        ],
        authenticatorSelection: {
          authenticatorAttachment: platform ? 'cross-platform' : 'platform',
          requireResidentKey: false,
          userVerification: 'preferred',
        },
        timeout: 60000,
        attestation: 'direct'
      }
    };

    const credential = await navigator.credentials.create({
      publicKey: registrationOptions.publicKey
    });

    console.log("credential:",credential)

    const publicKey = credential.response.getPublicKey();
    console.log("public key:", publicKey);


  } catch (error) {
    console.error('Error during registration:', error);
  }
}

function generateRandomArray(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return array;
}



export default handleSignUp;

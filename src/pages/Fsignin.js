async function handleSignIn() {
  const randomStringFromServer = "O_wUisniHDmQdWgwA0f7U5dLwlXOvHt3D74U-3u2Puw"
  const credentialId = new Uint8Array([228, 28, 29, 10, 224, 138, 67, 6, 77, 179, 8, 12, 53, 28, 179, 120, 116, 250, 219, 172, 63, 55, 212, 213, 101, 239, 21, 197, 14, 86, 249, 201]
    )

  try {
    // Simulate server response with authentication options
    const publicKeyCredentialRequestOptions = {
      challenge: Uint8Array.from(
        'UZSL85T9AFC', c => c.charCodeAt(0)),
      allowCredentials: [{
        id: credentialId,
        type: 'public-key',
        transports: ['internal'],
      }],
      timeout: 60000,
    }

    const assertion = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions
    });

    console.log("assertion" , assertion)



  } catch (error) {
    console.error('Error during sign-in:', error);
    // Handle error gracefully
  }
}


export default handleSignIn
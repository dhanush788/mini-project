async function handleSignIn() {
  const randomStringFromServer = "O_wUisniHDmQdWgwA0f7U5dLwlXOvHt3D74U-3u2Puw"
  const credentialId = new Uint8Array([
    159,
    54,
    142,
    100,
    167,
    250,
    108,
    215,
    77,
    27,
    216,
    185,
    143,
    130,
    225,
    92,
    32,
    218,
    248,
    65,
    83,
    174,
    77,
    214,
    80,
    171,
    57,
    158,
    105,
    128,
    68,
    127
  ])

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
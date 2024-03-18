async function handleSignIn() {
    const randomStringFromServer = "O_wUisniHDmQdWgwA0f7U5dLwlXOvHt3D74U-3u2Puw"
    const credentialId = "UGE9PbscsPPi-jyEhVLZF3uLTHrEpcsidngcO8c-yl0"

    try {
      // Simulate server response with authentication options
      const publicKeyCredentialRequestOptions = {
        challenge: Uint8Array.from(
            randomStringFromServer, c => c.charCodeAt(0)),
        allowCredentials: [{
            id: Uint8Array.from(
                credentialId, c => c.charCodeAt(0)),
            type: 'public-key',
            transports: ['internal'],
        }],
        timeout: 60000,
    }
    
    const assertion = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions
    });

    console.log(assertion)
      window.location.href = '/success';
    } catch (error) {
      console.error('Error during sign-in:', error);
      // Handle error gracefully
    }
  }
  

export default handleSignIn
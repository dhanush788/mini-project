import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from "./firebase"

const getCredentialIdByUsername = async (username) => {
  try {
    const developerId = "UlLgFDWFvUUvL8A3b9pH";
    const projectId = "TqxMGwBYdsdEGImsR3lr";
    const q = query(collection(db, 'developers', developerId, 'projects', projectId, 'users'), where('username', '==', username));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // If a document with the provided username exists, access its credentialId
      const docSnapshot = querySnapshot.docs[0]; // Assuming there's only one document per username
      const userData = docSnapshot.data();
      const credentialId = userData.credentialId;
      console.log("credentialId : ", credentialId)
      return credentialId;
    } else {
      console.log('No user found with the provided username.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

async function handleSignIn(username) {
  const credentialId = new Uint8Array(await getCredentialIdByUsername(username))
  console.log(credentialId, "credentialId")
  console.log(username, "username")

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

    console.log("Assertion:", assertion);

    const authenticatorDataBytes = new Uint8Array(assertion.response.authenticatorData);
    const clientDataHashBytes = new Uint8Array(assertion.response.clientDataJSON);
    const signedData = new Uint8Array(authenticatorDataBytes.length + clientDataHashBytes.length);
    signedData.set(authenticatorDataBytes, 0);
    signedData.set(clientDataHashBytes, authenticatorDataBytes.length);

    console.log('Signed Data:', signedData);

    const publicKey = await importPublicKey(assertion.response.userHandle);
    console.log("one")

    const isValid = await verifySignature(publicKey, assertion.response.signature, signedData);
    console.log("first")
    console.log('Is Signature Valid:', isValid);

    // Continue with further handling based on isValid

  } catch (error) {
    console.error('Error during sign-in:', error);
    // Handle error gracefully
  }
}


function base64urlEncode(arrayBuffer) {
  // Convert Uint8Array to base64 string
  const base64String = btoa(String.fromCharCode.apply(null, arrayBuffer));

  // Convert base64 to base64url by replacing '+', '/', and '=' characters
  return base64String
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}


function base64urlToBase64(base64url) {
  const base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  const paddedBase64 = base64 + '==='.slice(0, (4 - base64.length % 4) % 4);
  return paddedBase64;
}

// Decode base64 to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binaryString =  atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}


async function importPublicKey(publicKeyData) {
  try {
    // Decode the base64url-encoded public key data to ArrayBuffer
    console.log(publicKeyData, "publicKeyData")
    const arrayBuffer = new Uint8Array(publicKeyData);

    const base64urlEncodedString = base64urlEncode(arrayBuffer);
    console.log(base64urlEncodedString, "base64urlEncodedString")
    const base64String = base64urlToBase64(base64urlEncodedString);
    const publicKeyBytes = base64ToArrayBuffer(base64String);
    const byteArray = new Uint8Array(publicKeyBytes);

    // Import the public key
    const importedKey = await crypto.subtle.importKey(
      "skpi", // Public key format
      byteArray, // ArrayBuffer containing the public key
      {
        name: "ECDSA", // Specify the algorithm name here
        namedCurve: "P-256", // Specify the hash algorithm if required
      },
      false, // Extractable
      ["verify"] // Key usages
    );

    // return importedKey;
  } catch (error) {
    console.error('Error importing public key:', error);
    throw error;
  }
}




async function verifySignature(publicKey, signature, data) {
  try {
    // Verify the signature
    const isValid = await crypto.subtle.verify(
      {
        name: "ECDSA",
        namedCurve: "P-256",
      },
      publicKey,
      signature,
      data
    );

    console.log('Is Signature Valid:', isValid);
    return isValid;
  } catch (error) {
    console.error('Error verifying signature:', error);
    throw error;
  }
}




export default handleSignIn
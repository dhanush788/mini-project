import { collection, query, where, getDocs } from 'firebase/firestore'
import {db} from "./firebase/firebase"

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

    console.log("assertion" , assertion)



  } catch (error) {
    console.error('Error during sign-in:', error);
    // Handle error gracefully
  }
}


export default handleSignIn
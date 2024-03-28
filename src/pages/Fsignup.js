import { decode } from "cbor-x";
import {db} from "./firebase/firebase"
import { collection, addDoc } from "firebase/firestore"; 

async function handleSignUp(username, platform) {
  try {
    const challenge = Uint8Array.from(
      "UZSL85T9AFC", c => c.charCodeAt(0));

    const registrationOptions = {
      publicKey: {
        challenge: challenge,
        rp: {
          name: "Duo Security",
          id: "localhost",
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

    console.log("credential:", credential)

    const publicKey = credential.response.getPublicKey();
    console.log("public key:", publicKey);

    // decode the clientDataJSON into a utf-8 string
    const utf8Decoder = new TextDecoder('utf-8');
    const decodedClientData = utf8Decoder.decode(
      credential.response.clientDataJSON)

    // parse the string as an object
    const clientDataObj = JSON.parse(decodedClientData);

    console.log("clientDataObj : ", clientDataObj)

    const uint8Array = new Uint8Array(credential.response.attestationObject);
    const decodedAttestationObj = decode(uint8Array)

    console.log("decodedAttestationObj : ", decodedAttestationObj)

    const { authData } = decodedAttestationObj;

    const dataView = new DataView(new ArrayBuffer(2));
    const idLenBytes = authData.slice(53, 55);
    idLenBytes.forEach((value, index) => dataView.setUint8(index, value));
    const credentialIdLength = dataView.getUint16();

    // get the credential ID
    const credentialId = authData.slice(55, 55 + credentialIdLength);

    // get the public key object
    const publicKeyBytes = authData.slice(55 + credentialIdLength);
    const publicKeyArray = new Uint8Array(publicKeyBytes); // Convert to Uint8Array

    const publicKeyObject = decode(publicKeyArray);

    console.log("publicKeyObject : ",publicKeyObject);
    console.log("credentialId : ", credentialId)
    console.log("publicKeyBytes : ", publicKeyBytes)

      const data = {
        credentialId: Array.from(credentialId),
        publicKeyBytes: Array.from(publicKeyBytes),
        username: username,
      }

    pushData(data)


  } catch (error) {
    console.error('Error during registration:', error);
  }
}


function generateRandomArray(length) {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return array;
}


const developerId = "UlLgFDWFvUUvL8A3b9pH";
const projectId = "TqxMGwBYdsdEGImsR3lr";
const userID = "muk4dXiKas8aS8uz128cOJY1UKWO7sScGQR2HQIaEIk"

// function to push into firestore
const pushData = async (data) => {

    const docRef = await addDoc(collection(db, "developers", developerId, "projects", projectId, "users"),
    {
        ...data,
    });

    console.log("Document written with ID:", docRef);
  };

  




export default handleSignUp;

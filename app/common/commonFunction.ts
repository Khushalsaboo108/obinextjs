
import CryptoJS from "crypto-js";
import { addconfirmationAPI } from "../api/arrivial/apiPath";

export const SECRET_KEY = "H@8aAn@eTh)99]B";

export const encryptData = (text: string) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(text),
    SECRET_KEY
  ).toString();
  return encrypted;
  // store.dispatch(setLoggedInUserDetail(encrypted))
};

export const decryptData = (Text: string) => {
  const encrypted = Text;
  const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY).toString(
    CryptoJS.enc.Utf8
  );
  return JSON.parse(decrypted);
};

const wordArrayToBase64 = (wordArray : any ) => {
  return CryptoJS.enc.Base64.stringify(wordArray);
};

type CardholderDetails = {
  cardNumber: string;
  name: string;
  cvv: string;
  cardMonth: string;
  cardYear: string;
};

export const encryptCardDetails = (cardholderDetails : CardholderDetails, ) => {
  
    const IV_RANDOM_NUMBER = 16

    const iv = CryptoJS.lib.WordArray.random(IV_RANDOM_NUMBER);
    const cardNumber = encryptData(cardholderDetails.cardNumber);
    const cardHolderName = encryptData(cardholderDetails.name);
    const cvv = encryptData(cardholderDetails.cvv);
    const expiryDate = encryptData(`${cardholderDetails.cardMonth}${cardholderDetails.cardYear}`);

    console.log("Hello",expiryDate)


    return {
      iv: wordArrayToBase64(iv),
      cardNumber: cardNumber,
      cardHolderName: cardHolderName,
      cvv: cvv,
      expiryDate: expiryDate,
    };
  };

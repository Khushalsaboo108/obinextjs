
import CryptoJS from "crypto-js";
import { parse, format, differenceInYears, differenceInMonths } from "date-fns";
import { store } from "../redux/store";

export const SECRET_KEY = "H@8aAn@eTh)99]B";



const wordArrayToBase64 = (wordArray : any ) => {
  return CryptoJS.enc.Base64.stringify(wordArray);
};

const base64ToWordArray = (base64 : any) => {
  return CryptoJS.enc.Base64.parse(base64);
};


const encryptData = (data : any, iv : any, key : any) => {
  const value = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(data), base64ToWordArray(key), {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return value.ciphertext.toString(CryptoJS.enc.Base64)
}

type CardholderDetails = {
  cardNumber: string;
  name: string;
  cvv: string;
  cardMonth: string;
  cardYear: string;
};

export const encryptCardDetails = (cardholderDetails : CardholderDetails, key : string ) => {
  
    const IV_RANDOM_NUMBER = 16

    const iv  = CryptoJS.lib.WordArray.random(IV_RANDOM_NUMBER);
    const cardNumber = encryptData(cardholderDetails.cardNumber, iv, key );
    const cardHolderName = encryptData(cardholderDetails.name, iv, key);
    const cvv = encryptData(cardholderDetails.cvv, iv, key);
    const expiryDate = encryptData(`${cardholderDetails.cardMonth}${cardholderDetails.cardYear}`, iv, key);



    return {
      iv: wordArrayToBase64(iv),
      cardNumber: cardNumber,
      cardHolderName: cardHolderName,
      cvv: cvv,
      expiryDate: expiryDate,
    };
  };

  export function dateFormatForDisplay(date : any, dateFormat : any) {
    if(!date){
      return date
    }
    let tmpDate = format(new Date(date), dateFormat);
    return tmpDate;
  }

  // export function convertAmountToUSD(amount : number ) {
  //   const state = store.getState();
  //   const selectedMarket = state.marketRedux?.availableMarkets?.data?.markets?.find((m : any) => m.marketid === state.marketRedux?.selectedMarketId)
  //   const exchangerate = selectedMarket?.exchangerate;
  //   const usdAmount = (amount / exchangerate).toFixed(2);
  
  //   return usdAmount;
  // }
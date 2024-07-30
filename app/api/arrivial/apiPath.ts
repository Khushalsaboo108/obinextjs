"use server";
import { CUSTOMER_LOGIN, VIPER_CONST, VIPER_URL } from "@/app/commonConstant";
import axios from "axios";
import { request } from "http";

export async function arrival(body: any) {
  try {
    const response = await axios.post(`${VIPER_URL}login`, body);
    console.log("Data hello", response.data);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function arrivialBooking(requestFunction: any) {
  try {
    const response = await axios.post(
      `${VIPER_URL}reservecartitem`,
      requestFunction
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getschedule(requestFunction: any) {
  try {
    const response = await axios.post(
      `${VIPER_URL}getschedule`,
      requestFunction
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function contact(requestFunction: any) {
  try {
    const response = await axios.post(
      `${VIPER_URL}setcontact`,
      requestFunction
    );

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// used in fac
export async function orderId(requestFunction: any) {
  try {
    const response = await axios.post(
      `${VIPER_URL}getorderid`,
      requestFunction
    );
    console.log("orderId", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addconfirmationAPI(requestFunction: any) {
  try {
    const response = await axios.post(
      `${VIPER_URL}addconfirmationlog`,
      requestFunction
    );
    console.log("addconfirmationAPI", response.data);
    console.log("addconfirmationAPI body", requestFunction);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// used in fac
export async function processCard(requestProcesscard: any) {
  try {
    const response = await axios.post(
      `${VIPER_URL}processcard`,
      requestProcesscard
    );
    console.log("processCard", response.data);
    console.log("processCard body", requestProcesscard);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// used in payment handler
export async function conformationAPI(requestconfirmcart: any) {
  console.log("mahesh", requestconfirmcart);
  try {
    const response = await axios.post(
      `${VIPER_URL}confirmcart`,
      requestconfirmcart
    );
    console.log("conformationAPI", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function getpaymentgateway() {
  const body = {
    username: "esite3@viponline",
    sessionid: "00009223581026309436128527",
    request: {},
  };

  try {
    const response = await axios.post(
      `${VIPER_URL}getpaymentgateway`,
      body
    );

    console.log("getpaymentgateway request", response.data);

    console.log("getpaymentgateway body", body);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

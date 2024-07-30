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
    const response = await axios.post(`${VIPER_URL}reservecartitem`, requestFunction);

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

export async function contact(sessionId: string, cartitemId: number) {
  const data = {
    cartitemid: cartitemId,
    email: "khushalsaboo108@gmail.com",
    firstname: "Khushal",
    lastname: "Saboo",
    phone: "06376135858",
    title: "MR",
  };

  const res = {
    contact: data,
  };

  const body = {
    username: "esite3@viponline",
    sessionid: sessionId,
    failstatus: 0,
    request: res,
  };

  try {
    const response = await axios.post(
      "https://nigeriadev.reliablesoftjm.com/VIPERWS/setcontact"
      // body
    );
    // console.log("Data on my", response.data);
    return body;
  } catch (error) {
    console.error(error);
  }
}

// used in fac
export async function orderId(sessionId: string) {
  const res = {
    amount: 50,
    source: "OBI-MAIN",
  };

  const body = {
    username: "esite3@viponline",
    sessionid: sessionId,
    failstatus: 0,
    request: res,
  };

  try {
    const response = await axios.post(
      "https://nigeriadev.reliablesoftjm.com/VIPERWS/getorderid",
      body
    );
    console.log("orderId", response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function addconfirmationAPI(dataAddconfirmation: any) {
  const sessionId = dataAddconfirmation.sessionid;
  const cartitemId = dataAddconfirmation.cardId;
  const orderIdData = dataAddconfirmation.orderId;

  const body = {
    username: "esite3@viponline",
    sessionid: sessionId,
    failstatus: 0,
    request: {
      distributorid: "",
      sendconfirmation: {
        sendto: "khushalsaboo108@gmail.com",
        copyto: "",
      },
      cart: [
        {
          cartitemid: cartitemId,
          productid: "ARRIVALONLY",
          referencenumber: "",
          groupid: "NA",
          groupbooking: "N",
          arrivalscheduleid: 476739,
          departurescheduleid: 0,
          adulttickets: 1,
          childtickets: 0,
          infanttickets: 0,
          optional: {
            occasioncomment: "",
            paddlename: "Khushal Saboo",
          },
          passengers: [
            {
              passengertype: "ADULT",
              title: "MR",
              firstname: "Khushal",
              lastname: "Saboo",
              email: "khushalsaboo108@gmail.com",
              phone: "06376135858",
              dob: "",
            },
          ],
          primarycontact: {
            title: "MR",
            firstname: "Khushal",
            lastname: "Saboo",
            email: "khushalsaboo108@gmail.com",
            phone: "06376135858",
          },
          secondarycontact: {
            title: "MR",
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
          },
          amount: 50,
        },
      ],
      payment: {
        paymenttype: "GUESTCARD",
        charged: "Y",
        creditcard: {
          cardtype: "VISA",
          cardnumber: "1111",
          cardholder: "Khushal Saboo",
          email: "khushalsaboo108@gmail.com",
          currency: "USD",
          amount: 50,
          authorizationnumber: 123456,
        },
      },
      affiliateid: "!",
      subaffiliateid: 0,
      httpreferrer: "",
      referrerid: "",
      orderid: orderIdData,
    },
  };
  try {
    const response = await axios.post(
      "https://nigeriadev.reliablesoftjm.com/VIPERWS/addconfirmationlog",
      body
    );
    console.log("addconfirmationAPI", response.data);
    console.log("addconfirmationAPI body", body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// used in fac
export async function processCard(processCardRequest: any, sessionId: string) {
  const body = {
    username: "esite3@viponline",
    sessionid: sessionId,
    request: processCardRequest,
  };

  try {
    const response = await axios.post(
      "https://nigeriadev.reliablesoftjm.com/VIPERWS/processcard",
      body
    );
    console.log("processCard", response.data);
    console.log("processCard body", body);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

// used in payment handler
export async function conformationAPI(sessionId: string, cartitemId: number) {
  const body = {
    username: "esite3@viponline",
    sessionid: sessionId,
    failstatus: 0,
    request: {
      distributorid: "",
      sendconfirmation: {
        sendto: "khushalsaboo108@gmail.com",
        copyto: "",
      },
      cart: [
        {
          cartitemid: cartitemId,
          productid: "ARRIVALONLY",
          referencenumber: "",
          groupid: "NA",
          groupbooking: "N",
          arrivalscheduleid: 450612,
          departurescheduleid: 0,
          adulttickets: 1,
          childtickets: 0,
          infanttickets: 0,
          optional: {
            occasioncomment: "",
            paddlename: "Khushal Saboo",
          },
          passengers: [
            {
              passengertype: "ADULT",
              title: "MR",
              firstname: "Khushal",
              lastname: "Saboo",
              email: "khushalsaboo108@gmail.com",
              phone: "06376361558",
              dob: "",
            },
          ],
          primarycontact: {
            title: "MR",
            firstname: "Khushal",
            lastname: "Saboo",
            email: "khushalsaboo108@gmail.com",
            phone: "06376361558",
          },
          secondarycontact: {
            title: "MR",
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
          },
          amount: 50,
        },
      ],
      payment: {
        paymenttype: "GUESTCARD",
        charged: "Y",
        creditcard: {
          cardtype: "VISA",
          cardnumber: "0006",
          cardholder: "shubam",
          email: "khushalsaboo108@gmail.com",
          currency: "USD",
          amount: 50,
          authorizationnumber: "123456",
        },
      },
      affiliateid: "!",
      subaffiliateid: 0,
      httpreferrer: "",
      referrerid: "",
    },
  };

  console.log("mahesh", body);
  try {
    const response = await axios.post(
      "https://nigeriadev.reliablesoftjm.com/VIPERWS/confirmcart",
      body
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
      "https://nigeriadev.reliablesoftjm.com/VIPERWS/getpaymentgateway",
      body
    );

    console.log("getpaymentgateway request", response.data);

    console.log("getpaymentgateway body", body);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

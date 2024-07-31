"use server";
import { CUSTOMER_LOGIN, VIPER_CONST, VIPER_URL } from "@/app/commonConstant";
import axios from "axios";
import { request } from "http";

export async function arrival(body: any) {
  try {
    const response = await axios.post(`${VIPER_URL}login`, body);
    console.log("Data hello", response.data);

    let customerLogindata;

    if (response.data.status === 0) {
      customerLogindata = {
        status: response.data.status,
        statusMessage: response.data.statusMessage,
        severity: 0,
        data: {
          username: "esite3@viponline",
          sessionid: response.data.data.sessionid,
          // userdefault: {
          //   username: "esite3@viponline",
          //   firstname: "VIP",
          //   lastname: "Attractions",
          //   email: "richard.simpson@reliablesoftjm.com",
          //   phone: "",
          //   displayname: "VIP Attractions",
          //   resetpassword: "N",
          //   manageuser: "Y",
          //   subscriber: "N",
          //   distributorid: "VIPONLINE",
          //   reportagent: "N",
          //   thirdparty: "N",
          // },
          // distributorprofile: {
          //   distributorid: "VIPONLINE",
          //   distributorname: "VIP Attractions Website",
          //   usernamesuffix: "VIPONLINE",
          //   invoiceonly: "N",
          //   guestcardonly: "Y",
          //   distributorcardonly: "N",
          //   invoiceallowed: "N",
          //   guestcardallowed: "N",
          //   distributorcardallowed: "N",
          //   prepaidallowed: "N",
          //   prepaidproductallowed: "N",
          //   distributorbookingallowed: "N",
          //   loungepartner: "N",
          //   internal: "Y",
          //   bookingtype: "V",
          //   referencenumberallowed: "N",
          //   barterallowed: "N",
          //   barterproductallowed: "N",
          //   loyaltyallowed: "N",
          //   loyaltypartner: "N",
          //   arrivalonly: "Y",
          //   arrivalbundle: "Y",
          //   departurelounge: "Y",
          //   groupbookingallowed: "N",
          //   groupid: "",
          //   infantallowed: "Y",
          //   departuremaxseats: 24,
          //   arrivalmaxseats: 6,
          //   email: "richard.simpson@reliablesoftjm.com",
          //   childminimum: 2,
          //   adultminimum: 13,
          //   paymenttypes: [
          //     {
          //       paymenttype: "GUESTCARD",
          //       description: "Guest's Credit Card",
          //     },
          //   ],
          //   buckets: [
          //     {
          //       bucketid: "BARTERARRIVALBUNDLE",
          //       description: "BARTER - Arrival Bundle",
          //       buckettype: "BARTER",
          //       productid: "ARRIVALBUNDLE",
          //     },
          //     {
          //       bucketid: "BARTERARRIVALONLY",
          //       description: "BARTER - Arrival Only",
          //       buckettype: "BARTER",
          //       productid: "ARRIVALONLY",
          //     },
          //     {
          //       bucketid: "BARTERDEPARTURELOUNGE",
          //       description: "BARTER - Departure Lounge",
          //       buckettype: "BARTER",
          //       productid: "DEPARTURELOUNGE",
          //     },
          //     {
          //       bucketid: "BARTER",
          //       description: "BARTER - Distributor Account",
          //       buckettype: "BARTER",
          //       productid: "",
          //     },
          //     {
          //       bucketid: "BILLING",
          //       description: "Billing Account",
          //       buckettype: "BILLING",
          //       productid: "",
          //     },
          //     {
          //       bucketid: "COMMISSION",
          //       description: "Distributor Commission",
          //       buckettype: "COMMISSION",
          //       productid: "",
          //     },
          //     {
          //       bucketid: "PREPAIDARRIVALBUNDLE",
          //       description: "PREPAID - Arrival Bundle",
          //       buckettype: "PREPAID",
          //       productid: "ARRIVALBUNDLE",
          //     },
          //     {
          //       bucketid: "PREPAIDARRIVALONLY",
          //       description: "PREPAID - Arrival Only",
          //       buckettype: "PREPAID",
          //       productid: "ARRIVALONLY",
          //     },
          //     {
          //       bucketid: "PREPAIDDEPARTURELOUNGE",
          //       description: "PREPAID - Departure Lounge",
          //       buckettype: "PREPAID",
          //       productid: "DEPARTURELOUNGE",
          //     },
          //     {
          //       bucketid: "PREPAID",
          //       description: "PREPAID - Distributor Account",
          //       buckettype: "PREPAID",
          //       productid: "",
          //     },
          //     {
          //       bucketid: "PRIZELETTER",
          //       description: "Prize Letter",
          //       buckettype: "PRIZELETTER",
          //       productid: "",
          //     },
          //     {
          //       bucketid: "COMPLIMENTARY",
          //       description: "Complimentary Distributor Account",
          //       buckettype: "",
          //       productid: "",
          //     },
          //     {
          //       bucketid: "MAIN",
          //       description: "Distributor Main Account",
          //       buckettype: "",
          //       productid: "",
          //     },
          //   ],
          //   prepaidbalances: [],
          //   barterbalances: [],
          //   prepaidonly: "N",
          //   affiliateid: 0,
          //   marketid: "JAM",
          //   currencycode: "USD",
          //   theme: "",
          //   affiliateurl: "",
          // },
          // giftpackages: [
          //   {
          //     packageid: "2",
          //     description: "Club Kingston",
          //     productid: "ARRIVALONLY",
          //     airportid: "NMIA",
          //     arrivalairportid: "NMIA",
          //     departureairportid: "NMIA",
          //     adulttickets: 1,
          //     childtickets: 0,
          //     image: "IMAGE1",
          //     days: 365,
          //   },
          //   {
          //     packageid: "4",
          //     description: "Club Kingston",
          //     productid: "ARRIVALBUNDLE",
          //     airportid: "NMIA",
          //     arrivalairportid: "NMIA",
          //     departureairportid: "NMIA",
          //     adulttickets: 1,
          //     childtickets: 0,
          //     image: "IMAGE1",
          //     days: 365,
          //   },
          //   {
          //     packageid: "6",
          //     description: "Club Kingston",
          //     productid: "DEPARTURELOUNGE",
          //     airportid: "NMIA",
          //     arrivalairportid: "NMIA",
          //     departureairportid: "NMIA",
          //     adulttickets: 1,
          //     childtickets: 0,
          //     image: "IMAGE1",
          //     days: 365,
          //   },
          //   {
          //     packageid: "1",
          //     description: "Club Mobay",
          //     productid: "ARRIVALONLY",
          //     airportid: "SIA",
          //     arrivalairportid: "SIA",
          //     departureairportid: "SIA",
          //     adulttickets: 1,
          //     childtickets: 0,
          //     image: "IMAGE1",
          //     days: 365,
          //   },
          //   {
          //     packageid: "3",
          //     description: "Club Mobay",
          //     productid: "ARRIVALBUNDLE",
          //     airportid: "SIA",
          //     arrivalairportid: "SIA",
          //     departureairportid: "SIA",
          //     adulttickets: 1,
          //     childtickets: 0,
          //     image: "IMAGE1",
          //     days: 365,
          //   },
          //   {
          //     packageid: "5",
          //     description: "Club Mobay",
          //     productid: "DEPARTURELOUNGE",
          //     airportid: "SIA",
          //     arrivalairportid: "SIA",
          //     departureairportid: "SIA",
          //     adulttickets: 1,
          //     childtickets: 0,
          //     image: "IMAGE1",
          //     days: 365,
          //   },
          // ],
          // webserviceparameters: {
          //   build: "I20240428",
          //   version: "3.0.0",
          // },
          marketid: "JAM",
          languageid: "en",
        },
      };
    } else {
      customerLogindata = {
        status: response.data.status,
        statusMessage: response.data.statusMessage,
      };
    }

    return customerLogindata;
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

    let arrivalBookingData = {
      username: response.data.username,
      sessionid: response.data.sessionid,
      status: response.data.status,
      statusMessage: response.data.statusMessage,
      severity: response.data.severity,
      cartitemid: response.data.data.cartitemid,
    };

    console.log(response.data);

    return arrivalBookingData;
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

    let getScheduleData = {
      username: response.data.username,
      sessionid: response.data.sessionid,
      status: response.data.status,
      statusMessage: response.data.statusMessage,
      severity: response.data.severity,
    };

    return getScheduleData;
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

    let SetContact = {
      username: response.data.username,
      sessionid: response.data.sessionid,
      status: response.data.status,
      statusMessage: response.data.statusMessage,
      severity: response.data.severity,
      data: {
        contact: {
          cartitemid: response.data.data.contact.cartitemid,
          // title: "MR",
          // firstname: "Khushal",
          // lastname: "Saboo",
          // email: "khushalsaboo108@gmail.com",
          // phone: "06376135858",
        },
      },
    };

    return SetContact;
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

    const orderIdData = {
      username: response.data.username,
      sessionid: response.data.sessionid,
      status: response.data.status,
      statusMessage: response.data.statusMessage,
      severity: response.data.severity,
      data: {
        orderid: response.data.data.orderid,
        // transactionid: "396f17fb-12ab-4f24-bf9f-747b0c6acfe2",
        // amount: 50,
      },
    };

    return orderIdData;
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

    const confirmationData = {
      username: response.data.username,
      sessionid: response.data.sessionid,
      status: response.data.status,
      statusMessage: response.data.statusMessage,
      severity: response.data.severity,
    };

    return confirmationData;
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

    const paymentData = {
      username: response.data.username,
      sessionid: response.data.sessionid,
      status: response.data.status,
      statusMessage: response.data.statusMessage,
      severity: response.data.severity,
      data: response.data.data,
    };

    return paymentData;
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

export async function getpaymentgateway(sessionId: any) {
  const body = {
    username: "esite3@viponline",
    sessionid: sessionId,
    request: {},
  };

  try {
    const response = await axios.post(`${VIPER_URL}getpaymentgateway`, body);

    console.log("getpaymentgateway request", response.data);

    console.log("getpaymentgateway body", body);

    return response.data;
  } catch (error) {
    console.error(error);
  }
}

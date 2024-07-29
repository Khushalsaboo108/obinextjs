"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import { conformationAPI, orderId, processCard } from "../api/arrivial/apiPath";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch, useAppSelector } from "../redux/store";
import { useFormik } from "formik";
import md5 from "md5";
import { orderIdData } from "../redux/sessionIdSlice";
import { processCreditCardPayment } from "../common/Fac";
import { cartData } from "../redux/cardSlice";
import { dateFormatForDisplay } from "../common/commonFunction";

const LoginPage = () => {
  const DEFAULT_CURRENCYCODE = "USD";

  const cartCompleteData = useSelector(cartData);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const getSessionData = useAppSelector(
    (state) => state.reducer.sessionData.sessionId
  );
  const getcartitemIdData = useAppSelector(
    (state) => state.reducer.sessionData.cartitemId
  );
  const getOrderIdData = useAppSelector(
    (state) => state.reducer.sessionData.orderId
  );

  const [submitOnClickDisable, setSubmitOnClickDisable] = useState(false);

  const formikData = useFormik({
    initialValues: {
      name: "",
      email: "khushalsaboo108@gmail.com",
      cardType: "VISA",
      cardProfile: { value: "GUESTCARD", label: "GUEST CARD" },
      cardNumber: "",
      cardMonth: "07",
      cardYear: "2024",
      cvv: "",
    },
    onSubmit: (value) => {
      handleSubmit(value, "CREDITCARD");
    },
  });

  let totalWholesaleAmount = 0;
  cartCompleteData.forEach((e: any) => {
    totalWholesaleAmount =
      totalWholesaleAmount + e.value?.currentCartItem?.wholesale;
  });

  let totalRetailAmount = 0;
  cartCompleteData.forEach((e: any) => {
    totalRetailAmount = totalRetailAmount + e.value?.currentCartItem?.retail;
  });

  const getAmount = (paymentType: any, cardProfile: any) => {
    if (paymentType === "CREDITCARD") {
      return cardProfile === "DISTRIBUTORCARD"
        ? totalWholesaleAmount
        : totalRetailAmount;
    }
  };

  // const generateConfirmCartRequest = (paymentType: any, objPayment: any) => {
  //   let request = {};
  //   const cartArray: any = [];

  //   let affiliate_subaffiliate_data = get_affiliate_subaffiliate_data();
  //   let tmpCartItemAmount = 0;

  //   cartCompleteData.map((e: any) => {
  //     const passengersArray: any = [];
  //     e?.value?.data?.passengerInfo?.adults.forEach((a: any) => {
  //       passengersArray.push({
  //         passengertype: "ADULT",
  //         title: a?.title.value,
  //         firstname: a?.firstName,
  //         lastname: a?.lastName,
  //         email: a?.email,
  //         phone: e?.value?.data?.passengerInfo?.primaryContactDetails?.phone,
  //         dob: a?.dob ? dateFormatForDisplay(a?.dob, "yyyyMMdd") : "",
  //       });
  //     });

  //     e?.value?.data?.passengerInfo?.childs.forEach((a: any) => {
  //       passengersArray.push({
  //         passengertype: "CHILD",
  //         title: a?.title.value,
  //         firstname: a?.firstName,
  //         lastname: a?.lastName,
  //         email: a?.email,
  //         phone: e?.value?.data?.passengerInfo?.primaryContactDetails?.phone,
  //         dob: dateFormatForDisplay(a?.dob, "yyyyMMdd"),
  //       });
  //     });

  //     e?.value?.data?.passengerInfo?.infant.forEach((a: any) => {
  //       passengersArray.push({
  //         passengertype: "INFANT",
  //         title: a?.title.value,
  //         firstname: a?.firstName,
  //         lastname: a?.lastName,
  //         email: a?.email,
  //         phone: e?.value?.data?.passengerInfo?.primaryContactDetails?.phone,
  //         dob: dateFormatForDisplay(a?.dob, "yyyyMMdd"),
  //       });
  //     });

  //     if (paymentType === "INVOICE" || paymentType === "PREPAID") {
  //       tmpCartItemAmount = e?.value?.currentCartItem?.wholesale;
  //     } else {
  //       tmpCartItemAmount =
  //         formikData?.values?.cardProfile?.value !== "GUESTCARD"
  //           ? e?.value?.currentCartItem?.wholesale
  //           : e?.value?.currentCartItem?.retail;
  //     }
  //     if (
  //       paymentType === "MAGNACARD" ||
  //       paymentType === "VIPMEMBERSHIPCARD" ||
  //       paymentType === "PREPAID" ||
  //       paymentType === "BARTER"
  //     ) {
  //       if ("USD" !== DEFAULT_CURRENCYCODE) {
  //         tmpCartItemAmount = 50;
  //       }
  //     }

  //     let groupbooking = distributorProfile?.groupbookingallowed || "N";
  //     let groupid = groupbooking === "Y" ? distributorProfile?.groupid : "NA";
  //     let infantCount = parseInt(e?.value?.infantCount);

  //     cartArray.push({
  //       cartitemid: e?.value?.currentCartItem?.cartitemid,
  //       productid: e?.value?.currentCartItem?.productid,
  //       referencenumber: partnerReferenceNumber,
  //       groupid: groupid,
  //       groupbooking: groupbooking,
  //       arrivalscheduleid: e?.value?.currentCartItem?.arrivalscheduleid,
  //       departurescheduleid: e?.value?.currentCartItem?.departurescheduleid,
  //       adulttickets: e?.value?.data?.passengerInfo?.adults?.length,
  //       childtickets: e?.value?.data?.passengerInfo?.childs?.length,
  //       infanttickets: infantCount, //e?.value?.data?.passengerInfo?.infant?.length,
  //       optional: {
  //         specialoccasion:
  //           e?.value?.data?.passengerInfo?.greetingDetail[0]?.occasion?.value,
  //         occasioncomment:
  //           e?.value?.data?.passengerInfo?.greetingDetail[0]?.occasionDetail,
  //         paddlename: e?.value?.data?.passengerInfo?.greetingDetail[0]?.name,
  //       },
  //       passengers: passengersArray,
  //       primarycontact:
  //         Object.values(paxCountBookingDetails)?.length === 0
  //           ? {
  //               title:
  //                 e?.value?.data?.passengerInfo?.primaryContactDetails?.title
  //                   .value,
  //               firstname:
  //                 e?.value?.data?.passengerInfo?.primaryContactDetails
  //                   ?.firstName,
  //               lastname:
  //                 e?.value?.data?.passengerInfo?.primaryContactDetails
  //                   ?.lastName,
  //               email:
  //                 e?.value?.data?.passengerInfo?.primaryContactDetails?.email,
  //               phone:
  //                 e?.value?.data?.passengerInfo?.primaryContactDetails?.phone,
  //             }
  //           : {
  //               title: "",
  //               firstname: paxCountBookingDetails?.primary?.contactname,
  //               lastname: paxCountBookingDetails?.primary?.contactname,
  //               email: paxCountBookingDetails?.primary?.email,
  //               phone: paxCountBookingDetails?.primary?.phone,
  //             },
  //       secondarycontact:
  //         Object.values(paxCountBookingDetails)?.length === 0
  //           ? {
  //               title:
  //                 e?.value?.data?.passengerInfo?.secondaryContactDetails?.title
  //                   .value,
  //               firstname:
  //                 e?.value?.data?.passengerInfo?.secondaryContactDetails
  //                   ?.firstName,
  //               lastname:
  //                 e?.value?.data?.passengerInfo?.secondaryContactDetails
  //                   ?.lastName,
  //               email:
  //                 e?.value?.data?.passengerInfo?.secondaryContactDetails?.email,
  //               phone:
  //                 e?.value?.data?.passengerInfo?.secondaryContactDetails?.phone,
  //             }
  //           : {
  //               title: "",
  //               firstname: paxCountBookingDetails?.secondary?.contactname,
  //               lastname: paxCountBookingDetails?.secondary?.contactname,
  //               email: paxCountBookingDetails?.secondary?.email,
  //               phone: paxCountBookingDetails?.secondary?.phone,
  //             },
  //       amount: tmpCartItemAmount,
  //     });
  //   });

  //   request = {
  //     ...(Object.values(paxCountBookingDetails)?.length !== 0 && {
  //       productid: paxCountBookingDetails?.productid,
  //     }),
  //     ...(Object.values(paxCountBookingDetails)?.length !== 0 && {
  //       confirmationnumber: getPaxCountBookingData()[0]?.confirmationnumber
  //         ? getPaxCountBookingData()[0]?.confirmationnumber
  //         : getPaxCountBookingData()[1]?.confirmationnumber,
  //     }),
  //     ...(Object.values(paxCountBookingDetails)?.length !== 0 && {
  //       arrivalid: getPaxCountBookingData()[0]?.reservationid
  //         ? getPaxCountBookingData()[0]?.reservationid
  //         : 0,
  //     }),
  //     ...(Object.values(paxCountBookingDetails)?.length !== 0 && {
  //       departureid: getPaxCountBookingData()[1]?.reservationid
  //         ? getPaxCountBookingData()[1]?.reservationid
  //         : 0,
  //     }),
  //     distributorid: getSubDistributorId(),
  //     sendconfirmation: {
  //       sendto: "khushalsaboo108@gmail.com",
  //       copyto: "khushalsaboo108@gmail.com",
  //     },
  //     cart: cartArray,
  //     payment: generatePaymentRequestData(paymentType, objPayment),
  //     ...(paymentType !== "VIPMEMBERSHIPCARD" &&
  //       paymentType !== "PREPAID" && {
  //         affiliateid: affiliate_subaffiliate_data.affiliateid,
  //       }),
  //     ...(paymentType !== "VIPMEMBERSHIPCARD" &&
  //       paymentType !== "PREPAID" && {
  //         subaffiliateid: affiliate_subaffiliate_data.subaffiliateid,
  //       }),
  //     ...(paymentType !== "VIPMEMBERSHIPCARD" &&
  //       paymentType !== "PREPAID" && { httpreferrer: "" }),
  //     ...(paymentType !== "VIPMEMBERSHIPCARD" &&
  //       paymentType !== "PREPAID" && { referrerid: "" }),
  //     ...(loungePartnerProductOperation(
  //       "isLoungePartnerLogin",
  //       "",
  //       "",
  //       loginDetail?.username
  //     ) && {
  //       loungepartner: {
  //         distributorid: distributorProfile?.distributorid,
  //         cardholder:
  //           cartCompleteData[0]?.value?.data?.passengerInfo?.prioritypass?.name,
  //         cardnumber:
  //           cartCompleteData[0]?.value?.data?.passengerInfo?.prioritypass
  //             ?.cardNumber,
  //         expirydate:
  //           cartCompleteData[0]?.value?.data?.passengerInfo?.prioritypass
  //             ?.cardYear +
  //           cartCompleteData[0]?.value?.data?.passengerInfo?.prioritypass
  //             ?.cardMonth +
  //           "01",
  //       },
  //     }),
  //   };

  //   return request;
  // };

  const handleSubmit = async (values: any, paymentType: string) => {
    let request = {};
    let error = false;

    if (paymentType === "CREDITCARD") {
      console.log("We are Going to work on payment");
    }

    if (error) {
      console.log("error Error", error);
    } else if (paymentType === "CREDITCARD") {
      setSubmitOnClickDisable(true);
      let objPayment: {
        creditcard?: {
          cardnumber?: string;
          authorizationnumber?: number;
          amount?: number;
        };
      };

      let callConfirmCart = false;

      if (paymentType === "CREDITCARD") {
        try {
          setLoadingData(true);
          objPayment = {
            creditcard: {
              cardnumber: values?.cardnumber,
              authorizationnumber: 123456,
              amount: 50,
            },
          };

          const paymentData = {
            source: "OBI-MAIN",
            amount: 50,
            cardholderDetails: values,
          };

          console.log("paymentData", paymentData);

          const responseCC = await processCreditCardPayment(
            paymentData,
            getSessionData,
            Number(getcartitemIdData)
          );

          console.log("Payment response", responseCC);

          objPayment = {
            creditcard: {
              cardnumber: responseCC?.data.cardnumber,
              authorizationnumber: responseCC?.data.authorizationnumber,
              amount: responseCC?.data.amount,
            },
          };

          console.log("objPayment", objPayment);

          if (
            objPayment &&
            objPayment.creditcard &&
            objPayment.creditcard.authorizationnumber
          ) {
            callConfirmCart = true;
          } else {
            setSubmitOnClickDisable(false);
          }
        } catch (e) {
          console.error("Error", e);
        } finally {
          setSubmitOnClickDisable(false);
          setLoadingData(false);
        }
      } else {
        console.log("We have error");
      }

      console.log("callConfirmCart" , callConfirmCart)

      // 4012000000020006 working card number but 2 time with otp pottel.;
      // 4012000000020071 working card number but 2 time without otp pottel
      // 4111111111111111 give callConfirmCart(False);

      if (callConfirmCart === true) {
        try {
          setLoadingData(true);
          const res = await conformationAPI(
            String(getSessionData),
            Number(getcartitemIdData)
          );
          console.log(
            "https://nigeriadev.reliablesoftjm.com/VIPERWS/confirmcart",
            res
          );
          if (res.status === 0) {
            let successCurrencyCode = "USD";
            let successAmount = getAmount(
              paymentType,
              values?.cardProfile?.value
            );
            let billingEmail: any;

            if (paymentType === "CREDITCARD") {
              if (values?.cardProfile?.value === "DISTRIBUTORCARD") {
                billingEmail = "khushalsaboo@gmail.com";
              } else {
                billingEmail = values?.email;
              }
            }

            const successInfo = {
              currencyCode: successCurrencyCode,
              amount: 50,
              confirmationEmail: values?.confirmationEmail,
              userConfirmationEmail: "Khushalsaboo@gmail.com",
              successResponse: res?.data?.response,
              cartData: values,
              selectedPaymentType: paymentType,
              billingEmail: billingEmail,
            };

            router.push("/success");

          } else {
            console.error("error", res.statusMessage);
            console.log("Error", res.statusMessage);
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          setSubmitOnClickDisable(false);
          setLoadingData(false);
        }
      }
    }
  };

  return (
    <div className="text-center w-[100%] h-[100vh] flex flex-col items-center justify-center mt-4">
      <Loading isLoading={loadingData} />

      <div className=" w-[600px] p-[10px] flex flex-col border-[1px] border-black rounded-[10px] ">
        <div className=" flex w-[100%] content-start p-[10px] border-b-[2px] border-black ">
          We Accept:
        </div>
        <div>
          <form
            className=" flex items-center flex-col py-[20px]"
            onSubmit={formikData.handleSubmit}
          >
            <div className="flex mb-[15px] items-center justify-between">
              <div className="w-[49%] text-start ">
                <label>
                  Cardholder Name <span className=" text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Cardholder Name"
                  className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                  value={formikData.values.name}
                  onChange={formikData.handleChange}
                />
              </div>
              <div className=" w-[49%] text-start ">
                <label>
                  Cardholder Email <span className=" text-red-600">*</span>{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formikData.values.email}
                  className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                  onChange={formikData.handleChange}
                />
              </div>
            </div>
            <div className="flex mb-[15px] items-center justify-between">
              <div className="w-[49%] text-start ">
                <label>
                  Card Type <span className=" text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="cardType"
                  placeholder="Cardholder Name"
                  className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                  value={formikData.values.cardType}
                  onChange={formikData.handleChange}
                />
              </div>
              <div className=" w-[49%] text-start ">
                <label>
                  Card Number <span className=" text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                  value={formikData.values.cardNumber}
                  onChange={formikData.handleChange}
                />
              </div>
            </div>
            <div className="flex mb-[15px] items-center justify-between">
              <div className="w-[49%] text-start flex items-center ">
                <div>
                  <label>
                    Expiry Date <span className=" text-red-600">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    name="cardMonth"
                    placeholder="Expiry Date"
                    className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                    value={formikData.values.cardMonth}
                    onChange={formikData.handleChange}
                  />
                </div>
                <div>
                  <label>
                    Expiry Year <span className=" text-red-600">*</span>{" "}
                  </label>
                  <input
                    type="text"
                    name="cardYear"
                    placeholder="Expiry Year"
                    className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                    value={formikData.values.cardYear}
                    onChange={formikData.handleChange}
                  />
                </div>
              </div>
              <div className=" w-[49%] text-start ">
                <label>
                  CVV <span className=" text-red-600">*</span>{" "}
                </label>
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formikData.values.cvv}
                  className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                  onChange={formikData.handleChange}
                />
              </div>
            </div>
            <button
              type="submit"
              className={` w-[80%] bg-[#000] py-[15px] rounded-[30px] text-[20px] text-[#fff] `}
              disabled={submitOnClickDisable}
            >
              Submit Payment
            </button>
            {loginError && <p>{loginError}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

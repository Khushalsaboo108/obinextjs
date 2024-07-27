"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import {
  addconfirmationAPI,
  conformationAPI,
  orderId,
  processCard,
} from "../api/arrivial/apiPath";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../redux/store";
import { ErrorMessage, Field, Form, Formik } from "formik";
import md5 from "md5";
import { decryptData, encryptData } from "../common/commonFunction";
import { orderIdData } from "../redux/sessionIdSlice";
import { processCreditCardPayment } from "../common/Fac";

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const getSessionData = useSelector(
    (state: RootState) => state.reducer.sessionData.sessionId
  );
  const getcartitemIdData = useSelector(
    (state: RootState) => state.reducer.sessionData.cartitemId
  );
  const getOrderIdData = useSelector(
    (state: RootState) => state.reducer.sessionData.orderId
  );

  const [submitOnClickDisable, setSubmitOnClickDisable] = useState(false);

  // async function handleSubmit(value: any) {
  //   const paymentData = {
  //     cardholderDetails: {
  //       name: value.name,
  //       email: value.email,
  //       cardType: value.cardType,
  //       cardProfile: value.cardProfile,
  //       cardNumber: value.cardNumber,
  //       cardMonth: value.cardMonth,
  //       cardYear: value.cardYear,
  //       cvv: value.cvv,
  //     },
  //   };

  //   console.log("paymentData:", paymentData.cardholderDetails);

  //   try {
  //     setLoadingData(true);

  //     const getOrderId = orderId(String(getSessionData) , );
  //     console.log("https://nigeriadev.reliablesoftjm.com/VIPERWS/getorderid :", getOrderId);

  //     const responseCC = await processCreditCardPayment(paymentData);
  //     console.log("paymentData:", responseCC);

  //     // api for addconfirmationAPI

  //     const dataAddconfirmation: any = {
  //       getSessionData: getSessionData,
  //       getcartitemIdData: getcartitemIdData,
  //       orderIdData: getOrderIdData,
  //     };
  //     const addconfirmationData = await addconfirmationAPI(dataAddconfirmation);
  //     console.log(
  //       "https://nigeriadev.reliablesoftjm.com/VIPERWS/addconfirmationlog :",
  //       addconfirmationData
  //     );

  //     // api for addconfirmationAPI

  //     // api for conformationAPI
  //     const conformation = await conformationAPI(
  //       String(getSessionData),
  //       Number(getcartitemIdData)
  //     );
  //     console.log(
  //       "https://nigeriadev.reliablesoftjm.com/VIPERWS/confirmcart :",
  //       conformation
  //     );
  //     // api for conformationAPI
  //   } catch (error) {
  //     setLoadingData(true);
  //     if (axios.isAxiosError(error)) {
  //       setLoginError(
  //         error.response?.data?.message || "An unexpected error occurred"
  //       );
  //     } else {
  //       setLoginError("An unexpected error occurred");
  //     }
  //   } finally {
  //     setLoadingData(false);
  //   }
  // }

  const getAmount = (paymentType : any , cardProfile : any ) => {
    if (paymentType === "CREDITCARD"){
      return cardProfile === "DISTRIBUTORCARD" ? 50 : 0;
 } }


  const handleSubmit = async (values: any, paymentType: string) => {
    const getSessionData = useSelector((state: RootState) => state.reducer.sessionData.sessionId);
    const getcartitemIdData = useSelector((state: RootState) => state.reducer.sessionData.cartitemId);
    let request = {};
    let error = false;

    if (paymentType === "CREDITCARD") {
      console.log("We are Going to work on payment");
    }

    if (error) {
      console.log("error Error", error);
    } else {
      setSubmitOnClickDisable(true);
      let objPayment: { creditcard?: { cardnumber?: string; authorizationnumber?: number; amount?: number; } } = {};
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

          const responseCC = await processCreditCardPayment(paymentData , getSessionData);
          objPayment = {
            creditcard: {
              cardnumber: responseCC?.data.cardnumber,
              authorizationnumber: responseCC?.data.authorizationnumber,
              amount: responseCC?.data.amount,
            },
          };

          if (objPayment && objPayment.creditcard && objPayment.creditcard.authorizationnumber) {
            callConfirmCart = true;
          } else {
            // console.error(t("error"), responseCC?.statusMessage);
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
      if (callConfirmCart === true) {
        // request = generateConfirmCartRequest(paymentType, objPayment);
        try {
          setLoadingData(true);
          const res = await conformationAPI(String(getSessionData), Number(getcartitemIdData));
          if (res.status === 0) {
            let successCurrencyCode = "USD";
            let successAmount = getAmount(paymentType, values?.cardProfile?.value);
            let billingEmail : any ;

            if(paymentType === "CREDITCARD") {
              if(values?.cardProfile?.value === "DISTRIBUTORCARD") {
                billingEmail = "khushalsaboo@gmail.com";
              }
              else {
                billingEmail = values?.email;
              }
            };

            const successInfo = {
              currencyCode: successCurrencyCode,
              amount: successAmount,
              confirmationEmail: values?.confirmationEmail,
              userConfirmationEmail: "Khushalsaboo@gmail.com",
              successResponse: res?.data?.response,
              cartData: values,
              // userDeafultEmail: userDefault?.email,
              selectedPaymentType: paymentType,
              billingEmail: billingEmail,
            };
            // navigate("/success", { state: successInfo });
            console.log("let see" , successInfo);
          } else {
            console.error(("error"), res.statusMessage);
            // navigate("/failure")
            console.log("Error", res.statusMessage);
          }
        } catch (error) {
          console.log("error", error);
        } finally {
          setSubmitOnClickDisable(false);
          // // await closeSession();
          // dispatch(paxCountClear());
          // dispatch(clearSearchBooking());
          // dispatch(clearDemographicInformation());
          // clearSession(sendBroadcastMessage);
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
        <div className=" flex flex-col ">
          <Formik
            initialValues={{
              name: "",
              email: "khushalsaboo108@gmail.com",
              cardType: "VISA",
              cardProfile: { value: "GUESTCARD", label: "GUEST CARD" },
              cardNumber: "4111111111111111",
              cardMonth: "07",
              cardYear: "2024",
              cvv: "",
            }}
            onSubmit={(value) => handleSubmit(value, "CREDITCARD")}
          >
            {({ isSubmitting }) => (
              <Form className=" flex items-center flex-col py-[20px]">
                <div className="flex mb-[15px] items-center justify-between">
                  <div className="w-[49%] text-start ">
                    <label>
                      Cardholder Name <span className=" text-red-600">*</span>{" "}
                    </label>
                    <Field
                      type="text"
                      name="name"
                      placeholder="Cardholder Name"
                      className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                    />
                    <ErrorMessage name="candholderName" component="div" />
                  </div>
                  <div className=" w-[49%] text-start ">
                    <label>
                      Cardholder Email <span className=" text-red-600">*</span>{" "}
                    </label>
                    <Field
                      type="email"
                      name="email"
                      placeholder="Email"
                      className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>
                </div>
                <div className="flex mb-[15px] items-center justify-between">
                  <div className="w-[49%] text-start ">
                    <label>
                      Card Type <span className=" text-red-600">*</span>{" "}
                    </label>
                    <Field
                      type="text"
                      name="cardType"
                      placeholder="Cardholder Name"
                      className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                    />
                    <ErrorMessage name="cardType" component="div" />
                  </div>
                  <div className=" w-[49%] text-start ">
                    <label>
                      Card Number <span className=" text-red-600">*</span>{" "}
                    </label>
                    <Field
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                    />
                    <ErrorMessage name="cardNumber" component="div" />
                  </div>
                </div>
                <div className="flex mb-[15px] items-center justify-between">
                  <div className="w-[49%] text-start flex items-center ">
                    <div>
                      <label>
                        Expiry Date <span className=" text-red-600">*</span>{" "}
                      </label>
                      <Field
                        type="text"
                        name="cardMonth"
                        placeholder="Expiry Date"
                        className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                      />
                      <ErrorMessage name="cardMonth" component="div" />
                    </div>
                    <div>
                      <label>
                        Expiry Year <span className=" text-red-600">*</span>{" "}
                      </label>
                      <Field
                        type="text"
                        name="cardYear"
                        placeholder="Expiry Year"
                        className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                      />
                      <ErrorMessage name="cardYear" component="div" />
                    </div>
                  </div>
                  <div className=" w-[49%] text-start ">
                    <label>
                      CVV <span className=" text-red-600">*</span>{" "}
                    </label>
                    <Field
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      className=" border border-black p-[10px] rounded-[5px] w-[100%] "
                    />
                    <ErrorMessage name="cvv" component="div" />
                  </div>
                </div>
                <button
                  type="submit"
                  className=" w-[200px] rounded-[10px] py-[5px] border-[1px] border-black bg-purple-400 text-white font-[800] text-[18px] "
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {loginError && <p className="text-red-600">{loginError}</p>}
    </div>
  );
};

export default LoginPage;

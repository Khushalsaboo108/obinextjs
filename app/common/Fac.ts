"use client";

// import { addlog } from "./commonFunction";
import { store, useAppSelector } from "../redux/store";
import {
  addconfirmationAPI,
  getpaymentgateway,
  orderId,
  processCard,
} from "../api/arrivial/apiPath";
import { PaymentResponse, ResolveData, HtmlData } from "../types";
import { encryptCardDetails } from "./commonFunction";
import { orderIdData } from "../redux/sessionIdSlice";
import { createRequestBody, VIPER_URL } from "../commonConstant";

export const IS_PAYMENT_MODAL = "iframe";
export const PRIVATE_AESKEY = "pnFCdYBqZwtbOSKvi8WGKA==";

export let facProcess3DSPayment: any;

if (IS_PAYMENT_MODAL ===( "iframe" as any)) {
  facProcess3DSPayment = async (HtmlData: any) => {
    return new Promise((resolve, reject) => {
      const paymentGatewayDetail = getpaymentgateway();

      console.log(
        `https://nigeriadev.reliablesoftjm.com/VIPERWS/getpaymentgateway :`,
        paymentGatewayDetail
      );

      let redirecturl2 = paymentGatewayDetail;
      //  https://nigeria.reliablesoftjm.com/VIPERWS/powertranzcallback

      let width = 900;
      let height = 600;

      let left = window.outerWidth / 2 + window.screenX - width / 2;
      let top = window.outerHeight / 2 + window.screenY - height / 2;

      let paymentWindow: any = window.open(
        "",
        "_blank",
        "width=" +
          width +
          ",height=" +
          height +
          ", top=" +
          top +
          ", left=" +
          left
      );

      if (!paymentWindow) {
        paymentWindow.close();
        resolve({
          success: false,
          statusMessage: "browserPopingError",
          data: {},
        });
      }

      paymentWindow.document.write(
        `<div style="margin: auto; width: 50%; border: 1px solid #EEE; padding: 10px; border-radius: 10px;right: 50%; bottom: 50%;transform: translate(50%,50%);position: absolute;"><p style="text-align: center;"><span style="font-weight: bold; font-size: 1.2em;">${"waitMessage"} </span><br/>${"paymentProcessingError"}</p>`
      );
      paymentWindow.document.write(HtmlData);

      let paymentInterval = setInterval(function () {
        if (paymentWindow.closed) {
          clearInterval(paymentInterval);
          resolve({
            success: false,
            windowClosed: true,
            statusMessage: "windowClosedError",
            data: {},
          });
        }
      }, 2000);

      window.addEventListener(
        "message",
        function (ev) {
          let postData = ev.data;
          let responseData: PaymentResponse;
          if (postData.originUrl === redirecturl2) {
            if (postData.ResponseCode === 1) {
              clearInterval(paymentInterval);
              responseData = {
                responsecode: postData.ResponseCode,
                authorizationnumber: postData.AuthCode,
                originalresponsecode: postData.OriginalResponseCode,
                cardnumber: postData.PaddedCardNo,
                referencenumber: postData.ReferenceNo,
                reasoncode: postData.ReasonCode,
                reasoncodedescription: postData.ReasonCodeDesc,
              };
              paymentWindow.close();
              window.removeEventListener("message", function (ev) {});
              resolve({
                success: true,
                statusMessage: "Success",
                data: responseData,
              });
            } else {
              clearInterval(paymentInterval);
              window.removeEventListener("message", function (ev) {});

              paymentWindow.close();

              responseData = {
                responsecode: postData.ResponseCode,
                authorizationnumber: postData.AuthCode,
                originalresponsecode: postData.OriginalResponseCode,
                cardnumber: postData.PaddedCardNo,
                referencenumber: postData.ReferenceNo,
                reasoncode: postData.ReasonCode,
                reasoncodedescription: postData.ReasonCodeDesc,
              };

              resolve({
                success: false,
                statusMessage: responseData.reasoncodedescription,
                data: responseData,
              });
            }
          }
        },
        false
      );
    });
  };
} else {
  facProcess3DSPayment = async (
    HtmlData: HtmlData,
    setLoading: (loading: boolean) => void
  ): Promise<ResolveData> => {
    return new Promise((resolve, reject) => {
      const paymentGatewayDetail = getpaymentgateway();
      const redirecturl2 = paymentGatewayDetail;

      // Create modal
      const modal = document.createElement("div");
      modal.classList.add("modal", "fade");
      modal.id = "myModal";
      modal.role = "dialog";
      modal.style.zIndex = "19999";
      modal.innerHTML = `
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-header justify-content-end py-0">
                  <button type="button" class="close btn" aria-label="Close">
                    <span aria-hidden="true" class="fs-4">×</span>
                  </button>
                </div>
                <div class="modal-body" style="height:400px; display:flex; justify-content:center; align-items:center">
                  <div id="loading_screen">
                    <div id="loader" class="p-3" style="height:100%; width:100%">
                      <div class="loader mx-auto"></div>
                    </div>
                    <h4 id="message" class="text-center lh-base ">
                      ${"waitMessage"} <br />${"paymentProcessingError"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          `;

      const appElement = document.querySelector(".App");
      if (appElement) {
        appElement.appendChild(modal);
      } else {
        console.error("No elements found with class 'App'");
        reject(new Error("No elements found with class 'App'"));
        return;
      }

      // Show modal
      modal.style.display = "block";
      modal.classList.add("show");

      // Create iframe
      const iframe = document.createElement("iframe");
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.srcdoc = HtmlData;
      iframe.style.display = "none";

      let i = 0;
      iframe.addEventListener("load", () => {
        if (i === 1) {
          const screen = document.getElementById("loading_screen");
          if (screen) {
            screen.remove();
          }
          iframe.style.display = "block";
        }
        i++;
      });

      modal.querySelector(".modal-body")?.appendChild(iframe);

      const closeModal = () => {
        modal.remove();
      };

      modal.querySelector(".close.btn")?.addEventListener("click", closeModal);

      let paymentInterval: any;

      const handleMessage = (ev: MessageEvent) => {
        const postData = ev.data;
        if (postData.originUrl === redirecturl2) {
          clearInterval(paymentInterval);

          const responseData: PaymentResponse = {
            responsecode: postData.ResponseCode,
            authorizationnumber: postData.AuthCode,
            originalresponsecode: postData.OriginalResponseCode,
            cardnumber: postData.PaddedCardNo,
            referencenumber: postData.ReferenceNo,
            reasoncode: postData.ReasonCode,
            reasoncodedescription: postData.ReasonCodeDesc,
          };

          closeModal();
          window.removeEventListener("message", handleMessage);

          resolve({
            success: postData.ResponseCode === 1,
            statusMessage:
              postData.ResponseCode === 1
                ? "Success"
                : responseData.reasoncodedescription,
            data: responseData,
          });
        }
      };

      window.addEventListener("message", handleMessage);

      // Close modal if the iframe is closed
      const checkModalClose = setInterval(() => {
        if (!document.body.contains(modal)) {
          clearInterval(checkModalClose);
          resolve({
            success: false,
            statusMessage: "windowClosedError",
            data: {},
          });
        }
      }, 2000);
    });
  };
}

export function closeModal() {
  // setLoading(true)
  const modal = document.getElementById("myModal");
  if (modal) {
    modal.style.display = "none";
    modal.classList.remove("show");
    modal.remove();
  }
}

export const processCreditCardPayment = async (
  paymentData: any,
  getSessionData: string,
  getcartitemIdData: number
) => {
  try {
    const requestGetid = {
      amount: 50,
      source: "OBI-MAIN",
    };

    const requestFunction = await createRequestBody(
      getSessionData,
      requestGetid
    );

    console.log(`${VIPER_URL}getorderid :`, requestFunction);

    const orderIdResponse = await orderId(requestFunction);

    console.log(`${VIPER_URL}getorderid :`, orderIdResponse);

    const orderIdDataVar = await orderIdResponse.data.orderid;

    store.dispatch(orderIdData(orderIdDataVar));

    let encryptedCardDetails = encryptCardDetails(
      paymentData?.cardholderDetails,
      PRIVATE_AESKEY
    );

    if (
      !orderIdResponse ||
      orderIdResponse.data.orderid === "" ||
      orderIdResponse.data.orderid === null ||
      orderIdResponse.status !== 0
    ) {
      orderIdResponse.statusMessage &&
        console.error("error", orderIdResponse.statusMessage);
    } else {

      const requestAddConfirmationLog = {
        distributorid: "",
        sendconfirmation: {
          sendto: "khushalsaboo108@gmail.com",
          copyto: "",
        },
        cart: [
          {
            cartitemid: getcartitemIdData,
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
        orderid: orderIdDataVar,
    };

      const requestFunction = await createRequestBody(
        getSessionData,
        requestAddConfirmationLog
      );

      console.log(`${VIPER_URL}addconfirmationlog :`, requestFunction);

      const addconfirmationData = await addconfirmationAPI(requestFunction);

      console.log(`${VIPER_URL}addconfirmationlog :`, addconfirmationData);

      const processCardRequest = {
        orderid: orderIdDataVar,
        actiontype: "CHARGECARD",
        creditcard: {
          cardtype: paymentData.cardholderDetails.cardType,
          cardnumber: encryptedCardDetails?.cardNumber,
          cardholder: encryptedCardDetails?.cardHolderName,
          expirydate: encryptedCardDetails?.expiryDate,
          cvv: encryptedCardDetails?.cvv,
          amount: 50,
          iv: encryptedCardDetails?.iv,
        },
      };

      const requestProcesscard = await createRequestBody(
        getSessionData,
        processCardRequest
      );

      console.log(`${VIPER_URL}processcard :`, requestProcesscard);

      const processCardResponse = await processCard(requestProcesscard);

      console.log(`${VIPER_URL}processcard :`, processCardResponse );

      if (processCardResponse.status === 0) {
        let facResponse;
        if (processCardResponse.data?.html) {
          facResponse = await facProcess3DSPayment(
            processCardResponse?.data.html
          );
        } else {
          facResponse = processCardResponse;
          facResponse.data.orderid = orderId;
        }
        if (
          facResponse.data?.authorizationnumber &&
          facResponse.data.authorizationnumber !== ""
        ) {
          return facResponse;
        } else {
          if (!facResponse.windowClosed) {
            await console.error("error", facResponse?.statusMessage);
          }
          return processCardResponse;
        }
      } else {
        await console.error("error Error", processCardResponse?.statusMessage);
        return processCardResponse;
      }
    }
  } catch (e) {
    console.error("Error :", e);
  }
};

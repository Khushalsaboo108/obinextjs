"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loading from "../Loading";
import {
  addconfirmationAPI,
  conformationAPI,
  orderId,
} from "../api/arrivial/apiPath";

const LoginPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const handleChange = async () => {
    const cartitemId = localStorage.getItem("cartitemid") ?? "";
    const sessionId = localStorage.getItem("sessionId") ?? "";
    const orderIdData = localStorage.getItem("orderIdData") ?? "";

    try {
      setLoadingData(true);
      const getData = await orderId(sessionId);
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/getorderid :",
        getData
      );
      const orderIdData = await getData.data.orderid;
      await localStorage.setItem("orderIdData", orderIdData);

      const addconfirmationData = await addconfirmationAPI(
        String(sessionId),
        Number(cartitemId),
        String(orderIdData)
      );
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/addconfirmationlog :",
        addconfirmationData
      );

      const conformation = await conformationAPI(
        String(sessionId),
        Number(cartitemId)
      );
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/confirmcart :",
        conformation
      );
    } catch (error) {
      setLoadingData(true);
      if (axios.isAxiosError(error)) {
        setLoginError(
          error.response?.data?.message || "An unexpected error occurred"
        );
      } else {
        setLoginError("An unexpected error occurred");
      }
    } finally {
      setLoadingData(false);
    }
  };

  const addconfirmation = async () => {
    const cartitemId = localStorage.getItem("cartitemid") ?? "";
    const sessionId = localStorage.getItem("sessionId") ?? "";
    const orderIdData = localStorage.getItem("orderIdData") ?? "";
    console.log("orderIdData", orderIdData);
    try {
      setLoadingData(true);
      const getData = await addconfirmationAPI(
        String(sessionId),
        Number(cartitemId),
        String(orderIdData)
      );
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/addconfirmationlog :",
        getData
      );
    } catch (error) {
      setLoadingData(true);
      if (axios.isAxiosError(error)) {
        setLoginError(
          error.response?.data?.message || "An unexpected error occurred"
        );
      } else {
        setLoginError("An unexpected error occurred");
      }
    } finally {
      setLoadingData(false);
    }
  };

  const conformation = async () => {
    const cartitemId = localStorage.getItem("cartitemid") ?? "";
    const sessionId = localStorage.getItem("sessionId") ?? "";
    try {
      setLoadingData(true);
      const getData = await conformationAPI(
        String(sessionId),
        Number(cartitemId)
      );
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/confirmcart :",
        getData
      );
    } catch (error) {
      setLoadingData(true);
      if (axios.isAxiosError(error)) {
        setLoginError(
          error.response?.data?.message || "An unexpected error occurred"
        );
      } else {
        setLoginError("An unexpected error occurred");
      }
    } finally {
      setLoadingData(false);
    }
  };

  return (
    <div className="text-center flex flex-col items-center justify-center mt-4">
      <Loading isLoading={loadingData} />

      <button
        className="bg-blue-600 w-[400px] text-black p-3"
        onClick={handleChange}
      >
        Payment order Id
      </button>

      {loginError && <p className="text-red-600">{loginError}</p>}
    </div>
  );
};

export default LoginPage;

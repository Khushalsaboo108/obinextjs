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
import { RootState } from "../redux/store";

const LoginPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const getSessionData = useSelector((state : RootState) => state.reducer.sessionData.sessionId);
  const getcartitemIdData = useSelector( (state: RootState) => state.reducer.sessionData.cartitemId);

  const handleChange = async () => {

    try {
      setLoadingData(true);
      const getData = await orderId(getSessionData);
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/getorderid :",
        getData
      );
      const orderIdData = await getData.data.orderid;

      const addconfirmationData = await addconfirmationAPI(
        String(getSessionData),
        Number(getcartitemIdData),
        String(orderIdData)
      );
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/addconfirmationlog :",
        addconfirmationData
      );

      const processcard = await processCard(
        String(getSessionData),
        String(orderIdData)
      );
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/processcard :",
        processcard
      );

      const conformation = await conformationAPI(
        String(getSessionData),
        Number(getcartitemIdData)
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

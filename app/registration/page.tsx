"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { contact } from "../api/arrivial/apiPath";
import Loading from "../Loading";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const LoginPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const getSessionData = useSelector( (state: RootState) => state.sessionData.sessionId);
  const getcartitemIdData = useSelector( (state: RootState) => state.sessionData.cartitemId);



  // const sessionId = localStorage.getItem("sessionId") ?? "";
  // const cartitemId = localStorage.getItem("cartitemid") ?? "";

  const handleChange = async () => {
    try {
      setLoadingData(true);
      const getData = await contact(String(getSessionData), Number(getcartitemIdData));

      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/setcontact:",
        getData
      );

      router.push("/payment");
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
    <div className="text-center flex justify-center mt-4 ">
      <Loading isLoading={loadingData} />

      <button className=" bg-red-600 p-3" onClick={handleChange}>
        {/* <Link href={"/arrivalBooking"}>Book arrival</Link> */}
        Payment
      </button>
      {loginError && <p className="text-red-600">{loginError}</p>}
    </div>
  );
};

export default LoginPage;

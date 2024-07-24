"use client"
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { arrival } from "./api/arrivial/apiPath";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loading from "./Loading";

const LoginPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const handleChange = async () => {
    try {
      setLoadingData(true);
      const getdata = await arrival();
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/login:",
        getdata
      );

      const sessionId = getdata.data.sessionid;

      localStorage.setItem("sessionId", sessionId);
      // router.push("/arrivalBooking");
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
        Book arrival
      </button>
      {loginError && <p className="text-red-600">{loginError}</p>}
    </div>
  );
};

export default LoginPage;
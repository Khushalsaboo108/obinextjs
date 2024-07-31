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
import { createRequestBody, VIPER_URL } from "../commonConstant";

const LoginPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  
  const getSessionData = useSelector(
    (state: RootState) => state.reducer.sessionData.sessionId
  );
  const getcartitemIdData = useSelector(
    (state: RootState) => state.reducer.sessionData.cartitemId
  );
  const [statusError, setStatusError] = useState("");

  // const sessionId = localStorage.getItem("sessionId") ?? "";
  // const cartitemId = localStorage.getItem("cartitemid") ?? "";

  const handleChange = async () => {
    try {
      setLoadingData(true);

      const request = {
        contact: {
          cartitemid: getcartitemIdData,
          email: "khushalsaboo108@gmail.com",
          firstname: "Khushal",
          lastname: "Saboo",
          phone: "06376135858",
          title: "MR",
        },
      };

      const requestFunction = await createRequestBody(getSessionData, request);

      console.log(`${VIPER_URL}setcontact :`, requestFunction);

      const getData = await contact(requestFunction);

      console.log(`${VIPER_URL}setcontact :`, getData);

      if (getData?.status === 0) {
        router.push("/payment");
      } else {
        setStatusError(getData?.statusMessage);
      }
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
      {statusError && <p className="text-red-600">{statusError}</p>}
      {loginError && <p className="text-red-600">{loginError}</p>}
    </div>
  );
};

export default LoginPage;

"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { arrival } from "./api/arrivial/apiPath";
import { useDispatch, useSelector } from "react-redux";
import { setSessionId } from "./redux/sessionIdSlice";
import { RootState } from "./redux/store";
import "./style/buttonStyle.css"

const LoginPage = () => {
  const dispatch = useDispatch();
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
      dispatch(setSessionId(sessionId));
      router.push("/arrivalBooking");
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
    <div className="text-center flex justify-center mt-36">
      <Loading isLoading={loadingData} />
      <button
        className="darksoul-hover-fill-button2"
        onClick={handleChange}
        type="button"
      >
        <div className="color-fill-2"></div>
        <p> Book arrival</p>
      </button>
      {loginError && <p className="text-red-600">{loginError}</p>}
    </div>
  );
};

export default LoginPage;

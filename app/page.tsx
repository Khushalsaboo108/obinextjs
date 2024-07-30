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
// import LoginApi from "./api/arrivial/arrivial";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const CUSTOMER_LOGIN = {
    username: "esite3@viponline",
    password: "5f4dcc3b5aa765d61d8327deb882cf99",
  };
  const VIPER_CONST = {
    alwaysOnUsername: "esite3@viponline",
    alwaysOnSessionid: "00009223581026309436128527",
  };

  const body = {
    username: VIPER_CONST.alwaysOnUsername,
    sessionid: VIPER_CONST.alwaysOnSessionid,
    request: CUSTOMER_LOGIN,
  };

  const handleChange = async () => {
    try {
      setLoadingData(true);
      const responseData = await arrival();

      // const responseData = await LoginApi.arrivial(body);

      console.log("Data hello", responseData);

      // console.log(
      //   "https://nigeriadev.reliablesoftjm.com/VIPERWS/login:",
      //   getdata
      // );

      // const sessionId = getdata.data.sessionid;
      // dispatch(setSessionId(sessionId));
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

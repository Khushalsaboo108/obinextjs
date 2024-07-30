"use client";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { arrival } from "./api/arrivial/apiPath";
import { useDispatch, useSelector } from "react-redux";
import { setSessionId } from "./redux/sessionIdSlice";
import { RootState } from "./redux/store";
import "./style/buttonStyle.css";
import { CUSTOMER_LOGIN, VIPER_CONST, VIPER_URL } from "./commonConstant";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [statusError, setStatusError] = useState("");

  const handleChange = async () => {
    const body = {
      username: VIPER_CONST.alwaysOnUsername,
      sessionid: VIPER_CONST.alwaysOnSessionid,
      request: CUSTOMER_LOGIN,
    };

    try {
      setLoadingData(true);
      console.log(`${VIPER_URL}login :`, body);

      const getdata = await arrival(body);

      console.log(`${VIPER_URL}login :`, getdata);

      const sessionId = getdata.data.sessionid;
      dispatch(setSessionId(sessionId));

      const getStatus = getdata.status;

      if (getStatus === 0) {
        router.push("/arrivalBooking");
      } else {
        setStatusError(getdata.statusMessage)
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
    <div className="text-center flex flex-col justify-center mt-4 ">
      <Loading isLoading={loadingData} />
      <button
        className="darksoul-hover-fill-button2"
        onClick={handleChange}
        type="button"
      >
        <div className="color-fill-2"></div>
        <p> Book arrival</p>
      </button>
      {statusError && <p className="text-red-600">{statusError}</p>}
      {loginError && <p className="text-red-600">{loginError}</p>}
    </div>
  );
};

export default LoginPage;

"use client"
import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Loading from "./Loading";
import { arrival } from "./api/arrivial/apiPath";
import { useDispatch, useSelector } from "react-redux";
import { setSessionId } from "./redux/sessionIdSlice";
import { RootState } from "./redux/store";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const getSessionData = useSelector((state : RootState) => state.sessionData);

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
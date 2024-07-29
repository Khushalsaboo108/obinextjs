"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { arrivialBooking, getschedule } from "../api/arrivial/apiPath";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { cartitemId } from "../redux/sessionIdSlice";
import "../style/buttonStyle.css"
const ArrivalBookingPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const getSessionData = useSelector(
    (state: RootState) => state.reducer.sessionData.sessionId
  );

  const handleBooking = async () => {
    try {
      setLoadingData(true);
      const getData = await arrivialBooking(getSessionData);
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/reservecartitem:",
        getData
      );
      const cartitemIdData = await getData.data.cartitemid;

      dispatch(cartitemId(cartitemIdData));

      router.push("/registration");
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

  const handleSchedule = async () => {
    try {
      setLoadingData(true);
      const getscheduleData = await getschedule(getSessionData);
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/getschedule:",
        getscheduleData
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
        className="darksoul-hover-fill-button2 scheduleCss "
        onClick={handleSchedule}
        type="button"
      >
        <div className="color-fill-2 scheduleCss-fill"></div>
        <p>Schedule</p>
      </button>

      <button
        className="darksoul-hover-fill-button2 my-3"
        onClick={handleBooking}
        type="button"
      >
        <div className="color-fill-2"></div>
        <p>reservecartitem</p>
      </button>

      {loginError && <p className="text-red-600">{loginError}</p>}
    </div>
  );
};

export default ArrivalBookingPage;

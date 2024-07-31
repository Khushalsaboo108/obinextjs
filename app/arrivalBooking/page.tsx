"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { arrivialBooking, getschedule } from "../api/arrivial/apiPath";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { cartitemId } from "../redux/sessionIdSlice";
import "../style/buttonStyle.css";
import { createRequestBody, VIPER_URL } from "../commonConstant";
const ArrivalBookingPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [statusError, setStatusError] = useState("");
  const getSessionData = useSelector(
    (state: RootState) => state.reducer.sessionData.sessionId
  );

  const handleBooking = async () => {
    try {
      setLoadingData(true);

      const request = {
        cartitemid: 0,
        productid: "ARRIVALONLY",
        ticketsrequested: 1,
        adulttickets: 1,
        childtickets: 0,
        paymenttype: "GUESTCARD",
        distributorid: "",
        arrivalscheduleid: 453912,
        departurescheduleid: 0,
      };

      const requestFunction = await createRequestBody(getSessionData, request);

      console.log(`${VIPER_URL}reservecartitem :`, requestFunction);

      const getData = await arrivialBooking(requestFunction);

      console.log(`${VIPER_URL}reservecartitem`, getData);

      const cartitemIdData = await getData?.cartitemid;
      dispatch(cartitemId(cartitemIdData));

      if (getData?.status === 0) {
        router.push("/registration");
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

  const handleSchedule = async () => {
    try {
      setLoadingData(true);

      const request = {
        airportid: "SIA",
        direction: "A",
        traveldate: "20240731",
      };

      const requestFunction = await createRequestBody(getSessionData, request);

      console.log(`${VIPER_URL}getschedule :`, requestFunction);

      const getscheduleData = await getschedule(requestFunction);

      console.log(`${VIPER_URL}getschedule:`, getscheduleData);
      
      if (getscheduleData?.status !== 0) {
        setStatusError(getscheduleData?.statusMessage);
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
      {statusError && <p className="text-red-600">{statusError}</p>}
      {loginError && <p className="text-red-600">{loginError}</p>}
    </div>
  );
};

export default ArrivalBookingPage;

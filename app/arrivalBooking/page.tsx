"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { arrivialBooking, getschedule } from "../api/arrivial/apiPath";
import Loading from "../Loading";

const ArrivalBookingPage = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");
  const [loadingData, setLoadingData] = useState(false);

  const sessionId = localStorage.getItem("sessionId") ?? "";

  const handleBooking = async () => {
    try {
      setLoadingData(true);
      const getData = await arrivialBooking(sessionId);
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/reservecartitem:",
        getData
      );
      const cartitemId = getData.data.cartitemid;

      localStorage.setItem("cartitemid", cartitemId);

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
      const getscheduleData = await getschedule(sessionId);
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/getschedule:",
        getscheduleData
      );

      const getData = await arrivialBooking(sessionId);
      console.log(
        "https://nigeriadev.reliablesoftjm.com/VIPERWS/reservecartitem:",
        getData
      );
      const cartitemId = await getData.data.cartitemid;

      await localStorage.setItem("cartitemid", cartitemId);

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

  return (
    <div className="text-center flex flex-col items-center justify-center mt-4">
      <Loading isLoading={loadingData} />

      <button
        className="bg-green-600 w-[200px] my-5 p-3"
        onClick={handleSchedule}
      >
        Schedule
      </button>
      {loginError && <p className="text-red-600">{loginError}</p>}
    </div>
  );
};

export default ArrivalBookingPage;

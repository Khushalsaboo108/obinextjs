import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setSessionId } from "./sessionIdSlice";

export const fetchSessionId = createAsyncThunk(
  "sessionData/fetchSessionId",
  async (_, { dispatch }) => {
    try {
      const response = await axios.post("/api/getSessionId", {
        // payload data can go here if needed
      });
      const sessionId = response.data.data.sessionid;
      dispatch(setSessionId(sessionId));
      return sessionId;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
);

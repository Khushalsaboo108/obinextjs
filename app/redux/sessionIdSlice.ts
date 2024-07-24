// sessionIdSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
  sessionId: string | null;
}

const initialState: SessionState = {
  sessionId: null,
};

const sessionID = createSlice({
  name: "sessionData",
  initialState,
  reducers: {
    setSessionId: (state, action: PayloadAction<string>) => {
      state.sessionId = action.payload;
    },
  },
});

export const { setSessionId } = sessionID.actions;
export default sessionID.reducer;

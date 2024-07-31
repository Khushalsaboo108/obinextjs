import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getpaymentgateway } from '../api/arrivial/apiPath';

interface PaymentGateway {
    redirecturl2?: string;
    data : any
}

interface PaymentGatewayState {
    resultData?: PaymentGateway;
    error: boolean;
    loading: boolean;
}

const initialState: PaymentGatewayState = {
    resultData: undefined,
    error: false,
    loading: false,
};

export const fetchPaymentGateway = createAsyncThunk(
    'paymentGateway/fetchPaymentGateway',
    async (sessionId: string, thunkAPI) => {
        try {
            const result = await getpaymentgateway(sessionId);

            if (result.status === 0) {
                return result;
            } else {
                return thunkAPI.rejectWithValue('No redirect URL found');
            }
        } catch (error) {
            return thunkAPI.rejectWithValue('Failed to fetch payment gateway');
        }
    }
);

const paymentGatewaySlice = createSlice({
    name: 'paymentGateway',
    initialState,
    reducers: {
        resetPaymentGatewaySlice: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentGateway.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchPaymentGateway.fulfilled, (state, action: PayloadAction<PaymentGateway>) => {
                state.resultData = action.payload; 
                state.loading = false;
                state.error = false;
            })
            .addCase(fetchPaymentGateway.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
            });
    },
});

export const { resetPaymentGatewaySlice } = paymentGatewaySlice.actions;

export default paymentGatewaySlice.reducer;

import { Action, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../redux/store";

export interface PaymentResponse {
  responsecode: number;
  authorizationnumber: string;
  originalresponsecode: number;
  cardnumber: string;
  referencenumber: string;
  reasoncode: string;
  reasoncodedescription: string;
}

export interface ResolveData {
  success: boolean;
  statusMessage: string;
  data: PaymentResponse | {};
}

export type HtmlData = string;

export interface cardSlice {
  cartData: any;
  cartItemId: Number;
  error: boolean;
}

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

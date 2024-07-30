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

export type Auth = {
  auth: boolean;
  editor: string;
  publisher: string;
  username: string;
  loading: boolean;
  error: string | null;
  status: number | null;
  statusMessage: string;
};

export type arrivialBody = {
  // username: string;
  // sessionid: string;
  // request: {
  //   username: "esite3@viponline";
  //   password: "5f4dcc3b5aa765d61d8327deb882cf99";
  // };
};

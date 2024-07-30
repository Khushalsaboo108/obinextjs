// "use server";

import axios from "axios";


// import { VIPER_CONST } from "../../commonConstant";
// import { arrivialBody, Auth,  } from "../../types/index";

// import { POST } from "../api-config/index";

// class loginArrivial {
//   private url = (action: string) => VIPER_CONST + action;

//   /**
//    * Login user
//    * @param userName
//    * @param password
//    * @param privilege
//    * @returns Token
//    */
//   public async arrivial(
//     body: arrivialBody
//   ): Promise<Auth | undefined> {
//     return POST(this.url("login"),  body);
//   }
// }
// const LoginApi = new loginArrivial();
// export default LoginApi;



export async function arrival() {
  const CUSTOMER_LOGIN = {
    username: "esite3@viponline",
    password: "5f4dcc3b5aa765d61d8327deb882cf99",
  };
  const VIPER_CONST = {
    alwaysOnUsername: "esite3@viponline",
    alwaysOnSessionid: "00009223581026309436128527",
  };

  const body = {
    username: VIPER_CONST.alwaysOnUsername,
    sessionid: VIPER_CONST.alwaysOnSessionid,
    request: CUSTOMER_LOGIN,
  };

  try {
    const response = await axios.post(
      "https://nigeriadev.reliablesoftjm.com/VIPERWS/login",
      // body
    );
    console.log("Data hello", response.data);

    let sessionId = response.data.data.sessionid;
    // store.dispatch(setSessionId(sessionId))

    // localStorage.setItem("sessionId", sessionId);

    return body;
  } catch (error) {
    console.error(error);
  }
}
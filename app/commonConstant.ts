export let VIPER_URL = `https://nigeriadev.reliablesoftjm.com/VIPERWS/`;

export const VIPER_CONST = {
  alwaysOnUsername: "esite3@viponline",
  alwaysOnSessionid: "00009223581026309436128527",
};

export const CUSTOMER_LOGIN = {
  username: "esite3@viponline",
  password: "5f4dcc3b5aa765d61d8327deb882cf99",
};

export function createRequestBody (sessionId : string, request :any ) {
    return {
        username: VIPER_CONST.alwaysOnUsername,
        sessionid: sessionId,
        failstatus: 0,
        request: request,
    };
};
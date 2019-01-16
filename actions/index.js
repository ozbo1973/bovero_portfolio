import axios from "axios";
import Cookie from "js-cookie";
import { getCookieFromReq } from "../helpers/utils";

const getToken = req =>
  req ? getCookieFromReq(req, "jwt") : Cookie.getJSON("jwt");

export const secretDataApi = req => {
  const token = getToken(req);
  return axios.create({
    baseURL: "http://localhost:3000/api/v1",
    headers: {
      authorization: `Bearer ${token}`
    }
  });
};

import axios from "axios";
import Cookie from "js-cookie";
import { getCookieFromReq } from "../helpers/utils";

const getToken = req =>
  req ? getCookieFromReq(req, "jwt") : Cookie.getJSON("jwt");

export const portfolioAPI = req => {
  // let headers = {};
  // if (req) {
  //   headers = { authorization: `Bearer ${getToken(req)}` };
  // }
  return axios.create({
    baseURL: "http://localhost:3000/api/v1",
    timeout: 4000,
    headers: { authorization: `Bearer ${getToken(req)}` }
  });
};

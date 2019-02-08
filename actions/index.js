import axios from "axios";
import Cookie from "js-cookie";
import { getCookieFromReq } from "../helpers/utils";
import { setTimeout } from "timers";

const getToken = req =>
  req ? getCookieFromReq(req, "jwt") : Cookie.getJSON("jwt");

export const portfolioAPI = req => {
  // let headers = {};
  // if (req) {
  //   headers = { authorization: `Bearer ${getToken(req)}` };
  // }
  return axios.create({
    baseURL: `${process.env.BASE_URL}/api/v1`,
    timeout: 4000,
    headers: { authorization: `Bearer ${getToken(req)}` }
  });
};

export const testAPI = req => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return resolve("Saved Data");
    }, 2000);
  });
};

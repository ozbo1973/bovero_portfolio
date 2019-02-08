import auth0 from "auth0-js";
import axios from "axios";
import Cookie from "js-cookie";
import jwt from "jsonwebtoken";
import { getCookieFromReq } from "../helpers/utils";

const clientID = process.env.ClientID;

class Auth {
  constructor() {
    this.auth0 = new auth0.WebAuth({
      domain: "ozbo1973.auth0.com",
      clientID: clientID,
      redirectUri: `${process.env.BASE_URL}/callback`,
      responseType: "token id_token",
      scope: "openid profile"
    });
  }

  handleAuthentication = () => {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult);
          resolve();
        } else if (err) {
          reject(err);
          console.log(err.error);
        }
      });
    });
  };

  setSession(authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );

    // Cookie.set("user", authResult.idTokenPayload);
    Cookie.set("jwt", authResult.idToken);
    // Cookie.set("expiresAt", expiresAt);
  }

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    // Cookie.remove("user");
    Cookie.remove("jwt");
    // Cookie.remove("expiresAt");

    this.auth0.logout({
      returnTo: "",
      clientID: clientID
    });
  };

  getJWKS = async () => {
    const res = await axios.get(
      "https://ozbo1973.auth0.com/.well-known/jwks.json"
    );
    const jwks = res.data;
    return jwks;
  };

  async verifyToken(token) {
    if (token) {
      const decodedToken = jwt.decode(token, { complete: true });

      if (!decodedToken) {
        return undefined;
      }
      const jwks = await this.getJWKS();
      const jwk = jwks.keys[0];

      let cert = jwk.x5c[0];
      cert = cert.match(/.{1,64}/g).join("\n");
      cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----`;

      if (jwk.kid === decodedToken.header.kid) {
        try {
          const verifiedToken = jwt.verify(token, cert);
          const expiresAt = verifiedToken.exp * 1000;

          return verifiedToken && new Date().getTime() < expiresAt
            ? verifiedToken
            : undefined;
        } catch (error) {
          console.log(error);
          return undefined;
        }
      }
    }

    return undefined;
  }

  clientAuth = async () => {
    const token = Cookie.getJSON("jwt");
    const verifiedToken = await this.verifyToken(token);
    return verifiedToken;
  };

  serverAuth = async req => {
    if (req.headers.cookie) {
      // const tokenCookie = cookie
      //   .split(";")
      //   .find(c => c.trim().startsWith("jwt="));

      // if (!tokenCookie) {
      //   return false;
      // }
      // const token = tokenCookie.split("=")[1];
      const token = getCookieFromReq(req, "jwt");
      const verifiedToken = await this.verifyToken(token);
      return verifiedToken;
    }
    return undefined;
  };
}

const authClient = new Auth();

export default authClient;

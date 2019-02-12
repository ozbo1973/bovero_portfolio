const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const namespace =
  process.env.NAMESPACE || "https://bovero-portfolio.herokuapp.com";

exports.checkJWT = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 50,
    jwksUri: "https://ozbo1973.auth0.com/.well-known/jwks.json"
  }),
  audience: "ae0M5PaMElZcUAAulmYXFEyT9TZphsJg",
  issuer: "https://ozbo1973.auth0.com/",
  alogorithms: ["RS256"]
});

exports.checkRole = role => (req, res, next) => {
  const user = req.user;

  if (user && user[`${namespace}/role`] === role) {
    next();
  } else {
    return res.status(401).send({
      title: "Not Authorized",
      detail: "You are not Authorized to view data"
    });
  }
};

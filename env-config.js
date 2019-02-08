const prod = process.env.NODE_ENV === "production";

module.exports = {
  "process.env.BASE_URL": prod
    ? "https://bovero-portfolio.herokuapp.com"
    : "http://localhost:3000",
  "process.env.NAMESPACE": "https://bovero-portfolio.herokuapp.com",
  "process.env.ClientID": "ae0M5PaMElZcUAAulmYXFEyT9TZphsJg"
};

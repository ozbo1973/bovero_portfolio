const express = require("express");
const next = require("next");
const mongoose = require("mongoose");
const routes = require("../routes");
const authServices = require("./services/auth");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

const secretData = [
  { title: "Secret 1", description: "How to build apps." },
  { title: "Secret 2", description: "What to build." }
];

mongoose
  .connect(
    ,
    { useNewUrlParser: true }
  )
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/api/v1/secret", authServices.checkJWT, (req, res) => {
      res.json(secretData);
    });

    server.get(
      "/api/v1/onlysiteowner",
      authServices.checkJWT,
      authServices.checkRole("siteOwner"),
      (req, res) => {
        res.json(secretData);
      }
    );

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    // server.use((err, req, res, next) => {
    //   if (err.name === "UnauthorizedError") {
    //     res
    //       .status(401)
    //       .send({
    //         title: "UnAuthorized Access",
    //         description: "Not Authorized to access."
    //       });
    //   }
    // });

    server.use(handle).listen(3000, err => {
      if (err) throw err;
      console.log("> Ready on http://localhost:3000");
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

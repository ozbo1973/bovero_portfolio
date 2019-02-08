const express = require("express");
const path = require("path");
const next = require("next");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const routes = require("../routes");
const config = require("./config");
const bookRoutes = require("./routes/book");
const portfolioRoutes = require("./routes/portfolios");
const blogRoutes = require("./routes/blogs");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);
const PORT = process.env.PORT || 3000;

const robotsOptions = {
  root: path.join("__dirname", "../static"),
  headers: {
    "Content-Type": "text/plain;charset=UTF-8"
  }
};

mongoose
  .connect(config.DB_URI, { useNewUrlParser: true })
  .then(() => console.log("Database Connected"))
  .catch(err => console.log(err));

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(bodyParser.json());

    server.use("/api/v1/book", bookRoutes);
    server.use("/api/v1/portfolios", portfolioRoutes);
    server.use("/api/v1/blogs", blogRoutes);

    // server.get("/api/v1/secret", authServices.checkJWT, (req, res) => {
    //   res.json(secretData);
    // });

    server.get("/robots.txt", (req, res) => {
      return res.status(200).sendFile("robots.txt", robotsOptions);
    });

    // server.get(
    //   "/api/v1/onlysiteowner",
    //   authServices.checkJWT,
    //   authServices.checkRole("siteOwner"),
    //   (req, res) => {
    //     res.json(secretData);
    //   }
    // );

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

    server.use(handle).listen(PORT, err => {
      if (err) throw err;
      console.log(`> ${process.env.BASE_URL}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });

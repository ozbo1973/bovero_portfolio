const express = require("express");
const auth = require("../services/auth");
const PortfolioCtrl = require("../controllers/portfolios");

const router = express.Router();

router.get("/", PortfolioCtrl.getPortfolios);

router.post(
  "/",
  auth.checkJWT,
  auth.checkRole("siteOwner"),
  PortfolioCtrl.createPortfolio
);

router.get("/:id", PortfolioCtrl.readPortfolio);

router.patch(
  "/:id",
  auth.checkJWT,
  auth.checkRole("siteOwner"),
  PortfolioCtrl.updatePortfolio
);

router.delete(
  "/:id",
  auth.checkJWT,
  auth.checkRole("siteOwner"),
  PortfolioCtrl.deletePortfolio
);

module.exports = router;

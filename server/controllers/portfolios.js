const Portfolio = require("../models/portfolios");

exports.getPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({}).sort("startDate");
    return res.json(portfolios);
  } catch (err) {
    return res.status(422).send(err);
  }
};

exports.createPortfolio = async (req, res) => {
  try {
    const portfolio = await new Portfolio(req.body);
    portfolio.userId = req.user && req.user.sub;
    const newPortfolio = await portfolio.save();
    return res.json(newPortfolio);
  } catch (error) {
    return res.status(422).send(error);
  }
};

exports.readPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOne({ _id: req.params.id });
    return res.json(portfolio);
  } catch (error) {
    return res.status(422).send(error);
  }
};

exports.updatePortfolio = async (req, res) => {
  try {
    if (req.body.userId) {
      throw "Cannot update UserId";
    }

    const updatedPortfolio = await Portfolio.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.json(updatedPortfolio);
  } catch (error) {
    return res.status(422).send(error);
  }
};

exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findOneAndRemove({ _id: req.params.id });
    return res.json({ portfolio, msg: "Delete Success" });
  } catch (error) {
    return res.status(422).send(err);
  }
};

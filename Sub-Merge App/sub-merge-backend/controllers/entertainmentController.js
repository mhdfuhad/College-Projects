const express = require("express");
const router = express.Router();
const entertainmentService = require("../services/entertainment-service");

router.get("/genres", (req, res) => {
  entertainmentService
    .getGenres()
    .then((result) => {
      res.status(result.status).json({
        message: result.message,
        movieGenres: result.movieGenres,
        tvGenres: result.tvGenres,
      });
    })
    .catch((err) => {
      res.status(err.status).json({
        status: "error",
        message: err.message,
      });
    });
});

router.get("/search", (req, res) => {
  entertainmentService
    .Search(req.query)
    .then((result) => {
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    })
    .catch((err) => {
      res.status(err.status).json({
        status: "error",
        message: err.message,
      });
    });
});

router.post("/add", (req, res) => {
  const fav = req.query.fav || false;

  entertainmentService
    .AddToList(req.body, fav)
    .then((result) => {
      res.status(result.status).json({
        message: result.message,
      });
    })
    .catch((err) => {
      res.status(err.status).json({
        status: "error",
        message: err.message,
      });
    });
});

router.get("/list", (req, res) => {
  entertainmentService
    .GetList(req.query.id, req.query.fav || false)
    .then((result) => {
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    })
    .catch((err) => {
      res.status(err.status).json({
        status: "error",
        message: err.message,
      });
    });
});

router.delete("/delete/:entID", (req, res) => {
  entertainmentService
    .RemoveFromList(req.params.entID, req.query.id, req.query.fav || false)
    .then((result) => {
      res.status(result.status).json({
        message: result.message,
      });
    })
    .catch((err) => {
      res.status(err.status).json({
        status: "error",
        message: err.message,
      });
    });
});

router.get("/recommended", (req, res) => {
  entertainmentService
    .GetRecommended()
    .then((result) => {
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    })
    .catch((err) => {
      res.status(err.status).json({
        status: "error",
        message: err.message,
      });
    });
});

router.get("/random", (req, res) => {
  entertainmentService
    .GetRandom()
    .then((result) => {
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    })
    .catch((err) => {
      res.status(err.status).json({
        status: "error",
        message: err.message,
      });
    });
});

router.get("/:entID/:mvt", (req, res) => {
  entertainmentService
    .GetDetails(req.params.entID, req.params.mvt)
    .then((result) => {
      res.status(result.status).json({
        message: result.message,
        data: result.data,
      });
    })
    .catch((err) => {
      res.status(err.status).json({
        status: "error",
        message: err.message,
      });
    });
});

module.exports = router;

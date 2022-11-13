"use strict";

const express = require("express");
console.log("ASD");
const { estateModel } = require("../models");
console.log("AS123D");

const app = express.Router();

app.post("/addEstate", function (req, res, next) {
  try {
    estateModel
      .create(req.body)
      .then((Estate) => res.json({ message: "Estate add successfully" }))
      .catch((err) => res.status(400).json({ error: err }));
  } catch (error) {
    next(error);
  }
});
app.get("/searcher", async function (req, res, next) {
  try {
    const query = [
      {
        $match: {
          $or: [
            {
              id: {
                $regex: `${req.query.text}`,
                $options: "i",
              },
            },
            {
              mls_id: {
                $regex: `${req.query.text}`,
                $options: "i",
              },
            },
            {
              name: {
                $regex: `${req.query.text}`,
                $options: "i",
              },
            },
            {
              url: {
                $regex: `${req.query.text}`,
                $options: "i",
              },
            },
            {
              address: {
                $regex: `${req.query.text}`,
                $options: "i",
              },
            },
            {
              city: {
                $regex: `${req.query.text}`,
                $options: "i",
              },
            },
            {
              state: {
                $regex: `${req.query.text}`,
                $options: "i",
              },
            },
            {
              postalCode: {
                $regex: `${req.query.text}`,
                $options: "i",
              },
            },
            {
              subTypeText: {
                $regex: `${req.query.text}`,
                $options: "i",
              },
            },
            {
              naturalPrice: {
                $regex: `${req.query.text}`,
                $options: "i",
              },
            },
            {
              property_area: {
                $regex: `${req.query.text}`,
                $options: "i",
              },
            },
          ],
        },
      },
    ];
    if (req.query.text == "") return res.send({ message: "Vacio" });
    const result = await estateModel.aggregate(query).limit(10);
    return res.send([...result]);
  } catch (error) {
    next(error);
  }
});

app.get("/getEstate", async function (req, res, next) {
  try {
    if (!req.query.url) return res.send({ message: "Vacio" });
    let result = await estateModel.findOne({
      url: req.query.url,
    });
    result._doc = {
      ...result._doc,
      geo_lat: parseFloat(result._doc.geo_lat),
      geo_lng: parseFloat(result._doc.geo_lng),
    };
    return res.status(200).send({ ...result._doc });
  } catch (error) {
    next(error);
  }
});

module.exports = app;

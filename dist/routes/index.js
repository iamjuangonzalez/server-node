"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _models = require("../models");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const app = (0, _express.default)();
app.post("/addEstate", function (req, res, next) {
  try {
    _models.estateModel.create(req.body).then(Estate => res.json({
      message: "Estate add successfully"
    })).catch(err => res.status(400).json({
      error: err
    }));
  } catch (error) {
    next(error);
  }
});
app.get("/searcher", async function (req, res, next) {
  try {
    const query = [{
      $match: {
        $or: [{
          id: {
            $regex: `${req.query.text}`,
            $options: "i"
          }
        }, {
          mls_id: {
            $regex: `${req.query.text}`,
            $options: "i"
          }
        }, {
          name: {
            $regex: `${req.query.text}`,
            $options: "i"
          }
        }, {
          url: {
            $regex: `${req.query.text}`,
            $options: "i"
          }
        }, {
          address: {
            $regex: `${req.query.text}`,
            $options: "i"
          }
        }, {
          city: {
            $regex: `${req.query.text}`,
            $options: "i"
          }
        }, {
          state: {
            $regex: `${req.query.text}`,
            $options: "i"
          }
        }, {
          postalCode: {
            $regex: `${req.query.text}`,
            $options: "i"
          }
        }, {
          subTypeText: {
            $regex: `${req.query.text}`,
            $options: "i"
          }
        }, {
          naturalPrice: {
            $regex: `${req.query.text}`,
            $options: "i"
          }
        }, {
          property_area: {
            $regex: `${req.query.text}`,
            $options: "i"
          }
        }]
      }
    }];
    if (req.query.text == "") return res.send({
      message: "Vacio"
    });
    const result = await _models.estateModel.aggregate(query).limit(10);
    return res.send([...result]);
  } catch (error) {
    next(error);
  }
});
app.get("/getEstate", async function (req, res, next) {
  try {
    if (!req.query.url) return res.send({
      message: "Vacio"
    });
    let result = await _models.estateModel.findOne({
      url: req.query.url
    });
    result._doc = _objectSpread(_objectSpread({}, result._doc), {}, {
      geo_lat: parseFloat(result._doc.geo_lat),
      geo_lng: parseFloat(result._doc.geo_lng)
    });
    return res.status(200).send(_objectSpread({}, result._doc));
  } catch (error) {
    next(error);
  }
});
var _default = app;
exports.default = _default;
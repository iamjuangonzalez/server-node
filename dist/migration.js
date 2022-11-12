"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
const async = require("async");
const data = require("./data.json");
const {
  estateModel
} = require("./models");
const dbConnect = require("./config/config");
dbConnect().then(async res => {
  migrateEstate();
});
async function migrateEstate() {
  let count = 0;
  async.eachSeries(data, (item, cb_item) => {
    let geolat = `${item.geo_lat.slice(0, 2)}.${item.geo_lat.slice(2, 5)}.${item.geo_lat.slice(5, 8)}`;
    let geolng = `${item.geo_lng.slice(0, 3)}.${item.geo_lng.slice(3, 6)}.${item.geo_lng.slice(6, 9)}`;
    item = _objectSpread(_objectSpread({}, item), {}, {
      geo_lat: geolat,
      geo_lng: geolng
    });
    estateModel(item).save().then(res => {
      console.log("Item migrate", ++count);
      cb_item();
    });
  });
}
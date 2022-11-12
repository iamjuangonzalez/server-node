"use strict";

const async = require("async");
const data = require("./data.json");
const { estateModel } = require("./models");
const dbConnect = require("./config/config");

dbConnect().then(async (res) => {
  migrateEstate();
});

async function migrateEstate() {
  let count = 0;
  async.eachSeries(data, (item, cb_item) => {
    let geolat = `${item.geo_lat.slice(0, 2)}.${item.geo_lat.slice(
      2,
      5
    )}.${item.geo_lat.slice(5, 8)}`;
    let geolng = `${item.geo_lng.slice(0, 3)}.${item.geo_lng.slice(
      3,
      6
    )}.${item.geo_lng.slice(6, 9)}`;
    item = {
      ...item,
      geo_lat: geolat,
      geo_lng: geolng,
    };
    estateModel(item)
      .save()
      .then((res) => {
        console.log("Item migrate", ++count);
        cb_item();
      });
  });
}

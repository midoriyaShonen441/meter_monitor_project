const mongoose = require("mongoose");
const meterImage = require("./meterImage");

const res = (beforeDate, afterDate) => {
    await meterImage.aggregate([
        { $group: { _id: null, zoneId: "$zoneId"  } },
        { $match: { date: { $gt:beforeDate, $lt:afterDate } } },
        { $project: { _id:0 } }
    ])
};

module.exports = res;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { CustomAPIError } = require("../errors/custom-error");
const errorhandler = (err, req, res, next) => {
    if (err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({
            msg: err.message,
        });
    }
    res.status(500).json({
        msg: "Something went Wrong, try again later..",
    });
};
module.exports = errorhandler;

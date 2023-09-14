"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFound = (req, res) => {
    return res.status(404).send("Route does not exist");
};
module.exports = notFound;

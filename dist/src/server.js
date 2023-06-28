"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cache_service_1 = require("./cache/cache.service");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
    const c = new cache_service_1.Caches();
    c.actionCache(req, res);
});
module.exports = app;
//# sourceMappingURL=server.js.map
const express = require('express')
const talent = require('./talent')
const post = require('./post')

const routes = express.Router();

routes.use("/talent", talent);
routes.use("/post", post);

module.exports = routes

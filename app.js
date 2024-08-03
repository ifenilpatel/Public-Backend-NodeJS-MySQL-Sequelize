const express = require("express");
const cookieParser = require("cookie-parser");
const debug = require("debug");
const cors = require("cors");
const dotenv = require("dotenv");
const compression = require("compression");
const helmet = require("helmet");
const morgan = require("morgan");

const { ApiResponse } = require("./configuration/utils/ApiResponse.conf.js");
const { flag, statusCode, status } = require("./configuration/utils/Constant.conf.js");

// NOTE: Set environment file.
const envFile = process.env.NODE_ENV || "development";
dotenv.config({ path: `./env/.env.${envFile}` });

// NOTE: Set default timezone on system level.
process.env.TZ = "UTC";

const app = express();

app.use(express.json({ limit: "16kb", extended: true }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());

// NOTE: Set helmet to protect the headers.
app.use(helmet());
app.use(compression());
// TODO: Set morgan to log the request.
app.use(morgan("combined"));

// NOTE: Set cors to all.
app.use(cors({ origin: process.env.CORS_ORIGIN, credentials: true }));

// NOTE: Set routers for third party.
const indexRoute = require("./routers/index.js");
const usersRoute = require("./routers/users.js");

app.use("/", indexRoute);
app.use("/api/v1/users", usersRoute);

// NOTE: Default route handler.
app.use((req, res, next) => {
    res.json(new ApiResponse(flag.fail, status.route, statusCode.route, []));
});

// NOTE: Default error handler.
app.use((error, req, res, next) => {
    res.json(new ApiResponse(flag.fail, status.sys, error.message, []));
});

// NOTE: Server and port configuration.
app.set("port", process.env.PORT || 3000);
const server = app.listen(app.get("port"), function () {
    debug("Express server listening on port " + server.address().port);
});

module.exports = server;

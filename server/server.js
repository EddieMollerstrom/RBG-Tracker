import mongoose from "mongoose";
import express from "express";
import session from "express-session";
import apiRegister from "./apiRegister.js";
import "dotenv/config";

const server = express();

const port = 3000;

server.use(express.urlencoded({ extended: false }));

server.use(express.json());

server.use(
  session({
    secret: "ditt_hemliga_tangent",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

mongoose.connect(process.env.DB_CONNECTION_STRING);

apiRegister(server, mongoose);

server.listen(port, () =>
  console.log(`Listening on port http://localhost:${port}`)
);
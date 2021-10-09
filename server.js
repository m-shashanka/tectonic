require("dotenv").config({ path: "./config.env" });
const express = require("express");
const app = express();
const server = require("http").createServer(app);

const next = require("next");
const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const connectDb = require("./utilsServer/connectDb");
connectDb();

nextApp.prepare().then(() => {
  app.use("/api/signup", require("./api/signup"));
  app.use("/api/auth", require("./api/auth"));

  //(files/pages) in nextJS are server side rendered, so without below line pages folder files won't work
  app.all("*", (req, res) => handle(req, res)); //allow nextJS to handle SSR

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Express server running on ${PORT}`);
  });
});

const express = require('express');
const userRouter = require("./users/userRouter");
const server = express();
const helmet = require("helmet");


server.use(helmet());
server.use(express.json());
server.use("/api/users", logger, userRouter)
server.use(logger);


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

// function logger(req, res, next) {
//   console.log()
// }

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}]
   ${req.method} to ${req.url}`);

  next();
}
module.exports = server;

require("dotenv").config();

const server = require("./server");

const port = process.env.PORT || 3050;
const env = process.env.NODE_ENV || "development";

/* eslint-disable no-console */
server.listen(port, async () => {
  console.debug(`Server is listening on port ${port}`);
  console.debug(`Current environment is ${env}`);
});

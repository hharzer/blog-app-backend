const express = require("express");
const { port } = require("./config");
const init = require("./init");

const app = express();

init(app);

app.listen(port, () => console.log(`listening on port ${port}`));

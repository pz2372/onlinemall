const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const backend = require("./backend");

const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(), // save files in memory as Buffers
});

app.use(express.json());
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

app.get("/api/getmentshirts", backend.getData);

app.post("/insertData", upload.any(), backend.insertData);

app.post("/createBrand", upload.any(), backend.createBrand);

app.get("/getproducts", backend.getData);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});

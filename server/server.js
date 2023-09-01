const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const accountsDB = require("./accountsDB");
const catalogDB = require("./catalogDB")

const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(), // save files in memory as Buffers
});

app.use(express.json());
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));

//app.get("/api/getmentshirts", accountsDB.getData);
//app.get("/api/getBrand", backend.getBrand);
//app.get("/api/getBrandCategory", backend.getBrandCategory);
//app.post("/insertData", upload.any(), accountsDB.insertData);
app.post("/createUser", accountsDB.createUser);
app.post("/login", accountsDB.login);

app.post("/uploadProduct", catalogDB.uploadProduct);
app.get("/getDashboardProducts", catalogDB.getDashboardProducts);
app.post("/createBrand", catalogDB.createBrand);
app.get("/getAllBrands", catalogDB.getAllBrands);

app.listen(4000, () => {
  console.log("Server started on port 4000");
});

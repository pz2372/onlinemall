const { S3UploadImg, S3GetImg, checkS3Connection } = require("./s3");
const mysql = require("mysql2");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "new_password",
  database: "OnlineMallDatabase",
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});

//Retrieve brand data
const getData = (req, res) => {
  const id = "Nike";
  const sqlSelect = `SELECT * FROM men_tshirts WHERE brand = '${id}'`;
  db.query(sqlSelect, async (err, result) => {
    if (err) {
      res.send({ error: "An error occurred while executing the query" });
    } else {
      var results = result[0];
      for (var i = 1; i < 10; i++) {
        if (results[`img${i}`]) {
          results[`img${i}`] = await S3GetImg(results[`img${i}`]);
        }
      }
      results["brandImg"] = await S3GetImg(results["brandImg"]);
      res.send(result);
    }
  });
};

//*****Update brand data*****//
const insertData = (req, res) => {
  const id = "Nike";
  const changes = req.files;
  const imgURL = {};

  //Update image on S3
  var curr = "";
  for (var i = 0; i < changes.length - 1; i++) {
    curr = changes[i];
    S3UploadImg(curr.fieldname, curr.buffer);
    imgURL[curr.originalname] = curr.fieldname;
  }
  var keys = "";
  for (const key in imgURL) {
    keys += `${key} = '${imgURL[key]}',`;
  }

  //Add links to key
  const linkJSON = JSON.parse(
    changes[changes.length - 1].buffer.toString("utf-8")
  );
  const linkChanges = linkJSON["linkChanges"];

  for (const key in linkChanges) {
    keys += `${key} = '${linkChanges[key]}',`;
  }
  keys = keys.slice(0, -1);

  const sqlSelect = `UPDATE men_tshirts SET ${keys} WHERE brand = '${id}'`;
  console.log(sqlSelect);
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send({ error: "An error occurred while executing the query" });
    } else {
      res.send(result);
    }
  });
};

//*****Create new entry into table*****//
const createBrand = (req, res) => {
  const uploadData = req.files;
  const imgURL = {}
  var keys = "";

  //Upload image on S3
  var curr = "";
  for (var i = 0; i < uploadData.length - 1; i++) {
    curr = uploadData[i];
    S3UploadImg(curr.fieldname, curr.buffer);
    imgURL[curr.originalname] = curr.fieldname;
  }
  for (const key in imgURL) {
    keys += `${key} = '${imgURL[key]}',`;
  }

  const JSONData = JSON.parse(
    uploadData[uploadData.length - 1].buffer.toString("utf-8")
  );
  const category = JSONData["category"]
  const brand = JSONData["brand"]
  const linkChanges = JSONData["linkChanges"];

  //Add brand to key
  keys += `brand = '${brand}',`;

   //Add links to key
  for (const key in linkChanges) {
    keys += `${key} = '${linkChanges[key]}',`;
  }

  keys = keys.slice(0, -1);

  const sqlSelect = `INSERT INTO ${category} SET ${keys}`;

  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send({ error: "An error occurred while executing the query" });
    } else {
      res.send(result);
    }
  });
};

//*****Get Products Page Data*****//
const getProducts = (req, res) => {
  const id = "Nike";
  const sqlSelect = `SELECT * FROM men_tshirts WHERE brand = '${id}'`;
  db.query(sqlSelect, async (err, result) => {
    if (err) {
      res.send({ error: "An error occurred while executing the query" });
    } else {
      var results = result[0];
      for (var i = 1; i < 10; i++) {
        if (results[`img${i}`]) {
          results[`img${i}`] = await S3GetImg(results[`img${i}`]);
        }
      }
      results["brandImg"] = await S3GetImg(results["brandImg"]);
      res.send(result);
    }
  });
}

module.exports = {
  getData: getData,
  insertData: insertData,
  createBrand: createBrand,
};

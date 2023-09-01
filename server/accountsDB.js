const { S3UploadImg, S3GetImg, checkS3Connection } = require("./s3");
require("dotenv").config();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
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

{/*//Retrieve brand data
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
};*/}

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
  db.query(sqlSelect, (err, result) => {
    if (err) {
      res.send({ error: "An error occurred while executing the query" });
    } else {
      res.send(result);
    }
  });
};

//*****Create new entry into table*****//
{/*const createBrand = (req, res) => {
  const uploadData = req.files;
  const imgURL = {};
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
  const category = JSONData["category"];
  const brand = JSONData["brand"];
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
};*/}

//*****Get Products Page Data*****//
{/*const getProducts = (req, res) => {
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
};*/}

//////////////USERS///////////////

//******User Register******//
const createUser = async (req, res) => {
  const input = req.body;

  const hashPassword = await bcrypt.hash(input.password, 10);

  const date = new Date();
  let createdDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(createdDate);

  const sqlSearch = `SELECT * FROM users WHERE username = '${input.username}'`;

  const sqlInsert = `INSERT INTO users (username, password, firstName, lastName, birthday, gender, phone, email, createdAt) 
  VALUES ('${input.username}','${hashPassword}','${input.firstName}','${input.lastName}','${input.birthday}','${input.gender}','${input.phone}','${input.email}','${createdDate}')`;

  db.query(sqlSearch, async (err, result) => {
    if (err) {
      console.error("Error while creating user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length != 0) {
        console.log("User already exists");
        res.status(409).json({ error: "User already exists" });
      } else {
        db.query(sqlInsert, (err) => {
          if (err) {
            console.error("Error while creating user:", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            console.log("Created new user");
            res.status(201).json({ message: "User created successfully" });
          }
        });
      }
    }
  });
};

//*******User Login********//
const generateAccessToken = require("./generateToken");
const generateRefreshToken = require("./generateToken");

const login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlSearch = `Select * from users WHERE username = '${username}'`;

  db.query(sqlSearch, async (err, result) => {
    if (err) throw err;
  
    if (result.length == 0) {
      console.log("User does not exist");
      res.status(401).json({ error: 'Username does not exist.'});
    } else {
      const hashedPassword = result[0].password;

      if (await bcrypt.compare(password, hashedPassword)) {
        console.log("Login Successful");
        const accessToken = generateAccessToken({ username: username });
        const refreshToken = generateRefreshToken({ username: username });

        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        console.log("Password incorrect");
        res.status(401).json({ error: 'Password is incorrect.' });
      }
    }
  });
};

////////////BrandUsers////////////////

//******Brand User Register******//
const createBrandUser = async (req, res) => {
  const input = req.body;

  const hashPassword = await bcrypt.hash(input.password, 10);

  const date = new Date();
  let createdDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(createdDate);

  const sqlSearch = `SELECT * FROM users WHERE username = '${input.username}'`;

  const sqlInsert = `INSERT INTO users (username, password, firstName, lastName, birthday, gender, phone, email, createdAt) 
  VALUES ('${input.username}','${hashPassword}','${input.firstName}','${input.lastName}','${input.birthday}','${input.gender}','${input.phone}','${input.email}','${createdDate}')`;

  db.query(sqlSearch, async (err, result) => {
    if (err) {
      console.error("Error while creating user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length != 0) {
        console.log("User already exists");
        res.status(409).json({ error: "User already exists" });
      } else {
        db.query(sqlInsert, (err) => {
          if (err) {
            console.error("Error while creating user:", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            console.log("Created new user");
            res.status(201).json({ message: "User created successfully" });
          }
        });
      }
    }
  });
};

//*******Brand User Login********//
const brandLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlSearch = `Select * from users WHERE username = '${username}'`;

  db.query(sqlSearch, async (err, result) => {
    if (err) throw err;
  
    if (result.length == 0) {
      console.log("User does not exist");
      res.status(401).json({ error: 'Username does not exist.'});
    } else {
      const hashedPassword = result[0].password;

      if (await bcrypt.compare(password, hashedPassword)) {
        console.log("Login Successful");
        const accessToken = generateAccessToken({ username: username });
        const refreshToken = generateRefreshToken({ username: username });

        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        console.log("Password incorrect");
        res.status(401).json({ error: 'Password is incorrect.' });
      }
    }
  });
};

//////////AdminUser//////////////

//******Admin User Register******//
const createAdminUser = async (req, res) => {
  const input = req.body;

  const hashPassword = await bcrypt.hash(input.password, 10);

  const date = new Date();
  let createdDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  console.log(createdDate);

  const sqlSearch = `SELECT * FROM users WHERE username = '${input.username}'`;

  const sqlInsert = `INSERT INTO users (username, password, firstName, lastName, birthday, gender, phone, email, createdAt) 
  VALUES ('${input.username}','${hashPassword}','${input.firstName}','${input.lastName}','${input.birthday}','${input.gender}','${input.phone}','${input.email}','${createdDate}')`;

  db.query(sqlSearch, async (err, result) => {
    if (err) {
      console.error("Error while creating user:", err);
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      if (result.length != 0) {
        console.log("User already exists");
        res.status(409).json({ error: "User already exists" });
      } else {
        db.query(sqlInsert, (err) => {
          if (err) {
            console.error("Error while creating user:", err);
            res.status(500).json({ error: "Internal Server Error" });
          } else {
            console.log("Created new user");
            res.status(201).json({ message: "User created successfully" });
          }
        });
      }
    }
  });
};

//*******Admin User Login********//
const adminLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const sqlSearch = `Select * from users WHERE username = '${username}'`;

  db.query(sqlSearch, async (err, result) => {
    if (err) throw err;
  
    if (result.length == 0) {
      console.log("User does not exist");
      res.status(401).json({ error: 'Username does not exist.'});
    } else {
      const hashedPassword = result[0].password;

      if (await bcrypt.compare(password, hashedPassword)) {
        console.log("Login Successful");
        const accessToken = generateAccessToken({ username: username });
        const refreshToken = generateRefreshToken({ username: username });

        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        console.log("Password incorrect");
        res.status(401).json({ error: 'Password is incorrect.' });
      }
    }
  });
};


module.exports = {
  createUser: createUser,
  login: login,
  createBrandUser: createBrandUser,
  brandLogin: brandLogin,
  createAdminUser: createAdminUser,
  adminLogin: adminLogin,
};

const { S3Client, HeadBucketCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp");
require("dotenv").config();

const s3 = new S3Client({
  region: "us-east-1",
  //endpoint: "http://onlinemallroot.s3-website-us-east-1.amazonaws.com",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const S3_BUCKET_NAME = "onlinemallroot";
const headBucketParams = { Bucket: "onlinemallroot" };
const headBucketCommand = new HeadBucketCommand(headBucketParams);

const checkS3Connection = async() => {
  try {
    await s3.send(headBucketCommand);
    console.log("S3 connection successful");
  } catch (error) {
    console.error("Error connecting to S3:", error);
  }
}

const S3UploadImg = async (filePath, imgBuffer) => {
  const resizedImgBuffer = await sharp(imgBuffer)
    .resize(800) // resize the image to a maximum width of 800 pixels
    .jpeg({ quality: 80 }) // compress the image with a quality of 80%
    .toBuffer(); // convert the image to a Buffer object

  return await s3
    .send(
      new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: `${filePath}`,
        Body: resizedImgBuffer,
      })
    )
    .then((data) => {
      console.log("Image Uploaded!");
    })
    .catch((error) => {
      console.error("Error uploading image to S3:", error);
    });
};

const S3GetImg = async (filePath) => {
  return `https://onlinemallroot.s3.amazonaws.com/${filePath}`
};

module.exports = {
  S3UploadImg: S3UploadImg,
  S3GetImg: S3GetImg,
  checkS3Connection: checkS3Connection,
};

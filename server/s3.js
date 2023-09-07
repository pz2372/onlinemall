const {
  S3Client,
  HeadBucketCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const fs = require("fs");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp");
require("dotenv").config();

const s3 = new S3Client({
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
const S3_BUCKET_NAME = process.env.S3_BUCKET;
const headBucketParams = { Bucket: S3_BUCKET_NAME };
const headBucketCommand = new HeadBucketCommand(headBucketParams);

const checkS3Connection = async () => {
  try {
    await s3.send(headBucketCommand);
    console.log("S3 connection successful");
  } catch (error) {
    console.error("Error connecting to S3:", error);
  }
};

const S3UploadImg = async (filePath, buffer) => {
  const resizedImgBuffer = await sharp(buffer)
    .resize(800) // resize the image to a maximum width of 800 pixels
    .jpeg({ quality: 80 }) // compress the image with a quality of 80%
    .toBuffer(); // convert the image to a Buffer object
  return await s3
    .send(
      new PutObjectCommand({
        Bucket: S3_BUCKET_NAME,
        Key: filePath,
        Body: resizedImgBuffer,
      })
    )
    .then(async (data) => {
      console.log("Image Uploaded!");
    })
    .catch((error) => {
      console.error("Error uploading image to S3:", error);
    });
};

const S3GetImg = async (filePath) => {
  return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${filePath}`;
};

const S3DeleteImg = async (filePath) => {
  const command = new DeleteObjectCommand({
    Bucket: S3_BUCKET_NAME,
    Key: filePath,
  });

  try {
    const response = await s3.send(command);
    return response;
  } catch (err) {
    return err;
  }
};

module.exports = {
  S3UploadImg,
  S3GetImg,
  checkS3Connection,
  S3DeleteImg,
};

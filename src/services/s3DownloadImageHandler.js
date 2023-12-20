const AWS = require("aws-sdk");
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

const getImageUrl = async (myKey) => {
  const myBucket = "pazcapstone15611-dev";
  const signedUrlExpireSeconds = 60 * 1;
  const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    signatureVersion: "v4",
    region: "us-east-1",
    secretAccessKey: secretAccessKey,
  });

  const url = s3.getSignedUrl("getObject", {
    Bucket: myBucket,
    Key: myKey,
    Expires: signedUrlExpireSeconds,
  });
  return url;
};

const s3DownloadImageHandler = { getImageUrl };

export default s3DownloadImageHandler;

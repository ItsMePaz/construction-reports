const AWS = require("aws-sdk");
const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;

const deleteImage = async (myKey) => {
  const myBucket = "pazcapstone15611-dev";

  const s3 = new AWS.S3({
    accessKeyId: accessKeyId,
    signatureVersion: "v4",
    region: "us-east-1",
    secretAccessKey: secretAccessKey,
  });

  const params = {
    Bucket: myBucket,
    Key: myKey,
  };

  s3.deleteObject(params, (err, data) => {
    if (err) {
      console.error("Error deleting object:", err);
    } else {
      console.log("Object deleted successfully:", data);
    }
  });
};

const s3DeleteImageHandler = { deleteImage };

export default s3DeleteImageHandler;

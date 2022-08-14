const Minio = require("minio");
const { createPrismaBucket } = require("./models/bucket.model");

const minioClient = new Minio.Client({
  endPoint: "192.168.172.50",
  port: 9000,
  useSSL: false,
  accessKey: "controller",
  secretKey: "5a64904e-9205-11ec-8717-54ee75516ff6",
});

// File that needs to be uploaded.
const uploadFile = (bucketName, fileName, filePath) => {
  const metaData = {
    "Content-Type": "application/octet-stream",
    "X-Amz-Meta-Testing": 1234,
    example: 5678,
  };
  // Using fPutObject API upload your file to the bucket europetrip.
  minioClient.fPutObject(
    bucketName,
    fileName,
    filePath,
    metaData,
    function (err, etag) {
      if (err) {
        console.log(err);
        return err;
      }
      console.log("File uploaded successfully.");
    }
  );
};

const createBucket = (bucketName) => {
  // Make a bucket
  const cleanBucketName = bucketName.toLowerCase().split(" ").join("");
  uniqueBucket = cleanBucketName + "bucket" + String(Date.now()).slice(-4);

  minioClient.makeBucket(uniqueBucket, "us-east-1", async function (err) {
    if (err) return console.log("Bucket exists");

    console.log(`Bucket ${uniqueBucket} created successfully in "us-east-1".`);
    // const bucket = await createPrismaBucket(uniqueBucket);
  });
  return uniqueBucket;
};

const deleteBucket = (bucketName) => {
  minioClient.removeBucket(bucketName, (err) => {
    if (err) return console.log("Unable to remove bucket");
    console.log("Bucket removed successfully.");
  });
};

const checkBucketExists = (bucketName) => {
  return minioClient.bucketExists(bucketName, function (err, exists) {
    if (err) return console.log(err);
    if (exists) return exists;
  });
};

const getBucketUrl = (bucketName) => {
  minioClient.presignedUrl(
    "POST",
    bucketName,
    "",
    24 * 60 * 60,
    function (err, presignedUrl) {
      if (err) return console.log(err);
      console.log(presignedUrl);
    }
  );
};

module.exports = {
  uploadFile,
  minioClient,
  createBucket,
  getBucketUrl,
  deleteBucket,
};

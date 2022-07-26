const Minio = require("minio");

const minioClient = new Minio.Client({
  endPoint: "192.168.172.50",
  port: 9000,
  useSSL: false,
  accessKey: "controller",
  secretKey: "5a64904e-9205-11ec-8717-54ee75516ff6",
});

// File that needs to be uploaded.
const makeBucket = (bucketName, fileName, filePath) => {
  // Make a bucket called europetrip.
  //   minioClient.makeBucket(bucketName, "us-east-1", function (err) {
  //     if (err) return console.log(err);

  //     console.log('Bucket created successfully in "us-east-1".');

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
        return err.message;
      }
      console.log("File uploaded successfully.");
    }
  );
};

module.exports = { makeBucket, minioClient };

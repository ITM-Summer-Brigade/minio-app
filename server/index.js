const { makeBucket } = require("./minio");
const express = require("express");
const app = express();

// For handling multipart/form-data (aka. files)
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3005;

app.post("/api/files", upload.single("file"), (req, res) => {
  const { originalname: fileName, path: filePath } = req.file;
  console.log(req.file);
  console.log(typeof req.file);
  bucketName = "testdevbucket";
  const err = makeBucket(bucketName, fileName, filePath);

  res.send({
    message: "Bucket created successfully",
  });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

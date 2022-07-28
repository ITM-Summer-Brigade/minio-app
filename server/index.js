const { makeBucket } = require("./minio");
const express = require("express");
const app = express();

// For handling multipart/form-data (aka. files)
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// set up cors
const cors = require("cors");
const classRouter = require("./routes/class.router");
const authRouter = require("./routes/auth.router");
app.use(cors());

// set up form parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3005;

app.get("/working", (req, res) => {
  console.log("it works");
  res.send("It's working!");
});

app.post("/api/files", upload.single("file"), (req, res) => {
  const { originalname: fileName, path: filePath } = req.file;
  console.log(req.file);
  console.log(typeof req.file);
  bucketName = "testdevbucket";
  makeBucket(bucketName, fileName, filePath);
  res.send({
    message: "Bucket created successfully",
  });
});

// activate routers
app.use("/class", classRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

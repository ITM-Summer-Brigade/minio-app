const { uploadFile } = require("./minio");
const express = require("express");
const app = express();
// prisma init
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { initSubjects } = require("./models/subject.model");

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
  if (!req.file) {
    return res.status(400).json({ message: "Missing a file to upload" });
  }
  console.log(req.file);
  console.log(typeof req.file);
  bucketName = "testdevbucket";
  uploadFile(bucketName, fileName, filePath);
  res.send({
    message: "Bucket created successfully",
  });
});

// activate routers
app.use("/class", classRouter);
app.use("/auth", authRouter);

app.listen(port, () => {
  // initialize the database
  initSubjects()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  console.log(`Listening on port ${port}`);
});

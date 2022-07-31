const express = require("express");
const app = express();
// prisma init
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { initSubjects } = require("./models/subject.model");

// set up cors
const cors = require("cors");

// set up routes
const classRouter = require("./routes/class.router");
const authRouter = require("./routes/auth.router");
const subjectRouter = require("./routes/subject.router");
const fileRouter = require("./routes/file.router");

app.use(cors());

// set up form parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3005;

app.get("/working", (req, res) => {
  console.log("it works");
  res.send("It's working!");
});

// activate routers
app.use("/class", classRouter);
app.use("/auth", authRouter);
app.use("/subject", subjectRouter);
app.use("/files", fileRouter);

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

const express = require("express");
const app = express();
// prisma init
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { initSubjects } = require("./models/subject.model");

// passport
const passport = require("passport");
const { authRouter } = require("./routes/auth.router");
const { activateGoogleOAuth } = require("./util/auth");
// set up cors
const cors = require("cors");
activateGoogleOAuth();

// url
const homeUrl =
  process.env.NODE_ENV === "dev" ? "http://localhost" : "http://192.168.172.86";

// set up sessions
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

const sessionStore = new SQLiteStore({
  db: "minio.db",
  dir: "./prisma/",
  table: "Session",
});

app.use(
  session({
    store: sessionStore,
    secret: "miniofileapp",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 3600000 },
  })
);

// use
app.use(passport.initialize());
app.use(passport.session());

// set up routes
const classRouter = require("./routes/class.router");
const subjectRouter = require("./routes/subject.router");
const fileRouter = require("./routes/file.router");

app.use(cors());

// set up form parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = 3005;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

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
  console.log(`Listening on port ${homeUrl}:${port}`);
});

module.exports = { sessionStore };

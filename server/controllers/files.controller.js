const { uploadFile, getFileData } = require("../minio");

const {
  findAllFiles,
  findFilesByClass,
  findFilesBySubject,
  saveFileInfo,
} = require("../models/file.model");

async function getFiles(req, res) {
  const files = await findAllFiles();
  if (!files.length) {
    return res.status(404).json({ message: "No files found" });
  }
  return res.status(200).json(files);
}

async function getFilesBySubject(req, res) {
  const { subjectId } = req.params;
  const subjectFiles = await findFilesBySubject(subjectId);
  if (!subjectFiles.length) {
    return res.status(404).json({ message: "No files were found" });
  }
  return res.status(200).json(subjectFiles);
}

async function postFile(req, res) {
  console.log(req.file, req.body.text);
  if (!req.file) {
    return res.status(400).json({ message: "Missing a file to upload" });
  }
  if (!req.body.bucketName) {
    return res.status(400).json({ message: "Missing the bucket name" });
  }
  const {
    originalname: fileName,
    path: filePath,
    size,
    mimetype: fileType,
  } = req.file;
  const { bucketName } = req.body;

  console.log(req.file);
  uploadFile(bucketName, fileName, filePath);
  await saveFileInfo(fileName, size, fileType, filePath);
  return res.status(201).send({
    message: "File uploaded successfully",
  });
}

async function getFile(req, res) {
  const { bucketName, fileName } = req.query;
  const file = getFileData(bucketName, fileName);
  if (!req.query.bucketName || !req.query.fileName) {
    return res
      .status(400)
      .json({ message: "Missing required search parameters" });
  }

  return res.status(200).json({ message: "File found", file });
}

async function getFilesByClass(req, res) {
  const { classUrl } = req.params;
  const classFiles = await findFilesByClass(classUrl);
  if (!classFiles.length) {
    return res.status(404).json({ message: "No files were found" });
  }
  return res.status(200).json(classFiles);
}

module.exports = {
  getFiles,
  getFilesBySubject,
  getFilesByClass,
  postFile,
  getFile,
};

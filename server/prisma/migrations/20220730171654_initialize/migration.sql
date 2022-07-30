-- CreateTable
CREATE TABLE "File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileName" TEXT NOT NULL,
    "uploadedAtDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedDate" DATETIME NOT NULL,
    "size" INTEGER NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "subjectName" TEXT NOT NULL,
    "subjectId" INTEGER,
    "folderId" INTEGER,
    "classId" INTEGER,
    CONSTRAINT "File_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Class" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "className" TEXT NOT NULL,
    "classUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" INTEGER NOT NULL,
    "teacherName" TEXT NOT NULL,
    "bucketId" INTEGER NOT NULL,
    "subjectID" INTEGER NOT NULL,
    CONSTRAINT "Class_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Class_bucketId_fkey" FOREIGN KEY ("bucketId") REFERENCES "Bucket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tagName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subjectName" TEXT NOT NULL,
    "subjectViews" INTEGER NOT NULL,
    "classId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "authorId" INTEGER NOT NULL,
    "subjectId" INTEGER,
    "classId" INTEGER,
    "fileId" INTEGER,
    CONSTRAINT "Post_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Post_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Post_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Post_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bio" TEXT,
    "profileUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "bucketId" INTEGER NOT NULL,
    CONSTRAINT "User_bucketId_fkey" FOREIGN KEY ("bucketId") REFERENCES "Bucket" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "folderName" TEXT NOT NULL,
    "folderDescription" TEXT
);

-- CreateTable
CREATE TABLE "Bucket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bucketName" TEXT NOT NULL,
    "bucketUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "_classList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_classList_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_classList_B_fkey" FOREIGN KEY ("B") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ClassToSubject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ClassToSubject_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClassToSubject_B_fkey" FOREIGN KEY ("B") REFERENCES "Subject" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ClassToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ClassToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Class" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ClassToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Class_creatorId_key" ON "Class"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Class_bucketId_key" ON "Class"("bucketId");

-- CreateIndex
CREATE UNIQUE INDEX "Class_subjectID_key" ON "Class"("subjectID");

-- CreateIndex
CREATE UNIQUE INDEX "Subject_classId_key" ON "Subject"("classId");

-- CreateIndex
CREATE UNIQUE INDEX "Post_fileId_key" ON "Post"("fileId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_bucketId_key" ON "User"("bucketId");

-- CreateIndex
CREATE UNIQUE INDEX "_classList_AB_unique" ON "_classList"("A", "B");

-- CreateIndex
CREATE INDEX "_classList_B_index" ON "_classList"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToSubject_AB_unique" ON "_ClassToSubject"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToSubject_B_index" ON "_ClassToSubject"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ClassToTag_AB_unique" ON "_ClassToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ClassToTag_B_index" ON "_ClassToTag"("B");

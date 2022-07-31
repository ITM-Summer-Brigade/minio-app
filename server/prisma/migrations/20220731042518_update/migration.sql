/*
  Warnings:

  - You are about to drop the column `subjectName` on the `File` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileName" TEXT NOT NULL,
    "uploadedAtDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastModifiedDate" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "size" INTEGER NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "subjectId" INTEGER,
    "folderId" INTEGER,
    "classId" INTEGER,
    CONSTRAINT "File_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_classId_fkey" FOREIGN KEY ("classId") REFERENCES "Class" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_File" ("classId", "fileName", "fileType", "fileUrl", "folderId", "id", "lastModifiedDate", "size", "subjectId", "uploadedAtDate") SELECT "classId", "fileName", "fileType", "fileUrl", "folderId", "id", "lastModifiedDate", "size", "subjectId", "uploadedAtDate" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateTable
CREATE TABLE "Session" (
    "sid"  PRIMARY KEY,
    "expired" ,
    "sess" 
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Class" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "className" TEXT NOT NULL,
    "classUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" INTEGER NOT NULL,
    "teacherName" TEXT NOT NULL,
    "bucketId" INTEGER NOT NULL,
    "subjectID" INTEGER NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Class_bucketId_fkey" FOREIGN KEY ("bucketId") REFERENCES "Bucket" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Class_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Class" ("bucketId", "className", "classUrl", "createdAt", "creatorId", "id", "subjectID", "teacherName") SELECT "bucketId", "className", "classUrl", "createdAt", "creatorId", "id", "subjectID", "teacherName" FROM "Class";
DROP TABLE "Class";
ALTER TABLE "new_Class" RENAME TO "Class";
CREATE UNIQUE INDEX "Class_classUrl_key" ON "Class"("classUrl");
CREATE UNIQUE INDEX "Class_bucketId_key" ON "Class"("bucketId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

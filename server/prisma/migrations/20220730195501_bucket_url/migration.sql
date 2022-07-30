-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bucket" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "bucketName" TEXT NOT NULL,
    "bucketUrl" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Bucket" ("bucketName", "bucketUrl", "createdAt", "id", "updatedAt") SELECT "bucketName", "bucketUrl", "createdAt", "id", "updatedAt" FROM "Bucket";
DROP TABLE "Bucket";
ALTER TABLE "new_Bucket" RENAME TO "Bucket";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

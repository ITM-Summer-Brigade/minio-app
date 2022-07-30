/*
  Warnings:

  - You are about to drop the column `classId` on the `Subject` table. All the data in the column will be lost.
  - Added the required column `abbreviation` to the `Subject` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Subject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subjectName" TEXT NOT NULL,
    "subjectViews" INTEGER NOT NULL DEFAULT 0,
    "abbreviation" TEXT NOT NULL
);
INSERT INTO "new_Subject" ("id", "subjectName", "subjectViews") SELECT "id", "subjectName", "subjectViews" FROM "Subject";
DROP TABLE "Subject";
ALTER TABLE "new_Subject" RENAME TO "Subject";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

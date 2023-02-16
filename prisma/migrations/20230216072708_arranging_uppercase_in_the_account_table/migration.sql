/*
  Warnings:

  - You are about to drop the column `FirstName` on the `acconts` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `acconts` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `acconts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `acconts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_acconts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numberAccont" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_acconts" ("amount", "createdAt", "id", "numberAccont") SELECT "amount", "createdAt", "id", "numberAccont" FROM "acconts";
DROP TABLE "acconts";
ALTER TABLE "new_acconts" RENAME TO "acconts";
CREATE UNIQUE INDEX "acconts_numberAccont_key" ON "acconts"("numberAccont");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

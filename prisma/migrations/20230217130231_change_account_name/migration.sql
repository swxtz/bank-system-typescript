/*
  Warnings:

  - You are about to drop the column `numberAccont` on the `accounts` table. All the data in the column will be lost.
  - Added the required column `numberAccount` to the `accounts` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numberAccount" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_accounts" ("amount", "createdAt", "firstName", "id", "lastName") SELECT "amount", "createdAt", "firstName", "id", "lastName" FROM "accounts";
DROP TABLE "accounts";
ALTER TABLE "new_accounts" RENAME TO "accounts";
CREATE UNIQUE INDEX "accounts_numberAccount_key" ON "accounts"("numberAccount");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

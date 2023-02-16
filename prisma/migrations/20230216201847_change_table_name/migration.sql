/*
  Warnings:

  - You are about to drop the `acconts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `accontId` on the `transactions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "acconts_numberAccont_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "acconts";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numberAccont" INTEGER NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "oldAmount" INTEGER NOT NULL,
    "newAmount" INTEGER NOT NULL,
    "accountId" TEXT,
    CONSTRAINT "transactions_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_transactions" ("FirstName", "LastName", "id", "newAmount", "oldAmount") SELECT "FirstName", "LastName", "id", "newAmount", "oldAmount" FROM "transactions";
DROP TABLE "transactions";
ALTER TABLE "new_transactions" RENAME TO "transactions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "accounts_numberAccont_key" ON "accounts"("numberAccont");

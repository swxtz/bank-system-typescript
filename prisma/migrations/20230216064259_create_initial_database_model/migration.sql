-- CreateTable
CREATE TABLE "acconts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numberAccont" INTEGER NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "oldAmount" INTEGER NOT NULL,
    "newAmount" INTEGER NOT NULL,
    "accontId" TEXT,
    CONSTRAINT "transactions_accontId_fkey" FOREIGN KEY ("accontId") REFERENCES "acconts" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "acconts_numberAccont_key" ON "acconts"("numberAccont");

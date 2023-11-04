/*
  Warnings:

  - A unique constraint covering the columns `[value,userId]` on the table `Quantity` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Quantity_value_userId_key" ON "Quantity"("value", "userId");

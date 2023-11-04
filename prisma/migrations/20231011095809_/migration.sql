/*
  Warnings:

  - A unique constraint covering the columns `[network,amount,type,dataType,quantity,userId]` on the table `CostPrice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[network,amount,type,dataType,quantity,userId]` on the table `SellingPrice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `CostPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `SellingPrice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CostPrice_network_amount_type_dataType_quantity_key";

-- AlterTable
ALTER TABLE "CostPrice" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SellingPrice" ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "CostPrice_network_amount_type_dataType_quantity_userId_key" ON "CostPrice"("network", "amount", "type", "dataType", "quantity", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SellingPrice_network_amount_type_dataType_quantity_userId_key" ON "SellingPrice"("network", "amount", "type", "dataType", "quantity", "userId");

-- AddForeignKey
ALTER TABLE "CostPrice" ADD CONSTRAINT "CostPrice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellingPrice" ADD CONSTRAINT "SellingPrice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

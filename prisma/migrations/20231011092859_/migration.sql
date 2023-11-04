/*
  Warnings:

  - You are about to drop the column `salesId` on the `CostPrice` table. All the data in the column will be lost.
  - You are about to drop the column `salesId` on the `SellingPrice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[network,amount,type,dataType,quantity]` on the table `CostPrice` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "CostPrice" DROP CONSTRAINT "CostPrice_salesId_fkey";

-- DropForeignKey
ALTER TABLE "SellingPrice" DROP CONSTRAINT "SellingPrice_salesId_fkey";

-- AlterTable
ALTER TABLE "CostPrice" DROP COLUMN "salesId";

-- AlterTable
ALTER TABLE "SellingPrice" DROP COLUMN "salesId";

-- CreateIndex
CREATE UNIQUE INDEX "CostPrice_network_amount_type_dataType_quantity_key" ON "CostPrice"("network", "amount", "type", "dataType", "quantity");

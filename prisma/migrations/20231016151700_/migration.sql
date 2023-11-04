/*
  Warnings:

  - You are about to drop the column `quantity` on the `CostPrice` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `SellingPrice` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[network,amount,type,dataType,quantityId,userId]` on the table `CostPrice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[network,amount,type,dataType,quantityId,userId]` on the table `SellingPrice` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantityId` to the `CostPrice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantityId` to the `Sales` table without a default value. This is not possible if the table is not empty.
  - Made the column `profit` on table `Sales` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `quantityId` to the `SellingPrice` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "CostPrice_network_amount_type_dataType_quantity_userId_key";

-- DropIndex
DROP INDEX "SellingPrice_network_amount_type_dataType_quantity_userId_key";

-- AlterTable
ALTER TABLE "CostPrice" DROP COLUMN "quantity",
ADD COLUMN     "quantityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Sales" ADD COLUMN     "quantityId" TEXT NOT NULL,
ALTER COLUMN "profit" SET NOT NULL;

-- AlterTable
ALTER TABLE "SellingPrice" DROP COLUMN "quantity",
ADD COLUMN     "quantityId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Quantity" (
    "id" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quantity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CostPrice_network_amount_type_dataType_quantityId_userId_key" ON "CostPrice"("network", "amount", "type", "dataType", "quantityId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "SellingPrice_network_amount_type_dataType_quantityId_userId_key" ON "SellingPrice"("network", "amount", "type", "dataType", "quantityId", "userId");

-- AddForeignKey
ALTER TABLE "Sales" ADD CONSTRAINT "Sales_quantityId_fkey" FOREIGN KEY ("quantityId") REFERENCES "Quantity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostPrice" ADD CONSTRAINT "CostPrice_quantityId_fkey" FOREIGN KEY ("quantityId") REFERENCES "Quantity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellingPrice" ADD CONSTRAINT "SellingPrice_quantityId_fkey" FOREIGN KEY ("quantityId") REFERENCES "Quantity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quantity" ADD CONSTRAINT "Quantity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

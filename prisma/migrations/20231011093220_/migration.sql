/*
  Warnings:

  - The values [9MOBILE] on the enum `NetworkType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "NetworkType_new" AS ENUM ('MTN', 'GLO', 'AIRTEL', 'SMILE', 'MOBILE');
ALTER TABLE "Sales" ALTER COLUMN "network" TYPE "NetworkType_new" USING ("network"::text::"NetworkType_new");
ALTER TABLE "CostPrice" ALTER COLUMN "network" TYPE "NetworkType_new" USING ("network"::text::"NetworkType_new");
ALTER TABLE "SellingPrice" ALTER COLUMN "network" TYPE "NetworkType_new" USING ("network"::text::"NetworkType_new");
ALTER TYPE "NetworkType" RENAME TO "NetworkType_old";
ALTER TYPE "NetworkType_new" RENAME TO "NetworkType";
DROP TYPE "NetworkType_old";
COMMIT;

-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('BLOCK_CATEGORIES', 'ALL');

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "blockedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" "UserPermission"[];

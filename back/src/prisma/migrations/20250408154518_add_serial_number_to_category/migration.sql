/*
  Warnings:

  - A unique constraint covering the columns `[serialNumber]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "serialNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_serialNumber_key" ON "Category"("serialNumber");

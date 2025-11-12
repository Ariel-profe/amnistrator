/*
  Warnings:

  - You are about to drop the column `amountOfHours` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `availableHours` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `payment` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[monthId]` on the table `payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `totalHours` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."payment" DROP COLUMN "amountOfHours",
DROP COLUMN "availableHours",
DROP COLUMN "date",
DROP COLUMN "description",
DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "totalHours" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."payment_item" (
    "id" SERIAL NOT NULL,
    "date" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "amountOfHours" INTEGER NOT NULL,
    "availableHours" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paymentId" TEXT,

    CONSTRAINT "payment_item_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "payment_item_date_idx" ON "public"."payment_item"("date");

-- CreateIndex
CREATE UNIQUE INDEX "payment_monthId_key" ON "public"."payment"("monthId");

-- AddForeignKey
ALTER TABLE "public"."payment_item" ADD CONSTRAINT "payment_item_paymentId_fkey" FOREIGN KEY ("paymentId") REFERENCES "public"."payment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

/*
  Warnings:

  - The `boxNumber` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."reviews" DROP COLUMN "boxNumber",
ADD COLUMN     "boxNumber" INTEGER;

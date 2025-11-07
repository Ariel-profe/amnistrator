/*
  Warnings:

  - The primary key for the `advice` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `advice` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `reviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `reviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."advice" DROP CONSTRAINT "advice_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "advice_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "public"."reviews" DROP CONSTRAINT "reviews_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "reviews_pkey" PRIMARY KEY ("id");

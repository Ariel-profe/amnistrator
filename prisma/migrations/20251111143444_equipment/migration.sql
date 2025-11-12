/*
  Warnings:

  - You are about to drop the column `storage` on the `equipment` table. All the data in the column will be lost.
  - Added the required column `storage1` to the `equipment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."equipment" DROP COLUMN "storage",
ADD COLUMN     "storage1" TEXT NOT NULL,
ADD COLUMN     "storage2" TEXT;

/*
  Warnings:

  - Added the required column `categoryId` to the `equipment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."equipment_name_idx";

-- AlterTable
ALTER TABLE "public"."equipment" ADD COLUMN     "categoryId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "public"."category"("name");

-- CreateIndex
CREATE INDEX "category_name_idx" ON "public"."category"("name");

-- CreateIndex
CREATE INDEX "equipment_name_tag_location_idx" ON "public"."equipment"("name", "tag", "location");

-- AddForeignKey
ALTER TABLE "public"."equipment" ADD CONSTRAINT "equipment_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

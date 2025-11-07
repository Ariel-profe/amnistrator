/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."category_name_idx";

-- AlterTable
ALTER TABLE "public"."category" ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."company" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."office" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."reviews" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."service" ADD COLUMN     "status" BOOLEAN NOT NULL DEFAULT true;

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "public"."category"("slug");

-- CreateIndex
CREATE INDEX "category_name_slug_idx" ON "public"."category"("name", "slug");

-- CreateIndex
CREATE INDEX "reviews_date_priority_idx" ON "public"."reviews"("date", "priority");

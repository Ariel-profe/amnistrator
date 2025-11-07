/*
  Warnings:

  - Changed the type of `location` on the `equipment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `equipment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `office` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `priority` on the `reviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "public"."equipment" DROP COLUMN "location",
ADD COLUMN     "location" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."office" DROP COLUMN "name",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."reviews" DROP COLUMN "priority",
ADD COLUMN     "priority" TEXT NOT NULL;

-- DropEnum
DROP TYPE "public"."Location";

-- DropEnum
DROP TYPE "public"."OfficeName";

-- DropEnum
DROP TYPE "public"."Priority";

-- DropEnum
DROP TYPE "public"."Status";

-- CreateIndex
CREATE INDEX "equipment_name_tag_location_idx" ON "public"."equipment"("name", "tag", "location");

-- CreateIndex
CREATE UNIQUE INDEX "office_name_key" ON "public"."office"("name");

-- CreateIndex
CREATE INDEX "office_name_idx" ON "public"."office"("name");

-- CreateIndex
CREATE INDEX "reviews_date_priority_idx" ON "public"."reviews"("date", "priority");

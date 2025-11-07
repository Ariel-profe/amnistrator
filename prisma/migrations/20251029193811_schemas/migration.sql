/*
  Warnings:

  - You are about to drop the `advice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `equipment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `priority` to the `reviews` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `reviews` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('baja', 'media', 'alta');

-- DropForeignKey
ALTER TABLE "public"."advice" DROP CONSTRAINT "advice_equipmentId_fkey";

-- AlterTable
ALTER TABLE "public"."equipment" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."reviews" ADD COLUMN     "boxNumber" TEXT,
ADD COLUMN     "date" TEXT NOT NULL,
ADD COLUMN     "priority" "public"."Priority" NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."advice";

-- CreateTable
CREATE TABLE "public"."service" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "equipmentId" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "service_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "service_date_idx" ON "public"."service"("date");

-- AddForeignKey
ALTER TABLE "public"."equipment" ADD CONSTRAINT "equipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service" ADD CONSTRAINT "service_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "public"."equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."service" ADD CONSTRAINT "service_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

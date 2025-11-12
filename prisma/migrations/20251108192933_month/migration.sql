/*
  Warnings:

  - You are about to drop the column `month` on the `payment` table. All the data in the column will be lost.
  - Added the required column `monthId` to the `payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."payment" DROP COLUMN "month",
ADD COLUMN     "monthId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "public"."month" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "month_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "month_name_key" ON "public"."month"("name");

-- CreateIndex
CREATE INDEX "month_id_idx" ON "public"."month"("id");

-- CreateIndex
CREATE INDEX "payment_monthId_year_idx" ON "public"."payment"("monthId", "year");

-- AddForeignKey
ALTER TABLE "public"."payment" ADD CONSTRAINT "payment_monthId_fkey" FOREIGN KEY ("monthId") REFERENCES "public"."month"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

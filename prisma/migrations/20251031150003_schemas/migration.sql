/*
  Warnings:

  - You are about to drop the column `userId` on the `equipment` table. All the data in the column will be lost.
  - Added the required column `companyId` to the `equipment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."equipment" DROP CONSTRAINT "equipment_userId_fkey";

-- AlterTable
ALTER TABLE "public"."equipment" DROP COLUMN "userId",
ADD COLUMN     "companyId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."user" ADD COLUMN     "companyId" TEXT;

-- CreateTable
CREATE TABLE "public"."company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cuit" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "company_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_name_key" ON "public"."company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "company_slug_key" ON "public"."company"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "company_email_key" ON "public"."company"("email");

-- CreateIndex
CREATE UNIQUE INDEX "company_cuit_key" ON "public"."company"("cuit");

-- CreateIndex
CREATE INDEX "company_name_idx" ON "public"."company"("name");

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."equipment" ADD CONSTRAINT "equipment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

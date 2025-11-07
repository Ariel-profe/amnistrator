-- DropForeignKey
ALTER TABLE "public"."equipment" DROP CONSTRAINT "equipment_companyId_fkey";

-- AlterTable
ALTER TABLE "public"."equipment" ALTER COLUMN "companyId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."equipment" ADD CONSTRAINT "equipment_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

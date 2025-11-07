-- AlterTable
ALTER TABLE "public"."equipment" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "public"."equipment" ADD CONSTRAINT "equipment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

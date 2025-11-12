-- CreateTable
CREATE TABLE "public"."payment" (
    "id" TEXT NOT NULL,
    "month" TEXT NOT NULL,
    "totalMonthHours" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "amountOfHours" INTEGER NOT NULL,
    "availableHours" INTEGER NOT NULL,
    "summary" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

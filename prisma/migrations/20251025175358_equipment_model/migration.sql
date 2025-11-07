-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('admin', 'operator', 'user');

-- CreateEnum
CREATE TYPE "public"."OfficeName" AS ENUM ('primitivo', 'moldes', 'buci');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('solicitado', 'revision', 'fueraDeServicio', 'alternativo', 'operativo');

-- CreateEnum
CREATE TYPE "public"."Location" AS ENUM ('sinUbicacion', 'datos', 'finanzas', 'salaDeReuniones', 'administracion', 'deposito', 'rack');

-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "role" "public"."Role" NOT NULL DEFAULT 'user',
    "loginCount" INTEGER NOT NULL DEFAULT 0,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."office" (
    "id" TEXT NOT NULL,
    "name" "public"."OfficeName" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "office_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."equipment" (
    "id" TEXT NOT NULL,
    "tag" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "location" "public"."Location" NOT NULL,
    "status" "public"."Status" NOT NULL,
    "os" TEXT NOT NULL,
    "processor" TEXT NOT NULL,
    "ram" TEXT NOT NULL,
    "motherboard" TEXT NOT NULL,
    "videoCard" TEXT NOT NULL,
    "storage" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "officeId" TEXT NOT NULL,

    CONSTRAINT "equipment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."advice" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "equipmentId" TEXT,

    CONSTRAINT "advice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."reviews" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "equipmentId" TEXT,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "office_name_key" ON "public"."office"("name");

-- CreateIndex
CREATE INDEX "office_name_idx" ON "public"."office"("name");

-- CreateIndex
CREATE UNIQUE INDEX "equipment_tag_key" ON "public"."equipment"("tag");

-- CreateIndex
CREATE UNIQUE INDEX "equipment_name_key" ON "public"."equipment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "equipment_slug_key" ON "public"."equipment"("slug");

-- CreateIndex
CREATE INDEX "equipment_name_idx" ON "public"."equipment"("name");

-- CreateIndex
CREATE INDEX "advice_date_idx" ON "public"."advice"("date");

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."equipment" ADD CONSTRAINT "equipment_officeId_fkey" FOREIGN KEY ("officeId") REFERENCES "public"."office"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."advice" ADD CONSTRAINT "advice_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "public"."equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."reviews" ADD CONSTRAINT "reviews_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES "public"."equipment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

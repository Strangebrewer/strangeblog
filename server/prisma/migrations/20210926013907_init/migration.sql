-- CreateEnum
CREATE TYPE "ACLTypes" AS ENUM ('admin', 'friend');

-- CreateEnum
CREATE TYPE "BiasTypes" AS ENUM ('Hard_Left', 'Left', 'Left_Center', 'Least_Biased', 'Right_Center', 'Right', 'Hard_Right');

-- CreateEnum
CREATE TYPE "FactualReportingTypes" AS ENUM ('Very_High', 'High', 'Mostly_Factual', 'Mixed', 'Low', 'Very_Low');

-- CreateEnum
CREATE TYPE "CredibilityTypes" AS ENUM ('High', 'Medium', 'Low');

-- CreateEnum
CREATE TYPE "NewsCategoryTypes" AS ENUM ('Conservative', 'Liberal', 'Neutral');

-- CreateEnum
CREATE TYPE "UserStatusTypes" AS ENUM ('active', 'inactive', 'banned');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "acl" "ACLTypes"[],
    "email" TEXT NOT NULL,
    "normalized_email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tags" JSONB[],
    "status" "UserStatusTypes" NOT NULL DEFAULT E'active',
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "body" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,
    "tags" TEXT[],
    "public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bias" "BiasTypes" NOT NULL,
    "category" "NewsCategoryTypes" NOT NULL DEFAULT E'Conservative',
    "factual_reporting" "FactualReportingTypes" NOT NULL,
    "credibility" "CredibilityTypes" NOT NULL,
    "url" TEXT NOT NULL,
    "fact_check_url" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User.normalized_email_unique" ON "User"("normalized_email");

-- CreateIndex
CREATE UNIQUE INDEX "User.username_unique" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD FOREIGN KEY ("category_id") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "ACLTypes" AS ENUM ('admin', 'friend', 'public');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "acl" "ACLTypes" NOT NULL DEFAULT E'public',
    "email" TEXT NOT NULL,
    "normalized_email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tags" JSONB[],
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "body" TEXT NOT NULL,
    "category" TEXT,
    "tags" TEXT[],
    "public" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

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

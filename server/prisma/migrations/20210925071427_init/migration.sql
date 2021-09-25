-- CreateEnum
CREATE TYPE "UserStatusTypes" AS ENUM ('active', 'inactive', 'banned');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "status" "UserStatusTypes" NOT NULL DEFAULT E'active';

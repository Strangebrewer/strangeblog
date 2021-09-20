-- CreateEnum
CREATE TYPE "NewsCategoryTypes" AS ENUM ('Conservative', 'Liberal', 'Neutral');

-- AlterTable
ALTER TABLE "Source" ADD COLUMN     "category" "NewsCategoryTypes" NOT NULL DEFAULT E'Conservative';

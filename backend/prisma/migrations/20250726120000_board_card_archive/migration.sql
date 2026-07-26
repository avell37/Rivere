-- AlterEnum
ALTER TYPE "ActivityAction" ADD VALUE 'ARCHIVED';
ALTER TYPE "ActivityAction" ADD VALUE 'RESTORED';

-- AlterTable
ALTER TABLE "boards" ADD COLUMN "archived_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "cards" ADD COLUMN "archived_at" TIMESTAMP(3);

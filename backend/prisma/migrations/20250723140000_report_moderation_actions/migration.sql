-- AlterTable
ALTER TABLE "messages" ADD COLUMN "deleted_at" TIMESTAMP(3);

-- CreateEnum
CREATE TYPE "ReportResolutionAction" AS ENUM ('NONE', 'BAN_USER', 'DELETE_MESSAGE');

-- AlterTable
ALTER TABLE "reports" ADD COLUMN "resolution_action" "ReportResolutionAction";

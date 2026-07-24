-- AlterTable
ALTER TABLE "notifications" ADD COLUMN "message_key" TEXT;
ALTER TABLE "notifications" ADD COLUMN "message_params" JSONB;

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "message" DROP NOT NULL;

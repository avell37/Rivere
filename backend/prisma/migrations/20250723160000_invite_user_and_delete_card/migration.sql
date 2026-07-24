-- AlterEnum
ALTER TYPE "ReportResolutionAction" ADD VALUE 'DELETE_CARD';

-- AlterTable
ALTER TABLE "board_invite" ADD COLUMN "invited_user_id" TEXT;

-- AddForeignKey
ALTER TABLE "board_invite" ADD CONSTRAINT "board_invite_invited_user_id_fkey" FOREIGN KEY ("invited_user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

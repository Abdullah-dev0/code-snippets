-- CreateTable
CREATE TABLE "emailVerificationCode" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emailVerificationCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "emailVerificationCode_user_id_key" ON "emailVerificationCode"("user_id");

-- AddForeignKey
ALTER TABLE "emailVerificationCode" ADD CONSTRAINT "emailVerificationCode_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

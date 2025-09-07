-- CreateTable
CREATE TABLE "public"."CategoryImage" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(2048) NOT NULL,
    "altText" VARCHAR(255),
    "categoryId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CategoryImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CategoryImage_categoryId_idx" ON "public"."CategoryImage"("categoryId");

-- AddForeignKey
ALTER TABLE "public"."CategoryImage" ADD CONSTRAINT "CategoryImage_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

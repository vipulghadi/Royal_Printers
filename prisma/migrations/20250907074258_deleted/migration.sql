/*
  Warnings:

  - You are about to drop the column `isDeleted` on the `Attribute` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `AttributeOption` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `CategoryImage` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `ProductAttribute` table. All the data in the column will be lost.
  - You are about to drop the column `isDeleted` on the `ProductImage` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "public"."Attribute_name_isActive_isDeleted_idx";

-- DropIndex
DROP INDEX "public"."Category_slug_isActive_isDeleted_idx";

-- DropIndex
DROP INDEX "public"."Product_categoryId_slug_isActive_isDeleted_idx";

-- AlterTable
ALTER TABLE "public"."Attribute" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "public"."AttributeOption" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "public"."Category" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "public"."CategoryImage" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "public"."Product" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "public"."ProductAttribute" DROP COLUMN "isDeleted";

-- AlterTable
ALTER TABLE "public"."ProductImage" DROP COLUMN "isDeleted";

-- CreateIndex
CREATE INDEX "Attribute_name_isActive_idx" ON "public"."Attribute"("name", "isActive");

-- CreateIndex
CREATE INDEX "Category_slug_isActive_idx" ON "public"."Category"("slug", "isActive");

-- CreateIndex
CREATE INDEX "Product_categoryId_slug_isActive_idx" ON "public"."Product"("categoryId", "slug", "isActive");

/*
  Warnings:

  - Made the column `name` on table `Guest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Guest" ALTER COLUMN "name" SET NOT NULL;

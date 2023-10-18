-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(100) NOT NULL,
    `middleName` VARCHAR(100) NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `mobile` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `admin` BOOLEAN NOT NULL,
    `registeredAt` DATETIME(3) NULL,
    `lastLogin` DATETIME(3) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `metaTitle` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `content` VARCHAR(100) NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `firstName` VARCHAR(100) NOT NULL,
    `metaTitle` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `summary` VARCHAR(100) NOT NULL,
    `price` INTEGER NOT NULL,
    `discount` INTEGER NULL,
    `userld` BIGINT NOT NULL,
    `publishedAt` DATETIME(3) NULL,
    `startsAt` DATETIME(3) NULL,
    `endsAt` DATETIME(3) NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductMeta` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(100) NOT NULL,
    `content` VARCHAR(100) NOT NULL,
    `productld` BIGINT NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProductReview` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `rating` VARCHAR(100) NOT NULL,
    `content` VARCHAR(100) NOT NULL,
    `productld` BIGINT NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NOT NULL,
    `subTotal` INTEGER NOT NULL,
    `itemDiscount` INTEGER NULL,
    `tax` INTEGER NOT NULL,
    `total` INTEGER NOT NULL,
    `discount` INTEGER NULL,
    `grandTotal` INTEGER NOT NULL,
    `firstName` VARCHAR(100) NOT NULL,
    `middleName` VARCHAR(100) NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `mobile` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `userld` BIGINT NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `sessionId` VARCHAR(100) NOT NULL,
    `token` VARCHAR(100) NOT NULL,
    `status` VARCHAR(100) NOT NULL,
    `firstName` VARCHAR(100) NOT NULL,
    `middleName` VARCHAR(100) NULL,
    `lastName` VARCHAR(100) NOT NULL,
    `mobile` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `city` VARCHAR(100) NOT NULL,
    `country` VARCHAR(100) NOT NULL,
    `userld` BIGINT NOT NULL,
    `createAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_userld_fkey` FOREIGN KEY (`userld`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductMeta` ADD CONSTRAINT `ProductMeta_productld_fkey` FOREIGN KEY (`productld`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductReview` ADD CONSTRAINT `ProductReview_productld_fkey` FOREIGN KEY (`productld`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userld_fkey` FOREIGN KEY (`userld`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_userld_fkey` FOREIGN KEY (`userld`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

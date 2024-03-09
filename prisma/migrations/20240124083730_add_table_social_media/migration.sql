-- CreateTable
CREATE TABLE `socials` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(100) NOT NULL,
    `link` VARCHAR(100) NOT NULL,
    `icon` VARCHAR(100) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `dev` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `socials` ADD CONSTRAINT `socials_dev_fkey` FOREIGN KEY (`dev`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

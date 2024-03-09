-- CreateTable
CREATE TABLE `profiles` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `divisi` VARCHAR(255) NOT NULL,
    `tentang` VARCHAR(255) NULL,
    `photo` VARCHAR(255) NULL,
    `cv` VARCHAR(255) NULL,
    `dev` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `profiles` ADD CONSTRAINT `profiles_dev_fkey` FOREIGN KEY (`dev`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

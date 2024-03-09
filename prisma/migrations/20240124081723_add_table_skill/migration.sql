-- CreateTable
CREATE TABLE `skills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `logo` VARCHAR(255) NOT NULL,
    `dev` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `skills` ADD CONSTRAINT `skills_dev_fkey` FOREIGN KEY (`dev`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

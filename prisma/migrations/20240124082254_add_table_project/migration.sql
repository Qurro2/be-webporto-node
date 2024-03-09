-- CreateTable
CREATE TABLE `projects` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `photo` VARCHAR(255) NULL,
    `nama` VARCHAR(100) NOT NULL,
    `role` VARCHAR(100) NOT NULL,
    `ulasan` VARCHAR(255) NOT NULL,
    `dev` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_dev_fkey` FOREIGN KEY (`dev`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

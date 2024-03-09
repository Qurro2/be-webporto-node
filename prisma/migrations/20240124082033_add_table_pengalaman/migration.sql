-- CreateTable
CREATE TABLE `pengalamans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama` VARCHAR(255) NOT NULL,
    `bagian` VARCHAR(255) NOT NULL,
    `tahun` INTEGER NOT NULL,
    `ulasan` VARCHAR(255) NOT NULL,
    `dev` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- AddForeignKey
ALTER TABLE `pengalamans` ADD CONSTRAINT `pengalamans_dev_fkey` FOREIGN KEY (`dev`) REFERENCES `users`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;

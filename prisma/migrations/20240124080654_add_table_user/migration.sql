-- CreateTable
CREATE TABLE `users` (
    `email` VARCHAR(255) NOT NULL,
    `nama` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `token` VARCHAR(255) NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

-- CreateTable
CREATE TABLE `Banner` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` ENUM('HOME', 'SOBRE') NOT NULL DEFAULT 'HOME',
    `titulo` VARCHAR(191) NOT NULL,
    `inicioExibicao` DATETIME(3) NOT NULL,
    `fimExibicao` DATETIME(3) NOT NULL,
    `redirectLink` VARCHAR(191) NOT NULL,
    `desktop` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NOT NULL,
    `ordemExibicao` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

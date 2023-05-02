-- CreateTable
CREATE TABLE `Numero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `valor` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL,
    `ordemExibicao` INTEGER NULL,
    `formato` ENUM('EXATO', 'APROXIMADO', 'DISTANCIA', 'MONETARIO') NOT NULL DEFAULT 'EXATO',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Empreendimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL,
    `statusDaConstrucao` ENUM('EM_CONSTRUCAO', 'ENTREGUE') NOT NULL DEFAULT 'EM_CONSTRUCAO',
    `titulo` VARCHAR(191) NOT NULL,
    `resumo` VARCHAR(255) NOT NULL,
    `descricao` TEXT NOT NULL,
    `tipoEmpreendimento` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `lotes` INTEGER NOT NULL,
    `areaLote` DOUBLE NOT NULL,
    `logoEmpreendimento` VARCHAR(191) NOT NULL,
    `imagemPlantaBaixa` VARCHAR(191) NOT NULL,
    `imagemDestaque` VARCHAR(191) NOT NULL,
    `latitude` DOUBLE NOT NULL,
    `longitude` DOUBLE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Empreendimento_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Infraestrutura` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `icone` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `InfraestruturaDosEmpreendimentos` (
    `infraestruturaId` INTEGER NOT NULL,
    `empreendimentoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`infraestruturaId`, `empreendimentoId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FotoEmpreendimento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` BOOLEAN NOT NULL,
    `arquivo` VARCHAR(191) NOT NULL,
    `ordemExibicao` INTEGER NULL,
    `empreendimentoId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `InfraestruturaDosEmpreendimentos` ADD CONSTRAINT `InfraestruturaDosEmpreendimentos_empreendimentoId_fkey` FOREIGN KEY (`empreendimentoId`) REFERENCES `Empreendimento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `InfraestruturaDosEmpreendimentos` ADD CONSTRAINT `InfraestruturaDosEmpreendimentos_infraestruturaId_fkey` FOREIGN KEY (`infraestruturaId`) REFERENCES `Infraestrutura`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FotoEmpreendimento` ADD CONSTRAINT `FotoEmpreendimento_empreendimentoId_fkey` FOREIGN KEY (`empreendimentoId`) REFERENCES `Empreendimento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

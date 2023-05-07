import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { FotoEmpreendimentoService } from "./foto-empreendimento.service";

@Module({
  imports: [PrismaModule],
  providers: [FotoEmpreendimentoService],
  exports: [FotoEmpreendimentoService],
})
export class FotoEmpreendimentoModule { }
import { PrismaClient } from '@prisma/client';
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function main() {
  let salt = await bcrypt.genSalt();
  let banners = await prisma.banner.createMany({
    data: [
      {
        status: true,
        categoria: "HOME_TOPO",
        titulo: "Banner Principal da Home",
        redirectLink: "www.google.com",
        inicioExibicao: "2023-04-22T00:00:00.000Z",
        fimExibicao: "2023-05-12T00:00:00.000Z",
        desktop: "2b10wJoRovQA22o720HgyMuXGTq4FN1vjX9yulvuG1WtrJLNH9uTV0re.png",
        mobile: "2b10spn4WkmLFai2gKM0WNgNhOOWelxNyGvclKSrcnG5wTUh70xDKzy.png",
      },
      {
        status: true,
        categoria: "HOME_SECUNDARIO",
        titulo: "Banner Secundário da Home",
        inicioExibicao: "2023-04-22T00:00:00.000Z",
        fimExibicao: "2023-05-12T00:00:00.000Z",
        redirectLink: "www.google.com",
        desktop: "2b10mD0s4XpCHB8VRmjHNbkB59PowcgO0G7XmP4SvFoOg55EZzTW9Ua.png",
        mobile: "2b10Gn3CvXzLrgDa6tkO9Xtn9e8ec6SxGjZJf7bFGkuKNl7co7pF7FUjW.png",
      },
      {
        status: true,
        categoria: "SOBRE_TOPO",
        titulo: "Banner Principal da página Sobre",
        redirectLink: "www.google.com",
        inicioExibicao: "2023-04-22T00:00:00.000Z",
        fimExibicao: "2023-05-12T00:00:00.000Z",
        desktop: "2b102KBkpiSKCSJ4WLJxpqXJaGqMxfcWd6Rl9uqr6Tj7jlJ4jzxwi.png",
        mobile: "2b1016D0ww90xPEXclnyPTDbZ1sGwQSRXvVMFzNLAtkJMFket0R7gu.png",
      },
      {
        status: true,
        categoria: "SOBRE_SECUNDARIO",
        titulo: "Banner Secundário da página Sobre",
        inicioExibicao: "2023-04-22T00:00:00.000Z",
        fimExibicao: "2023-05-12T00:00:00.000Z",
        redirectLink: "www.google.com",
        desktop: "2b10XuJa079QT85ToY8UUMpiun1AJdi0VqZtFj7fVkPXBWtvVsyO.png",
        mobile: "2b10bDOjrgy0HP4sPp9jaDOEpK0Q3BnkAG3kFFQGoPIxaPRS0adlha.png",
      }
    ]
  });
  let users = await prisma.user.createMany({
    data: [
      { 
        name: "Manager", 
        username: "manager", 
        email: "manager@cromo.com.br", 
        password: await bcrypt.hash("12345678", salt), 
        role: 1,
        status: true
      }
    ] 
  });
  let numeros = await prisma.numero.createMany({
    data: [
      {
        titulo: "Nossos Big Numbers",
        descricao: "Em mais de 30 anos de história, a Cromo vem ajudando milhares de balsenses a realizar o sonho de seu lote ou casa própria e contribuindo no desenvolvimento do Sul do Maranhão..",
        lotes: 1200,
        asfalto: 2600,
        rua: 140,
        familias: 700,
      },
    ]
  });
  let infraestruturas = await prisma.infraestrutura.createMany({
    data: [
      {
        icone: "2b10h4sTYUc1hFBoZCCM1BNRewaQ3vS2yh95gdAySgFHEg6ZksuKBES.png",
        titulo: "Rede de Água",
      },
      {
        icone: "2b10j7Nj3yvlprSL6rt7XcejJeio9PrHuUbgMcqPsbMOP37khZCL9zsIS.png",
        titulo: "Energia Elétrica",
      },
      {
        icone: "2b10iL6Cfb8spsAN1fexGUjSTm6dgpG5S6LgDko7xCYzvEuo3cGkLe.png",
        titulo: "Iluninação Pública",
      },
      {
        icone: "2b10OkTbO7fdl3O5oPOsdNGHaO8PtDKMUvKVlCz4k9tS3IeuaRwX3AIDu.png",
        titulo: "Galerias Pluviais",
      },
      {
        icone: "2b1082KMKKsyxolVXFzbhODATjVierT5KwFYBot8k2ZyUTetZNCfV0lW.png",
        titulo: "Asfalto e Meio-fio",
      },
    ]
  });
  let empreendimento = await prisma.empreendimento.create({
    data: {
      status: true,
      statusDaConstrucao: "EM_CONSTRUCAO",
      titulo: "Residencial Florença 2ª Etapa",
      descricao: "Depois do sucesso na primeira etapa, o melhor loteamento de Balsas ganhou uma nova etapa, com 355 lotes de até 255m² com a mesma infraestrutura completa da primeira etapa. As primeiras etapas das obras já estão em andamento, com ruas sendo abertas para receber meio-fio e asfalto em breve.",
      tipoEmpreendimento: "Lotes comerciais e residenciais",
      slug: "residencial-florenca-2a-etapa1",
      lotes: 724,
      areaLote: 255,
      logoEmpreendimento: "2b10sZvrXYjKIE11cdPQEid3RuZUnWzklBtt94BFO06vqK9EhlzaQqaLS.png",
      imagemPlantaBaixa: "2b10DPPAdrb4209abaii8cIZQOtdKnNUvElKxOKMn1ok1X47bGWSA6oHO.png",
      imagemDestaque: "KJAHsd981235lkahjAFKSD1Olkjf14098AQSJKLD.png",
      latitude: -7.534374900000001,
      longitude: -46.07219060000001
    }
  });
  let galeria = await prisma.fotoEmpreendimento.createMany({
    data: [
      {
        status: true,
        arquivo: "2b10TCkKUqs8hzCMMnyl1Z7gKutkUUlshR0jHWowOCf9dZwYZK52x3W.png",
        ordemExibicao: 1,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10K89Gr9pHceNTJSMifQeKVeAvNC3uFjCxIxu7DF540EyJkv76yt2.png",
        ordemExibicao: 2,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10sxjaOaL7rtnUvAaz2kGnfc1PmOfa3wzXmpfnR6LONerciHEwFJB6.png",
        ordemExibicao: 3,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10E07WiAl691JN9FQJ6q4uuf6A4AHlQifPhtZOPj0weglQ5NCtU2.png",
        ordemExibicao: 4,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10V1Ihy8e29mDAqupzj9SjEuIoVCN3VnyDzMEEks6J7jyUWKy7rhO.png",
        ordemExibicao: 5,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b109wH25OCbvwB5Oir4JRxTQCEd8MGJWa5hl8CA84f0ZEkgLmvA1oji.png",
        ordemExibicao: 6,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10pxQdksfCUGnELnNUDef7i8h02lxSopQV2mmGqNYK1pGFkDfejS.png",
        ordemExibicao: 7,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10HFN3ctPLCzIdXBJ0p8QnDOi6fGRonBp0IyVrYBvNbkKUfJGRLh8fa.png",
        ordemExibicao: 8,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10Ij9OlPJW9kXn8KU93LE9OCppYOsLWtE9z3kYRmQthcv6uQfpFPzu.png",
        ordemExibicao: 9,
        empreendimentoId: 1,
      },
    ]
  });
  let infraestruturaDoEmpreendimento = await prisma.infraestruturaDosEmpreendimentos.createMany({
    data: [
      {
        infraestruturaId: 1,
        empreendimentoId: 1,
      },
      {
        infraestruturaId: 2,
        empreendimentoId: 1,
      },
      {
        infraestruturaId: 3,
        empreendimentoId: 1,
      },
      {
        infraestruturaId: 4,
        empreendimentoId: 1,
      },
      {
        infraestruturaId: 5,
        empreendimentoId: 1,
      },
    ]
  });
  let configuracoes = await prisma.configuracao.createMany({
    data: [
      {
        titulo: "Nome do Site",
        descricao: "Base para envio de emails e identificação",
        chave: "nome_do_site",
        valor: "CROMO"
      },
      {
        titulo: "Logo",
        descricao: "Imagem usada pelo site",
        chave: "logo_do_site",
        valor: "/path/to/logo.png"
      },
      {
        titulo: "Tag Google Analytics",
        descricao: "Usado para medir o acesso e interações",
        chave: "tag_google_analytics",
        valor: ""
      },
      {
        titulo: "Instagram",
        descricao: "Conta disponível",
        chave: "instagram_account",
        valor: "https://www.instagram.com/cromoconstrutora/"
      },
      {
        titulo: "Facebook",
        descricao: "Conta no disponível",
        chave: "facebook_account",
        valor: "https://www.facebook.com/cromoconstrutora"
      },
      {
        titulo: "Email",
        descricao: "Conta disponível para email",
        chave: "email_account",
        valor: "contabilidade@lavronorte.com.br"
      },
      {
        titulo: "Whatsapp",
        descricao: "Número para contato pelo whatsapp",
        chave: "whatsapp_number",
        valor: "5599992239558"
      }
    ]
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })

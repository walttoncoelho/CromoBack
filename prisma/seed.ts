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
        titulo: "Iluminação Pública",
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
  let empreendimento = await prisma.empreendimento.createMany({
    data: [
      {
        status: true,
        destaque: true,
        completamenteVendido: true,
        statusDaConstrucao: "EM_CONSTRUCAO",
        titulo: "Residencial Florença 1ª Etapa",
        resumo: "Localizado em uma área estratégica do município, o Residencial Florença oferece lotes com infraestrutura completa de energia elétrica, rede de água, iluminação pública, galerias pluviais, além de contar com ruas com asfalto e meio-fio.",
        descricao: "O primeiro loteamento a gente nunca esquece. E o Florença Primeira Etapa marcou o início de uma nova fase da história da Cromo e de Balsas. São 742 lotes de ate 255m², com infraestrutura completa para você construir sua casa ou ponto comercial. As obras estão avançando, com ruas já abertas e recebendo asfalto e perfuração de poços.",
        tipoEmpreendimento: "Lotes comerciais & residenciais",
        slug: "residencial-florenca-1-etapa",
        lotes: 742,
        areaLote: 255,
        logoEmpreendimento: "2b10Dce0PQjGBQId2wVCn8XK7zxm110VX55KAHElVEiSEBQG9nQREci.png",
        imagemPlantaBaixa: "2b10Oz3ANgrJF9F7s83bvvh7ueHz0Ji2KlQHieiVROaSOHGOWpk549GK.png",
        imagemDestaque: "2b10vTYbTzIgVKDEV6Aw7HNsOvve6E46lMupgWpAFjZZ70omriPxLxO.jpg",
        latitude: -7.534374900000001,
        longitude: -46.07219060000001,
      },
      {
        status: true,
        destaque: true,
        completamenteVendido: true,
        statusDaConstrucao: "EM_CONSTRUCAO",
        titulo: "Residencial Florença 2ª Etapa",
        resumo: "Localizado em uma área estratégica do município, o Residencial Florença oferece lotes com infraestrutura completa de energia elétrica, rede de água, iluminação pública, galerias pluviais, além de contar com ruas com asfalto e meio-fio.",
        descricao: "Depois do sucesso na primeira etapa, o melhor loteamento de Balsas ganhou uma nova etapa, com 355 lotes de até 255m² com a mesma infraestrutura completa da primeira etapa. As primeiras etapas das obras já estão em andamento, com ruas sendo abertas para receber meio-fio e asfalto em breve.",
        tipoEmpreendimento: "Lotes comerciais & residenciais",
        slug: "residencial-florenca-2-etapa",
        lotes: 355,
        areaLote: 255,
        logoEmpreendimento: "2b106PaOq32YReKq5Xyro3eWbGUKT9JPUIitHdL8d3vhXbITM3ea.png",
        imagemPlantaBaixa: "2b109x8SeR5lCrkEbPbLFtzU7eOb18K5dClYA987zBGC45lvrPgic4K5i.png",
        imagemDestaque: "2b10JppLMoYwqGSvytyuGrkGOjvpNqXIynu5umCpa88Exjwo6Y8nrS.jpg",
        latitude: -7.534374900000001,
        longitude: -46.07219060000001,
      },
      {
        status: true,
        destaque: true,
        completamenteVendido: false,
        statusDaConstrucao: "ENTREGUE",
        titulo: "Residencial Veneza",
        resumo: "Resumo Residencial Veneza",
        descricao: "Descrição Residencial Veneza",
        tipoEmpreendimento: "Lotes comerciais & residenciais",
        slug: "residencial-veneza",
        lotes: 1,
        areaLote: 1,
        logoEmpreendimento: "2b10tezsF7d4fSP07DqafjqserG4WBle2jz5XBJC6U5jtHw9yrzLu.png",
        imagemPlantaBaixa: "2b10HUMDULxRrzmpkGn9nh8bfe3BKRS7BvLqHQvWMSttpNoO5mD3ymAOq.png",
        imagemDestaque: "2b10CRSDM09LWqjAo1EI7I9FYAVQv5uqeG8PTkTFik31xmFbb9INSn.png",
        latitude: -7.534374900000001,
        longitude: -46.07219060000001,
      },
    ]
  });
  let galeria = await prisma.fotoEmpreendimento.createMany({
    data: [
      {
        status: true,
        arquivo: "2b105zoZP6mjgABmzTretc2r0Oyk1LY4k8Qyrwbm3lB7Utj5yfi1mnCxy.JPG",
        ordemExibicao: 1,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10GYB9E9q0vCPM4cAAmjate3MtwA1VJDgYumAZ9gSe33Z3SfxQlS.JPG",
        ordemExibicao: 2,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10OKPCO4V92O1CnXqzv48yseibkaBUXJaCzpgqQ6BpVYaoGgyZgqwe6.JPG",
        ordemExibicao: 3,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b109qmFzjvuig2Xj669DiqCu5HscllLJvl8tPGx91hP8z6aEmx2YbLW.JPG",
        ordemExibicao: 4,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10MHXonCeGScAbm1V0Mq9FOSMTpVOhhMxG0OzmmnJ5B5hZIC9IbxW.JPG",
        ordemExibicao: 5,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10knXHw1OIaMt9xiLST2gri2bkYJOFzNB3EllzalbOnv2YaLh8liS.JPG",
        ordemExibicao: 6,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10uhQQw8KDUVTxIxz7JRzY7uokJXHFVeXmgBrOypnrsjLHlfOyo6i.JPG",
        ordemExibicao: 7,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10YOBvYMiXBoPILcXkKiUMuUKBugTgUvJSx7J2bD8SG8P2tW4tC1Li.JPG",
        ordemExibicao: 8,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10OfYjeOH2lUGBbnN8ILGAOUKjmds8jrOlbZy97yuj8p82P5nzza.JPG",
        ordemExibicao: 9,
        empreendimentoId: 1,
      },
      {
        status: true,
        arquivo: "2b10CI2bYjd4mJH9hvyEdZeuvtQCKfnzIUVQgipW2aGN04lWOLij3y.JPG",
        ordemExibicao: 1,
        empreendimentoId: 2,
      },
      {
        status: true,
        arquivo: "2b106CQIABOmoOjr6ry9SR2cur1sKx7mecVitKrZfLNatYVPBmhQdxm.JPG",
        ordemExibicao: 2,
        empreendimentoId: 2,
      },
      {
        status: true,
        arquivo: "2b10sOZorTBe9cmNUOwVbuWV3enBdyoJ5GByOSuKKOkkjqwHxRXPoOga.JPG",
        ordemExibicao: 3,
        empreendimentoId: 2,
      },
      {
        status: true,
        arquivo: "2b10XJ8Fs1dRtTnAakK76eUJuNBdbYq37vgY9y6WO65oLqF0vC6sl8K.JPG",
        ordemExibicao: 4,
        empreendimentoId: 2,
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
      {
        infraestruturaId: 1,
        empreendimentoId: 2,
      },
      {
        infraestruturaId: 2,
        empreendimentoId: 2,
      },
      {
        infraestruturaId: 3,
        empreendimentoId: 2,
      },
      {
        infraestruturaId: 4,
        empreendimentoId: 2,
      },
      {
        infraestruturaId: 5,
        empreendimentoId: 2,
      },
      {
        infraestruturaId: 1,
        empreendimentoId: 3,
      },
      {
        infraestruturaId: 2,
        empreendimentoId: 3,
      },
      {
        infraestruturaId: 3,
        empreendimentoId: 3,
      },
      {
        infraestruturaId: 4,
        empreendimentoId: 3,
      },
      {
        infraestruturaId: 5,
        empreendimentoId: 3,
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

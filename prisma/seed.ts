import { PrismaClient } from '@prisma/client';
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient()

async function main() {
  let salt = await bcrypt.genSalt();
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
        descricao: "Lorem ipsum dolor sit amet consectetur. Mauris ultrices aliquam justo id cras.",
        lotes: 1550,
        asfalto: 5000,
        rua: 500,
        familias: 1550,
      },
    ]
  });
  // let infraestruturas = await prisma.infraestrutura.createMany({
  //   data: [
  //     {
  //       icone: "icone_1.png",
  //       titulo: "Asfalto e Meio-fio",
  //     },
  //     {
  //       icone: "icone_2.png",
  //       titulo: "Rede de Água",
  //     },
  //     {
  //       icone: "icone_3.png",
  //       titulo: "Energia Elétrica",
  //     },
  //     {
  //       icone: "icone_4.png",
  //       titulo: "Iluninação Pública",
  //     },
  //     {
  //       icone: "icone_5.png",
  //       titulo: "Galerias Pluviais",
  //     },
  //   ]
  // });
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

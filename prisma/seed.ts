import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  let users = await prisma.user.createMany({
    data: [
      { 
        name: "Ciro", 
        username: "ciro_dourado", 
        email: "ciro.brz@gmail.com", 
        password: "12345678A!", 
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
        valor: "@cromo"
      },
      {
        titulo: "YouTube",
        descricao: "Canal do site",
        chave: "youtube_account",
        valor: "cromo"
      },
      {
        titulo: "Email",
        descricao: "Conta disponível para email",
        chave: "email_account",
        valor: "cromo@gmail.com"
      },
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

import { FormatoNumero, PrismaClient } from '@prisma/client'

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
        titulo: "Lotes Vendidos",
        descricao: "Lotes vendidos",
        valor: 1550,
        status: true,
        formato: FormatoNumero.APROXIMADO,
        ordemExibicao: 1,
      },
      {
        titulo: "Km Asfaltado",
        descricao: "de Asfalto",
        valor: 5000,
        status: true,
        formato: FormatoNumero.DISTANCIA,
        ordemExibicao: 2,
      },
      {
        titulo: "Opções de Rua",
        descricao: "Opções de rua",
        valor: 500,
        status: true,
        formato: FormatoNumero.APROXIMADO,
        ordemExibicao: 3,
      },
      {
        titulo: "Famílias Instaladas",
        descricao: "Famílias instaladas",
        valor: 1550,
        status: true,
        formato: FormatoNumero.EXATO,
        ordemExibicao: 4,
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

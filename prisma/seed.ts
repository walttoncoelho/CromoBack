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
        valor: 1555,
        status: true,
        formato: FormatoNumero.APROXIMADO,
        ordemExibicao: 1,
      },
      {
        titulo: "Km Asfaltado",
        descricao: "de Asfalto",
        valor: 1500,
        status: true,
        formato: FormatoNumero.DISTANCIA,
        ordemExibicao: 2,
      },
      {
        titulo: "Opções de Rua",
        descricao: "Opções de rua",
        valor: 509,
        status: true,
        formato: FormatoNumero.APROXIMADO,
        ordemExibicao: null,
      },
      {
        titulo: "Famílias Instaladas",
        descricao: "Famílias instaladas",
        valor: 1550,
        status: true,
        formato: FormatoNumero.EXATO,
        ordemExibicao: null,
      },
      {
        titulo: "Faturamento",
        descricao: "reais Investidos",
        valor: 850000,
        status: false, 
        formato: FormatoNumero.MONETARIO,
        ordemExibicao: null,
      }
    ]
  })
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

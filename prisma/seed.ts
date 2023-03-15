import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  let papeis = await prisma.papel.createMany({
    data: [
      { titulo: "Administrador", codigo: "admin" },
      { titulo: "Editor de Conteúdo", codigo: "editor_de_conteudo" },
    ]
  });
  let users = await prisma.user.createMany({
    data: [
      { 
        name: "Ciro", 
        username: "ciro_dourado", 
        email: "ciro.brz@gmail.com", 
        password: "12345678", 
        papelId: 1,
        status: true
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

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('Tr3g123!!!', 10)

  const admin = await prisma.adminUser.upsert({
    where: { email: 'tr3ginnovation@gmail.com' },
    update: {},
    create: {
      email: 'tr3ginnovation@gmail.com',
      password: hashedPassword,
    },
  })

  console.log('Seeded admin:', admin.email)

  // Initial Site Settings
  await prisma.siteSetting.upsert({
    where: { key: 'site_title' },
    update: {},
    create: { key: 'site_title', value: 'Tr3-G Innovations Limited' }
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

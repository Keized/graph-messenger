import { PrismaClient } from '@prisma/client'
import * as bcrypt from "bcryptjs";
const prisma = new PrismaClient()

async function main() {
    const user1Hash = await bcrypt.hash("user1", 10);
    const user2Hash = await bcrypt.hash("user2", 10);

    await prisma.user.createMany({
        data: [{
            password: user1Hash,
            id: 1,
            email: `user1@email.com`,
        },{
            password: user2Hash,
            id: 2,
            email: `user2@email.com`,
        }],
    })

    await prisma.message.createMany({
        data: [
            {content: "hello world", authorId: 1},
            {content: "hello user 1", authorId: 2},
        ],
    })
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

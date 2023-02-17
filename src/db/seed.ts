import { prisma } from "../lib/prisma"; 
import { centsToIntegers } from "../utils/centsToIntegers";

const firstAccountNumber = 286359;
const secondAccountNumber = 758016;

async function run() {
  await prisma.account.deleteMany();
  await prisma.transaction.deleteMany();

  // create default users "Jonh Doe" with 100$ and "Jane Doe" with 560$

  await Promise.all([
    await prisma.account.create({
      data: {
        firstName: "Jonh",
        lastName: "Doe",
        amount: centsToIntegers(100),
        numberAccount: firstAccountNumber
      }
    }),

    await prisma.account.create({
      data: {
        firstName: "Jane",
        lastName: "Doe",
        amount: centsToIntegers(560),
        numberAccount: secondAccountNumber
      }
    })
  ]);
}

try {
  run();
} catch (error) {
  console.log(error);
  
}
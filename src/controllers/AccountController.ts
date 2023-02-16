import { Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { centsToIntegers } from "../utils/centsToIntegers";
import { createRandomNumberWithSevenDigits } from "../utils/createRandomNumberWithSevenDigits";

export class Account {
  static async create(req: Request, res: Response) {
    const createAccontBody = z.object({
      firstName: z.string(),
      lastName: z.string(),
      amount: z.number(),
    });

    const { firstName, lastName, amount } = createAccontBody.parse(req.body);

    let numberAccont: number = createRandomNumberWithSevenDigits();

    const existAccountWithSameNumber = await prisma.account.findFirst({
      where: {
        numberAccont,
      },
    });

    if (existAccountWithSameNumber) {
      numberAccont = createRandomNumberWithSevenDigits();
    }

    try {
      await prisma.account.create({
        data: {
          firstName,
          lastName,
          amount: centsToIntegers(amount),
          numberAccont,
        },
      });

      await res
        .json({
          msg: "Conta criada com sucesso",
          AccontNumber: numberAccont,
        })
        .status(201);
    } catch (error) {
      console.log(error);
    }
  }
}

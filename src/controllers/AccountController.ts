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

    let numberAccount: number = createRandomNumberWithSevenDigits();

    const existAccountWithSameNumber = await prisma.account.findFirst({
      where: {
        numberAccount,
      },
    });

    if (existAccountWithSameNumber) {
      numberAccount = createRandomNumberWithSevenDigits();
    }

    try {
      await prisma.account.create({
        data: {
          firstName,
          lastName,
          amount: centsToIntegers(amount),
          numberAccount,
        },
      });

      await res
        .json({
          msg: "Conta criada com sucesso",
          AccountNumber: numberAccount,
        })
        .status(201);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAmountByAccountNumber(req: Request, res: Response) {
    const requestParams = z.object({
      numberAccount: z.number()
    });

    const { numberAccount } = requestParams.parse(req.params);

    await prisma.account.findUnique({
      where:  {
        
      }
    });
  }
}

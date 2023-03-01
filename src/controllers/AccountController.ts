import { Request, Response } from "express";
import { number, z } from "zod";
import { prisma } from "../lib/prisma";
import { IWithdrawBody, IWithdrawParams } from "../types/withdrawDTO";
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
    const params = req.params.numberAccount;

    const numberAccount = Number(params);

    const getBalance = await prisma.account.findUnique({
      where: {
        numberAccount,
      },
    });

    if (getBalance) {
      return await res.json({
        balance: getBalance.amount,
      });
    } else {
      return res.status(404);
    }
  }

  static async withdraw(req: Request<IWithdrawParams, IWithdrawBody >, res: Response) {
    try {
      const params = req.params.numberAccount;
      const numberAccountParams = Number(params);

      const requestBody:IWithdrawBody = req.body; 
      
      const amountForWithdraw = z.number().positive().min(100).parse(requestBody.amountForWithdraw);

      const numberAccount = z.number().positive().parse(numberAccountParams);

      console.log(amountForWithdraw);
      console.log(typeof amountForWithdraw);

      const accountData = await prisma.account.findUnique({
        where: {
          numberAccount
        }
      }); 


    } catch (error) {

      if(error instanceof z.ZodError) {
        return res.status(400).json(error.issues);
        
      }
    }

    return;
  }
}

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { hashSync, compareSync } from "bcrypt";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secret";

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  const { username, email, password, createdAt } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });
  if (user) {
    throw Error("Usario ja cadastrado");
  }
  user = await prisma.user.create({
    data: {
      username,
      email,
      password: hashSync(password, 10),
    },
  });

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({ user, token });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  let user = await prisma.user.findFirst({ where: { email } });
  if (!user) {
    throw Error("Dados invalidos");
  }

  if (!compareSync(password, user.password)) {
    throw Error("Dados invalidos");
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    JWT_SECRET
  );

  res.json({ user, token });
};

import prisma from "../db/connect.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";

export const getAllInformation = async (req, res) => {
  const userId = req.user.id;
  const info = await prisma.information.findMany({
    where: { createdById: userId },
    orderBy: { createdAt: "asc" },
  });
  res.status(StatusCodes.OK).json({ info });
};

export const getInfo = async (req, res) => {
  const userId = req.user.id;
  const infoId = Number(req.params.id);
  const info = await prisma.information.findFirst({
    where: { id: infoId, createdById: userId },
  });
  if (!info) throw new NotFoundError(`No information with id ${infoId}`);
  res.status(StatusCodes.OK).json({ info });
};

export const createInfo = async (req, res) => {
  const { name, ingredients, date, color, instructions } = req.body;
  const createdById = req.user.id;
  const info = await prisma.information.create({
    data: { name, ingredients, date: new Date(date), color, instructions, createdById },
  });
  res.status(StatusCodes.CREATED).json({ info });
};

export const updateInfo = async (req, res) => {
  const userId = req.user.id;
  const infoId = Number(req.params.id);
  const { name, ingredients, date, color, instructions } = req.body;
  if (name === "") throw new BadRequestError("Name field cannot be empty");
  const info = await prisma.information.updateMany({
    where: { id: infoId, createdById: userId },
    data: { name, ingredients, date: date ? new Date(date) : undefined, color, instructions },
  });
  if (info.count === 0) throw new NotFoundError(`No information with id ${infoId}`);
  const updatedInfo = await prisma.information.findUnique({ where: { id: infoId } });
  res.status(StatusCodes.OK).json({ info: updatedInfo });
};

export const deleteInfo = async (req, res) => {
  const userId = req.user.id;
  const infoId = Number(req.params.id);
  const info = await prisma.information.findFirst({ where: { id: infoId, createdById: userId } });
  if (!info) throw new NotFoundError(`No information with id ${infoId}`);
  await prisma.information.delete({ where: { id: infoId } });
  res.status(StatusCodes.OK).send();
};

import prisma from "../db/connect.js";
import {StatusCodes } from 'http-status-codes'
import {NotFoundError} from '../errors/index.js'

export const getFavorites = async (req, res) => {
  const userId = req.user.id;

  const favs = await prisma.favorite.findMany({
    where: { createdById: userId },
    orderBy: { createdAt: "asc" },
  });

  res.status(StatusCodes.OK).json(favs);
};

export const createFavorite = async (req, res) => {
  const { name, ingredients, instructions } = req.body;
  const createdById = req.user.id;

  const fav = await prisma.favorite.create({
    data: {
      name,
      ingredients, 
      instructions,
      createdById,
    },
  });

  res.status(StatusCodes.CREATED).json({ fav });
};

export const deleteFavorite = async (req, res) => {
  const userId = req.user.id;
  const favoriteId = Number(req.params.id); 

  const fav = await prisma.favorite.findFirst({
    where: { id: favoriteId, createdById: userId },
  });

  if (!fav) {
    throw new NotFoundError(`No favorite with id ${favoriteId}`);
  }

  await prisma.favorite.delete({
    where: { id: favoriteId },
  });

  res.status(StatusCodes.OK).send();
};

export const getFavorite = async (req, res) => {
  const userId = req.user.id;
  const favoriteId = Number(req.params.id);

  const fav = await prisma.favorite.findFirst({
    where: { id: favoriteId, createdById: userId },
  });

  if (!fav) {
    throw new NotFoundError(`No favorite with id ${favoriteId}`);
  }

  res.status(StatusCodes.OK).json({ fav });
};

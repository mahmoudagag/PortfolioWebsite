import { StatusCodes } from "http-status-codes";
import request from "request";
import prisma from "../db/connect.js";

//https://api-ninjas.com/api/recipe
export const getRecipe = async (req, res) => {
  const query = req.query.name || "";
  request.get(
    {
      url: `https://api.api-ninjas.com/v1/recipe?query=${query}`,
      headers: { "X-Api-Key": process.env.API_KEY },
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
      } else {
        res.status(StatusCodes.OK).json(JSON.parse(body));
      }
    }
  );
};

export const getUserProfile = async (req, res) => {
  const userId = req.user.id;
  const infos = await prisma.information.findMany({
    where: { createdById: userId },
    orderBy: { createdAt: "asc" },
  });

  let query = [];
  infos.forEach((info) => {
    info.ingredients.forEach((ing) => query.push(ing));
  });
  query = query.join(" and ");

  request.get(
    {
      url: `https://api.api-ninjas.com/v1/nutrition?query=${query}`,
      headers: { "X-Api-Key": process.env.API_KEY },
    },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        res.status(StatusCodes.BAD_REQUEST).json({ error });
      } else {
        res.status(StatusCodes.OK).json(JSON.parse(body));
      }
    }
  );
};
import jwt from 'jsonwebtoken'
import prisma from '../db/connect.js'
import {
    UnauthenticatedError,
  } from '../errors/index.js'

const auth = async (req,res,next) =>{
    const token = req.cookies.mealsyToken;
    if (!token){
        throw new UnauthenticatedError('Authentication invalid');
    }
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const user = await prisma.user.findUnique({
        where: { id: payload.userId },
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            // Exclude password by not selecting it
        },
        });
        req.user = user
        next()
    }catch(error){
        console.log(error)
        throw new UnauthenticatedError
    }
}
export default auth
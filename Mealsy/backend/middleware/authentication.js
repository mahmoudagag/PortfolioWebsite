import jwt from 'jsonwebtoken'
import prisma from '../db/connect.js'
import {
    UnauthenticatedError,
  } from '../errors/index.js'

const auth = async (req,res,next) =>{
    const authHeader = req.headers.authorization
    console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        console.log("should not get here")
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]
    try{
        console.log("start", token, process.env.JWT_SECRET || "BC5kVNZjOF")
        const payload = jwt.verify(token, process.env.JWT_SECRET || "BC5kVNZjOF")
        console.log(payload)
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
        console.log(user)
        req.user = user
        //req.user = {userId:payload.userId, name:payload.name}
        next()
    }catch(error){
        console.log(error)
        throw new UnauthenticatedError
    }
}
export default auth
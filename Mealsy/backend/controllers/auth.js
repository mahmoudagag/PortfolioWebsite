import {StatusCodes} from 'http-status-codes'
import {BadRequestError, UnauthenticatedError, ConflictRequestError} from '../errors/index.js'
import { hashPassword, createJWT, comparePassword } from "../utils/jwt.js";
import prisma from '../db/connect.js'

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: process.env.ENV === "PRODUCTION" ? "Strict" : "None",
    maxAge: 1000 * 60 * 60 * 24, // 1 day
}

const register = async (req,res) => {
    const { firstname, lastname, email, password } = req.body;

    const userFound = await prisma.user.findUnique({
      where: { email },
    });

    if (userFound !== null){
        throw new ConflictRequestError('Email in use')
    }
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        },
    });
    const token = createJWT(user)
    res.cookie("mealsyToken", token, cookieOptions)
    res.status(StatusCodes.CREATED).json({user:{firstname:user.firstname,lastname:user.lastname,email:user.email}})
    
}

const login = async (req,res) => {
    const {email,password} = req.body

    if (!email || !password ){
        throw new BadRequestError('Please provide email and password')
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if( !user ){
        throw new UnauthenticatedError('Invalid Credentioanls')
    }
    const isPasswordCorrect = await comparePassword(password, user.password)
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid Credentioanls')
    }
    const token = createJWT(user)
    res.cookie("mealsyToken", token, cookieOptions)
    res.status(StatusCodes.OK).json({user:{firstname:user.firstname,lastname:user.lastname,email:user.email}})
}

const logout = async (req, res) => {
    res.clearCookie("mealsyToken");
    res.sendStatus(StatusCodes.OK)
}

const loginWithCookie = async (req, res) => {
    res.status(StatusCodes.OK).json({user:req.user})
}
export {register , login, loginWithCookie, logout}
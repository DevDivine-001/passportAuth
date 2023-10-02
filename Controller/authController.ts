import { PrismaClient } from "@prisma/client";
import {Request, Response} from "express"
import crypto from "crypto";
import jwt  from "jsonwebtoken";
import {sendFirstEmail,sendSecondEmail} from "../Utils/email"

const prisma = new PrismaClient();

export const OpenAccount = async (req:Request, res:Response) => {
  try {
    const { email, password } = req.body;

    const tokenValue = crypto.randomBytes(2).toString("hex");
    const secretKey = crypto.randomBytes(2).toString("hex");
    const token = jwt.sign(tokenValue, "token");

    const account = await prisma.passportAuth.create({
      data: {
        email,
        password,
        secretKey,
        token,
      },
    });

    sendFirstEmail(account).then(() => {
      console.log("Mail Sent...");
    });

    return res.status(201).json({
      message: "Your Account has been Open successfully",
      data: account,
    });
  } catch (error) {
    return res.status(404).json({
      message: "Error Open an Account",
      data: error,
    });
  }
};

export const AllAccont = async (req:Request, res:Response) => {
  try {
    const account = await prisma.passportAuth.findMany({});

    return res.status(200).json({
      message: "Viewing All Account",
      data: account,
    });
  } catch (error) {
    return res.status(400).json({
      message:"Error",
      data: error,
    });
  };
};

export const  GetSingleAccount = async (req:Request,res:Response) => {
  try {
    const { accountId } = req.params;

    const account = await prisma.passportAuth.findUnique ({
      where: {id: accountId }, 
    });
    
    return res.status(200).json({
      message: "Viewing GetSingleAccount",
      data: account
    });
  } catch (error) {
    return res.status(400).json({
      message:"Error GetSingleAccount",
      data: error
    });
  };
};

export const OpenAccountVerification = async (req:Request, res:Response) => {
  try {
    const {secretKey} = req.body;
    const {token} = req.params;

    jwt.verify(token, "secret",async (error, payload:any) => {
    if( error?.message){
      throw new Error();
    }else{
      const account = await prisma.passportAuth.findUnique({
        where: {id: payload.id}
      });
      if(account?.secretKey === secretKey){
        sendSecondEmail(account).then(()=>{
          console.log("Mail Sent....🚀🚀🚀🚀🚀🚀")
        });
        return res.status(200).json({
          message: "Please to Verify your Account"
        });
      }else{
        return res.status(404).json({
          message: "Error with your Token",
        });
      };
    };  
    });
  } catch (error) {
    return res.status(404).json({
      message:"Big Error in OpenAccountVerification",
    });
  };
};

export const AccountVerification = async (req:Request, res:Response) => {
  try {
    const {token} = req.params;

    jwt.verify(token, "secret",async (error, payload:any) => {
    if( error?.message){
      throw new Error();
    }else{
      const account = await prisma.passportAuth.findUnique({
        where: {id: payload.id}
      });

      if (account) {
        await prisma.passportAuth.update({
          where: { id: payload.id },
          data: {
            token: "",
            verify: true,
          },
        });
       
        return res.status(200).json({
          message: "Please to Verify your Account"
        });
      }else{
        return res.status(404).json({
          message: "Error with your Token",
        });
      };
    };  
    });
  } catch (error) {
    return res.status(404).json({
      message:"Big Error in OpenAccountVerification",
    });
  };
};
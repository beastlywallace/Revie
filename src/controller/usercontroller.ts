import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid'


export async function RegisterUser(req: Request, res: Response, next: NextFunction) {
  
    const id = uuidv4()
    try {
        res.status(200).json({"solo": "weat"})
    } catch (err) {
        
    }

}
 export async function LoginUser(
   req: Request,
   res: Response,
   next: NextFunction
 ) {
   const id = uuidv4();
   try {
     res.status(200).json({ solo: "weat" });
   } catch (err) {}
 }


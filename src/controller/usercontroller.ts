import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid'

 import {registerSchema,options,loginSchema,generateToken} from '../utils/utils'

export async function RegisterUser(req: Request, res: Response, next: NextFunction) {
  
    const id = uuidv4()
    try {
      const validateResult = registerSchema.validate(req.body, options)
      if (validateResult.error) {
        return res.status(400).json({
          Error: validateResult.error.details[0].message
        })
      }
      const duplicateEmail= await UserInstance.findOne({where:{email:req.body.email}
        
      })
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


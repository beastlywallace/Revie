import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from 'uuid'
import { UserInstance } from "../model/userModel";
 import bcrypt from "bcryptjs";
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
      const duplicateEmail = await UserInstance.findOne({ where: { email: req.body.email } })
      if (duplicateEmail) {
        return res.status(409).json({
          msg: "Email is used, please change email",
        });
      }

      const duplicatePhone = await UserInstance.findOne({
        where: { phonenumber: req.body.phonenumber }
      })
       if (duplicatePhone) {
         return res.status(409).json({
           msg: "Phone number is used",
         });
       }
      const passwordHash = await bcrypt.hash(req.body.password, 8)
      const record = await UserInstance.create({
        id: id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        email: req.body.email,
        phonenumber: req.body.phonenumber,
        password: passwordHash,
      });
      res.status(201).json({
        msg: "You have succesfully created a user"
      })
    } catch (err) {
      res.status(500).json({
        msg: 'failed to register',
        route:'/register'
        })
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


import express from "express";
import type { Request, Response } from "express"
import * as userService from "./user.service"
import {verifyToken, verifyTokenAndAdmin, verifyTokenAndAuthorization} from '../verifyToken'
var CryptoJS = require("crypto-js");

export const userRouter = express.Router();


// Auth
userRouter.post("/auth", async (req: Request,res: Response) =>{
	try {
		const users = await userService.authenticateUser(req.body.username, req.body.password);
		return res.status(200).json({ status: 200, token: users });
	} catch (error: any) {
		return res.status(500).json({ status: 500, message: error.message });
	}
})


// List users
userRouter.get("/", verifyTokenAndAdmin ,async (request: Request,response: Response) =>{
	try {
		const employer = await userService.findAll();
		return response.status(200).json(employer);
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Get single employer
userRouter.get("/:id", verifyToken, async (request: Request,response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const employer = await userService.findById(id);
		if(employer){
			return response.status(200).json(employer);
		}
		return response.status(404).json({error:true,msg: "A conta não foi encontrada!"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})

// Create user
userRouter.post("/", verifyTokenAndAdmin, async (request: Request,response: Response)=>{
	try {
		const employer = await userService.create(request.body);
		if(employer)
			return response.status(200).json({error:false, msg:"A conta foi criada com sucesso"});
		
			return response.status(500).json({error:true, msg:"Operação falhou"})
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

userRouter.post("/", verifyTokenAndAdmin, async (request: Request,response: Response)=>{
	try {
		const employer = await userService.create(request.body);
		if(employer)
			return response.status(200).json({error:false, msg:"A conta foi criada com sucesso"});
		
			return response.status(500).json({error:true, msg:"Operação falhou"})
		
	} catch (error: any) {
		return response.status(500).json({error:true, msg:error.message})
	}
})

// Delete user
userRouter.delete("/:id", verifyTokenAndAdmin,async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id, 10);
	try {
		const employer = await userService.destroy(id);
		return response.status(200).json({error: false, msg: "Conta eliminada com sucesso"})
	} catch (error: any) {
		return response.status(500).json({error: true, msg: error.message})
	}
})

// Updade user
userRouter.put("/:id/:role/:status", verifyTokenAndAdmin, async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id);
	const role: boolean = (request.params.role === 'true');
	const status: boolean = (request.params.status === 'true');
	try {
		const user = await userService.updateUserRole(id, role, status);
		
		return response.json({error: false, msg: "Alterações feitas com sucesso"});
	} catch (error: any) {
		return response.status(500).json({error: true, msg: error.message})
	}
})

// Updade user
userRouter.put("/new/password/:id", verifyToken, async(request: Request, response: Response) =>{
	const id: number = parseInt(request.params.id);
	try {
		const employer = await userService.updateUserPassword(id, request.body.password);
		
		return response.json({error: false, msg: "Alterações feitas com sucesso"});
	} catch (error: any) {
		return response.status(500).json(error.message)
	}
})